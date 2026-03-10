import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-20 left-20"></div>

      <div className="absolute w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-40 right-20"></div>

      <div className="absolute w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-20 left-1/2"></div>

    </div>
  );
}