const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("youtubeEmbed", (url) => {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  });
  eleventyConfig.addCollection("sections", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: JSON.parse(fs.readFileSync(path.join(__dirname, "src/_data/site.json"))).pathPrefix || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
