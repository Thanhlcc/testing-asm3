const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert');

['MicrosoftEdge','chrome'].forEach((browsername) => {
    describe(`${browsername}: Testing moodle 5 `, function () {
        this.timeout(60000)
        let driver
        let vars
        beforeEach(async function () {
            driver = await new Builder().forBrowser(browsername).build()
            // driver = await new Builder().forBrowser('MicrosoftEdge').build()
            vars = {}
            /****************** SETUP TEST CASE ******************************/
            await driver.get("https://school.moodledemo.net/login/index.php")
            await driver.findElement(By.id("username")).click()
            await driver.findElement(By.id("username")).sendKeys("student")
            await driver.findElement(By.id("password")).click()
            await driver.findElement(By.id("password")).sendKeys("moodle")
            await driver.findElement(By.id("loginbtn")).click()
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.xpath("//section[@id=\'region-main\']/div[2]/div/div/div/div/form/button")).click()
            await driver.executeScript('window.scrollBy(0, 1000);');
            await driver.sleep(5000)
            
            await driver.switchTo().frame(0)
            const submitAnswer = await driver.findElement(By.id("tinymce"))
            await submitAnswer.sendKeys('Submit')
            await driver.switchTo().defaultContent()
            await driver.findElement(By.id("id_submitbutton")).click()
            const toogle = await driver.findElement(By.id("user-menu-toggle"))
            await toogle.click()
            const logoutButton = await driver.findElement(By.linkText("Log out"))
            await logoutButton.click()
            await driver.findElement(By.linkText("Log in")).click()
            let teacherLogin = await driver.findElement(By.id("username"))
            await teacherLogin.clear()
            await teacherLogin.sendKeys("teacher")
            await driver.findElement(By.id("password")).click()
            await driver.findElement(By.id("password")).sendKeys("moodle")
            await driver.findElement(By.id("loginbtn")).click()
        })
        afterEach(async function () {
            const linkAssignment = await driver.findElement(By.linkText("Assignment: End of course summative assignment"))
            await linkAssignment.click()
            const toogle = await driver.findElement(By.id("user-menu-toggle"))
            await toogle.click()
            const logoutButton = await driver.findElement(By.linkText("Log out"))
            await logoutButton.click()
            await driver.quit();
        })
        it('Testing moodle 5.1 - Basic flow', async function () {
             /****************** START TEST CASE ******************************/
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("80.00")
    
            await driver.sleep(5000)
            await driver.executeScript('window.scrollBy(0, 1000);');
            await driver.switchTo().frame(0)
            const feedback = await driver.findElement(By.id("tinymce"))
            await feedback.sendKeys('Good job.')
            await driver.switchTo().defaultContent()
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(3000)
            {
                const elements = await driver.findElements(By.linkText("80.00"))
                assert(elements.length)
            }
            {
                const elements = await driver.findElements(By.css("p"))
                assert(elements.length)
                
            }
        })
    
    
        /* //////////////// 5.2   ////////////////       */
        it('Testing moodle 5.2 - Alternative flow: Save and show next', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
    
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("90.00")
            await driver.sleep(5000)
            await driver.executeScript('window.scrollBy(0, 1000);');
            await driver.switchTo().frame(0)
            const feedback = await driver.findElement(By.id("tinymce"))
            await feedback.sendKeys('Good job.')
    
            await driver.switchTo().defaultContent()
            await driver.findElement(By.name("saveandshownext")).click()
            {
                const elements = await driver.findElements(By.linkText("Not graded"))
                assert(elements.length)
            }
            await driver.sleep(5000)
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade2nd =  await driver.findElement(By.id("id_grade"))
            await inputGrade2nd.click()
            await inputGrade2nd.sendKeys("95")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            console.log("`set speed` is a no-op in code export, use `pause` instead")
            {
                const elements = await driver.findElements(By.linkText("95.00"))
                assert(elements.length)
            }
        })
    
    
        /* //////////////// 5.3   ////////////////       */
        it('Testing moodle 5.3 - Alternative flow: Reset button', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
            await driver.sleep(3000)
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("90.00")
            // await driver.sleep(5000)
            // await driver.executeScript('window.scrollBy(0, 800);');
            // await driver.sleep(5000)
            // await driver.switchTo().frame(0)
            await driver.wait(until.elementsLocated(By.id('id_assignfeedbackcomments_editor_ifr')), 10000)
            const iframeElement = await driver.findElement(By.id('id_assignfeedbackcomments_editor_ifr'));
            // Scroll the iframe into view
            await driver.executeScript('arguments[0].scrollIntoView(true);', iframeElement);
            // Switch to the iframe
            await driver.switchTo().frame(iframeElement);
            const feedback = await driver.findElement(By.id("tinymce"))
            await feedback.sendKeys('Good job.')
            await driver.switchTo().defaultContent()
            await driver.findElement(By.name("resetbutton")).click()
            // await driver.sleep(5000)
            ///
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            await driver.sleep(5000)
            let inputGrade2nd = await driver.findElement(By.id("id_grade"))
            await inputGrade2nd.click()
            await inputGrade2nd.sendKeys("99.00")
            await driver.sleep(5000)
            await driver.wait(until.elementsLocated(By.id('id_assignfeedbackcomments_editor_ifr')), 10000)
            const iframeElement2nd = await driver.findElement(By.id('id_assignfeedbackcomments_editor_ifr'));
            // Scroll the iframe into view
            await driver.executeScript('arguments[0].scrollIntoView(true);', iframeElement2nd);
            // Switch to the iframe
            await driver.switchTo().frame(iframeElement2nd);
            const feedbacksecond = await driver.findElement(By.id("tinymce"))
            await feedbacksecond.sendKeys('Perfect')
            await driver.switchTo().defaultContent()
            await driver.sleep(3000)
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            {
                const elements = await driver.findElements(By.linkText("99.00"))
                assert(elements.length)
            }
            {
                const elements = await driver.findElements(By.css("p"))
                assert(elements.length)
            }
        })
    
    
        /* //////////////// 5.4   ////////////////       */
        it('Testing moodle 5.4 - Alternative Flow - invalid score', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
    
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.sleep(5000)
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("Good job")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            assert(await driver.findElement(By.id("id_error_grade")).getText() == "The grade provided could not be understood: Good job")
            await driver.findElement(By.xpath("//section/div[2]/div[3]")).click()
            await driver.sleep(3000)
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            const clearoldScore = await driver.findElement(By.id("id_grade"))
            await clearoldScore.clear()
            await clearoldScore.sendKeys("80.00")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            {
                const elements = await driver.findElements(By.linkText("80.00"))
                assert(elements.length)
            }
    
        })
    
        /* //////////////// 5.5   ////////////////       */
        it('Testing moodle 5.5 - Boundary Values', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("0.00")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(3000)
            {
                const elements = await driver.findElements(By.linkText("0.00"))
                assert(elements.length)
            }
    
        })
    
    
        /* //////////////// 5.6   ////////////////       */
        it('Testing moodle 5.6 - Boundary Values', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("50")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(3000)
            {
                const elements = await driver.findElements(By.linkText("50.00"))
                assert(elements.length)
            }
    
        })
        /* //////////////// 5.7   ////////////////       */
        it('Testing moodle 5.7 - Boundary Value', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("100")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(3000)
            {
                const elements = await driver.findElements(By.linkText("100.00"))
                assert(elements.length)
            }
        })
    
    
        /* //////////////// 5.8   ////////////////       */
        it('Testing moodle 5.8 - Boundary and Equivalence', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
    
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("-1")
            await driver.sleep(3000)
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            assert(await driver.findElement(By.id("id_error_grade")).getText() == "Grade must be greater than or equal to zero.")
            await driver.findElement(By.xpath("//section/div[2]/div[3]")).click()
            await driver.sleep(3000)
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)      
            const clearoldScore = await driver.findElement(By.id("id_grade"))
            await clearoldScore.clear()
            clearoldScore.sendKeys("80.00")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            {
                const elements = await driver.findElements(By.linkText("80.00"))
                assert(elements.length)
            }
    
        })
    
        /* //////////////// 5.9   ////////////////       */
        it('Testing moodle 5.9 - Boundary and Equivalence classes', async function () {
    
            await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
            let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            await course.click()
            await driver.get("https://school.moodledemo.net/course/view.php?id=71")
            await driver.manage().window().maximize()
            {
                const elements = await driver.findElements(By.linkText("End of course summative assignment"))
                assert(elements.length)
            }
            await driver.findElement(By.linkText("End of course summative assignment")).click()
            await driver.findElement(By.linkText("View all submissions")).click()
            {
                const elements = await driver.findElements(By.css(".submissionstatussubmitted"))
                assert(elements.length)
            }
    
            await driver.findElement(By.css("#mod_assign_grading-1833_r12_c5 > .btn")).click()
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)
            let inputGrade = await driver.findElement(By.id("id_grade"))
            await inputGrade.click()
            await inputGrade.sendKeys("101")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            assert(await driver.findElement(By.id("id_error_grade")).getText() == "Grade must be less than or equal to 100.")
            await driver.findElement(By.xpath("//section/div[2]/div[3]")).click()
            await driver.sleep(3000)
            await driver.wait(until.elementsLocated(By.id("id_grade")), 5000)  
            const clearoldScore = await driver.findElement(By.id("id_grade"))
            await clearoldScore.clear()
            clearoldScore.sendKeys("80.00")
            await driver.findElement(By.name("savechanges")).click()
            await driver.sleep(5000)
            {
                const elements = await driver.findElements(By.linkText("80.00"))
                console.log('hello', elements.length)
                assert(elements.length)
            }
        })
    })
})

