"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-teal-500">Vikimind</span>
        </h1>
        <p className="text-xl text-gray-600">
          Revolutionize your meeting experience with AI-powered minute taking.
        </p>
      </header>

      <section className="max-w-3xl text-center px-6 mb-12">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Effortless Meeting Minutes</h2>
        <p className="text-lg text-gray-500 mb-6">
          Vikimind helps you capture, summarize, and organize your meeting notes with ease.
          Get real-time transcription, AI-powered summaries, and seamless collaboration.
        </p>

        <p className="text-lg text-gray-500 mb-6">
          Vikimind uses AI to understand the context of your meetings, making note-taking simpler and more efficient.
        </p>

        <ul className="list-disc list-inside text-gray-500">
          <li>Record and organize meeting details</li>
          <li>Capture notes in real-time</li>
          <li>Generate AI-powered summaries</li>
          <li>Store and review past meetings</li>
        </ul>
      </section>

      <section className="flex flex-wrap justify-center gap-6 mb-12">
        <div className="w-full md:w-auto">
          <div className="px-8 py-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Key Features</h3>
            <ul className="list-disc list-inside text-gray-500">
              <li>Real-time Note Taking</li>
              <li>AI-Powered Summaries</li>
              <li>Multi-Speaker Support</li>
              <li>Meeting Analytics</li>
              <li>Export &amp; Save Notes</li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-auto">
          <div className="px-8 py-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Benefits</h3>
            <ul className="list-disc list-inside text-gray-500">
              <li>Increase Productivity</li>
              <li>Save Time and Effort</li>
              <li>Improve Collaboration</li>
              <li>Enhance Accuracy</li>
              <li>Stay Organized</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-center">
        <Link href="/note/create" className="px-8 py-4 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-700 transition-colors text-xl">
          Start Taking Notes Now
        </Link>
         <Link href="/account" className="ml-4 px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300 transition-colors text-xl">
          View Account
        </Link>
      </footer>
    </div>
  );
}
