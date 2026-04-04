import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { FloatingBMC } from './FloatingBMC';

export function Layout() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: 'var(--bg)', fontFamily: 'var(--font-body)' }}
      >
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
      <SiteFooter />
      <FloatingBMC />
    </>
  );
}
