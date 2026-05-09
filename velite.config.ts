import { defineConfig, s } from "velite";
import { writeFileSync } from "fs";

const siteUrl = "https://tvdermeer.nl";
const today = new Date().toISOString().split("T")[0];

function generateSitemap(posts: Array<{ permalink: string; date: string; updated?: string }>) {
  const staticUrls = [
    { loc: `${siteUrl}/`, priority: "1.0", changefreq: "weekly", lastmod: today },
    { loc: `${siteUrl}/blog`, priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: `${siteUrl}/cv`, priority: "0.8", changefreq: "monthly", lastmod: today },
  ];

  const postUrls = posts.map((post) => ({
    loc: `${siteUrl}${post.permalink}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: post.updated ?? post.date,
  }));

  const allUrls = [...staticUrls, ...postUrls];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod ?? today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

function generateLlmsTxt(
  posts: Array<{ title: string; permalink: string; description: string; date: string }>
) {
  const postLines = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => `- [${post.title}](${siteUrl}${post.permalink}): ${post.description}`)
    .join("\n");

  return `# Thomas van der Meer

> Personal homepage and blog of Thomas van der Meer — writing about AI, NLP, data science, and golf.

## Pages

- [Homepage](${siteUrl}/): About me, my work in AI/ML, and passions.
- [CV / Resume](${siteUrl}/cv): Professional experience, education, and skills.
- [Blog](${siteUrl}/blog): All posts on AI, NLP, data science, and software engineering.

## Blog Posts

${postLines}

## Optional

- [LinkedIn](https://www.linkedin.com/in/tvdermeer/)
- [GitHub](https://github.com/tvdermeer)
`;
}

export default defineConfig({
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.slug("posts"),
          description: s.string().max(300),
          date: s.isodate(),
          updated: s.isodate().optional(),
          tags: s.array(s.string()).default([]),
          published: s.boolean().default(true),
          content: s.markdown(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/blog/${data.slug}`,
        })),
    },
  },
  complete(data) {
    const posts = (data.posts ?? []) as Array<{
      permalink: string;
      date: string;
      updated?: string;
      title: string;
      description: string;
    }>;

    writeFileSync("public/sitemap.xml", generateSitemap(posts));
    writeFileSync("public/llms.txt", generateLlmsTxt(posts));
  },
});
