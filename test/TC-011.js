const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('search_course', function () {
	// this.timeout(30000)
	let driver;
	let vars;
	beforeEach(async function () {
		driver = await new Builder().forBrowser('chrome').build();
		vars = {};
	});
	afterEach(async function () {
		await driver.quit();
	});
	it('search_course', async function (done) {
		await driver.get('https://school.moodledemo.net/my/courses.php');
		await driver.manage().window().setRect({ width: 1096, height: 700 });
		await driver.findElement(By.linkText('Log in')).click();
		await driver.findElement(By.id('username')).sendKeys('teacher');
		await driver.findElement(By.id('password')).click();
		await driver.findElement(By.id('password')).sendKeys('moodle');
		// await new Promise((resolve) => setTimeout(resolve, 100));
		await driver.findElement(By.id('password')).sendKeys(Key.ENTER);
		// await new Promise((resolve) => setTimeout(resolve, 100));
		await driver.findElement(By.name('search')).click();
		// await new Promise((resolve) => setTimeout(resolve, 1000));
		await driver.findElement(By.name('search')).sendKeys('mount');
		// {
		//   const element = await driver.findElement(By.css("#displaydropdown > span"))
		//   await driver.actions({ bridge: true }).moveToElement(element).perform()
		// }
		{
			const element = await driver.findElement(By.CSS_SELECTOR, 'body');
			await driver
				.actions({ bridge: true })
				.moveToElement(element, 0, 0)
				.perform();
		}
		await driver.findElement(By.css('#sortingdropdown > span')).click();
		await driver.findElement(By.linkText('Sort by last accessed')).click();
		{
			const element = await driver.findElement(
				By.css('.card:nth-child(2) > a > .card-img')
			);
			await driver
				.actions({ bridge: true })
				.moveToElement(element)
				.perform();
		}
		done();
	});
});
