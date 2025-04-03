// src/components/layout/MainWrapper.jsx
'use client';

export default function MainWrapper({ children }) {
  return (
    <div className="m-2 flex min-h-screen flex-col items-center justify-start gap-4 lg:m-4">
      {children}
    </div>
  );
}
