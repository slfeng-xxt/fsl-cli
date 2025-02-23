#!/usr/bin/env node

const program = require("commander");
const { version } = require("../package.json");
const create = require("../lib/create");

program.version("1.0.0");

program
  .command("create <project-name>")
  .description(
    "created a new project with the given name and the given template"
  )
  .option('-p --preset <presetName>', 'Use a preset configuration')
  .action((packageName, options) => {
      const { preset } = options;
      create(packageName, options)
      console.log('%c 🥕 packageName: ', 'font-size:20px;background-color: #B03734;color:#fff;', packageName)
      console.log('%c 🥦 preset: ', 'font-size:20px;background-color: #42b983;color:#fff;', preset)
  })

program.parse(process.argv);

console.log("Hello World");
