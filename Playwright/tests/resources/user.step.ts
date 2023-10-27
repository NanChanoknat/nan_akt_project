import {Page} from '@playwright/test'

export async function login(page: Page, username: string, password: string) {
    await page.goto('https://wms.staging.akitahub.com/');
    await page.waitForNavigation()
    await page.fill("[id='1-email']", username);
    await page.locator('xpath = //input[@type="password"]').fill(password);
    await page.locator('xpath = //button[@name="submit"]').click();
}

export async function selectStore(page: Page) {
    await page.locator('xpath = //div[contains(@class, "store-list-container")]/div[1]/a').click();
}
