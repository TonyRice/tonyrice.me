import React from "react";

type Skill = {
  category: string;
  items: string[];
  break?: boolean;
};

type WorkHistoryItem = {
  title: string;
  company: string;
  years: string;
  bullets: string[];
  break?: boolean;
};

type ContentWithBreak = {
  content: string;
  break?: boolean;
};

const config = {
  name: "Tony Rice",
  title: "Entrepreneur & Creator",
  location: "Beloit, Wisconsin",
  contact: {
    phone: "+1-608-571-2809",
    email: "tony@tonyrice.me",
    linkedin: "https://www.linkedin.com/in/iamtonyrice",
    website: "https://tonyrice.me"
  },
  summary: `Highly adaptable IT professional with a passion for solving problems. Proven ability to drive innovation and deliver results in fast-paced collaborative environments.`,
  qualifications: [
    { content: "12+ years of experience in IT and full-stack software engineering, leading the development and launch of multiple successful products." },
    { content: "Proven ability to lead technical teams, drive business outcomes, and adapt to diverse environments." },
    { content: "Highly Proficient in a wide range of technologies.", break: true }
  ] as ContentWithBreak[],
  accomplishments: [
    { content: "**Built and launched** the *world's first edible insect product with legal hemp-derived cannabinoids* (**Dusty Beetles**), including product, packaging, and brand—*sold the first product the same day the MVP was finished*." },
    { content: "**Architected and delivered** *Automately Cloud*, an **open-source distributed backend platform**, and *led its acquisition and integration into a legal tech company*." },
    { content: "**Scaled and operated multiple startups and e-commerce brands**, including *The Baked Potato Store* (**selling potatoes, bongs, and bags of bugs**) and *QuickStart.me* (**web-based phone and business platform**)." },
    { content: "**Rapidly prototyped and shipped MVPs** for startups, *landing first customers and iterating at startup speed*." },
    { content: "**Played a key role** in developing the *Universal Shopping Cart platform*, which contributed to **Rakuten's $1B acquisition of Ebates**." },
    { content: "**Led teams, managed infrastructure, and wore every hat** from founder to full-stack engineer, *thriving in fast-paced, ambiguous environments*." }
  ] as ContentWithBreak[],
  skills: [
    {
      category: "NETWORKING & IT",
      items: [
        "**15+ years:** *TCP/IP, DNS, HTTP, TLS/SSL, Server Deployment & Administration, Firewall Management, Virus Removal, Computer Repair, Site-to-Site VPN, Untangle, pFSense, OpenWRT*",
        "**7+ years:** *Network Wiring/Installation*"
      ]
    },
    {
      category: "BACKEND DEVELOPMENT",
      items: [
        "**12+ years:** *Web APIs (REST, JSON, XML, SOAP), Websockets*",
        "**4-10+ years:** *Express.js, Routing, Spring Boot*",
        "**3+ years:** *NestJS, Ruby on Rails, Laravel, Vendure*"
      ],
      break: true
    },
    {
      category: "DEVOPS/CLOUD",
      items: [
        "**15+ years:** *VMWare/VSphere, Openstack, Rackspace*",
        "**4-10+ years:** *Docker, Kubernetes, Amazon Web Services (EC2, S3, VPC), OVH, Chef, Capistrano, Puppet*"
      ]
    },
    {
      category: "AI & LLMS",
      items: [
        "**2+ Years:** *OpenAI, Prompt Engineering, ChatGPT, Google Bard/Gemini, Multi-Modal Development*",
        "**1+ Years:** *Azure OpenAI*"
      ]
    },
    {
      category: "TOOLS & TECHNOLOGIES",
      items: [
        "**12+ years:** *Git, Gitlab, Github*",
        "**4-10+ years:** *Intellij Idea, VSCode, Todoist, Notion*"
      ]
    },
    {
      category: "PROGRAMMING LANGUAGES",
      items: [
        "**12+ Years:** *Javascript, HTML, CSS, PHP*",
        "**4-10+ Years:** *NodeJS, Node APIs, Typescript, Java, Python, Bash*",
        "**1+ Years:** *Ruby, C#, Go/Golang, Lua*"
      ]
    },
    {
      category: "FRONTEND DEVELOPMENT",
      items: [
        "**4-10+ Years:** *Angular/AngularJS, React/ReactJS, Handlebars.js, templating, CSS*",
        "**1-4 Years:** *Laravel, Vue.js, Next.js, Webpack, Gatsby, Bootstrap, Meteor*"
      ]
    },
    {
      category: "DATABASE/CACHING",
      items: [
        "**12+ years:** *MySQL/MariaDB, SQLite, redis*",
        "**4-10+ years:** *MongoDB, DynamoDB, Hazelcast, NoSQL, PostgresSQL, Elastisearch*",
        "**2+ years:** *TypeORM*"
      ]
    },
    {
      category: "APIS & SERVICES",
      items: [
        "**10+ years:** *Twilio, Stripe*",
        "**4-8+ years:** *Cloudflare API, Shopify API, Slack API, Plivo, IFTTT, Zapier*",
        "**1-3+ years:** *Discord, PayPal, Make.com*"
      ]
    },
    {
      category: "CMS & WEB PLATFORMS",
      items: [
        "**13+ years:** *Wordpress, Custom CMS*",
        "**4-10+ years:** *Ghost CMS, Shopify*"
      ]
    },
    {
      category: "OPERATING SYSTEMS",
      items: [
        "**14+ years:** *Linux, Ubuntu Server, Debian, Windows Server 2008, Windows Server 2012*",
        "**4-10+ years:** *Android, Mac OS X*"
      ]
    },
    {
      category: "VOIP & TELEPHONY",
      items: [
        "**2+ years:** *FreePBX, Asterisk, Grandstream VoIP Deployment*"
      ]
    },
    {
      category: "MOBILE DEVELOPMENT",
      items: [
        "**2+ Years:** *Basic4Droid/B4X*",
        "**1+ Years:** *Apache Cordova, React Native*"
      ]
    }
  ] as Skill[],
  workHistory: [
    {
      title: "Founder & Lead Architect",
      company: "Dusty Beetles (Hybrid)",
      years: "2022-2024",
      bullets: [
        "**Built the entire MVP** for the startup in *less than 48 hours*—*sold the first product the same day the prototype was done*",
        "**Designed the packaging, the product, and the brand** for the *world's first edible insect product with legal hemp-derived cannabinoids*",
        "**Managed infra, product, and brand presence**; got *Blind Fury (the BET rapper)* to try them"
      ]
    },
    {
      title: "IT & Project Management",
      company: "Freelance Work (Hybrid)",
      years: "2012-2022",
      bullets: [
        "**Crafted various solutions**, including *CRM integrations, brand imaging, and content marketing strategies*",
        "**Collaborated on various projects and solutions** with a *wide range of clients*"
      ],
      break:true
    },
    {
      title: "Full-stack Software Engineer",
      company: "Catsy (Remote)",
      years: "2021",
      bullets: [
        "**Collaborated with the founder** to *rapidly prototype MVPs*, increasing client acquisition",
        "**Ensured the quality and functionality** of prototypes through *rigorous testing*"
      ]
    },
    {
      title: "Full-Stack Software Engineer",
      company: "Artful Home (Hybrid)",
      years: "2020-2021",
      bullets: [
        "**Streamlined workflows** by *refactoring legacy tools and developing automation scripts*",
        "**Developed an HTML templating engine**, reducing marketing email production time by *90%*",
        "**Troubleshooted and resolved a critical call center issue**, restoring service availability"
      ]
    },
    {
      title: "Full-stack Software Engineer",
      company: "Storyscript (Remote)",
      years: "2019-2020",
      bullets: [
        "**Accelerated the development** of the *Storyscript Runtime* by *implementing key features*",
        "**Collaborated with a cross-functional team** to ensure the ongoing development of backend components"
      ]
    },
    {
      title: "Full-stack Software Engineer",
      company: "Breezy HR (Remote)",
      years: "2018-2019",
      bullets: [
        "**Enhanced platform functionality and reliability** by *resolving bugs and developing partner integrations*",
        "**Supported sales efforts** by providing *technical expertise on client calls*",
        "**Ensured code quality and security** through *proactive vulnerability identification*"
      ]
    },
    {
      title: "Founder & Full-stack Software Engineer",
      company: "The Baked Potato Store",
      years: "2018-2019",
      bullets: [
        "**Scaled an online store** selling *potatoes, bongs, and bags of bugs*",
        "**Expanded the product line** and made some *weird but wonderful partnerships*"
      ],
      break: true
    },
    {
      title: "Full-stack Software Engineer",
      company: "Two Tap (Remote)",
      years: "2018",
      bullets: [
        "**Improved platform architecture and functionality** by providing *industry insights and technical recommendations*"
      ]
    },
    {
      title: "Full-stack Software Engineer",
      company: "Clause (Remote)",
      years: "2017",
      bullets: [
        "**Oversaw the successful acquisition** of *Automately Cloud*",
        "**Advised on the development** of *Clause's Legal Tech platform*, optimizing performance and *migrating Automately Cloud*"
      ]
    },
    {
      title: "Founder & Lead Architect",
      company: "Automately Cloud",
      years: "2014-2017",
      bullets: [
        "**Architected Automately Core**, an *open-source distributed backend platform*",
        "**Developed the frontend, backend, and platform tooling**"
      ]
    },
    {
      title: "Software Engineer",
      company: "Fatwallet/Ebates (Hybrid)",
      years: "2013-2017",
      bullets: [
        "**Developed web automation solutions** to *improve checkout processes* for various merchants",
        "**Scaled the Universal Shopping Cart**, streamlining *mobile commerce into a unified checkout experience*",
        "**Helped lead PCI compliance initiatives** for the software development lifecycle"
      ]
    },
    {
      title: "Founder & Lead Architect",
      company: "QuickStart.me",
      years: "2012-2013",
      bullets: [
        "**Co-founded QuickStart.me**, developing a *web application for business record-keeping and a web-based phone system*",
        "**Connected directly with customers** to *troubleshoot issues and deploy new features*"
      ]
    },
    {
      title: "Founder & Lead Architect",
      company: "SecTitan",
      years: "2011-2013",
      bullets: [
        "**Developed a customizable reverse-proxy solution** for web applications",
        "**Provided security testing** for *public facing web applications*"
      ],
      break: true
    },
    {
      title: "Owner & Manager",
      company: "Bestellen Software, LLC",
      years: "2011-2017",
      bullets: [
        "**Co-founded Bestellen Software** during my final year high school, providing *IT services to businesses and residents*",
        "**Developed custom web applications**, focusing on *streamlined operations and secure data management*",
        "**Managed cloud infrastructure and maintained physical networks**"
      ]
    },
    {
      title: "IT Assistant",
      company: "School District of Beloit",
      years: "2011",
      bullets: [
        "**Worked as an IT assistant** helping *diagnose printers and other IT related tasks*"
      ]
    },
    {
      title: "Founder & IT Support",
      company: "GBHTech",
      years: "2009-2010",
      bullets: [
        "**Started IT Support company** before I graduated high-school",
        "**Managed Windows Server, ESX Servers, Removed Viruses and Installed OSes**",
        "**Provided direct customer service** to over *10+ customers weekly*",
        "**Repaired computers for residents**"
      ]
    }
  ] as WorkHistoryItem[]
};

const ResumeContent: React.FC = () => {
  return (
    <>
      <div id="resume-content" style={{ margin: `0 auto`, maxWidth: `70ch`, padding: `2rem` }}>
        <img src="/faceshot.jpeg" alt="Tony Rice headshot" style={{ display: 'block', margin: '0 auto 1.5rem auto', width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
        <h1 data-testid="page-title">{config.name}</h1>
        <p>{config.title}</p>
        <p>{config.location}</p>
        <p>
          {config.contact.phone} | {config.contact.email} |{' '}
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/iamtonyrice</a> |{' '}
          <a href={config.contact.website} target="_blank" rel="noopener noreferrer">tonyrice.me</a>
        </p>
        <h2>Professional Summary</h2>
        <p>{config.summary}</p>
        <hr />
        <h2>Qualifications</h2>
        <ul>
          {config.qualifications.map((q, i) => (
            <li key={i}>
              {q.content}
              {q.break && <div className="page-break" />}
            </li>
          ))}
        </ul>
        <hr />
        <h2>Key Accomplishments</h2>
        <ul>
          {config.accomplishments.map((a, i) => (
            <li key={i}>
              <span dangerouslySetInnerHTML={{ __html: a.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }} />
              {a.break && <div className="page-break" />}
            </li>
          ))}
        </ul>
        <hr />
        <h2>Skills</h2>
        {config.skills.map((skill, i) => (
          <React.Fragment key={i}>
            <div style={{ marginBottom: '1rem' }}>
              <b>{skill.category}</b>
              <ul>
                {skill.items.map((item, j) => (
                  <li key={j}><span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }} /></li>
                ))}
              </ul>
            </div>
            {skill.break && <div className="page-break" />}
          </React.Fragment>
        ))}
        <hr />
        <h2>Work History</h2>
        {config.workHistory.map((job, i) => (
          <React.Fragment key={i}>
            <div style={{ marginBottom: '1.5rem' }}>
              <b>{job.title}</b> | <b>{job.company}</b> | <i>{job.years}</i>
              <ul>
                {job.bullets.map((b, j) => (
                  <li key={j}><span dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }} /></li>
                ))}
              </ul>
            </div>
            {job.break && <div className="page-break" />}
          </React.Fragment>
        ))}
        {/* Page break only after the entire Work History section, if you want more pages after */}
        {/* <div className="page-break" /> */}
      </div>
      <p style={{ marginTop: '2.5rem', textAlign: 'center' }} className="no-print">
        <a href="#" onClick={e => { e.preventDefault(); window.print(); }} style={{ fontSize: '1rem', textDecoration: 'underline', color: '#222', cursor: 'pointer' }}>
          Download PDF / Print this resume
        </a>
      </p>
    </>
  );
};

export default ResumeContent;
