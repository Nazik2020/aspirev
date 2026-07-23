import React from "react";
import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import InteractiveNodes from "../components/roadmap/InteractiveNodes";
import EngineerToolkit from "../components/roadmap/EngineerToolkit";

const LearningHubPage = () => {
  return (
    <div className="w-full">
      <RoadmapHeader />
      <InteractiveNodes />
      <EngineerToolkit />
    </div>
  );
};

export default LearningHubPage;
