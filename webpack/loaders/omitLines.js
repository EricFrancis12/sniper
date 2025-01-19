const OMIT_LINE_PREFIX = "// @omit";

module.exports = function loader(source) {
    if (typeof source !== "string") {
        throw new Error(`expected string source type, but got: ${typeof source}`);
    }

    const lines = source.split("\n");
    const filteredLines = [];

    for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();
        if (trimmedLine.startsWith(OMIT_LINE_PREFIX)) {
            // Skip the line that starts with the prefix,
            // and the line directly after it.
            i++;
        } else {
            filteredLines.push(lines[i]);
        }
    }

    return filteredLines.join("\n");
}
