/**
 * AI & Data Scientist Roadmap - Stages & Skills
 */

export const aiDataScientistStages = [
  {
    id: 1,
    title: "Mathematics",
    level: "Beginner",
    duration: "12 hrs",
    skills: [
      {
        id: "ds-s1",
        name: "Linear Algebra, Calculus, Mathematical Analysis",
        description: "Learn the core math that powers machine learning algorithms, focusing on matrix operations and derivatives.",
        done: false,
        resources: [
          { name: "Mathematics for Machine Learning", url: "https://imp.i384100.net/baqMYv", type: "Courses" }
        ],
      },
      {
        id: "ds-s2",
        name: "Differential Calculus",
        description: "Understand gradients and how models use derivatives to optimize error rates during training.",
        done: false,
        resources: [
          { name: "Coursera: Algebra and Differential Calculus", url: "https://imp.i384100.net/LX5M7M", type: "Course" }
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Statistics",
    level: "Intermediate",
    duration: "18 hrs",
    skills: [
      {
        id: "ds-s3",
        name: "Statistics, CLT",
        description: "Understand data distributions, variance, and the Central Limit Theorem.",
        done: false,
        resources: [
          { name: "Coursera: Introduction to Statistics", url: "https://imp.i384100.net/3eRv4v", type: "Course" }
        ],
      },
      {
        id: "ds-s4",
        name: "Hypothesis Testing",
        description: "Learn how to statistically prove if an observation is significant or just random noise.",
        done: false,
        resources: [
          { name: "Coursera: Hypothesis Testing", url: "https://imp.i384100.net/vN0JAA", type: "Course" }
        ],
      },
      {
        id: "ds-s5",
        name: "Probability and Sampling",
        description: "Master probability rules and sampling techniques to represent populations correctly.",
        done: false,
        resources: [
          { name: "Coursera: Probability and Statistics", url: "https://imp.i384100.net/daDM6Q", type: "Course" }
        ],
      },
      {
        id: "ds-s6",
        name: "AB Testing",
        description: "Design controlled experiments to compare two versions of a product and measure impact.",
        done: false,
        resources: [
          { name: "Practitioner's Guide to Statistical Tests", url: "https://vkteam.medium.com/practitioners-guide-to-statistical-tests-ed2d580ef04f#1e3b", type: "Article" },
          { name: "Step by Step Process for Planning an A/B Test", url: "https://medium.com/data-science/step-by-step-for-planning-an-a-b-test-ef3c93143c0b", type: "Article" }
        ],
      },
      {
        id: "ds-s7",
        name: "Increasing Test Sensitivity",
        description: "Learn advanced techniques like CUPED to reduce variance and detect smaller effects in experiments.",
        done: false,
        resources: [
          { name: "Minimum Detectable Effect", url: "https://splitmetrics.com/resources/minimum-detectable-effect-mde/", type: "Article" },
          { name: "Paper: Improving Test Sensitivity", url: "https://kdd.org/kdd2016/papers/files/adp0945-xieA.pdf", type: "Paper" },
          { name: "Paper: Improving Sensitivity (CUPED)", url: "https://exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf", type: "Paper" },
          { name: "CUPED at Booking.com", url: "https://booking.ai/how-booking-com-increases-the-power-of-online-experiments-with-cuped-995d186fff1d", type: "Article" },
          { name: "Doordash: CUPAC", url: "https://doordash.engineering/2020/06/08/improving-experimental-power-through-control-using-predictions-as-covariate-cupac/", type: "Article" },
          { name: "Netflix: Stratification", url: "https://www.researchgate.net/publication/305997925_Improving_the_Sensitivity_of_Online_Controlled_Experiments_Case_Studies_at_Netflix", type: "Paper" }
        ],
      },
      {
        id: "ds-s8",
        name: "Ratio Metrics",
        description: "Properly analyze and calculate variance for metrics that are ratios (e.g., click-through rates).",
        done: false,
        resources: [
          { name: "Microsoft: Delta Method in Metric Analytics", url: "https://arxiv.org/pdf/1803.06336", type: "Paper" },
          { name: "Paper: Ratio Metrics", url: "https://stat.cmu.edu/~hseltman/files/ratio.pdf", type: "Paper" }
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Econometrics",
    level: "Advanced",
    duration: "14 hrs",
    skills: [
      {
        id: "ds-s9",
        name: "Pre-requisites of Econometrics",
        description: "Grasp the economic principles required to apply statistical methods to economic data.",
        done: false,
        resources: [
          { name: "Fundamentals of Econometrics", url: "https://bookdown.org/ts_robinson1994/10EconometricTheorems/", type: "Book" }
        ],
      },
      {
        id: "ds-s10",
        name: "Regression, Timeseries, Fitting Distributions",
        description: "Forecast future values (sales, weather) using historical sequential data models like ARIMA.",
        done: false,
        resources: [
          { name: "Intro to Econometrics", url: "https://academia.edu/33062577/Dougherty_Intro_to_Econometrics_4th_ed_small", type: "Book" },
          { name: "Coursera: Econometrics", url: "https://imp.i384100.net/k0krYL", type: "Course" },
          { name: "Kaggle: Learn Time Series", url: "https://www.kaggle.com/learn/time-series", type: "Course" },
          { name: "Kaggle: Time Series Basics", url: "https://kaggle.com/code/jagangupta/time-series-basics-exploring-traditional-ts#Hierarchical-time-series", type: "Tutorial" },
          { name: "ARIMA model for Time Series", url: "https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python", type: "Tutorial" },
          { name: "Time Series Models", url: "https://machinelearningmastery.com/time-series-forecasting-methods-in-python-cheat-sheet/", type: "Tutorial" },
          { name: "Forecasting Task with Solution", url: "https://github.com/stalkermustang/bcdc_ds_takehome", type: "OpenSource" },
          { name: "Coursera: Linear Regression", url: "https://imp.i384100.net/9g97Ke", type: "Course" }
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Coding",
    level: "Beginner",
    duration: "25 hrs",
    skills: [
      {
        id: "ds-s11",
        name: "Learn Python Programming Language",
        description: "Master the primary language of data science: syntax, loops, and object-oriented concepts.",
        done: false,
        resources: [
          { name: "Learn Python: Kaggle", url: "https://www.kaggle.com/learn/python", type: "Course" },
          { name: "Google's Python Class", url: "https://developers.google.com/edu/python", type: "Course" }
        ],
      },
      {
        id: "ds-s12",
        name: "Data Structures and Algorithms (Python)",
        description: "Write efficient code by understanding lists, dictionaries, trees, and time complexity.",
        done: false,
        resources: [
          { name: "Algorithmic Excercises", url: "https://leetcode.com/explore/learn/", type: "Tutorial + Challenges" },
          { name: "Study Plans - Leetcode", url: "https://leetcode.com/studyplan/", type: "Challenges" },
          { name: "Algorithms Specialization", url: "https://imp.i384100.net/5gqv4n", type: "Course" }
        ],
      },
      {
        id: "ds-s13",
        name: "Learn SQL",
        description: "Query, join, and aggregate data directly from relational databases.",
        done: false,
        resources: [
          { name: "SQL Tutorial", url: "https://sqltutorial.org/", type: "Course" }
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Exploratory Data Analysis",
    level: "Intermediate",
    duration: "16 hrs",
    skills: [
      {
        id: "ds-s14",
        name: "Data understanding, Data Analysis and Visualization",
        description: "Clean missing data and create charts to uncover trends using Pandas, Matplotlib, and Seaborn.",
        done: false,
        resources: [
          { name: "Exploratory Data Analysis with Python and Pandas", url: "https://imp.i384100.net/AWAv4R", type: "Course" },
          { name: "Exploratory Data Analysis for Machine Learning", url: "https://imp.i384100.net/GmQMLE", type: "Course" },
          { name: "Python for Data Visualization: Matplotlib & Seaborn", url: "https://imp.i384100.net/55xvzn", type: "Course" }
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Machine Learning",
    level: "Advanced",
    duration: "25 hrs",
    skills: [
      {
        id: "ds-s15",
        name: "Classic ML (Sup., Unsup.), Advanced ML (Ensembles, NNs)",
        description: "Implement supervised/unsupervised algorithms, ensemble methods (Random Forests), and evaluate metrics.",
        done: false,
        resources: [
          { name: "Open Machine Learning Course - Open Data Science", url: "https://mlcourse.ai/book/topic01/topic01_intro.html", type: "Course" },
          { name: "Machine Learning Specialization", url: "https://imp.i384100.net/oqGkrg", type: "Course" },
          { name: "Pattern Recognition & ML by Christopher m. Bishop", url: "https://microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf", type: "eBook" },
          { name: "GitHub repository with notes & code from the eBook above", url: "https://github.com/gerdm/prml", type: "GitHub" }
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Deep Learning",
    level: "Advanced",
    duration: "30 hrs",
    skills: [
      {
        id: "ds-s16",
        name: "Fully Connected, CNN, RNN, LSTM, Transformers, TL",
        description: "Build and train CNNs for images, RNNs/LSTMs for sequences, and Transformers for text.",
        done: false,
        resources: [
          { name: "Deep Learning Specialization", url: "https://imp.i384100.net/Wq9MV3", type: "Courses" },
          { name: "Deep Learning Book", url: "https://www.deeplearningbook.org/", type: "eBook" },
          { name: "Attention is all you need", url: "https://arxiv.org/pdf/1706.03762", type: "Paper" },
          { name: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", type: "Article" }
        ],
      },
    ],
  },
  {
    id: 8,
    title: "MLOps",
    level: "Expert",
    duration: "10 hrs",
    skills: [
      {
        id: "ds-s17",
        name: "Deployment Models, CI/CD",
        description: "Package models into APIs using Docker, and automate training pipelines for production.",
        done: false,
        resources: [
          { name: "MLOps Specialization", url: "https://imp.i384100.net/nLA5mx", type: "Courses" }
        ],
      },
    ],
  },
];

export default aiDataScientistStages;
