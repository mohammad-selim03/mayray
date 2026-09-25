import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import MediaBrowser, { MediaThumb } from "../../cms/components/MediaBrowser";
import { errorMessage, formatBytes, mediaApi, type MediaItem } from "../../cms/api";

export default function MediaLibrary() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [alt, setAlt] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const open = (m: MediaItem) => {
    setSelected(m);
    setAlt(m.alt);
  };

  const saveAlt = useMutation({
    mutationFn: () => mediaApi.updateAlt(selected!.id, alt),
    onSuccess: (m) => {
      setSelected(m);
      qc.invalidateQueries({ queryKey: ["media"] });
      toast.success("Alt text saved");
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const remove = useMutation({
    mutationFn: () => mediaApi.remove(selected!.id),
    onSuccess: () => {
      toast.success("File deleted");
      setConfirmDelete(false);
      setSelected(null);
      qc.invalidateQueries({ queryKey: ["media"] });
    },
    onError: (err) => toast.error(errorMessage(err)),
  });

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(selected!.url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy. Select the link and copy it manually.");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Media library</h2>
        <p className="text-sm text-gray-500">Every image, video and audio file uploaded for the site. Pick them from any page field, or upload here.</p>
      </div>
      <div className="card p-5">
        <MediaBrowser onSelect={open} />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.filename ?? "File"} size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.kind === "video" ? (
              <video src={selected.url} controls className="max-h-[50vh] w-full rounded-lg bg-gray-900" />
            ) : selected.kind === "audio" ? (
              <audio src={selected.url} controls className="w-full" />
            ) : (
              <MediaThumb media={selected} className="max-h-[50vh] w-full rounded-lg" />
            )}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
              <div><dt className="text-gray-400">Type</dt><dd>{selected.mimeType}</dd></div>
              <div><dt className="text-gray-400">Size</dt><dd className="tabular-nums">{formatBytes(selected.size)}</dd></div>
              <div><dt className="text-gray-400">Dimensions</dt><dd className="tabular-nums">{selected.width && selected.height ? `${selected.width} × ${selected.height}` : "—"}</dd></div>
              <div><dt className="text-gray-400">Uploaded</dt><dd>{new Date(selected.createdAt).toLocaleDateString()}</dd></div>
            </dl>
            {selected.kind === "image" && (
              <div>
                <label className="label" htmlFor="media-alt">Default alt text</label>
                <div className="flex gap-2">
                  <input id="media-alt" className="input" value={alt} maxLength={300} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image for screen readers" />
                  <button type="button" className="btn-secondary" disabled={alt === selected.alt || saveAlt.isPending} onClick={() => saveAlt.mutate()}>
                    Save
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">Used when this image is picked for a field. Each field can still override it.</p>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
              <input readOnly value={selected.url} className="input flex-1 font-mono text-xs" onFocus={(e) => e.target.select()} aria-label="File link" />
              <button type="button" className="btn-secondary" onClick={copyUrl}><Copy className="h-4 w-4" /> Copy link</button>
              <button type="button" className="btn-danger" onClick={() => setConfirmDelete(true)}><Trash2 className="h-4 w-4" /> Delete</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => remove.mutate()}
        loading={remove.isPending}
        title="Delete this file?"
        message="It's removed from storage for good. Any page still using it will show an empty space until you pick another file."
      />
    </div>
  );
}
