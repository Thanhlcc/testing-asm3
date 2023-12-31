const { Builder, Key, By, error } = require('selenium-webdriver');
const should = require('chai').should();
const describe = require('mocha').describe;

describe('Basic flow', function () {
	it('Successfully edited profile', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();

		// go to the application
		await driver.get('https://school.moodledemo.net/login/index.php');

		// login to moodle
		var username = driver.findElement(By.name('username'))
		var password = driver.findElement(By.name('password'))
		var button = driver.findElement(By.id('loginbtn'))
		await username.sendKeys('teacher')
		await password.sendKeys('moodle')
		await button.click()

		button = driver.findElement(By.id('user-menu-toggle'))
		await button.click()

		button = driver.findElement(By.css('a[href="https://school.moodledemo.net/user/profile.php"]'))
		await button.click()

		button = driver.findElement(By.css('a[href^="https://school.moodledemo.net/user/edit.php?id"]'))
		await button.click()

		const firstname = await driver.findElement(By.xpath('//input[@id="id_firstname"]'));
		firstname.sendKeys('a')	
		await driver.sleep(1000);

		// Get the value of the data-initial-value attribute
		const new_name = await firstname.getAttribute('data-initial-value') + 'a';

		const last = await driver.findElement(By.xpath('//input[@id="id_lastname"]'))
		last.sendKeys('')
		await driver.sleep(1000);
		
		const lastname = await last.getAttribute('data-initial-value')
		const full_name = new_name + ' ' + lastname

		button = driver.findElement(By.id('id_submitbutton'))
		button.click()

		// assert the saved changes value
		await driver.sleep(1000);
		const new_username = await driver.findElement(By.xpath('//h1[@class="h2"]'))
		const change = await new_username.getText()
		
		change.should.equal(full_name)
		
		driver.quit()
		});
});

describe('Alternative - Empty required fields', function () {
	it('Successfully edited profile', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();

		// go to the application
		await driver.get('https://school.moodledemo.net/login/index.php');

		// login to moodle
		var username = driver.findElement(By.name('username'))
		var password = driver.findElement(By.name('password'))
		var button = driver.findElement(By.id('loginbtn'))
		await username.sendKeys('teacher')
		await password.sendKeys('moodle')
		await button.click()

		button = driver.findElement(By.id('user-menu-toggle'))
		await button.click()

		button = driver.findElement(By.css('a[href="https://school.moodledemo.net/user/profile.php"]'))
		await button.click()

		button = driver.findElement(By.css('a[href^="https://school.moodledemo.net/user/edit.php?id"]'))
		await button.click()

		const firstname = await driver.findElement(By.xpath('//input[@id="id_firstname"]'));
		firstname.sendKeys('a')	
		await driver.sleep(1000);

		// Get the value of the data-initial-value attribute
		const new_name = await firstname.getAttribute('data-initial-value') + 'a';

		const email = await driver.findElement(By.xpath('//input[@id="id_email"]'))
		email.sendKeys('')
		await driver.sleep(1000)

		const last = await driver.findElement(By.xpath('//input[@id="id_lastname"]'))
		last.sendKeys('')
		await driver.sleep(1000);
		
		const lastname = await last.getAttribute('data-initial-value')
		const full_name = new_name + ' ' + lastname
		
		const email_addr = await email.getAttribute('data-initial-value')
        await email.clear()

		button = driver.findElement(By.id('id_submitbutton'))
		button.click()

		const error_ele = await driver.findElement(By.xpath('//div[@id="id_error_email"]'))
		await driver.sleep(1000)
		const error_mess = await error_ele.getText()
		error_mess.should.equal("- Required")

		email.sendKeys(email_addr)
		button = driver.findElement(By.id('id_submitbutton'))
		button.click()

		// assert the saved changes value
		await driver.sleep(1000);
		const new_username = await driver.findElement(By.xpath('//h1[@class="h2"]'))
		const change = await new_username.getText()
		
		change.should.equal(full_name)
		
		driver.quit()
		});
});

describe('Exception - Cancel edit session', function () {
	it('Profile edition canceled', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();

		// go to the application
		await driver.get('https://school.moodledemo.net/login/index.php');

		// login to moodle
		var username = driver.findElement(By.name('username'))
		var password = driver.findElement(By.name('password'))
		var button = driver.findElement(By.id('loginbtn'))
		await username.sendKeys('teacher')
		await password.sendKeys('moodle')
		await button.click()

		button = driver.findElement(By.id('user-menu-toggle'))
		await button.click()

		button = driver.findElement(By.css('a[href="https://school.moodledemo.net/user/profile.php"]'))
		await button.click()

		button = driver.findElement(By.css('a[href^="https://school.moodledemo.net/user/edit.php?id"]'))
		await button.click()

		const firstname = await driver.findElement(By.xpath('//input[@id="id_firstname"]'));
		firstname.sendKeys('a')	
		await driver.sleep(1000);
		const new_name = await firstname.getAttribute('data-initial-value')

		const last = await driver.findElement(By.xpath('//input[@id="id_lastname"]'))
		last.sendKeys('')
		await driver.sleep(1000);
		
		const lastname = await last.getAttribute('data-initial-value')
		const full_name = new_name + ' ' + lastname

		button = driver.findElement(By.id('id_cancel'))
		button.click()

		// assert the saved changes value
		await driver.sleep(1000);
		const new_username = await driver.findElement(By.xpath('//h1[@class="h2"]'))
		const change = await new_username.getText()
		
		change.should.equal(full_name)
		
		driver.quit()
		});
});

describe('Exception - Not start edit', function () {
	it('Profile edition canceled', async function () {
		// get the browser
		let driver = await new Builder().forBrowser('chrome').build();

		// go to the application
		await driver.get('https://school.moodledemo.net/login/index.php');

		// login to moodle
		var username = driver.findElement(By.name('username'))
		var password = driver.findElement(By.name('password'))
		var button = driver.findElement(By.id('loginbtn'))
		await username.sendKeys('teacher')
		await password.sendKeys('moodle')
		await button.click()

		button = await driver.findElement(By.id('user-menu-toggle'))
		await button.click()

		button = await driver.findElement(By.css('a[href="https://school.moodledemo.net/user/profile.php"]'))
		await button.click()
		
		button = await driver.findElement(By.css('a[href="https://school.moodledemo.net/my/"]'))
		await button.click()

		// assert the navigation
		await driver.sleep(1000);
		const page = await driver.findElement(By.xpath('//h5[contains(text(), "Timeline")]'))
		const page_content = await page.getText()
		
		page_content.should.equal("Timeline")
		
		driver.quit()
		});
});

describe('Alternative - Session expired', function () {
	it('Successfully edited profile', async function () {
        // get the browser
        let driver = await new Builder().forBrowser('chrome').build();

        // go to the application
        await driver.get('https://school.moodledemo.net/login/index.php');

        // login to moodle
        var username = driver.findElement(By.name('username'))
        var password = driver.findElement(By.name('password'))
        var button = driver.findElement(By.id('loginbtn'))
        await username.sendKeys('teacher')
        await password.sendKeys('moodle')
        await button.click()

        button = driver.findElement(By.id('user-menu-toggle'))
        await button.click()

        button = driver.findElement(By.css('a[href="https://school.moodledemo.net/user/profile.php"]'))
        await button.click()

        button = driver.findElement(By.css('a[href^="https://school.moodledemo.net/user/edit.php?id"]'))
        await button.click()

        await driver.executeScript('window.open("about:blank", "_blank");');

        const handles = await driver.getAllWindowHandles()

        await driver.switchTo().window(handles[1])

        await driver.get('https://school.moodledemo.net/login/index.php')

        button = await driver.findElement(By.xpath('//button[contains(text(), "Log out")]'))
        await button.click()

        await driver.switchTo().window(handles[0])

        let firstname = await driver.findElement(By.xpath('//input[@id="id_firstname"]'));
        firstname.sendKeys('a')	
        await driver.sleep(1000);

        // Get the value of the data-initial-value attribute
        const new_name = await firstname.getAttribute('data-initial-value') + 'a';

        const last = await driver.findElement(By.xpath('//input[@id="id_lastname"]'))
        last.sendKeys('')
        await driver.sleep(1000);
        
        const lastname = await last.getAttribute('data-initial-value')
        const full_name = new_name + ' ' + lastname

        button = driver.findElement(By.id('id_submitbutton'))
        button.click()

        await driver.sleep(2500)
        button = await driver.findElement(By.xpath('//a[contains(text(), "Log in")]'))
        await button.click()

        await driver.sleep(2500)
        password = driver.findElement(By.name('password'))
        button = driver.findElement(By.id('loginbtn'))
        await password.sendKeys('moodle')
        await button.click()

        firstname = await driver.findElement(By.xpath('//input[@id="id_firstname"]'));
        firstname.sendKeys('a')	
        await driver.sleep(1000);

        button = driver.findElement(By.id('id_submitbutton'))
        button.click()

        // assert the saved changes value
        await driver.sleep(1000);
        const new_username = await driver.findElement(By.xpath('//h1[@class="h2"]'))
        const change = await new_username.getText()
        
        change.should.equal(full_name)
        
        driver.quit()
		});
});