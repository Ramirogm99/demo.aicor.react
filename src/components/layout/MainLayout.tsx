import React from "react";
import NavBar from "../ui/navbar";
import Footer from "../ui/footer";
export default function MainLayout({
  user,
  children,
}: {
  user: { name: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <NavBar user={user}/>
      <main className="flex-1 bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
}
