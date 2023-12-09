const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Testing moodle 6: Edit a topic ', function () {
    // this.timeout(60000)
    let driver
    let vars
    beforeEach(async function () {
        
        driver = await new Builder().forBrowser('chrome').build()
        // driver = await new Builder().forBrowser('MicrosoftEdge').build()
        vars = {}
         /********  SETUP TEST CASE ******************/
        await driver.manage().setTimeouts({ implicit: 5000 })
        await driver.get("https://school.moodledemo.net/login/index.php")
        await driver.findElement(By.id("username")).click()
        await driver.findElement(By.id("username")).sendKeys("teacher")
        await driver.findElement(By.id("password")).click()
        await driver.findElement(By.id("password")).sendKeys("moodle")
        await driver.findElement(By.id("loginbtn")).click()
        await driver.wait(until.elementsLocated(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])')), 5000)
        {
            const elements = await driver.findElements(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
            assert(elements.length)
        }
        let course = await driver.findElement(By.xpath('(//a[@href="https://school.moodledemo.net/course/view.php?id=71"])'))
        await course.click()
        await driver.get("https://school.moodledemo.net/course/view.php?id=71")
        await driver.manage().window().maximize()
    })
    afterEach(async function () {
        const toogle = await driver.findElement(By.id("user-menu-toggle"))
        await toogle.click()
        const logoutButton = await driver.findElement(By.linkText("Log out"))
        await logoutButton.click()
        await driver.quit();
    })

    ///////////////////////// 6.1
    it('Testing moodle 6.1 - Basic flow ', async function () {

        /********  SETUP TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        //await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        const showList = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))
        await showList.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()
        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrow = await driver.findElement(By.id("collapseElement-1"))
        await arrow.click()
        //await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_button = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_button.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_date")), 5000)
        const restricted_option = await driver.findElement(By.id("availability_addrestriction_date"))
        await restricted_option.click()
        await driver.findElement(By.name("x[day]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '23']")).click()
        }
        await driver.sleep(3000)
        await driver.findElement(By.name("x[month]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[month]"))
            await dropdown.findElement(By.xpath("//option[. = 'November']")).click()
        }
        await driver.sleep(3000)
        await driver.findElement(By.id("id_submitbutton")).click()
        await driver.findElement(By.name("setmode")).click()
        //     /**************** START TEST CASE ***********************/
        await driver.findElement(By.name("setmode")).click()
        //await driver.sleep(3000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
        await driver.sleep(3000)
        await driver.findElement(By.css("#action-menu-toggle-16 > .icon")).click()
        await driver.sleep(3000)
        await driver.wait(until.elementsLocated(By.id("actionmenuaction-100")), 5000)
        await driver.sleep(3000)
        await driver.findElement(By.id("actionmenuaction-100")).click()
        const inputElement = await driver.findElement(By.id('id_name_value'))
        await inputElement.clear()
        await inputElement.sendKeys('Module 2')
        //await driver.sleep(5000)
        await driver.switchTo().frame(0)
        // await driver.findElement(By.css("html")).click()
        const inputSummary = await driver.findElement(By.id('tinymce'))
        await inputSummary.sendKeys('The topic covers a background of the lesson.')
        await driver.switchTo().defaultContent();

        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrowinTest = await driver.findElement(By.id("collapseElement-1"))
        await driver.executeScript('arguments[0].scrollIntoView(true);', arrowinTest);
        await arrowinTest.click()
        const daylist = await driver.findElement(By.name("x[day]"))
        await daylist.click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '24']")).click()
        }
        await driver.sleep(5000)
        console.log("`set speed` is a no-op in code export, use `pause` instead")
        await driver.findElement(By.id("id_submitbutton")).click()
        {
            const elements = await driver.findElements(By.linkText("Module 2"))
            assert(elements.length)
        }
        {
            const elements = await driver.findElements(By.css(".description p"))
            assert(elements.length)
        }
        {
            const elements = await driver.findElements(By.css(".availabilityinfo > .mt-2:nth-child(1)"))
            assert(elements.length)
        }
    })

    //////////////////// 6.2
    it('Testing moodle 6.2 - Alternative flow', async function () {


        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(3000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        await driver.findElement(By.css("#action-menu-toggle-16 > .icon")).click()
        await driver.findElement(By.id("actionmenuaction-100")).click()
        const inputElement = await driver.findElement(By.id('id_name_value'))
        await inputElement.clear()
        await inputElement.sendKeys('Module 2')
        await driver.sleep(5000)
        await driver.switchTo().frame(0)
        // await driver.findElement(By.css("html")).click()
        const inputSummary = await driver.findElement(By.id('tinymce'))
        await inputSummary.sendKeys('The topic covers a background of the lesson.')
        await driver.switchTo().defaultContent();
        await driver.findElement(By.id("id_submitbutton")).click()
        {
            const elements = await driver.findElements(By.linkText("Module 2"))
            assert(elements.length)
        }
        {
            const elements = await driver.findElements(By.css("#coursecontentcollapse2 p"))
            assert(elements.length)
        }
    })


    //////////////// 6.3
    it('Testing moodle 6.3 - Alternative flow - Only change restriction', async function () {

        /********  SETUP TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        const showList = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))
        await showList.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()
        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrow = await driver.findElement(By.id("collapseElement-1"))
        await arrow.click()
        await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_button = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_button.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_date")), 5000)
        const restricted_option = await driver.findElement(By.id("availability_addrestriction_date"))
        await restricted_option.click()
        await driver.findElement(By.name("x[day]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '23']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.name("x[month]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[month]"))
            await dropdown.findElement(By.xpath("//option[. = 'November']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.id("id_submitbutton")).click()
        await driver.findElement(By.name("setmode")).click()
        /********  START TEST CASE ******************/
        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(3000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
        await driver.findElement(By.css("#action-menu-toggle-16 > .icon")).click()
        await driver.findElement(By.id("actionmenuaction-100")).click()

        await driver.sleep(5000)
        const arrowInTest = await driver.findElement(By.id("collapseElement-1"))
        await driver.executeScript('arguments[0].scrollIntoView(true);', arrowInTest);

        await arrowInTest.click()
        await driver.sleep(3000)
        const daylist = await driver.findElement(By.name("x[day]"))
        await daylist.click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '24']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.id("id_submitbutton")).click()
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
    })


    //////////////////// 6.4
    it('Testing moodle 6.4 - Alternative flow: Delete restriction access', async function () {
        /********  SETUP TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        const showList = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))
        await showList.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()
        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrow = await driver.findElement(By.id("collapseElement-1"))
        await arrow.click()
        await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_button = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_button.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_date")), 5000)
        const restricted_option = await driver.findElement(By.id("availability_addrestriction_date"))
        await restricted_option.click()
        await driver.findElement(By.name("x[day]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '23']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.name("x[month]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[month]"))
            await dropdown.findElement(By.xpath("//option[. = 'November']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.id("id_submitbutton")).click()
        await driver.findElement(By.name("setmode")).click()
        /********  START TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(3000)
        {
            const elements = await driver.findElements(By.css("#module-1150 .aalink:nth-child(1)"))
            assert(elements.length)
        }
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
        const showListinTest = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))

        await showListinTest.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()

        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrowinTest = await driver.findElement(By.id("collapseElement-1"))
        await arrowinTest.click()
        await driver.sleep(5000)
        await driver.findElement(By.xpath("//img[@alt=\'Delete\']")).click()
        {
            const elements = await driver.findElements(By.css(".px-3"))
            assert(elements.length)
        }
        await driver.findElement(By.id("id_submitbutton")).click()
    })


    //////////////////// 6.5
    it('Testing moodle 6.5 - Alternative flow: Add restriction access', async function () {
        /********  SETUP TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        const showList = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))
        await showList.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()
        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrow = await driver.findElement(By.id("collapseElement-1"))
        await arrow.click()
        await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_button = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_button.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_date")), 5000)
        const restricted_option = await driver.findElement(By.id("availability_addrestriction_date"))
        await restricted_option.click()
        await driver.findElement(By.name("x[day]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '23']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.name("x[month]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[month]"))
            await dropdown.findElement(By.xpath("//option[. = 'November']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.id("id_submitbutton")).click()
        await driver.findElement(By.name("setmode")).click()
        /********  START TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(3000)
        {
            const elements = await driver.findElements(By.css("#module-1150 .aalink:nth-child(1)"))
            assert(elements.length)
        }
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
        const showListinTest = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))

        await showListinTest.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()

        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrowinTest = await driver.findElement(By.id("collapseElement-1"))
        await arrowinTest.click()
        await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_buttoninTest = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_buttoninTest.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_completion")), 5000)
        const restricted_optioninTest = await driver.findElement(By.id("availability_addrestriction_completion"))
        await restricted_optioninTest.click()
        await driver.findElement(By.name("cm")).click()
        {
            const dropdown = await driver.findElement(By.name("cm"))
            await dropdown.findElement(By.xpath("//option[. = 'Module 1 quick check']")).click()
        }
        await driver.findElement(By.id("id_submitbutton")).click()
        {
            const elements = await driver.findElements(By.xpath("//span[contains(.,\'Not available unless: It is on or after 23 November 2023 ...\')]"))
            assert(elements.length)
        }
    })

    /////////////////////////////// 6.6
    it('Testing moodle 6.6 - Exception Flow: Click cancel button ', async function () {
        /********  SETUP TEST CASE ******************/

        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(5000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        const showList = await driver.findElement(By.css("#action-menu-toggle-16 > .icon"))
        await showList.click()

        await driver.findElement(By.id("actionmenuaction-100")).click()
        await driver.wait(until.elementsLocated(By.id("collapseElement-1")), 5000)
        const arrow = await driver.findElement(By.id("collapseElement-1"))
        await arrow.click()
        await driver.sleep(5000)
        await driver.wait(until.elementsLocated(By.css(".availability-button > .btn")), 10000)
        const restricted_button = await driver.findElement(By.css(".availability-button > .btn"))
        await restricted_button.click()
        await driver.wait(until.elementsLocated(By.id("availability_addrestriction_date")), 5000)
        const restricted_option = await driver.findElement(By.id("availability_addrestriction_date"))
        await restricted_option.click()
        await driver.findElement(By.name("x[day]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '23']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.name("x[month]")).click()
        {
            const dropdown = await driver.findElement(By.name("x[month]"))
            await dropdown.findElement(By.xpath("//option[. = 'November']")).click()
        }
        await driver.sleep(5000)
        await driver.findElement(By.id("id_submitbutton")).click()
        await driver.findElement(By.name("setmode")).click()
        /**************** START TEST CASE ***********************/
        await driver.findElement(By.name("setmode")).click()
        await driver.sleep(3000)
        assert(await driver.findElement(By.linkText("Module 2: Identify and analyse arguments")).getText() == "Module 2: Identify and analyse arguments")
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
        await driver.sleep(5000)
        await driver.findElement(By.css("#action-menu-toggle-16 > .icon")).click()
        await driver.findElement(By.id("actionmenuaction-100")).click()
        const inputElement = await driver.findElement(By.id('id_name_value'))
        await inputElement.clear()
        await inputElement.sendKeys('Module 2')
        await driver.sleep(5000)
        await driver.switchTo().frame(0)
        // await driver.findElement(By.css("html")).click()
        const inputSummary = await driver.findElement(By.id('tinymce'))
        await inputSummary.sendKeys('The topic covers a background of the lesson.')
        await driver.switchTo().defaultContent();
        await driver.sleep(3000)
        const arrowInTest = await driver.findElement(By.id("collapseElement-1"))
        await driver.executeScript('arguments[0].scrollIntoView(true);', arrowInTest);

        await arrowInTest.click()
        const daylist = await driver.findElement(By.name("x[day]"))
        await daylist.click()
        {
            const dropdown = await driver.findElement(By.name("x[day]"))
            await dropdown.findElement(By.xpath("//option[. = '24']")).click()
        }
        await driver.sleep(5000)
        console.log("`set speed` is a no-op in code export, use `pause` instead")
        await driver.findElement(By.id("id_cancel")).click()
        {
            const elements = await driver.findElements(By.linkText("Module 2: Identify and analyse arguments"))
            assert(elements.length)
        }
        {
            const elements = await driver.findElements(By.css("strong:nth-child(2)"))
            assert(elements.length)
        }
    })
})
