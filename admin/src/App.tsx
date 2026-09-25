import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/blog/BlogList";
import BlogEditor from "./pages/blog/BlogEditor";
import TestimonialList from "./pages/testimonials/TestimonialList";
import IntegrationList from "./pages/integrations/IntegrationList";
import FeatureList from "./pages/features/FeatureList";
import UseCaseList from "./pages/usecases/UseCaseList";
import ContactList from "./pages/contacts/ContactList";
import NewsletterList from "./pages/newsletter/NewsletterList";
import HealthCheckList from "./pages/healthcheck/HealthCheckList";
import UserList from "./pages/users/UserList";
import Analytics from "./pages/Analytics";
import ScalingList from "./pages/scaling/ScalingList";
import IndustryROI from "./pages/IndustryROI";
import PageContentEditor from "./pages/page-content/PageContentEditor";
import AuditLogList from "./pages/audit-logs/AuditLogList";
import ContentList from "./pages/content/ContentList";
import ContentEditor from "./pages/content/ContentEditor";
import MediaLibrary from "./pages/media/MediaLibrary";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/content" element={<ContentList />} />
              <Route path="/content/:key" element={<ContentEditor />} />
              <Route path="/media" element={<MediaLibrary />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/new" element={<BlogEditor />} />
              <Route path="/blog/:id/edit" element={<BlogEditor />} />
              <Route path="/testimonials" element={<TestimonialList />} />
              <Route path="/integrations" element={<IntegrationList />} />
              <Route path="/features" element={<FeatureList />} />
              <Route path="/use-cases" element={<UseCaseList />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/newsletter" element={<NewsletterList />} />
              <Route path="/health-checks" element={<HealthCheckList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/audit-logs" element={<AuditLogList />} />
              <Route path="/analytics" element={<Analytics />} />
              {/* Retired screens: their content now lives in the Home page editor. */}
              <Route path="/site-settings" element={<Navigate to="/content/home" replace />} />
              <Route path="/faq" element={<Navigate to="/content/home" replace />} />
              <Route path="/scaling" element={<ScalingList />} />
              <Route path="/industry-roi" element={<IndustryROI />} />
              <Route path="/pages/home" element={<Navigate to="/content/home" replace />} />
              <Route path="/pages/blog" element={<PageContentEditor page="blog" />} />
              <Route path="/pages/blog_detail" element={<PageContentEditor page="blog_detail" />} />
              <Route path="/pages/not_found" element={<PageContentEditor page="not_found" />} />
              <Route path="/pages/privacy" element={<PageContentEditor page="privacy" />} />
              <Route path="/pages/terms" element={<PageContentEditor page="terms" />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
