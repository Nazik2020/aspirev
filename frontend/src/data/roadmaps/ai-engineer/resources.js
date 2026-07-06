/**
 * AI Engineer Roadmap - Resources
 * Curated free YouTube channels, free platforms, and practice sites
 */

export const globalResources = {
  youtube: [
    { name: "Andrej Karpathy", url: "https://www.youtube.com/@AndrejKarpathy", topic: "LLMs & Neural Networks" },
    { name: "Sentdex", url: "https://www.youtube.com/@sentdex", topic: "Python & ML" },
    { name: "StatQuest", url: "https://www.youtube.com/@statquest", topic: "ML Fundamentals" },
    { name: "AssemblyAI", url: "https://www.youtube.com/@AssemblyAI", topic: "NLP & AI APIs" },
    { name: "AI Jason", url: "https://www.youtube.com/@AIJasonZ", topic: "LangChain & Agents" },
    { name: "freeCodeCamp", url: "https://www.youtube.com/@freecodecamp", topic: "Full AI Courses" },
    { name: "Code Basics", url: "https://www.youtube.com/@codebasics", topic: "ML & Python basics" },
    { name: "NetworkChuck", url: "https://www.youtube.com/@NetworkChuck", topic: "Cloud & DevOps" },
  ],
  platforms: [
    { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", free: true },
    { name: "Google Skillsboost", url: "https://cloudskillsboost.google/", free: true },
    { name: "Microsoft Learn", url: "https://learn.microsoft.com/", free: true },
    { name: "freeCodeCamp.org", url: "https://www.freecodecamp.org/", free: true },
    { name: "fast.ai", url: "https://www.fast.ai/", free: true },
    { name: "Hugging Face Learn", url: "https://huggingface.co/learn", free: true },
    { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", free: true },
    { name: "AWS Skill Builder", url: "https://explore.skillbuilder.aws/", free: true },
    { name: "Coursera (Free Audit)", url: "https://www.coursera.org/", free: false, note: "Audit free, cert paid" },
    { name: "edX (Free Audit)", url: "https://www.edx.org/", free: false, note: "Audit free, cert paid" },
  ],
  practice: [
    { name: "Kaggle Competitions", url: "https://www.kaggle.com/competitions" },
    { name: "OpenAI Cookbook", url: "https://cookbook.openai.com/" },
    { name: "Papers With Code", url: "https://paperswithcode.com/" },
    { name: "Hugging Face Spaces", url: "https://huggingface.co/spaces" },
    { name: "Google AI Studio", url: "https://aistudio.google.com/" },
    { name: "Scrimba AI Engineer Path", url: "https://v2.scrimba.com/the-ai-engineer-path-c02v" },
  ],
};

export const topicResources = {
  "What is an AI Engineer?": {
    articles: ["https://roadmap.sh/ai-engineer"],
    youtube: ["https://www.youtube.com/@sentdex"],
  },
  LLMs: {
    articles: ["https://www.cloudflare.com/learning/ai/what-is-large-language-model/"],
    youtube: ["https://www.youtube.com/watch?v=zjkBMFhNj_g", "https://www.youtube.com/watch?v=kCc8FmEb1nY"],
  },
  "Prompt Engineering": {
    articles: ["https://www.promptingguide.ai/"],
    youtube: ["https://www.youtube.com/watch?v=BP9KCWFFLSk"],
    courses: ["https://www.kaggle.com/learn"],
  },
  Embeddings: {
    articles: ["https://platform.openai.com/docs/guides/embeddings", "https://www.pinecone.io/learn/vector-embeddings/"],
    youtube: ["https://www.youtube.com/watch?v=viZrOnJclY0"],
  },
  "Vector Databases": {
    articles: ["https://www.pinecone.io/learn/vector-database/"],
    youtube: ["https://www.youtube.com/watch?v=klTvEwg3oJ4"],
  },
  "RAG & Implementation": {
    articles: ["https://aws.amazon.com/what-is/retrieval-augmented-generation/"],
    youtube: ["https://www.youtube.com/watch?v=T-D1OfcDW1M", "https://www.youtube.com/watch?v=sVcwVQRHIc8"],
    courses: ["https://www.kaggle.com/learn"],
  },
  "AI Agents": {
    articles: ["https://lilianweng.github.io/posts/2023-06-23-agent/"],
    youtube: ["https://www.youtube.com/watch?v=DWUdGFCU2dM", "https://www.youtube.com/@AIJasonZ"],
  },
  "Hugging Face": {
    articles: ["https://huggingface.co/docs"],
    courses: ["https://huggingface.co/learn/nlp-course"],
  },
  Ollama: {
    articles: ["https://ollama.ai/", "https://github.com/ollama/ollama"],
    youtube: ["https://www.youtube.com/watch?v=ZozodmHsD5k"],
  },
  "OpenAI API": {
    articles: ["https://platform.openai.com/docs/overview", "https://cookbook.openai.com/"],
    youtube: ["https://www.youtube.com/watch?v=4qNwoAAfnk4"],
  },
  "AI Safety and Ethics": {
    articles: ["https://platform.openai.com/docs/guides/safety-best-practices", "https://owasp.org/www-project-top-10-for-large-language-model-applications/"],
  },
  "Multimodal AI": {
    articles: ["https://platform.openai.com/docs/guides/vision"],
    youtube: ["https://www.youtube.com/watch?v=GnWXFKd_4YM"],
  },
};

export default topicResources;
