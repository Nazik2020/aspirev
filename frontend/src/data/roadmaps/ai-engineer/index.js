/**
 * AI Engineer Roadmap - Index
 * Combines meta, stages, and resources into a single export
 * that matches the shape expected by the existing roadmaps system.
 */

import { aiEngineerMeta } from "./meta";
import { aiEngineerStages } from "./stages";
import { globalResources, topicResources } from "./resources";

const totalSkills = aiEngineerStages.reduce(
  (acc, stage) => acc + stage.skills.length,
  0
);

export const aiEngineerRoadmap = {
  ...aiEngineerMeta,
  skillCount: totalSkills,
  stageCount: aiEngineerStages.length,
  time: "~80 hrs",
  stages: aiEngineerStages,
  globalResources,
  topicResources,
};

export { aiEngineerMeta, aiEngineerStages, globalResources, topicResources };
export default aiEngineerRoadmap;
