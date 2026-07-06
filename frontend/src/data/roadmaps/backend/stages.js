export const backendStages = [
  {
    id: "internet-languages",
    title: "1. Internet & Languages",
    description:
      "Understand how the internet works and pick a server-side programming language.",
    level: "Beginner",
    duration: "3 weeks",
    skills: [
      {
        id: "be-internet",
        name: "How the Internet Works",
        description:
          "Learn about HTTP, DNS, Domain Names, Hosting, and how Browsers work under the hood.",
        done: false,
        resources: [
          {
            name: "How the Internet Works",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=how+the+internet+works",
          },
          {
            name: "MDN: HTTP Basics",
            type: "Docs",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
          },
        ],
      },
      {
        id: "be-language",
        name: "Pick a Language",
        description:
          "Master a backend language: JavaScript (Node.js), Go, Python, Java, C#, or Rust.",
        done: false,
        resources: [
          {
            name: "Backend Languages Compared",
            type: "Article",
            url: "https://www.freecodecamp.org/news/what-is-the-best-programming-language-for-backend-web-development/",
          },
          {
            name: "Node.js Crash Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=nodejs+crash+course",
          },
        ],
      },
    ],
  },
  {
    id: "version-control",
    title: "2. Version Control",
    description:
      "Manage source code changes and collaborate with other developers.",
    level: "Beginner",
    duration: "1 week",
    skills: [
      {
        id: "be-git",
        name: "Git & VCS",
        description:
          "Learn branching, merging, pull requests, and Git commands for version control.",
        done: false,
        resources: [
          {
            name: "Git Tutorial for Beginners",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=git+tutorial+for+beginners",
          },
          {
            name: "Atlassian Git Tutorial",
            type: "Article",
            url: "https://www.atlassian.com/git/tutorials",
          },
        ],
      },
      {
        id: "be-repo-hosting",
        name: "Repository Hosting",
        description:
          "Work with cloud repository platforms like GitHub, GitLab, and Bitbucket.",
        done: false,
        resources: [
          {
            name: "GitHub Actions & Workflows",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=github+actions+tutorial",
          },
          {
            name: "GitHub Documentation",
            type: "Docs",
            url: "https://docs.github.com/en",
          },
        ],
      },
    ],
  },
  {
    id: "relational-databases",
    title: "3. Relational Databases",
    description:
      "Store and query structured data securely using Relational Database Management Systems.",
    level: "Intermediate",
    duration: "4 weeks",
    skills: [
      {
        id: "be-rdbms",
        name: "RDBMS Basics",
        description:
          "Master SQL using PostgreSQL, MySQL, MariaDB, MS SQL, or Oracle.",
        done: false,
        resources: [
          {
            name: "PostgreSQL Crash Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=postgresql+crash+course",
          },
          {
            name: "SQL Tutorial",
            type: "Article",
            url: "https://www.w3schools.com/sql/",
          },
        ],
      },
      {
        id: "be-db-concepts",
        name: "Advanced DB Concepts",
        description:
          "Learn ORMs, ACID properties, Transactions, Normalization, and the N+1 Problem.",
        done: false,
        resources: [
          {
            name: "Database Normalization",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=database+normalization",
          },
          {
            name: "ACID Properties Explained",
            type: "Article",
            url: "https://www.ibm.com/topics/acid-properties",
          },
        ],
      },
    ],
  },
  {
    id: "apis-caching",
    title: "4. APIs & Caching",
    description:
      "Build interfaces for clients to consume your data and optimize performance.",
    level: "Intermediate",
    duration: "4 weeks",
    skills: [
      {
        id: "be-apis",
        name: "API Architectures",
        description:
          "Design APIs using REST, JSON APIs, GraphQL, gRPC, and understand HATEOAS & Open API specs.",
        done: false,
        resources: [
          {
            name: "REST vs GraphQL vs gRPC",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=rest+vs+graphql+vs+grpc",
          },
          {
            name: "RESTful API Design",
            type: "Article",
            url: "https://restfulapi.net/",
          },
        ],
      },
      {
        id: "be-caching",
        name: "Caching Strategies",
        description:
          "Implement Server Side, Client Side, and CDN caching using tools like Redis and Memcached.",
        done: false,
        resources: [
          {
            name: "Redis Crash Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=redis+crash+course",
          },
          {
            name: "Caching System Design",
            type: "Article",
            url: "https://aws.amazon.com/caching/",
          },
        ],
      },
    ],
  },
  {
    id: "security-auth",
    title: "5. Security & Authentication",
    description:
      "Protect your APIs from malicious attacks and secure user identities.",
    level: "Advanced",
    duration: "3 weeks",
    skills: [
      {
        id: "be-web-security",
        name: "Web Security",
        description:
          "Defend against OWASP risks, configure HTTPS, SSL/TLS, CORS, and Content Security Policies.",
        done: false,
        resources: [
          {
            name: "OWASP Top 10 Explained",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=owasp+top+10",
          },
          {
            name: "Understanding CORS",
            type: "Article",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
          },
        ],
      },
      {
        id: "be-auth",
        name: "Authentication",
        description:
          "Implement JWT, OAuth, OpenID, SAML, Basic Auth, and Session/Cookie based Auth.",
        done: false,
        resources: [
          {
            name: "JWT vs Session Auth",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=jwt+vs+session+authentication",
          },
          {
            name: "OAuth 2.0 Guide",
            type: "Article",
            url: "https://oauth.net/2/",
          },
        ],
      },
    ],
  },
  {
    id: "testing-cicd",
    title: "6. Testing & CI/CD",
    description:
      "Automate the validation and deployment of your backend systems.",
    level: "Advanced",
    duration: "3 weeks",
    skills: [
      {
        id: "be-testing",
        name: "Testing Strategies",
        description:
          "Write Unit, Integration, and Functional tests to ensure code reliability.",
        done: false,
        resources: [
          {
            name: "Software Testing Types",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=unit+vs+integration+vs+functional+testing",
          },
          {
            name: "Jest Crash Course",
            type: "Article",
            url: "https://jestjs.io/docs/getting-started",
          },
        ],
      },
      {
        id: "be-cicd",
        name: "CI/CD Pipelines",
        description:
          "Build Continuous Integration and Delivery pipelines to automate code deployments.",
        done: false,
        resources: [
          {
            name: "What is CI/CD?",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=what+is+ci+cd",
          },
          {
            name: "GitHub Actions for CI/CD",
            type: "Article",
            url: "https://docs.github.com/en/actions",
          },
        ],
      },
    ],
  },
  {
    id: "architecture",
    title: "7. Architecture & Design",
    description:
      "Architect complex applications for maintainability and scalability.",
    level: "Expert",
    duration: "4 weeks",
    skills: [
      {
        id: "be-design-principles",
        name: "Design Principles",
        description:
          "Learn GOF Design Patterns, Domain Driven Design, TDD, CQRS, and Event Sourcing.",
        done: false,
        resources: [
          {
            name: "Design Patterns in Object Oriented Programming",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=gof+design+patterns",
          },
          {
            name: "Domain Driven Design",
            type: "Article",
            url: "https://martinfowler.com/bliki/DomainDrivenDesign.html",
          },
        ],
      },
      {
        id: "be-arch-patterns",
        name: "Architectural Patterns",
        description:
          "Compare Monoliths, Microservices, SOA, Serverless, and Service Mesh patterns.",
        done: false,
        resources: [
          {
            name: "Monolith vs Microservices",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=monolith+vs+microservices",
          },
          {
            name: "Twelve-Factor App Methodology",
            type: "Article",
            url: "https://12factor.net/",
          },
        ],
      },
    ],
  },
  {
    id: "infra-servers",
    title: "8. Infrastructure & Web Servers",
    description:
      "Host, run, and manage your backend applications securely in production.",
    level: "Expert",
    duration: "3 weeks",
    skills: [
      {
        id: "be-containers",
        name: "Containerization",
        description:
          "Package apps using Docker and LXC, and understand Virtualization vs Containers.",
        done: false,
        resources: [
          {
            name: "Docker in 100 Seconds",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=docker+in+100+seconds",
          },
          {
            name: "What are Containers?",
            type: "Article",
            url: "https://www.docker.com/resources/what-container/",
          },
        ],
      },
      {
        id: "be-web-servers",
        name: "Web Servers",
        description:
          "Configure reverse proxies, load balancers, and web servers using Nginx, Apache, or Caddy.",
        done: false,
        resources: [
          {
            name: "Nginx Crash Course",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=nginx+crash+course",
          },
          {
            name: "Reverse Proxies Explained",
            type: "Article",
            url: "https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/",
          },
        ],
      },
    ],
  },
  {
    id: "scaling-nosql",
    title: "9. Scaling & NoSQL",
    description:
      "Scale systems to handle millions of requests using distributed data systems.",
    level: "Expert",
    duration: "5 weeks",
    skills: [
      {
        id: "be-nosql",
        name: "NoSQL & Search Engines",
        description:
          "Utilize Document (MongoDB), Key-Value (DynamoDB), Graph (Neo4j), and Time Series databases. Use Elasticsearch/Solr.",
        done: false,
        resources: [
          {
            name: "SQL vs NoSQL",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=sql+vs+nosql",
          },
          {
            name: "Elasticsearch Crash Course",
            type: "Article",
            url: "https://www.elastic.co/what-is/elasticsearch",
          },
        ],
      },
      {
        id: "be-brokers",
        name: "Message Brokers",
        description:
          "Handle asynchronous tasks and event-driven architecture with RabbitMQ and Apache Kafka.",
        done: false,
        resources: [
          {
            name: "Kafka vs RabbitMQ",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=kafka+vs+rabbitmq",
          },
          {
            name: "Event-Driven Architecture",
            type: "Article",
            url: "https://aws.amazon.com/event-driven-architecture/",
          },
        ],
      },
      {
        id: "be-scaling",
        name: "Building for Scale",
        description:
          "Master Data Replication, Sharding, CAP Theorem, Graceful Degradation, Circuit Breakers, and Telemetry/Monitoring.",
        done: false,
        resources: [
          {
            name: "System Design: Scaling",
            type: "YouTube",
            url: "https://youtube.com/results?search_query=system+design+scaling",
          },
          {
            name: "CAP Theorem Explained",
            type: "Article",
            url: "https://en.wikipedia.org/wiki/CAP_theorem",
          },
        ],
      },
    ],
  },
];
