import {test, expect} from '@playwright/test'

const PAGE_URL = 'https://oms.staging.akitahub.com'
const USERNAME = 'nan2115@mail.com'
const PASSWORD = 'Aa@12345'

test('Login oms', async function Login_oms({browser, page}) {

    const context = await browser.newContext()
    await page.goto(PAGE_URL)
    await page.locator('//input[@id="1-email"]').fill(USERNAME)
    await page.locator('//input[@type="password"]').fill(PASSWORD)
    await page.locator('//button[@type="submit"]').click()
    await page.locator('//div[contains(@class, "store-list-container")]/a[1]').click()
    
    const localStorage = JSON.parse(await page.evaluate(() => JSON.stringify(window.localStorage)))
    console.log(localStorage)

    await context.close()
})