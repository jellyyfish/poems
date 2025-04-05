import pretty from "pretty";

export default function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src")
    eleventyConfig.setIncludesDirectory("includes")
    eleventyConfig.addPassthroughCopy("src/font")

    eleventyConfig.setOutputDirectory("srv/www")

    eleventyConfig.addPairedShortcode("verses", function(text) {
        return text
            .split("\n\n")
            .map((p) => `<p>${p.trim()}</p>\n`)
            .join("")
    })

    eleventyConfig.addTransform("format", function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            return pretty(content)
		}

		return content;
    })
};
