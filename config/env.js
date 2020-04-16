const configArgv = JSON.parse(process.env.npm_config_argv);
const original = configArgv.original.slice(1);
const stage = original[1] ? original[1].replace(/-/g, "") : "prod";
const requestHttp = original[2] ? original[2].replace(/-/g, "") : "0";
const distName = original[3] ? original[3].replace(/-/g, "") : "0";
const platform = original[4] ? original[4].replace(/-/g, "") : "0";

module.exports = {
  stage,
  requestHttp,
  platform,
  distName
};
