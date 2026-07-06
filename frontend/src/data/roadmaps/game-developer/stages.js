export const gameDeveloperStages = [
  {
    id: "game-math",
    title: "1. Game Mathematics",
    description:
      "Master the foundational mathematics required for 3D space, transformations, and object movement.",
    level: "Beginner",
    duration: "4 weeks",
    skills: [
      {
        id: "gd-linear-algebra",
        name: "Linear Algebra",
        description:
          "Learn Vectors, Matrices, Geometry, Linear/Affine Transformations, and Affine Space.",
        done: false,
        resources: [
          {
            name: "Essence of Linear Algebra",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=essence+of+linear+algebra+3blue1brown",
          },
          {
            name: "Math for Game Devs",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=math+for+game+developers",
          },
        ],
      },
      {
        id: "gd-orientation-curves",
        name: "Orientation & Curves",
        description:
          "Understand Quaternions, Euler Angles, and various curves like Splines, Hermite, Bezier, and Catmull-Rom.",
        done: false,
        resources: [
          {
            name: "Quaternions Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=quaternions+explained+3d",
          },
          {
            name: "Bezier Curves",
            type: "Article",
            url: "https://javascript.info/bezier-curve",
          },
        ],
      },
      {
        id: "gd-projection",
        name: "Projection",
        description:
          "Study Perspective and Orthogonal projections used in rendering 3D scenes onto 2D screens.",
        done: false,
        resources: [
          {
            name: "Perspective Projection Math",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=perspective+projection+matrix",
          },
          {
            name: "Orthographic vs Perspective",
            type: "Article",
            url: "https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/orthographic-projection-matrix",
          },
        ],
      },
    ],
  },
  {
    id: "game-physics",
    title: "2. Game Physics",
    description:
      "Simulate realistic movement, collisions, and physical reactions in a game world.",
    level: "Intermediate",
    duration: "3 weeks",
    skills: [
      {
        id: "gd-dynamics",
        name: "Dynamics",
        description:
          "Learn Center of Mass, Moment of Inertia, Force, Acceleration, Velocity, Friction, and Buoyancy.",
        done: false,
        resources: [
          {
            name: "Physics for Game Developers",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=physics+for+game+developers",
          },
          {
            name: "Rigid Body Dynamics",
            type: "Article",
            url: "https://en.wikipedia.org/wiki/Rigid_body_dynamics",
          },
        ],
      },
      {
        id: "gd-collision-detection",
        name: "Collision Detection",
        description:
          "Implement Narrow/Broad Phase, Continuous Collision Detection, and algorithms like GJK, EPA, and SAT.",
        done: false,
        resources: [
          {
            name: "GJK Collision Detection",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=gjk+collision+detection",
          },
          {
            name: "Separating Axis Theorem (SAT)",
            type: "Article",
            url: "https://dyn4j.org/2010/01/sat/",
          },
        ],
      },
      {
        id: "gd-spatial-partitioning",
        name: "Spatial Partitioning",
        description:
          "Optimize physics using Bounding Volumes (AABB, OBB) and structures like BVH, Sort & Sweep, and DBVT.",
        done: false,
        resources: [
          {
            name: "Spatial Partitioning in Games",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=spatial+partitioning+game+development",
          },
          {
            name: "Bounding Volume Hierarchies",
            type: "Docs",
            url: "https://en.wikipedia.org/wiki/Bounding_volume_hierarchy",
          },
        ],
      },
    ],
  },
  {
    id: "game-engines",
    title: "3. Game Engines & Languages",
    description:
      "Choose your tools. Learn the industry-standard software and programming languages.",
    level: "Beginner",
    duration: "4 weeks",
    skills: [
      {
        id: "gd-engines",
        name: "Game Engines",
        description:
          "Explore Unity 3D, Unreal Engine, Godot, or build a Native custom engine.",
        done: false,
        resources: [
          {
            name: "Unity vs Unreal vs Godot",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=unity+vs+unreal+vs+godot",
          },
          {
            name: "Game Engine Architecture",
            type: "Book",
            url: "https://www.gameenginebook.com/",
          },
        ],
      },
      {
        id: "gd-languages",
        name: "Programming Languages",
        description:
          "Master C/C++ (Unreal/Native), C# (Unity), GDScript (Godot), or languages like Rust and Python.",
        done: false,
        resources: [
          {
            name: "C++ for Game Development",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=c%2B%2B+for+game+development",
          },
          {
            name: "C# Scripting in Unity",
            type: "Docs",
            url: "https://docs.unity3d.com/Manual/CreatingAndUsingScripts.html",
          },
        ],
      },
    ],
  },
  {
    id: "computer-graphics",
    title: "4. Computer Graphics",
    description:
      "Understand the rendering pipeline, lighting, shading, and texture mapping.",
    level: "Advanced",
    duration: "5 weeks",
    skills: [
      {
        id: "gd-graphics-pipeline",
        name: "Graphics Pipeline & Shaders",
        description:
          "Study Rasterization, Ray Tracing, Sampling, and the Rendering Equation.",
        done: false,
        resources: [
          {
            name: "The Graphics Pipeline",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=graphics+pipeline+explained",
          },
          {
            name: "Learn OpenGL: Rendering",
            type: "Docs",
            url: "https://learnopengl.com/",
          },
        ],
      },
      {
        id: "gd-lighting-shadows",
        name: "Lighting & Shadows",
        description:
          "Implement Shadow Maps, Cascaded shadows, and various Light Sources (Directional, Point, Spot).",
        done: false,
        resources: [
          {
            name: "Shadow Mapping Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=shadow+mapping+opengl",
          },
          {
            name: "Lighting Models",
            type: "Article",
            url: "https://learnopengl.com/Lighting/Basic-Lighting",
          },
        ],
      },
      {
        id: "gd-mapping",
        name: "Materials & Mapping",
        description:
          "Apply Diffuse and Specular reflections, Texture, Bump, Parallax, and Horizon mapping.",
        done: false,
        resources: [
          {
            name: "Normal and Parallax Mapping",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=normal+mapping+parallax+mapping",
          },
          {
            name: "Texture Mapping",
            type: "Docs",
            url: "https://en.wikipedia.org/wiki/Texture_mapping",
          },
        ],
      },
      {
        id: "gd-visibility",
        name: "Visibility & Occlusion",
        description:
          "Optimize rendering with Frustum Culling, Occluders, Clipping, Fog, and Polygon management.",
        done: false,
        resources: [
          {
            name: "Frustum Culling",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=frustum+culling+explained",
          },
          {
            name: "Occlusion Culling",
            type: "Article",
            url: "https://docs.unity3d.com/Manual/OcclusionCulling.html",
          },
        ],
      },
    ],
  },
  {
    id: "graphics-api",
    title: "5. Graphics API",
    description:
      "Communicate directly with the GPU using low-level graphics APIs and shading languages.",
    level: "Expert",
    duration: "4 weeks",
    skills: [
      {
        id: "gd-core-apis",
        name: "Core Graphics APIs",
        description:
          "Work with DirectX, OpenGL, Vulkan, WebGL, Metal, and OpenGL ES.",
        done: false,
        resources: [
          {
            name: "OpenGL vs Vulkan vs DirectX",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=opengl+vs+vulkan+vs+directx",
          },
          {
            name: "Vulkan Tutorial",
            type: "Docs",
            url: "https://vulkan-tutorial.com/",
          },
        ],
      },
      {
        id: "gd-shading-languages",
        name: "Shading Languages",
        description:
          "Write GPU code using HLSL, GLSL, and compile to intermediate representations like SPIR-V.",
        done: false,
        resources: [
          {
            name: "Intro to GLSL Shaders",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=intro+to+glsl+shaders",
          },
          {
            name: "The Book of Shaders",
            type: "Book",
            url: "https://thebookofshaders.com/",
          },
        ],
      },
    ],
  },
  {
    id: "game-ai",
    title: "6. Game AI",
    description:
      "Breathe life into NPCs and enemies using decision-making and learning algorithms.",
    level: "Advanced",
    duration: "3 weeks",
    skills: [
      {
        id: "gd-decision-making",
        name: "Decision Making",
        description:
          "Build AI logic using State Machines, Behavior Trees, Goal Oriented Behavior, and Fuzzy Logic.",
        done: false,
        resources: [
          {
            name: "Behavior Trees in Game AI",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=behavior+trees+game+ai",
          },
          {
            name: "Finite State Machines",
            type: "Article",
            url: "https://gameprogrammingpatterns.com/state.html",
          },
        ],
      },
      {
        id: "gd-movement",
        name: "Movement & Planning",
        description:
          "Implement Board Game AI, Minimax, Alpha-Beta Pruning, and Monte Carlo Tree Search (MCTS).",
        done: false,
        resources: [
          {
            name: "Minimax Algorithm Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=minimax+algorithm+explained",
          },
          {
            name: "Alpha-Beta Pruning",
            type: "Article",
            url: "https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning",
          },
        ],
      },
      {
        id: "gd-ai-learning",
        name: "AI Learning",
        description:
          "Explore Deep Learning, Reinforcement Learning, Artificial Neural Networks, and Decision Trees.",
        done: false,
        resources: [
          {
            name: "Reinforcement Learning in Games",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=reinforcement+learning+game+ai",
          },
          {
            name: "Machine Learning for Games",
            type: "Article",
            url: "https://unity.com/products/machine-learning-agents",
          },
        ],
      },
    ],
  },
  {
    id: "advanced-rendering",
    title: "7. Advanced Rendering",
    description:
      "Push the boundaries of visual fidelity with state-of-the-art rendering techniques.",
    level: "Expert",
    duration: "4 weeks",
    skills: [
      {
        id: "gd-pbr",
        name: "Physically-Based Rendering",
        description:
          "Master PBR concepts: Microsurface Scattering, Translucency, Conservation of Energy, and Metallicity.",
        done: false,
        resources: [
          {
            name: "What is PBR?",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=what+is+pbr+rendering",
          },
          {
            name: "Basic Theory of PBR",
            type: "Article",
            url: "https://marmoset.co/posts/basic-theory-of-physically-based-rendering/",
          },
        ],
      },
      {
        id: "gd-real-time-rt",
        name: "Real-time Ray Tracing",
        description:
          "Implement modern ray tracing using DirectX Ray Tracing (DXR), Vulkan Ray Tracing, or OptiX.",
        done: false,
        resources: [
          {
            name: "DirectX Raytracing (DXR) Intro",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=directx+raytracing+tutorial",
          },
          {
            name: "Vulkan Ray Tracing Tutorial",
            type: "Docs",
            url: "https://developer.nvidia.com/vulkan-turing",
          },
        ],
      },
    ],
  },
];
