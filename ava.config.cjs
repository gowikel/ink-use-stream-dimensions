module.exports = {
  typescript: {
    rewritePaths: {
      "src/": "build/esm/",
    },
    compile: "tsc",
    extensions: ["ts", "tsx"],
  },
  files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
}
