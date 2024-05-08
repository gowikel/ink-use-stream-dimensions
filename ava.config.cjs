module.exports = {
  typescript: {
    rewritePaths: {
      "src/": "build/esm/",
    },
    compile: "tsc",
    extensions: ["ts", "tsx"],
  },
}
