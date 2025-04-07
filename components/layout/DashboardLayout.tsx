"use client";

import SideNav from './SideNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <main className="flex-1 overflow-y-auto bg-gray-50/40">
        {children}
      </main>
    </div>
  );
} 