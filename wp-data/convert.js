const path = require("path");
const util = require("util");
const fs = require("fs");

const inputDir = "json";
const outputDir = "md";

const postsFie = path.join(inputDir, "posts.json");
const mdTemplateFile = "index.md";

const posts = JSON.parse(fs.readFileSync(postsFie, "utf8"));
const mdTemplate = fs.readFileSync(mdTemplateFile, "utf8");

const postsMd = posts.map(convertToMd);
// console.info(posts);

postsMd.forEach(postData => {
  const [post, mdResult] = postData;
  fs.writeFileSync(path.join(outputDir, `${post.post_name}.md`), mdResult);
});

function convertToMd(post) {
  return [post, mdTemplate];
}
