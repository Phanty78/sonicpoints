// src/components/layout/MainWrapper.jsx
'use client';

export default function MainWrapper({ children }) {
  return (
    <div className="flex flex-col items-center justify-start gap-4 m-2 lg:m-4 min-h-screen">
      {children}
    </div>
  );
}