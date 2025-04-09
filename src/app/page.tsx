"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to <span className="text-teal-500">Vikimind</span>
      </h1>
      <p className="text-lg mb-8">
        Your AI-powered meeting minutes assistant. Effortlessly capture, summarize, and organize your meeting notes.
      </p>
      <Link href="/minutes" className="px-6 py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-700 transition-colors">
        Start Taking Notes
      </Link>
    </div>
  );
}
