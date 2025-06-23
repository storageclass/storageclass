import {execSync} from "child_process";
import walkSync from "walk-sync";
import path from "path";
import fs from "fs";

const sitemapPath = "public/sitemap.xml";

const staticPages = [{
  source: "src/pages/DriversPage.tsx",
  path: "/drivers"
}, {
  source: "src/pages/StorageClassPage.tsx",
  path: "/storage-class"
}, {
  source: "src/pages/SponsorsPage.tsx",
  path: "/sponsors"
}, {
  source: "src/pages/HomePage.tsx",
  path: "/"
}, {
  source: "src/pages/GlossaryIndexPage.tsx",
  path: "/glossary"
}];

function getGitTimestamp(path) {
  const response = execSync(`git log -1 --format="%aI" -- ${path}`, {encoding: "utf8"}).toString();
  return response.replaceAll("\n", "");
}

function getDynamicPages(basePath) {
  const pages = [];
  for (let file of walkSync(basePath, {directories: false})) {
    if (!file.endsWith(".md")) continue;
    const source = path.join(basePath, file)
    const uri = "/glossary/" + file.replace(".md", "");
    pages.push({
      source,
      path: uri,
    });
  }
  return pages;
}

const pages = [...staticPages, ...getDynamicPages("public/glossary")];

let sitemap = "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
for (let item of pages) {
  const timestamp = getGitTimestamp(item.source);
  sitemap += `<url>\n<loc>https://storageclass.info${item.path}</loc>\n<lastmod>${timestamp}</lastmod>\n</url>\n`
}
sitemap += "</urlset>\n";

if (fs.existsSync(sitemapPath)) {
  fs.unlinkSync(sitemapPath);
}

fs.writeFileSync(sitemapPath, sitemap);
