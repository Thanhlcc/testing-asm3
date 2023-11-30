const { Builder, Key, By } = require('selenium-webdriver');
const should = require('chai').should();
const describe = require('mocha').describe;

describe('Test login', function () {
	it('Login successfully', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();
		// go to the application
		await driver.get('https://school.moodledemo.net/login/index.php');
		// add a new todo
		var username = driver.findElement(By.name('username'))
		var password = driver.findElement(By.name('password'))
		// var button = driver.findElement(By.id('loginbtn'))
		// await username.sendKeys('student', Key.RETURN)
		// await password.sendKeys('moodle', Key.RETURN)
		// await button.click();
			// .findElement(By.id('username'))
		username.sendKeys('student', Key.TAB)
			// .findElement(By.id('password'))
		password.sendKeys('moodle', Key.RETURN)
			// .findElement(By.id('loginbtn'))
			// .click()
		// get new page
		// let new_driver = await new Builder().forBrowser('chrome').build()
		// await driver.navigate('https://school.moodledemo.net/my/courses.php')
		// url = await driver.getCurrentUrl()
		// alert(url)
		await driver.navigate('https://school.moodledemo.net/my/courses.php')	
		const textContent = await driver
			.findElement(By.id('instance-472-header'))
			.getText();
		// assert the value of the newly added todo
		textContent.should.equal('Course overview');
		driver.quit();
	});
});

// describe('Add todo tests', function () {
// 	it('Successfully adds a todo to application', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('MicrosoftEdge').build();
// 		// go to the application
// 		await driver.get('https://lambdatest.github.io/sample-todo-app/');
// 		// add a new todo
// 		await driver
// 			.findElement(By.id('sampletodotext'))
// 			.sendKeys('Learn Selenium', Key.RETURN);
// 		// get the value of the last element in the list
// 		const textContent = await driver
// 			.findElement(By.xpath('//li[last()]'))
// 			.getText();
// 		// assert the value of the newly added todo
// 		textContent.should.equal('Learn Selenium');
// 		driver.quit();
// 	});
// });
