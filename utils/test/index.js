const { By, Key, until } = require('selenium-webdriver');
require('dotenv').config();
exports.login = async function (driver, role) {
	if (typeof role !== 'string') throw new Error('role must be a string');
	await driver.get(process.env.login_url);
	await driver.findElement(By.id('username')).clear();
	await driver
		.findElement(By.id('username'))
		.sendKeys(role, Key.TAB, process.env.login_password, Key.ENTER);
};

exports.logout = async function (driver) {
	if (!driver) throw Error('Driver cannot be undefined');
	await driver
		.wait(until.elementLocated(By.css("a[id = 'user-menu-toggle']")), 3000)
		.click();
	await driver
		.wait(
			until.elementLocated(By.xpath("//a[contains(text(),'Log out')]")),
			3000
		)
		.click();
};
