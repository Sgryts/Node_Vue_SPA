const { src, dest, series, parallel } = require("gulp");
const del = require("del");
const fs = require("fs");
const zip = require("gulp-zip");
const log = require("fancy-log");
var exec = require("child_process").exec;

const paths = {
  prod_build: "../prod-build",
  node_modules_src: "./node_modules/**/*",
  node_modules_dist: "../prod-build/node_modules/",
  server_src: "./dist/**/*",
  server_dist: "../prod-build",
  angular_src: "../client/dist/**/*",
  angular_dist: "../prod-build/",
  zipped_file_name: "angular-nodejs.zip",
};

function preClean() {
  log("removing the old files in the directory");
  return del(["../prod-build/**/*", "dist/**/*", "../client/dist/**/*"], {
    force: true,
  });
}

function postClean() {
  log("removing the old files in the directory");
  return del(["dist", "../client/dist"], {
    force: true,
  });
}

function createProdBuildFolder() {
  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log("📁  folder created:", dir);
  }

  return Promise.resolve("the value is ignored");
}

function buildNodeJSCodeTask(cb) {
  log("building NodeJS code into the directory");
  return exec("npm run build", function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  });
}

function copyNodeJSCodeTask() {
  log("copying NodeJS ./dist into the directory");
  return src(`${paths.server_src}`).pipe(dest(`${paths.server_dist}`));
}

function buildAngularCodeTask(cb) {
  log("building Angular code into the directory");
  return exec("cd ../client && npm run build", function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  });
}

function copyAngularCodeTask() {
  log("copying Angular code into the directory");
  return src(`${paths.angular_src}`).pipe(dest(`${paths.angular_dist}`));
}

function copyNodeModulesTask() {
  log("copying Node Modules into the directory");
  return src(`${paths.node_modules_src}`).pipe(
    dest(`${paths.node_modules_dist}`)
  );
}

function zippingTask() {
  log("zipping the code ");
  return src(`${paths.prod_build}/**`)
    .pipe(zip(`${paths.zipped_file_name}`))
    .pipe(dest(`${paths.prod_build}`));
}

exports.default = series(
  preClean,
  createProdBuildFolder,
  parallel(buildNodeJSCodeTask, buildAngularCodeTask),
  parallel(copyNodeJSCodeTask, copyAngularCodeTask),
  // zippingTask,
  postClean
);
