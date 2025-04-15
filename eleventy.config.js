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

    eleventyConfig.addAsyncShortcode("glyphNav", async function (glyph) {
        let poems = this.ctx.collections.poem.toReversed();
        let glyphIndex = poems.findIndex((poem) => poem.data.glyph === glyph)
        if (glyphIndex < 0) { 
            return "&lt;-&gt;";
        }
        let previous = poems[glyphIndex - 1]
        let next = poems[glyphIndex + 1]
        let a = (data, label) => {
            let url = data !== undefined ? data.page.filePathStem : null
            return url != null ? `<a href="${url}">${label}</a>` : label
        }
        return `${a(previous, "&lt;")}-${a(next, "&gt;")}`;
    });

    eleventyConfig.addAsyncShortcode("renderPhoto", async function (photoSlug, alt, data={}) {
        let photoPath = `photo/${photoSlug}.jpg`
        if (fs.existsSync(path.join("./src", photoPath))) {
            return `<img
                class="photo"
                alt="${alt ?? ""}" 
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
