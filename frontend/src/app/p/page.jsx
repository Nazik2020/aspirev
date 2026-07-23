"use client";

import { Suspense } from "react";
import PublicPortfolioPage from "@/views/PublicPortfolio/PublicPortfolioPage";

export default function PublicPortfolio() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-white font-bold">Loading...</div>}>
      <PublicPortfolioPage />
    </Suspense>
  );
}
