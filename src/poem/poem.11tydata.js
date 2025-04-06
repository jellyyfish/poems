export default {
	eleventyComputed: {
        glyph: (data) => {
            return data.page.fileSlug
                .slice(2)
                .split("-")
                .reverse()
                .join("-")
        }
    }
};
