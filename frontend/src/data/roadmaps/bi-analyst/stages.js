export const biAnalystStages = [
  {
    id: "bi-fundamentals",
    title: "1. Business & BI Fundamentals",
    description:
      "Understand the core purpose of Business Intelligence and how it drives value across different business functions.",
    level: "Beginner",
    duration: "2 weeks",
    skills: [
      {
        id: "bi-what-is",
        name: "Introduction to BI",
        description:
          "Learn what BI is, why it matters, and the difference between BI Analysts and Data Scientists.",
        done: false,
        resources: [
          {
            name: "What is Business Intelligence?",
            type: "Article",
            url: "https://www.cio.com/article/272365/business-intelligence-definition-and-solutions.html",
          },
          {
            name: "BI Analyst Role Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=what+does+a+bi+analyst+do",
          },
        ],
      },
      {
        id: "bi-operations",
        name: "BI Operations & KPIs",
        description:
          "Understand Strategic, Operational, and Tactical BI, and how to identify metrics and KPIs for Stakeholders.",
        done: false,
        resources: [
          {
            name: "Types of BI",
            type: "Article",
            url: "https://www.techtarget.com/searchbusinessanalytics/definition/business-intelligence-BI",
          },
          {
            name: "KPIs vs Metrics",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=kpi+vs+metrics+business+intelligence",
          },
        ],
      },
      {
        id: "bi-analysis-types",
        name: "Types of Data Analysis",
        description:
          "Learn the four main types: Descriptive, Diagnostic, Predictive, and Prescriptive analysis.",
        done: false,
        resources: [
          {
            name: "4 Types of Data Analytics",
            type: "Article",
            url: "https://online.hbs.edu/blog/post/types-of-data-analysis",
          },
          {
            name: "Descriptive vs Predictive Analytics",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=descriptive+vs+predictive+analytics",
          },
        ],
      },
    ],
  },
  {
    id: "bi-statistics",
    title: "2. Statistics for BI",
    description:
      "Build a strong mathematical foundation to interpret data accurately and avoid misleading conclusions.",
    level: "Intermediate",
    duration: "4 weeks",
    skills: [
      {
        id: "bi-data-types",
        name: "Variables & Data Types",
        description:
          "Understand Categorical vs Numerical, and Discrete vs Continuous variables.",
        done: false,
        resources: [
          {
            name: "Data Types in Statistics",
            type: "Article",
            url: "https://towardsdatascience.com/data-types-in-statistics-347e152e8bee",
          },
          {
            name: "Variables Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=categorical+vs+numerical+variables",
          },
        ],
      },
      {
        id: "bi-descriptive-stats",
        name: "Descriptive Statistics",
        description:
          "Master Central Tendency (Mean, Median, Mode) and Dispersion (Range, Variance, Standard Deviation, IQR).",
        done: false,
        resources: [
          {
            name: "Descriptive Statistics Crash Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=descriptive+statistics",
          },
          {
            name: "Central Tendency and Dispersion",
            type: "Article",
            url: "https://statisticsbyjim.com/basics/measures-central-tendency-mean-median-mode/",
          },
        ],
      },
      {
        id: "bi-inferential-stats",
        name: "Inferential Statistics",
        description:
          "Learn about Population vs Sample, Hypothesis Testing, p-values, Correlation vs Causation, and Regression Analysis.",
        done: false,
        resources: [
          {
            name: "Inferential Statistics Overview",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=inferential+statistics",
          },
          {
            name: "Hypothesis Testing Guide",
            type: "Article",
            url: "https://towardsdatascience.com/hypothesis-testing-in-machine-learning-using-python-a0dc89e169ce",
          },
        ],
      },
    ],
  },
  {
    id: "bi-data-concepts",
    title: "3. Data Ecosystem & Formats",
    description:
      "Understand where data comes from, how it is structured, and the various formats used in the industry.",
    level: "Beginner",
    duration: "2 weeks",
    skills: [
      {
        id: "bi-data-sources",
        name: "Data Sources & Types",
        description:
          "Identify data from Databases, APIs, Web, Cloud, and IoT. Differentiate between Structured, Unstructured, and Semi-structured data.",
        done: false,
        resources: [
          {
            name: "Structured vs Unstructured Data",
            type: "Article",
            url: "https://www.ibm.com/cloud/blog/structured-vs-unstructured-data",
          },
          {
            name: "Data Sources in BI",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=data+sources+in+business+intelligence",
          },
        ],
      },
      {
        id: "bi-data-formats",
        name: "Data Formats",
        description:
          "Work with standard formats like CSV, Excel, XML, and JSON.",
        done: false,
        resources: [
          {
            name: "CSV, JSON, and XML Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=csv+json+xml+differences",
          },
          {
            name: "Working with JSON in Data Analysis",
            type: "Article",
            url: "https://www.datacamp.com/tutorial/json-data-python",
          },
        ],
      },
    ],
  },
  {
    id: "bi-databases-sql",
    title: "4. Databases & SQL",
    description:
      "The most important technical skill for a BI Analyst: querying, filtering, and joining data from relational databases.",
    level: "Intermediate",
    duration: "4 weeks",
    skills: [
      {
        id: "bi-sql-basics",
        name: "SQL Fundamentals",
        description:
          "Learn basic queries, filtering, aggregation, and JOINs using PostgreSQL or MySQL.",
        done: false,
        resources: [
          {
            name: "SQL Tutorial for Beginners",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=sql+tutorial+for+beginners",
          },
          {
            name: "Mode Analytics SQL Tutorial",
            type: "Article",
            url: "https://mode.com/sql-tutorial/",
          },
        ],
      },
      {
        id: "bi-sql-advanced",
        name: "Advanced SQL",
        description:
          "Master Window Functions, CTEs, Subqueries, and query performance optimization.",
        done: false,
        resources: [
          {
            name: "Advanced SQL Tutorial",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=advanced+sql+tutorial",
          },
          {
            name: "SQL Window Functions",
            type: "Article",
            url: "https://www.postgresqltutorial.com/postgresql-window-function/",
          },
        ],
      },
    ],
  },
  {
    id: "bi-eda-prep",
    title: "5. Exploratory Data Analysis & Prep",
    description:
      "Clean, transform, and analyze raw data to prepare it for visualization and reporting.",
    level: "Intermediate",
    duration: "3 weeks",
    skills: [
      {
        id: "bi-data-cleaning",
        name: "Data Cleaning (EDA)",
        description:
          "Handle missing values, identify duplicates, and deal with outliers to ensure Data Quality (Accuracy, Completeness, Coherence).",
        done: false,
        resources: [
          {
            name: "Data Cleaning Best Practices",
            type: "Article",
            url: "https://towardsdatascience.com/the-ultimate-guide-to-data-cleaning-3969843991d4",
          },
          {
            name: "Exploratory Data Analysis Process",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=exploratory+data+analysis",
          },
        ],
      },
      {
        id: "bi-transformation",
        name: "Data Transformation",
        description:
          "Learn data transformation techniques, normalization vs denormalization, and calculated fields.",
        done: false,
        resources: [
          {
            name: "Data Transformation Techniques",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=data+transformation+in+bi",
          },
          {
            name: "Normalization Explained",
            type: "Article",
            url: "https://en.wikipedia.org/wiki/Database_normalization",
          },
        ],
      },
    ],
  },
  {
    id: "bi-visualization",
    title: "6. Data Visualization & Tools",
    description:
      "Turn numbers into compelling stories using industry-standard BI platforms and design principles.",
    level: "Advanced",
    duration: "4 weeks",
    skills: [
      {
        id: "bi-viz-fundamentals",
        name: "Visualization Design Principles",
        description:
          "Choose the right charts (Bar, Line, Scatter, Heatmap), understand Color Theory, Accessibility, and avoid Misleading Charts.",
        done: false,
        resources: [
          {
            name: "How to Choose the Right Chart",
            type: "Article",
            url: "https://infogram.com/page/choose-the-right-chart-data-visualization",
          },
          {
            name: "Data Storytelling Principles",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=data+storytelling+and+visualization",
          },
        ],
      },
      {
        id: "bi-platforms",
        name: "BI Platforms",
        description:
          "Master a primary BI tool like Power BI or Tableau. Understand alternatives like Looker and Qlik.",
        done: false,
        resources: [
          {
            name: "Power BI Full Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=power+bi+full+course",
          },
          {
            name: "Tableau vs Power BI",
            type: "Article",
            url: "https://www.datacamp.com/blog/power-bi-vs-tableau",
          },
        ],
      },
    ],
  },
  {
    id: "bi-architecture",
    title: "7. Data Architecture & ETL",
    description:
      "Understand how data flows from source systems into data warehouses for analysis.",
    level: "Expert",
    duration: "3 weeks",
    skills: [
      {
        id: "bi-warehousing",
        name: "Data Warehousing",
        description:
          "Learn the differences between Data Warehouses, Data Lakes, and Data Marts.",
        done: false,
        resources: [
          {
            name: "Data Warehouse vs Data Lake",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=data+warehouse+vs+data+lake",
          },
          {
            name: "Cloud BI Ecosystems",
            type: "Article",
            url: "https://aws.amazon.com/what-is/data-warehouse/",
          },
        ],
      },
      {
        id: "bi-modeling",
        name: "Data Modeling & ETL",
        description:
          "Understand Fact vs Dimension tables, Star and Snowflake schemas, and basic ETL (Extract, Transform, Load) pipelines.",
        done: false,
        resources: [
          {
            name: "Star Schema vs Snowflake Schema",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=star+schema+vs+snowflake+schema",
          },
          {
            name: "What is ETL?",
            type: "Article",
            url: "https://www.ibm.com/cloud/learn/etl",
          },
        ],
      },
    ],
  },
  {
    id: "bi-business-professional",
    title: "8. Business Strategy & Professional Skills",
    description:
      "Apply your technical skills to specific industries, manage stakeholders, and build your career.",
    level: "Expert",
    duration: "3 weeks",
    skills: [
      {
        id: "bi-business-applications",
        name: "Business Applications",
        description:
          "Apply analytics to Finance (Sales Performance), Marketing (Campaigns, CLV), Healthcare, Retail, and Manufacturing.",
        done: false,
        resources: [
          {
            name: "Marketing Analytics Guide",
            type: "Article",
            url: "https://hbr.org/2014/10/a-refresher-on-customer-lifetime-value",
          },
          {
            name: "Supply Chain Analytics",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=supply+chain+analytics",
          },
        ],
      },
      {
        id: "bi-soft-skills",
        name: "Stakeholder Management & Ethics",
        description:
          "Master Project Management, Critical Thinking, Presentation Design, Data Privacy, and Ethical Data Use.",
        done: false,
        resources: [
          {
            name: "Stakeholder Management for Analysts",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=stakeholder+management+data+analyst",
          },
          {
            name: "Data Ethics",
            type: "Article",
            url: "https://online.hbs.edu/blog/post/data-ethics",
          },
        ],
      },
    ],
  },
];
