import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

interface UnsavedChangesValue {
  setDirty: (dirty: boolean) => void;
  /** Runs `proceed` now, or after the user confirms leaving when there are unsaved edits. */
  guard: (proceed: () => void) => void;
}

const UnsavedChangesContext = createContext<UnsavedChangesValue>({ setDirty: () => {}, guard: (p) => p() });

export function UnsavedChangesProvider({ children }: { children: ReactNode }) {
  const dirty = useRef(false);
  const [pending, setPending] = useState<(() => void) | null>(null);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  const setDirty = useCallback((value: boolean) => {
    dirty.current = value;
  }, []);
  const guard = useCallback((proceed: () => void) => {
    if (dirty.current) setPending(() => proceed);
    else proceed();
  }, []);

  return (
    <UnsavedChangesContext.Provider value={{ setDirty, guard }}>
      {children}
      <ConfirmDialog
        open={pending !== null}
        onClose={() => setPending(null)}
        onConfirm={() => {
          const proceed = pending;
          dirty.current = false;
          setPending(null);
          proceed?.();
        }}
        title="Leave without publishing?"
        message="Your changes on this page haven't been published and will be lost."
        confirmLabel="Leave page"
      />
    </UnsavedChangesContext.Provider>
  );
}

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
