import { gameDeveloperMeta } from "./meta";
import { gameDeveloperResources } from "./resources";
import { gameDeveloperStages } from "./stages";

const skillCount = gameDeveloperStages.reduce(
  (total, stage) => total + stage.skills.length,
  0
);

export const gameDeveloperRoadmap = {
  ...gameDeveloperMeta,
  stages: gameDeveloperStages,
  resources: gameDeveloperResources,
  stageCount: gameDeveloperStages.length,
  skillCount: skillCount,
  time: "240 hrs",
};
