import {Page} from '@playwright/test'

export async function getUserToken({ page }: { page: Page }) {
    // await page.goto('https://wms.staging.akitahub.com')
    await page.waitForNavigation()
    const localStorage = JSON.parse(await page.evaluate(() => JSON.stringify(window.localStorage)))
    let userToken = localStorage["akt.warehouseData"]
    userToken = JSON.parse(userToken)
    console.log(typeof(userToken))
    console.log(userToken.accessToken)
    return userToken
}

