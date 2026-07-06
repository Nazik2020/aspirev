// src/data/roadmaps.js
// Central data source for all career roadmap definitions
import { aiEngineerRoadmap } from "./roadmaps/ai-engineer";
import { aiDataScientistRoadmap } from "./roadmaps/ai-data-scientist";
import { cyberSecurityRoadmap } from "./roadmaps/cyber-security";
import { fullStackRoadmap } from "./roadmaps/full-stack";
import { qaEngineerRoadmap } from "./roadmaps/qa-engineer";
import { frontendRoadmap } from "./roadmaps/frontend";
import { devopsRoadmap } from "./roadmaps/devops";
import { androidRoadmap } from "./roadmaps/android";
import { blockchainRoadmap } from "./roadmaps/blockchain";
import { gameDeveloperRoadmap } from "./roadmaps/game-developer";
import { backendRoadmap } from "./roadmaps/backend";
import { biAnalystRoadmap } from "./roadmaps/bi-analyst";

export const categories = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "data", label: "Data & AI" },
  { id: "design", label: "Design" },
  { id: "security", label: "Security" },
  { id: "devops", label: "DevOps" },
  { id: "product", label: "Product" },
];

export const roadmaps = [
  aiEngineerRoadmap,
  aiDataScientistRoadmap,
  cyberSecurityRoadmap,
  fullStackRoadmap,
  qaEngineerRoadmap,
  frontendRoadmap,
  devopsRoadmap,
  androidRoadmap,
  blockchainRoadmap,
  gameDeveloperRoadmap,
  backendRoadmap,
  biAnalystRoadmap
];
