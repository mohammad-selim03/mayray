"use client";

import { createContext, useContext, ReactNode } from "react";
import type {
  ApiFeature,
  ApiIntegration,
  ApiUseCase,
  ApiTestimonial,
  ApiScalingStep,
  ApiIndustryROI,
  ApiBlogPost,
} from "./api";

export type SiteData = {
  features: ApiFeature[];
  integrations: ApiIntegration[];
  useCases: ApiUseCase[];
  testimonials: ApiTestimonial[];
  scaling: ApiScalingStep[];
  industryROI: ApiIndustryROI[];
  blog: ApiBlogPost[];
};

export const EMPTY_SITE_DATA: SiteData = {
  features: [],
  integrations: [],
  useCases: [],
  testimonials: [],
  scaling: [],
  industryROI: [],
  blog: [],
};

const SiteDataContext = createContext<SiteData>(EMPTY_SITE_DATA);

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider = ({
  value,
  children,
}: {
  value: SiteData;
  children: ReactNode;
}) => <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
