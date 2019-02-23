const path = require("path");
const fs = require("fs");

const inputDir = "json";
const outputDir = "md";

const postsFie = path.join(inputDir, "posts.json");
const postsMetaFile = path.join(inputDir, "postmeta.json");
const attachmentsFile = path.join(inputDir, "attachments.json");

const posts = JSON.parse(fs.readFileSync(postsFie, "utf8"));
const postsMeta = JSON.parse(fs.readFileSync(postsMetaFile, "utf8"));
const attachments = JSON.parse(fs.readFileSync(attachmentsFile, "utf8"));

const mdTemplateFile = "index.md";
const mdTemplate = fs.readFileSync(mdTemplateFile, "utf8");

posts.forEach(post => {
  const postAttachments = attachments.filter(a => a.post_parent === post.ID);

  const postImages = postAttachments
    .map(a => a.guid)
    .map(i => i.replace("http://thaitrip.od.ua/wp-content/uploads", "."))
    .map(i => `\r\n\t- "${i}"`);

  const mdResult = convertToMd(post, postImages);

  fs.writeFileSync(path.join(outputDir, `${post.post_name}.md`), mdResult);
});

function getPostThumbnailMeta(postId) {
  const postMeta = postsMeta.filter(pm => pm.post_id === postId);
  return postMeta.filter(pm => pm.meta_key === "_thumbnail_id");
}

function convertToMd(post, images) {
  return mdTemplate
    .replace("{title}", post.post_title)
    .replace("{title_image}", images[0])
    .replace("{post_name}", post.post_name)
    .replace("{post_content}", post.post_content)
    .replace("{ post_images }", images.join(""))
    .replace("{date}", post.post_date);
}
