const { chromium } = require('playwright');
const expect = require('expect');


async function login_oms() {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await browser.newPage();
 
// login 
    await page.goto('https://oms.staging.akitahub.com');
    await page.fill("[id='1-email']",'j@gmail.com');
    await page.locator('xpath = //input[@type="password"]').fill('Ananyaporn24');
    await page.locator('xpath = //button[@type="submit"]').click();
    await page.locator('xpath = //div/div[2]/div/div/div/div[3]/div[1]/div/div/div[2]/a[1]/div/div[2]').click();
   
// create order
    await page.goto('https://oms.staging.akitahub.com/230/order-list');
    await page.locator('xpath = //div[contains(@class, "main-content")]/div[2]/div/div/div/div[2]/button').click();
    await page.locator('xpath = //input[@placeholder="ค้นหาสินค้า"]').fill('P-105-1');
    await page.locator('xpath = //table/tbody/tr[3]/td[7]/button').click();
    await page.locator('xpath = //div[contains(text() , " ส่วนลด ")]/parent::div/div[2]/div/div[2]/div/div/input').fill('50');
    
   
    // await page.locator('xpath = //div/div[2]/div/div[2]/div/div[2]/div/div[2]/div[2]/div[3]/div[1]/div[2]/div/div/div/div').click();
    // await page.locator('xpath = //input[@name="logisticStoreChannels/0"]/parent::div/parent::div/parent::div/following-sibling::ul/div[2]').click();
   
    await page.screenshot({path:'login.png'});

    // const storageState = await context.storageState({path: 'token.json'});
    // console.log(storageState);


    
    // await context.close();
    await browser.close();
  }
  
  login_oms();