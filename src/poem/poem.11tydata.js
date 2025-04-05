export default {
	eleventyComputed: {
        glyph: (data) => {
            return data.page.fileSlug
                .split("-")
                .reverse()
                .join("-")
        }
    }
};
