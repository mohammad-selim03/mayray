"use client";

import { createContext, useContext, ReactNode } from "react";

type PageContentData = Record<string, Record<string, string>>;

const PageContentContext = createContext<PageContentData>({});

export const usePageContent = () => useContext(PageContentContext);

export const usePageSection = (section: string) => {
  const content = usePageContent();
  return content[section] || {};
};

export const usePageField = (section: string, key: string, fallback = "") => {
  const sectionData = usePageSection(section);
  return sectionData[key] || fallback;
};

export const PageContentProvider = ({
  value,
  children,
}: {
  value: PageContentData;
  children: ReactNode;
}) => (
  <PageContentContext.Provider value={value}>{children}</PageContentContext.Provider>
);
