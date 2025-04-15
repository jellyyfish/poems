import fs from "node:fs";
import path from "node:path";

import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pretty from "pretty";

export default function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src")
    eleventyConfig.setIncludesDirectory("includes")
    eleventyConfig.addPassthroughCopy("src/font")
    eleventyConfig.addPassthroughCopy("src/photo")

    eleventyConfig.setOutputDirectory("srv/www")

    eleventyConfig.addPairedShortcode("verses", function(text) {
        return text
            .split("\n\n")
            .map((p) => `<p>${p.trim()}</p>\n`)
            .join("")
    })

    eleventyConfig.addAsyncShortcode("renderPhoto", async function (photoSlug, data={}) {
        let photoPath = `photo/${photoSlug}.jpg`
        if (fs.existsSync(path.join("./src", photoPath))) {
          return `<img
                class="photo"
                alt="{% block imgalt %}{% endblock %}" 
                src="/${photoPath}"
            >`;
        }
        return "";
      });

    eleventyConfig.addTransform("format", function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            return pretty(content)
		}
		return content
    })

    eleventyConfig.addPlugin(eleventyImageTransformPlugin)
}
