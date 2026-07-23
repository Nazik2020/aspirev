"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CareerPathPage from "@/views/CareerPathPage";
import RoadmapDetail from "@/components/career/RoadmapDetail";

function CareerPathContent() {
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("id");

  if (roadmapId) {
    return <RoadmapDetail />;
  }

  return <CareerPathPage />;
}

export default function CareerPath() {
  return (
    <Suspense fallback={null}>
      <CareerPathContent />
    </Suspense>
  );
}
