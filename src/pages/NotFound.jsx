import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 px-4 py-10 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12">
        <p className="text-sm uppercase tracking-[0.4em] text-zinc-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-300 sm:text-base">
          The page you are looking for does not exist or the route is not available.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}