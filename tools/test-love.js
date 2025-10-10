// Quick test script to run calculateLoveByNames from the project.
const path = require("path");
const calc = require(path.join(
  __dirname,
  "..",
  "src",
  "utils",
  "loveCalculator.ts"
));

// The module is TypeScript; require won't parse it. Instead, run node with ts-node or just replicate logic here.
console.log(
  "This script is a placeholder. To test the function use the app UI or run the project with npm run dev."
);
