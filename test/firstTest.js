const { Builder, Key, By } = require('selenium-webdriver');
const should = require('chai').should();
const describe = require('mocha').describe;

describe('Add todo tests', function () {
	it('Successfully adds a todo to application', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();
		// go to the application
		await driver.get('https://lambdatest.github.io/sample-todo-app/');
		// add a new todo
		await driver
			.findElement(By.id('sampletodotext'))
			.sendKeys('Learn Selenium', Key.RETURN);
		// get the value of the last element in the list
		const textContent = await driver
			.findElement(By.xpath('//li[last()]'))
			.getText();
		// assert the value of the newly added todo
		textContent.should.equal('Learn Selenium');
		// driver.quit();
	});
});
