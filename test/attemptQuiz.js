// const { Builder, By, until } = require('selenium-webdriver');
// // const should = require('chai').should();
// const describe = require('mocha').describe;

// describe('Basic flow', function () {
// 	it('Successfully submited quiz', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('chrome').build();

// 		// go to the application
// 		await driver.get('https://school.moodledemo.net/login/index.php');

// 		// login to moodle
// 		var username = driver.findElement(By.name('username'))
// 		var password = driver.findElement(By.name('password'))
// 		var button = driver.findElement(By.id('loginbtn'))
// 		await username.sendKeys('student')
// 		await password.sendKeys('moodle')
// 		await button.click()

// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/course/view.php?id=69"]')))
// 		await button.click()

// 		await driver.executeScript('window.scrollTo(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight) * 0.65);')
// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/mod/quiz/view.php?id=978"]')))
// 		await driver.sleep(3000)
// 		await driver.actions().move({ origin: button }).perform()
// 		await button.click()

// 		button = await driver.findElement(By.css('button[id^=single_button]'))
// 		await button.click()

// 		try {
// 			button = await driver.findElement(By.id('id_submitbutton'))
// 			await button.click()
// 		}
// 		catch {}

// 		const options = ["23 percent of the time.", "Non-judgement", "take long, deep breaths.", "Spent some time each day for mindful contemplation and breathing.", "Keeping your past, present and future in mind all the time."]

// 		for (i in options) {
// 			button = await driver.findElement(By.xpath(`//p[contains(text(), "${options[i]}")]`))
// 			await button.click()
// 		}

// 		button = await driver.findElement(By.id("mod_quiz-next-nav"))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Submit all and finish")]'))
// 		await button.click()

// 		await driver.sleep(1000)

// 		button = await driver.findElement(By.css('button[data-action="save"]'))
// 		await button.click()

// 		// assert the saved changes value
// 		await driver.sleep(1000);
// 		const status = await driver.findElement(By.xpath('//td[contains(text(), "Finished")]'))
// 		const state = await status.getText()
// 		state.should.equal("Finished")
		
// 		driver.quit()
// 	});
// });

// describe('Alternative - Change answer', function () {
// 	it('Successfully submited quiz', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('chrome').build();

// 		// go to the application
// 		await driver.get('https://school.moodledemo.net/login/index.php');

// 		// login to moodle
// 		var username = driver.findElement(By.name('username'))
// 		var password = driver.findElement(By.name('password'))
// 		var button = driver.findElement(By.id('loginbtn'))
// 		await username.sendKeys('student')
// 		await password.sendKeys('moodle')
// 		await button.click()

// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/course/view.php?id=69"]')))
// 		await button.click()

// 		await driver.executeScript('window.scrollTo(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight) * 0.65);')
// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/mod/quiz/view.php?id=978"]')))
// 		await driver.sleep(3000)
// 		await driver.actions().move({ origin: button }).perform()
// 		await button.click()

// 		button = await driver.findElement(By.css('button[id^=single_button]'))
// 		await button.click()

// 		try {
// 			button = await driver.findElement(By.id('id_submitbutton'))
// 			await button.click()
// 		}
// 		catch {}

// 		const options = ["23 percent of the time.", "Non-judgement", "take long, deep breaths.", "Spent some time each day for mindful contemplation and breathing.", "Keeping your past, present and future in mind all the time."]

// 		for (i in options) {
// 			button = await driver.findElement(By.xpath(`//p[contains(text(), "${options[i]}")]`))
// 			await button.click()
// 		}

// 		button = await driver.findElement(By.id("mod_quiz-next-nav"))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Return to attempt")]'))
// 		await button.click()

// 		button = await driver.findElement(By.xpath(`//p[contains(text(), "forget to breathe altogether.")]`))
// 		await button.click()

// 		button = await driver.findElement(By.id("mod_quiz-next-nav"))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Submit all and finish")]'))
// 		await button.click()

// 		await driver.sleep(1000)

// 		button = await driver.findElement(By.css('button[data-action="save"]'))
// 		await button.click()

// 		// assert the saved changes value
// 		await driver.sleep(1000);
// 		const status = await driver.findElement(By.xpath('//td[contains(text(), "Finished")]'))
// 		const state = await status.getText()
// 		state.should.equal("Finished")
		
// 		driver.quit()
// 	});
// });

// describe('Alternative - Empty quesion', function () {
// 	it('Successfully submited quiz', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('chrome').build();

// 		// go to the application
// 		await driver.get('https://school.moodledemo.net/login/index.php');

// 		// login to moodle
// 		var username = driver.findElement(By.name('username'))
// 		var password = driver.findElement(By.name('password'))
// 		var button = driver.findElement(By.id('loginbtn'))
// 		await username.sendKeys('student')
// 		await password.sendKeys('moodle')
// 		await button.click()

// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/course/view.php?id=69"]')))
// 		await button.click()

// 		await driver.executeScript('window.scrollTo(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight) * 0.65);')
// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/mod/quiz/view.php?id=978"]')))
// 		await driver.sleep(3000)
// 		await driver.actions().move({ origin: button }).perform()
// 		await button.click()

// 		button = await driver.findElement(By.css('button[id^=single_button]'))
// 		await button.click()

// 		try {
// 			button = await driver.findElement(By.id('id_submitbutton'))
// 			await button.click()
// 		}
// 		catch {}

// 		const options = ["23 percent of the time.", "Non-judgement", "take long, deep breaths.", "Spent some time each day for mindful contemplation and breathing."]

// 		for (i in options) {
// 			button = await driver.findElement(By.xpath(`//p[contains(text(), "${options[i]}")]`))
// 			await button.click()
// 		}

// 		button = await driver.findElement(By.id("mod_quiz-next-nav"))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Submit all and finish")]'))
// 		await button.click()

// 		await driver.sleep(1000)
// 		button = await driver.findElement(By.css('button[data-action="cancel"]'))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Return to attempt")]'))
// 		await button.click()

// 		button = await driver.findElement(By.xpath(`//p[contains(text(), "Keeping your past, present and future in mind all the time.")]`))
// 		await button.click()

// 		button = await driver.findElement(By.id("mod_quiz-next-nav"))
// 		await button.click()

// 		button = await driver.findElement(By.xpath('//button[contains(text(), "Submit all and finish")]'))
// 		await button.click()

// 		await driver.sleep(1000)

// 		button = await driver.findElement(By.css('button[data-action="save"]'))
// 		await button.click()

// 		// assert the saved changes value
// 		await driver.sleep(1000);
// 		const status = await driver.findElement(By.xpath('//td[contains(text(), "Finished")]'))
// 		const state = await status.getText()
// 		state.should.equal("Finished")
		
// 		driver.quit()
// 	});
// });

// describe('Exception - Overdue quiz', function () {
// 	it('Successfully cancel attempt', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('chrome').build();

// 		// go to the application
// 		await driver.get('https://school.moodledemo.net/login/index.php');

// 		// login to moodle
// 		var username = driver.findElement(By.name('username'))
// 		var password = driver.findElement(By.name('password'))
// 		var button = driver.findElement(By.id('loginbtn'))
// 		await username.sendKeys('student')
// 		await password.sendKeys('moodle')
// 		await button.click()

// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/course/view.php?id=69"]')))
// 		await button.click()
		
// 		await driver.executeScript('window.scrollTo(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight) * 0.65);');
// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/mod/quiz/view.php?id=978"]')))
// 		await driver.sleep(3000)
// 		await driver.actions().move({ origin: button }).perform()
// 		await button.click()

// 		// assert the button
// 		button = await driver.findElement(By.css('button[id^=single_button]'))
// 		const name = await button.getText()
// 		name.should.equal(["Back to the course"])

// 		await driver.sleep(1000);
// 		await button.click()
		
// 		driver.quit()
// 	});
// });

// describe('Exception - Cancel quiz', function () {
// 	it('Successfully cancel attempt', async function () {
// 		// get the browser
// 		let driver = await new Builder().forBrowser('chrome').build();

// 		// go to the application
// 		await driver.get('https://school.moodledemo.net/login/index.php');

// 		// login to moodle
// 		var username = driver.findElement(By.name('username'))
// 		var password = driver.findElement(By.name('password'))
// 		var button = driver.findElement(By.id('loginbtn'))
// 		await username.sendKeys('student')
// 		await password.sendKeys('moodle')
// 		await button.click()

// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/course/view.php?id=69"]')))
// 		await button.click()

// 		await driver.executeScript('window.scrollTo(0, Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight) * 0.65);')
// 		button = await driver.wait(until.elementLocated(By.xpath('//a[@href="https://school.moodledemo.net/mod/quiz/view.php?id=978"]')))
// 		await driver.sleep(3000)
// 		await driver.actions().move({ origin: button }).perform()
// 		await button.click()

// 		button = await driver.findElement(By.css('button[id^=single_button]'))

// 		if (button.getText() != "Continue your attempt") {
// 			await button.click()
// 			button = await driver.findElement(By.id('id_cancel'))
// 			await button.click()
// 		}

// 		// assert the saved changes value
// 		await driver.sleep(1000);
// 		button = await driver.findElement(By.css('button[id^=single_button]'))
// 		const name = await button.getText()
// 		name.should.oneOf(["Re-attempt quiz", "Attempt quiz"])
		
// 		driver.quit()
// 	});
// });