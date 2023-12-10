const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chai = require('chai');
const should = chai.should();
const { login, logout } = require('../utils/test');

class EventType {
	static COURSE = 'Course';
	static GROUP = 'Group';
	static USER = 'User';
}
['chrome'].forEach((browserName) => {
	describe(`${browserName}: Teacher create a new event`, function () {
		let driver;
		let vars;
		beforeEach(async function () {
			const chromeOptions = new chrome.Options().headless();
			driver = await new Builder()
				.forBrowser(browserName)
				// .setChromeOptions(chromeOptions)
				.build();
			driver.manage().window().maximize();
			driver.manage().setTimeouts({ implicit: 4000 });
			vars = {};
			await login(driver, 'teacher');
		});
		afterEach(async function () {
			await logout(driver);
			await driver.quit();
		});
		it('TC-004-001: Create event without title', async function () {
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.id('id_error_name')
				);
				elements.should.to.be.not.empty;
				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(
				{ event: { type: EventType.USER } },
				assertClause
			);
		});

		it('TC-004-002: Create course event with valid duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.COURSE,
					course_name: 'Effective Memory Techniques',
				},
				timeout_duration: 30,
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-003: Create course event with duration left empty', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.COURSE,
					course_name: 'Effective Memory Techniques',
				},
				timeout_duration: null,
			};
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.id('fgroup_id_error_durationgroup')
				);
				elements.should.be.an('array').that.is.not.empty;
				const text = await elements[0].getText();
				text.should.to.equal(
					'The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.'
				);

				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(data, assertClause);
		});
		it('TC-004-004: Create course event without duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.COURSE,
					course_name: 'Effective Memory Techniques',
				},
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-005: Create a course event without course selection', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.COURSE,
					course_name: null,
				},
			};
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.xpath('//*[@id="id_error_courseid"]')
				);
				elements.should.be.an('array').that.is.not.empty;
				(
					await driver
						.findElement(By.id('id_error_courseid'))
						.getText()
				).should.be
					.a('string')
					.that.is.equal('Select a course');
				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(data, assertClause);
		});
		it('TC-004-006: Create a group event with duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.GROUP,
					course_name: 'Effective Memory Techniques',
					group_name: 'the RAMs',
				},
				timeout_duration: 30,
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-007: Create group event with duration left empty', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.GROUP,
					course_name: 'Effective Memory Techniques',
					group_name: 'the RAMs',
				},
				timeout_duration: null,
			};
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.id('fgroup_id_error_durationgroup')
				);
				elements.should.be.an('array').that.is.not.empty;
				(await elements[0].getText()).should.to.be.equal(
					'The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.'
				);
				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(data, assertClause);
		});
		it('TC-004-008: Create group event without duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.GROUP,
					course_name: 'Effective Memory Techniques',
					group_name: 'the RAMs',
				},
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-009: Create a group event without course selection', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.GROUP,
				},
			};
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.xpath('//*[@id="id_error_groupcourseid"]')
				);
				elements.should.be.an('array').that.is.not.empty;
				(
					await driver
						.findElement(By.id('id_error_groupcourseid'))
						.getText()
				).should.be
					.a('string')
					.that.equal('Select a course');
				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(data, assertClause);
		});
		it('TC-004-010: Create a group event without group selection', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.GROUP,
					course_name: 'Effective Memory Techniques',
					group_name: null,
				},
			};

			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-011: Create a user event with duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				timeout_duration: 30,
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-012: Create a user event with invalid duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				timeout_duration: null,
			};
			const assertClause = async () => {
				const elements = await driver.findElements(
					By.id('fgroup_id_error_durationgroup')
				);
				elements.should.be.an('array').that.is.not.empty;
				(await elements[0].getText()).should.be
					.a('string')
					.that.is.equal(
						'The duration in minutes you have entered is invalid. Please enter the duration in minutes greater than 0 or select no duration.'
					);
				await driver
					.findElement(By.css("button[data-action='hide']"))
					.click();
			};
			await createEventTemplate(data, assertClause);
		});
		it('TC-004-013: Create a user event without duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				timeout_duration: null,
			};
			await createEventTemplate(data, assertEventCreated);
		});
		it('TC-004-014: Create user event with invalid repeat times', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				repeat_times: '-1',
			};
			await createEventTemplate(data, assertRepeatTimes(0));
		});
		it('TC-004-015: Create user event with valid repeat times', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				repeat_times: '2',
			};
			await createEventTemplate(data, assertRepeatTimes(1));
		});
		it('TC-004-016: Create user event with negative numeric duration with no separator', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				timeout_duration: '-15',
				timestart_hour: 6,
				timestart_minute: 0,
			};
			await createEventTemplate(data, assertRepeatTimes(1));
		});
		it('TC-004-017: Create user event with Non-pure-numeric duration', async function () {
			const data = {
				event_title: 'Class Meeting',
				event: {
					type: EventType.USER,
				},
				timeout_duration: '6 0',
				timestart_hour: 6,
				timestart_minute: 0,
			};
			await createEventTemplate(data, assertDuration(7));
		});

		async function createEventTemplate(data = {}, assertClause = (f) => f) {
			let dropdown = null;
			await driver
				.findElement(By.xpath("//a[contains(text(),'Dashboard')]"))
				.click();
			vars['no_events_init'] = (await countEvent()).length;
			await driver.findElement(By.css('.float-sm-right')).click();
			/**
			 * ==========Event title============================
			 */
			await driver
				.findElement(By.id('id_name'))
				.sendKeys(`${data.event_title || ''}`);
			// await driver.findElement(By.id('id_timestart_day')).click();
			/**
			 * ==========Event time============================
			 */
			if (data.timestart_date) {
				const date = await driver.findElement(
					By.id('id_timestart_day')
				);
				await date.click();
				await date
					.findElement(
						By.xpath(`//option[. = '${data.timestart_month}']`)
					)
					.click();
			}
			if (data.timestart_month) {
				const month = await driver.findElement(
					By.id('id_timestart_month')
				);
				await month.click();
				await month
					.findElement(
						By.xpath(`//option[. = '${data.timestart_month}']`)
					)
					.click();
			}
			if (data.timestart_year) {
				const year = await driver.findElement(
					By.id('id_timestart_year')
				);
				await year.click();
				await year
					.findElement(By.xpath(`//option[. = '${data.year}']`))
					.click();
			}
			if (data.timestart_hour) {
				const hour = await driver.findElement(
					By.id('id_timestart_hour')
				);
				await hour.click();
				await hour
					.findElement(
						By.xpath(`//option[. = '${data.timestart_hour}']`)
					)
					.click();
			}
			if (data.timestart_minute) {
				const minute = await driver.findElement(
					By.id('id_timestart_minute')
				);
				await minute.click();
				await minute
					.findElement(
						By.xpath(`//option[. = '${timestart_minute}']`)
					)
					.click();
			}
			/**
			 * ==========Event type and selection============================
			 */
			await driver.findElement(By.id('id_eventtype')).click();
			dropdown = await driver.findElement(By.id('id_eventtype'));
			await dropdown
				.findElement(By.xpath(`//option[. = '${data.event.type}']`))
				.click();
			switch (data.event.type) {
				case EventType.COURSE: {
					// await driver.wait(until.elementIsSelected(eventType), 3000);
					// Choose the course
					if (data.event.course_name) {
						await driver
							.wait(
								until.elementLocated(
									By.xpath('//div[3]/input')
								),
								3000
							)
							.findElement(By.xpath('//div[3]/input'))
							.sendKeys(data.event.course_name, Key.ENTER);
						// await driver
						// 	.wait(
						// 		until.elementLocated(
						// 			By.xpath(`//div[5]/div[2]/div[3]/span`)
						// 		),
						// 		3000
						// 	)
						// 	.click();
						await driver
							.wait(
								until.elementLocated(
									By.xpath(
										`//div[contains(@class, 'modal-dialog ')]//li[@role='option'][.='${data.event.course_name}']`
									)
								),
								3000
							)
							.click();
					}
					break;
				}
				case EventType.GROUP: {
					// Choose the course
					if (data.event.course_name !== undefined) {
						await driver
							.wait(
								until.elementLocated(
									By.xpath(`//div[5]/div[2]/div[3]/span`)
								),
								3000
							)
							.click();
						if (data.event.course_name) {
							await driver
								.wait(
									until.elementLocated(
										By.xpath(
											`//div[contains(@class, 'modal-dialog ')]//li[@role='option'][.='${data.event.course_name}']`
										)
									),
									3000
								)
								.click();
						}
					}
					// Choose the group in such course
					if (data.event.group_name !== undefined) {
						await driver.wait(
							until.elementIsNotVisible(
								await driver.findElement(
									By.xpath('//span[. = "No selection"]')
								)
							),
							3000
						);
						if (data.event.group_name) {
							await driver
								.findElement(
									By.xpath("//select[@name='groupid']")
								)
								.click();
							await driver
								.findElement(
									By.xpath(
										`//option[. = '${data.event.group_name}']`
									)
								)
								.click();
						}
					}
					break;
				}
				case EventType.USER:
					break;
				default:
					throw new Error('Unknown Event type');
			}
			if (
				data.repeat_times !== undefined ||
				data.timeout_duration !== undefined
			) {
				await driver
					.findElement(By.xpath("//a[contains(.,'Show more...')]"))
					.click();
				/**
				 * ==========Event repeat times============================
				 */
				if (data.repeat_times !== undefined) {
					let element = null;
					element = await driver.findElement(By.id('id_repeats'));
					assert(!(await element.isEnabled()));
					if (data.repeat_times) {
						await driver
							.findElement(By.css('.form-check > label'))
							.click();
						element = await driver.findElement(By.id('id_repeats'));
						assert(await element.isEnabled());
						await driver
							.findElement(By.id('id_repeats'))
							.sendKeys(data.repeat_times);
					}
				}
				/**
				 * ==========Event duration============================
				 */
				if (data.timeout_duration !== undefined) {
					await driver
						.findElement(By.css("input[id='id_duration_2']"))
						.click();
					if (data.timeout_duration) {
						await driver
							.findElement(By.id('id_timedurationminutes'))
							.click();
						await driver
							.findElement(By.id('id_timedurationminutes'))
							.sendKeys(`${data.timeout_duration}`);
					}
				}
			}
			await driver.sleep(2000);
			await driver
				.findElement(By.xpath('//div[2]/div/div/div[3]/button'))
				.click();
			await driver.sleep(2000);
			await assertClause();
		}
		async function assertEventCreated() {
			await driver.wait(
				until.elementLocated(
					By.xpath(
						`//td[contains(@title, 'Today')]//div[@data-region='day-content']/ul/li`
					)
				),
				3000
			);
			vars['no_events_final'] = (await countEvent()).length;
			vars['no_events_final'].should.be.gt(vars['no_events_init']);
		}
		async function countEvent() {
			return await driver.findElements(
				By.xpath(
					"//td[contains(@class, 'today')]//div[@data-region='day-content']/ul/li"
				)
			);
		}
		async function assertRepeatTimes(expected) {
			if (typeof expected !== 'number') {
				throw new Error(
					'assertRepeatTimes ==> Invalid expected repeat times'
				);
			}
			assertEventCreated();
			await driver
				.findElement(
					By.xpath(
						"//td[contains(@class, 'today')]//div[@data-region='day-content']/ul/li[last()-1]"
					)
				)
				.click();
			await driver
				.findElement(By.xpath('//div[2]/div/div/div[3]/button[2]'))
				.click();
			await driver
				.findElement(By.xpath("//a[contains(.,'Show more...')]"))
				.click();
			(
				await driver
					.findElement(
						By.css(
							'#fgroup_id_repeatgroup .form-check-inline:nth-child(1)'
						)
					)
					.getText()
			).should.be
				.a('string')
				.that.is.equal(
					`Also apply changes to the other ${expected} events in this repeat series`
				);
			await driver.findElement(By.xpath('//body/div[5]/div')).click();
			await driver
				.findElement(By.xpath('//div[5]/div/div/div/div/button/span'))
				.click();
		}
		async function assertDuration(expected) {
			await driver
				.findElement(
					By.xpath(
						"//td[contains(@class, 'today')]//div[@data-region='day-content']/ul/li[last()-1]"
					)
				)
				.click();
			await driver
				.findElement(By.xpath('//div[2]/div/div/div[3]/button[2]'))
				.click();
			await driver
				.findElement(By.xpath("//a[contains(.,'Show more...')]"))
				.click();
			const value = await driver
				.findElement(
					By.xpath(
						`//*[@id="id_timedurationuntil_hour"]/option[contains(text(), '${expected}')]`
					)
				)
				.getAttribute('value');
			value.should.be.equal('isSelected');
			await driver.findElement(By.xpath('//body/div[5]/div')).click();
			await driver
				.findElement(By.xpath('//div[5]/div/div/div/div/button/span'))
				.click();
		}
	});
});
