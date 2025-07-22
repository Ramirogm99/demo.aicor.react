import React from 'react';
import NavBar from '../ui/navbar';
import Footer from '../ui/footer';
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}