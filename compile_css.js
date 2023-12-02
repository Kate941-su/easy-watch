const sass = require("node-sass");
const fs = require("fs");

const result = sass.renderSync({
    file: "css/style.scss",
    outputStyle: "compressed"
});

fs.writeFileSync("css/style.css", result.css);