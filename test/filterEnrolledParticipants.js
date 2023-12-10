const { Builder, Key, By, until } = require("selenium-webdriver");
const should = require("chai").should();
const describe = require("mocha").describe;
const assert = require("assert");

const browsers = ["chrome", "MicrosoftEdge"];
browsers.forEach((brs) => {
  describe(`User - Filter Enrolled Participants with ${brs}`, function () {
    let driver;
    beforeEach(async function () {
      driver = await new Builder().forBrowser(brs).build();
      await driver.get("https://school.moodledemo.net/login/index.php");
      await driver.manage().window().maximize();
      await driver.findElement(By.id("username")).click();
      await driver.findElement(By.id("username")).sendKeys("teacher");
      await driver.findElement(By.id("password")).click();
      await driver.findElement(By.id("password")).sendKeys("moodle");
      await driver.findElement(By.id("loginbtn")).click();
      await driver.wait(
        until.elementLocated(
          By.xpath(
            "//a[@href='https://school.moodledemo.net/course/view.php?id=69']"
          )
        )
      );
      await driver
        .findElement(
          By.xpath(
            "//a[@href='https://school.moodledemo.net/course/view.php?id=69']"
          )
        )
        .click();
      await driver.wait(until.elementLocated(By.linkText("Participants")));
      await driver.findElement(By.linkText("Participants")).click();
      await driver.wait(
        until.elementLocated(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='join']"
          )
        )
      );
    });

    afterEach(async function () {
      await driver.findElement(By.id("user-menu-toggle")).click();
      await driver.findElement(By.linkText("Log out")).click();
      await driver.close();
      await driver.quit();
    });

    it("Basic flow", async function () {
      // joindropdown
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='join']"
          )
        )
        .click();
      const joindropdown = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='join']"
        )
      );
      await joindropdown.findElement(By.css("*[value='2']")).click();

      // typedropdown
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='type']"
          )
        )
        .click();
      const typedropdown = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='type']"
        )
      );
      await typedropdown.findElement(By.css("*[value='accesssince']")).click();

      // select li value
      await driver.wait(
        until.elementLocated(
          By.xpath("//div[@data-filterregion='value']//span")
        )
      );
      await driver
        .findElement(By.xpath("//div[@data-filterregion='value']//span"))
        .click();
      await driver
        .findElement(
          By.xpath(
            "//div[@data-filterregion='value']//li[contains(text(), '2 weeks')]"
          )
        )
        .click();

      // apply
      await driver
        .findElement(By.css("button[data-filteraction='apply']"))
        .click();

      await driver.sleep(10000);

      await driver.findElement(By.css("a[data-action='showcount']")).click();

      await driver.sleep(10000);

      const arr = await driver.findElements(
        By.xpath(
          "//*[@id=\"participants\"]//td[contains(text(), 'jeffreysanders199@example.com')]"
        )
      );
      if (arr.length != 0) {
        throw new Error("Filter results is wrong.");
      }

      try {
        const available = await driver.findElement(
          By.xpath(
            "//*[@id=\"participants\"]//td[contains(text(), 'carolynwelch140@example.com')]"
          )
        );
        assert(available);
      } catch (error) {
        throw new Error("Filter results is wrong.");
      }
    });

    it("Alternative - Add multiple filters", async function () {
      // joindropdown1
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='join']"
          )
        )
        .click();
      const joindropdown1 = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='join']"
        )
      );
      await joindropdown1.findElement(By.css("*[value='2']")).click();

      // typedropdown1
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='type']"
          )
        )
        .click();
      const typedropdown1 = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='type']"
        )
      );
      await typedropdown1.findElement(By.css("*[value='accesssince']")).click();

      // add
      await driver
        .findElement(By.css("button[data-filteraction='add']"))
        .click();

      // joindropdown2
      await driver.wait(
        until.elementLocated(
          By.css(
            "div[data-filterregion='filter']:nth-child(2) select[data-filterfield='join'"
          )
        )
      );
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filter']:nth-child(2) select[data-filterfield='join'"
          )
        )
        .click();
      const joindropdown2 = await driver.findElement(
        By.css(
          "div[data-filterregion='filter']:nth-child(2) select[data-filterfield='join'"
        )
      );
      await joindropdown2.findElement(By.css("*[value='2']")).click();

      // typedropdown2
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filter']:nth-child(2) select[data-filterfield='type'"
          )
        )
        .click();
      const typedropdown2 = await driver.findElement(
        By.css(
          "div[data-filterregion='filter']:nth-child(2) select[data-filterfield='type'"
        )
      );
      await typedropdown2.findElement(By.css("*[value='roles']")).click();

      // select li value
      await driver.wait(
        until.elementLocated(
          By.xpath("(//div[@data-filterregion='value'])[2]//span")
        )
      );
      await driver
        .findElement(By.xpath("(//div[@data-filterregion='value'])[2]//span"))
        .click();
      await driver
        .findElement(
          By.xpath(
            "//div[@data-filterregion='value']//li[contains(text(), 'Student')]"
          )
        )
        .click();

      await driver
        .findElement(By.css("button[data-filteraction='apply']"))
        .click();

      await driver.sleep(10000);

      await driver.findElement(By.css("a[data-action='showcount']")).click();

      await driver.sleep(10000);

      try {
        await driver.findElement(
          By.xpath(
            "//*[@id=\"participants\"]//td[contains(text(), 'jeffreysanders199@example.com')]"
          )
        );
        throw new Error("Filter results is wrong.");
      } catch (error) {}

      try {
        const available = await driver.findElement(
          By.xpath(
            "//*[@id=\"participants\"]//td[contains(text(), 'carolynwelch140@example.com')]"
          )
        );
        assert(available);
      } catch (error) {
        throw new Error("Filter results is wrong.");
      }
    });

    it("Alternative - No filter being filled", async function () {
      const precount = await driver
        .findElement(
          By.css("#participantsform p[data-region='participant-count']")
        )
        .getText();
      const prenum = await driver.executeScript(
        "return arguments[0].match(/^\\d+/);",
        precount
      );

      await driver
        .findElement(By.css("button[data-filteraction='apply']"))
        .click();
      await driver.sleep(10000);

      const postcount = await driver
        .findElement(
          By.css("#participantsform p[data-region='participant-count']")
        )
        .getText();
      const postnum = await driver.executeScript(
        "return arguments[0].match(/^\\d+/);",
        postcount
      );
      try {
        assert(prenum[0] === postnum[0]);
      } catch (error) {
        throw new Error("Filter results is wrong.");
      }
    });

    it("Alternative - No result founded", async function () {
      // joindropdow
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='join']"
          )
        )
        .click();
      const joindropdown = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='join']"
        )
      );
      await joindropdown.findElement(By.css("*[value='2']")).click();

      // typedropdown
      await driver
        .findElement(
          By.css(
            "div[data-filterregion='filters'] select[data-filterfield='type']"
          )
        )
        .click();
      const typedropdown = await driver.findElement(
        By.css(
          "div[data-filterregion='filters'] select[data-filterfield='type']"
        )
      );
      await typedropdown.findElement(By.css("*[value='roles']")).click();

      // select li value
      await driver.wait(
        until.elementLocated(
          By.xpath("//div[@data-filterregion='value']//span")
        )
      );
      await driver
        .findElement(By.xpath("//div[@data-filterregion='value']//span"))
        .click();
      await driver
        .findElement(
          By.xpath(
            "//div[@data-filterregion='value']//li[contains(text(), 'Guest')]"
          )
        )
        .click();

      // result
      await driver
        .findElement(By.css("button[data-filteraction='apply']"))
        .click();

      await driver.sleep(10000);

      const count = await driver
        .findElement(
          By.css("#participantsform p[data-region='participant-count']")
        )
        .getText();
      const num = await driver.executeScript(
        "return arguments[0].match(/^\\d+/);",
        count
      );

      try {
        assert(num[0] == 0);
      } catch (error) {
        throw new Error("Filter results is wrong.");
      }
    });

    it("Exception - User leaves the sub-field blank", async function () {
      await driver
        .findElement(By.css("button[data-filteraction='add']"))
        .click();
      await driver.sleep(10000);

      await driver.findElement(
        By.css("div[data-filterregion='filter']:nth-child(2)")
      );

      let arr;
      try {
        arr = await driver.findElement(
          By.css("div[data-filterregion='filter']:nth-child(2)")
        );
      } catch {}
      if (arr?.length != 0) {
        throw new Error("New filter still being display.");
      }

      try {
        await driver.findElement(By.css("div.warning"));
      } catch (error) {
        throw new Error("No warning being displayed.");
      }
    });
  });
});
