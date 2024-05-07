const esbuild = require("esbuild");
const chokidar = require("chokidar");
const IS_WATCH_MODE = process.env.IS_WATCH_MODE;

const TARGET_ENTRIES = [
  {
    target: "es2020",
    entryPoints: ["client/client.ts"],
    outfile: "../client/client.js",
  },
];

const buildBundle = async () => {
  try {
    const baseOptions = {
      logLevel: "info",
      bundle: true,
      charset: "utf8",
      minifyWhitespace: true,
      absWorkingDir: process.cwd(),
    };
    for (const targetOpts of TARGET_ENTRIES) {
      const mergedOpts = { ...baseOptions, ...targetOpts };
      const { errors } = await esbuild.build(mergedOpts);
      if (errors.length) {
        console.error(`[ESBuild] Bundle failed with ${errors.length} errors`);
        process.exit(1);
      }
    }
  } catch (e) {
    console.log("[ESBuild] Build failed with error");
    console.error(e);
    process.exit(1);
  }
};

// buildBundle().catch(() => process.exit(1));
// One-liner for current directory
if (!IS_WATCH_MODE) {
  buildBundle().catch(() => process.exit(1));
} else {
  chokidar.watch(".", {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    
    ignored: /node_modules/,
  }).on("all", (event, path) => {
    buildBundle();
    console.log(event, path);
  });
}
