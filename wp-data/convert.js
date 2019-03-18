const path = require("path");
const fs = require("fs");

const inputDir = "json";
const outputDir = "../src/posts";

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
    .map(i => i.replace("_новый-размер", ""));

  const mdResult = convertToMd(post, postImages);

  const postDir = path.join(outputDir, post.post_name);

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir);
  }

  for (const postImage of postImages) {
    const imagePath = path.join(outputDir, postImage);

    if (fs.existsSync(imagePath)) {
      const postImagePath = path.join(postDir, path.basename(imagePath));
      fs.renameSync(imagePath, postImagePath);
    } else {
      console.error(`not_found:${imagePath}`);
    }
  }

  fs.writeFileSync(path.join(postDir, `${post.post_name}.md`), mdResult);
});

function getPostThumbnailMeta(postId) {
  const postMeta = postsMeta.filter(pm => pm.post_id === postId);
  return postMeta.filter(pm => pm.meta_key === "_thumbnail_id");
}

function convertToMd(post, images) {
  const imageNames = images.map(imagePath => path.basename(imagePath));
  return mdTemplate
    .replace("{title}", post.post_title)
    .replace("{title_image}", imageNames[0])
    .replace("{post_name}", post.post_name)
    .replace("{post_content}", post.post_content)
    .replace("{ post_images }", imageNames.map(i => `\r\n - "${i}"`).join(""))
    .replace("{date}", post.post_date);
}
