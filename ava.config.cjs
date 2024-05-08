module.exports = {
  typescript: {
    rewritePaths: {
      "src/": "build/",
    },
    compile: "tsc",
    extensions: ["ts", "tsx"],
  },
}
