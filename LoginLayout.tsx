import React from "react";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <main className="grid grid-flow-col grid-rows-1 h-screen w-full ">
        {children}
      </main>
    </div>
  );
}
