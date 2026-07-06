import { backendMeta } from "./meta";
import { backendResources } from "./resources";
import { backendStages } from "./stages";

const skillCount = backendStages.reduce(
  (total, stage) => total + stage.skills.length,
  0
);

export const backendRoadmap = {
  ...backendMeta,
  stages: backendStages,
  resources: backendResources,
  stageCount: backendStages.length,
  skillCount: skillCount,
  time: "300 hrs",
};
