const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { login, logout } = require('../utils/test/index');
const { InvalidArgumentError } = require('selenium-webdriver/lib/error');
const _1MB = 1048576;
['MicrosoftEdge', 'chrome'].forEach((browserName) => {
	describe('Student uploads an assignment', function () {
		let driver;
		let vars;
		beforeEach(async function () {
			driver = await new Builder().forBrowser('chrome').build();
			driver.manage().window().maximize();
			driver.manage().setTimeouts({ implicit: 4000 });
			vars = {};
		});
		afterEach(async function () {
			await driver.close();
		});
		it('TC-007-003: overdue assignment test', async function () {
			const today = new Date();
			const past = new Date(today);
			const past2 = new Date(today);
			past.setDate(today.getDate() - 2);
			past2.setDate(today.getDate() - 1);
			const asm = {
				submitFrom: past.getDate(),
				dueDate: past2.getDate(),
				name: 'overdue assignment test',
			};
			const data = [
				`${process.env.filesystem_base}\\\\teachercreateanewevent.spec.js`,
			];
			const assertClause = async () => {
				await driver
					.findElement(
						By.css("input[type='submit'][id=id_submitbutton]")
					)
					.click();
				const elements = await driver.findElements(
					By.css('.latesubmission')
				);
				assert(elements.length);
			};
			await uploadFileTemplate(asm, data, assertClause, true);
		});
		it('TC-007-004: oversized file submission', async function () {
			const asm = {
				name: 'oversized file submission',
				file_maxSize: _1MB,
				file_maxNo: 20,
			};
			const data = [
				`${process.env.filesystem_base}\\\\test_data\\\\testFiles_fileSize\\\\fileSize_2MB`,
			];
			const assertClause = async () => {
				assert(
					(await driver
						.wait(
							until.elementLocated(
								By.css('.moodle-exception-message')
							)
						)
						.getText()) ==
						'The file fileSize_2MB is too large. The maximum size you can upload is 1 MB.'
				);
				await driver
					.wait(
						until.elementLocated(
							By.xpath('//div[3]/div/div/span/button')
						)
					)
					.click();
				await driver
					.wait(
						until.elementLocated(
							By.xpath('//div[3]/div/div/span/button')
						)
					)
					.click();
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		it('TC-007-005: valid asm file submission with no. files = 1 < 2', async function () {
			const asm = {
				name: 'valid asm file submission with no. files = 1 < 2',
				file_maxNo: 2,
			};
			const data = [
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_1MB',
			];
			const assertClause = async () => {
				await driver
					.wait(
						until.elementLocated(
							By.css("input[type='submit'][id='id_submitbutton']")
						),
						3000
					)
					.click();
				const elements = await driver.findElements(
					By.css('.earlysubmission ')
				);
				assert(elements.length);
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		it('TC-007-006: valid asm file submission fileSize= 0.5MB < 1MB', async function () {
			const asm = {
				name: 'valid asm file submission fileSize= 0.5MB < 1MB',
				file_maxSize: _1MB,
			};
			const data = [
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_0.5MB',
			];
			const assertClause = async () => {
				await driver
					.wait(
						until.elementLocated(
							By.css("input[type='submit'][id='id_submitbutton']")
						),
						3000
					)
					.click();
				const elements = await driver.findElements(
					By.css('.earlysubmission ')
				);
				assert(elements.length);
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		it('TC-007-007: invalid asm file submission with no. files = 3  > maximum= 2', async function () {
			const asm = {
				name: 'invalid asm file submission with no. files = 3  > maximum= 2',
				file_maxNo: 2,
			};
			const data = [
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_1MB',
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_0.5MB',
			];
			const assertClause = async () => {
				// check if the add_btn visible
				vars['isVisible'] = await driver.executeScript(
					"let add_btn = document.getElementsByClassName('fp-btn-add')[0]; return window.getComputedStyle(add_btn, ':before').getPropertyValue(\"display\") == 'none';"
				);
				assert(vars['isVisible'].toString() == 'false');
				await driver
					.wait(
						until.elementLocated(
							By.css("input[type='submit'][id='id_submitbutton']")
						),
						3000
					)
					.click();
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		it('TC-007-008: valid asm file submission with fileSize = 1MB', async function () {
			const asm = {
				name: 'valid asm file submission with fileSize = 1MB',
				file_maxNo: 2,
			};
			const data = [
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_1MB',
			];
			const assertClause = async () => {
				await driver
					.wait(
						until.elementLocated(
							By.css("input[type='submit'][id='id_submitbutton']")
						),
						3000
					)
					.click();
				const elements = await driver.findElements(
					By.css('.earlysubmission ')
				);
				assert(elements.length);
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		it.only('TC-007-009: valid asm file submission with no. files = 2 (=maximum= 2)', async function () {
			const asm = {
				name: 'valid asm file submission with no. files = 2 (=maximum= 2)',
				file_maxNo: 2,
			};
			const data = [
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_1MB',
				'C:\\\\Users\\\\LAPTOP\\\\Downloads\\\\test_data\\\\testFiles_fileSize\\\\fileSize_0.5MB',
			];
			const assertClause = async () => {
				await driver
					.wait(
						until.elementLocated(
							By.css("input[type='submit'][id='id_submitbutton']")
						),
						3000
					)
					.click();
				const elements = await driver.findElements(
					By.css('.earlysubmission ')
				);
				assert(elements.length);
			};
			await uploadFileTemplate(asm, data, assertClause);
		});
		async function uploadFileTemplate(
			asm,
			data = [],
			assertClause = (f) => f,
			overdue = false
		) {
			if (!asm || data.length === 0)
				throw new InvalidArgumentError('Required asm and data');
			await createNewAssignment({ ...asm });
			await login(driver, 'student');

			await driver
				.findElement(By.xpath("//a[contains(text(),'Dashboard')]"))
				.click();
			const asm_filter = await driver.findElement(
				By.css('button[title="Filter timeline by date"')
			);
			await asm_filter.click();

			await asm_filter
				.findElement(
					By.xpath(
						`//following-sibling::div[@id='menudayfilter']//a[@data-filtername="${
							overdue ? 'overdue' : 'all'
						}"]`
					)
				)
				.click();
			const title = asm.name
				.replaceAll('>', '&gt;')
				.replaceAll('<', '&lt;');
			await driver
				.findElement(
					By.xpath(
						`//a[contains(@title, "${title} is due")]/../../../../following-sibling::div//a[1]`
					)
				)
				.click();
			for (let file of data) {
				await driver
					.findElement(By.css('div[class="fp-btn-add"] > a'))
					.click();
				await driver
					.findElement(By.xpath("//input[@type='file']"))
					.sendKeys(file);
				await driver
					.findElement(
						By.xpath(
							"//button[contains(text(), 'Upload this file')]"
						)
					)
					.click();
				// Wait for file uploaded
				await driver.sleep(4000);
			}
			// await driver.sleep(3000);
			await assertClause();
			await logout(driver);
			await deleteAssignment({
				...asm,
			});
		}
		async function createNewAssignment(props) {
			if (!driver) throw new Error('Required Driver to run');
			let dropdown = null;
			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			await login(driver, 'teacher');
			const course_filter = await driver.findElement(
				By.css('button[id="groupingdropdown"]')
			);
			await course_filter.click();
			await course_filter
				.findElement(
					By.xpath('//following-sibling::ul//a[@data-value="all"]')
				)
				.click();
			await driver
				.findElement(
					By.css(
						'a[href="https://school.moodledemo.net/course/view.php?id=69"]'
					)
				)
				.click();

			await driver.findElement(By.name('setmode')).click();
			await driver
				.findElement(
					By.xpath(
						"(//span[contains(text(), 'Add an activity or resource')]/..)[1]"
					)
				)
				.click();
			await driver
				.findElement(
					By.css('div[tabindex="0"] a[title="Add a new Assignment"]')
				)
				.click();
			// await driver.sleep(2000);
			await driver
				.wait(until.elementLocated(By.id('id_name')))
				.sendKeys(props.name);
			if (props.dueDate) {
				dropdown = await driver.findElement(
					By.id('id_allowsubmissionsfromdate_day')
				);
				await dropdown
					.findElement(
						By.css(
							`option[value='${
								props.submitFrom || today.getDate()
							}']`
						)
					)
					.click();
			}
			if (props.submitFrom) {
				dropdown = await driver.findElement(By.id('id_duedate_day'));
				await dropdown
					.findElement(
						By.css(
							`option[value='${
								props.dueDate || tomorrow.getDate()
							}']`
						)
					)
					.click();
			}
			if (props.file_maxSize) {
				dropdown = await driver.findElement(
					By.id('id_assignsubmission_file_maxfiles')
				);
				await dropdown
					.findElement(By.css(`option[value= '${props.file_maxNo}']`))
					.click();
			}
			if (props.file_maxNo) {
				dropdown = await driver.findElement(
					By.id('id_assignsubmission_file_maxsizebytes')
				);
				await dropdown
					.findElement(
						By.css(
							`option[value = '${props.file_maxSize || _1MB}']`
						)
					)
					.click();
			}
			await driver
				.findElement(By.css("input[type='submit'][id=id_submitbutton]"))
				.click();
			await logout(driver);
		}

		async function deleteAssignment(props) {
			if (!driver || !props.name)
				throw new Error('Required Driver to run');
			await login(driver, 'teacher');
			await driver
				.findElement(
					By.css(
						'a[href="https://school.moodledemo.net/course/view.php?id=69"]'
					)
				)
				.click();

			await driver.findElement(By.name('setmode')).click();
			await driver
				.findElement(
					By.xpath(
						`//span[contains(@data-value, "${props.name}")]/../../../../following-sibling::div[3]//div[@class=\'dropdown\']/a[1]`
					)
				)
				.click();
			await driver
				.findElement(
					By.xpath(
						'//div[contains(@class, \'show\')]/a[contains(@class, "editing_delete")]'
					)
				)
				.click();
			const confirm_btn = await driver.findElements(
				By.css('.btn-danger')
			);
			if (confirm_btn.length) {
				await confirm_btn[0].click();
			} else {
				await driver
					.findElement(
						By.xpath("//button[@type='submit'][. = 'Yes']")
					)
					.click();
			}
			await logout(driver);
		}
	});
});
