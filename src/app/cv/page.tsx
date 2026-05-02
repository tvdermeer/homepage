import Link from "next/link";
import { siteConfig } from "@/config/site";

const experiences = [
  {
    company: "Sogeti",
    role: "Senior Artificial Intelligence Specialist",
    period: "2020 – Present",
    bullets: [
      "Subject Matter Expert on Generative AI, providing technical leadership and guidance across the organization.",
      "Thought leadership and technical solutions for Agentic workflows with built-in governance and observability.",
      "Architected GenAI/RAG solutions (€50k–€300k), overseeing technical design, delivery, and governance.",
      "Led pre-sales efforts, created proposals, and mentored the next generation of Gen AI engineers.",
      "Designed, built and managed internal Azure AI platform and GCP VM instances for client applications and L&D.",
    ],
  },
  {
    company: "Rabobank (through Sogeti)",
    role: "Agentic AI Engineer",
    period: "Oct – Dec 2025",
    bullets: [
      "Applied technology lead for an offshore team building distributed agentic backend systems.",
      "Designed and implemented a Kafka event bus for distributed configuration management.",
      "Built scalable backend services using FastAPI and PostgreSQL.",
    ],
  },
  {
    company: "Gemeente Amsterdam (through Sogeti)",
    role: "Gen AI Engineer & Technical Governance Lead",
    period: "Mar – Jul 2025",
    bullets: [
      "Designed and built end-to-end observability and evaluation setup (Ragas) to monitor AI-specific risks for a RAG chatbot serving 350 users.",
      "Served as Technical Governance Lead: implemented control frameworks for municipal data compliance, privacy, and security.",
      "Deployed applications using Bicep/Azure Pipelines; managed infrastructure as code (IaC).",
    ],
  },
  {
    company: "ABN Amro (through Sogeti)",
    role: "Gen AI Engineer",
    period: "2023 – 2025",
    bullets: [
      "Built a company-wide reusable production RAG system, establishing evaluation standards via MLflow.",
      "Organised AI compliancy roundtables; defined actionable AI standards and anti-patterns for use cases across the enterprise.",
      "Designed and implemented enterprise platform capabilities for Gen AI; Azure platform engineering for cognitive and traditional ML.",
    ],
  },
  {
    company: "Hogeschool Utrecht (through Sogeti)",
    role: "Lecturer Machine Learning",
    period: "2022 – 2024",
    bullets: [
      "Taught two semesters on ML and Visualization; created curriculum for approachable and responsible ML.",
    ],
  },
  {
    company: "Justis (through Sogeti)",
    role: "Data Scientist",
    period: "2022 – 2023",
    bullets: [
      "Data analysis across departments; initiator of innovative LLM/RAG and sustainability tracks.",
    ],
  },
  {
    company: "Reclassering Nederland (through Sogeti)",
    role: "Data Scientist",
    period: "Jan – Sep 2022",
    bullets: [
      "Built NLP pipelines in SpaCy/Python processing millions of case documents — reducing runtime from 2 weeks to 2 days.",
      "Developed explainable document analysis tools and Streamlit visualisations for language model owners.",
    ],
  },
];

const education = [
  {
    institution: "Utrecht University",
    degree: "MSc Business Informatics",
    details: "Master thesis: adolescent interests analysis using BERT-like transformer language models",
    year: "2019 – 2020",
  },
  {
    institution: "Utrecht University",
    degree: "BSc Informatiekunde (Information Science)",
    details: "Entrepreneurship minor",
    year: "2014 – 2018",
  },
];

const skills = [
  {
    category: "Certificates",
    items: ["Databricks Generative AI Engineer Associate", "Azure AI Engineer (AI-102)"],
  },
  {
    category: "GenAI & Evaluation",
    items: ["Ragas", "MLflow", "LangGraph", "Azure AI SDK", "Hugging Face", "PyTorch", "SpaCy", "OpenAI"],
  },
  {
    category: "AI Governance",
    items: ["Guardrails implementation", "AI observability", "Automated compliance", "Control frameworks"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Azure", "GCP", "Terraform", "Bicep", "Docker", "Azure Pipelines", "GitHub Actions"],
  },
  {
    category: "Engineering",
    items: ["Python", "FastAPI", "PostgreSQL", "Bash"],
  },
  {
    category: "Languages",
    items: ["Dutch (Native)", "English (Fluent)"],
  },
];

export default function CVPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="mb-12 border-b border-[#5F8C6B]/15 pb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#E8F0E9]">Thomas van der Meer</h1>
        <p className="mt-2 text-lg text-[#5F8C6B]">
          Senior Gen AI Engineer | ML Governance & Evaluation Specialist
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#8FA89A]">
          <span>Amersfoort, Netherlands</span>
          <a href="mailto:Tvdermeer@gmail.com" className="hover:text-[#5F8C6B] transition-colors">
            Tvdermeer@gmail.com
          </a>
          <span>+31 6 20728126</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#8FA89A] hover:text-[#5F8C6B] transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#8FA89A] hover:text-[#5F8C6B] transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-[#E8F0E9]">Profile</h2>
        <p className="text-[#8FA89A] leading-relaxed">
          Senior Gen AI Engineer & Technical Governance Lead with a proven track record of architecting
          and delivering production-grade AI systems in highly regulated enterprise environments.
          Specialized in GenAI evaluation, monitoring, and responsible AI frameworks. Experience spans
          agentic systems, RAG platforms, LLM evaluation (Ragas, MLflow), and end-to-end observability
          setups. A trustworthy and innovative professional who remains composed under pressure and
          thrives on solving complex structural problems in a methodical way.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-[#E8F0E9]">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company + exp.period} className="border-l-2 border-[#5F8C6B]/15 pl-6">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <h3 className="text-lg font-semibold text-[#E8F0E9]">{exp.role}</h3>
                <span className="text-sm text-[#8FA89A]">{exp.period}</span>
              </div>
              <p className="mt-1 font-medium text-[#5F8C6B]">{exp.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-[#8FA89A]">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-[#E8F0E9]">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.degree} className="border-l-2 border-[#5F8C6B]/15 pl-6">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <h3 className="text-lg font-semibold text-[#E8F0E9]">{edu.degree}</h3>
                <span className="text-sm text-[#8FA89A]">{edu.year}</span>
              </div>
              <p className="mt-1 text-[#8FA89A]">{edu.institution}</p>
              <p className="mt-1 text-sm text-[#8FA89A]">{edu.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-[#E8F0E9]">Technical Skills</h2>
        <div className="space-y-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#8FA89A]">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-[#152119] px-3 py-1.5 text-sm font-medium text-[#E8F0E9] border border-[#5F8C6B]/15"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
