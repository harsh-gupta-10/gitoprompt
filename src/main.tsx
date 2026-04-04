import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Layout } from './components/Layout.tsx'
import AboutPage from './pages/AboutPage.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'
import TermsPage from './pages/TermsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Homepage — App handles its own wildcard routing (owner/repo paths) */}
        <Route path="/" element={<App />} />

        {/* Static pages wrapped in shared Layout (Navbar + SiteFooter) */}
        <Route element={<Layout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
        </Route>

        {/* Catch-all for owner/repo paths — handled by App */}
        <Route path="/:owner/:repo" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
