#!/usr/bin/env node
var fs = require("graceful-fs");
var pckg = require("../package.json");
var program = require("commander");
var blaster = require("../lib/index");

program
  .version(pckg.version)
  .usage("[options] svg-font.svg outputDir")
  .option(
    "-i, --icons <icon-refs>",
    "Limit the output to the selected icons. Icons can be provided with their unicode value or the full reference",
    function(val) {
      return val ? val.split(",") : [];
    }
  )
  .option(
    "-p, --png <heightInPx>",
    "Include this to generate PNG files. Please note you will need to have an executable binary in your path for 'batik-rasterizer'",
    parseInt
  )
  .option(
    "-c, --color <colorcode>",
    "Set the color of icons in the output (relevant mainly for PNG files)"
  )
  .parse(process.argv);

var svgFontFile = program.args[0], outputDir = program.args[1];
if (!svgFontFile || !outputDir) {
  program.help();
}

if (!fs.existsSync(svgFontFile)) {
  console.error("This provided SVG font file does not exist");
  process.exit();
}

var config = {
  icons: program.icons,
  png: program.png,
  color: program.color
};
blaster(svgFontFile, outputDir, config);
