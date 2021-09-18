const { proccessVersion } = require("./helper");

const execTerminalCommand = (command) => {
  return new Promise((resolve, reject) => {
    if (!command) return reject("command not given");

    const { exec } = require("child_process");

    exec(command, (error, stdout, stderror) => {
      if (error) return reject(error);
      if (stderror) return reject(stderror);

      resolve(stdout.replace(/\n/, ""));
    });
  });
};

const checkNodeJSVersion = (options) => {
  return new Promise((resolve, reject) => {
    let node;
    let npm;

    /* istanbul ignore else */
    if (typeof options === "string") node = options;
    /* istanbul ignore else */
    if (typeof options === "object") {
      node = options.node && options.node.toString().replace(/v/gi, "");
      npm = options.npm && options.npm.toString().replace(/v/gi, "");
    }

    execTerminalCommand("node -v")
      .then((nodeVersion) => {
        execTerminalCommand("npm -v")
          .then((npmVersion) => {
            proccessVersion({ resolve, node, npm, nodeVersion, npmVersion });
          })
          .catch(() => {
            proccessVersion({ resolve, node, npm, nodeVersion });
          });
      })
      .catch(reject);
  });
};

module.exports = checkNodeJSVersion;
