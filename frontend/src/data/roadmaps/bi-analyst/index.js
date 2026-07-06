import { biAnalystMeta } from "./meta";
import { biAnalystResources } from "./resources";
import { biAnalystStages } from "./stages";

const skillCount = biAnalystStages.reduce(
  (total, stage) => total + stage.skills.length,
  0
);

export const biAnalystRoadmap = {
  ...biAnalystMeta,
  stages: biAnalystStages,
  resources: biAnalystResources,
  stageCount: biAnalystStages.length,
  skillCount: skillCount,
  time: "240 hrs",
};
