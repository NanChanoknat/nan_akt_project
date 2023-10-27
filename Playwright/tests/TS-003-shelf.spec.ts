import {test, expect, Page} from '@playwright/test'
import {login, selectStore} from './resources/user.step'
import {config} from './config'

// Delay FYI : 1000 milliseconds (1 seconds)
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


test.describe('TS-002 Find Shelf', () => {
    test('TC-001 Get shelf from shop name', async ({page}) => {
        const storeName = 'Nan Inven'
        await login(page, config.USERNAME, config.PASSWORD)
        test.setTimeout(60000);
        await selectStore(page)

        // Enable request interception
        await page.route('**', (route) => {
            route.continue();
        })

        await page.locator('xpath = //a[@href="/setting"]').click();
        await page.locator('xpath = //a[@href="/setting/shelf-management"]').click();
        await page.locator('xpath = //button[@class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--default primary"]').click();
        await page.locator('xpath = //a[@href="#"]').click();

        await page.waitForRequest('https://api.staging.akitahub.com/wms/rows?floor=&search=&limit=-1&sort-by=row&order=asc');
        
        // Find the network request in the DevTools Network tab
        const request = await page.waitForEvent('requestfinished', (request) =>
        request.url().includes()
        );   

        // Access the response body
        const response = await request.response()
        const responseBody = await response.json()

        const shelf_json = {
            code: "A-1-1",
            floor: "1",
            id: "63edd3680bbcdb88521c35c5",
            row:"A",
            size:1,
            type:"shelf"
        };

        const number_of_tiers = responseBody.data[0].tiers;
        // console.log(number_of_tiers.length);
        outerLoop: for (let i = 0; i < number_of_tiers.length; i++){
            // console.log('tiers ',responseBody.data[0].tiers[i].id);
            const number_of_shelves = responseBody.data[0].tiers[i].shelves;
            // console.log('have ',number_of_shelves.length,' slevles');
            for (let j = 0; j < number_of_shelves.length; j++){
                const shelf = responseBody.data[0].tiers[i].shelves[j];
                // console.log('shelves ', shelf.code);
                // console.log('store ', shelf.store.name);
                if (shelf.store.name === storeName ) {
                    // console.log('Found the same name!');
                    // console.log(store_name);
                    shelf_json.code = shelf.code,
                    shelf_json.floor = shelf.floor,
                    shelf_json.id = shelf.id,
                    shelf_json.row = shelf.row,
                    shelf_json.size =shelf.size

                    break outerLoop;
                } else { continue; }
            }

        }

        const json_shelf = JSON.stringify(shelf_json);
        console.log(json_shelf);
        // await page.waitForTimeout(5000);
        await page.screenshot({path:'shelf.png'});  
    })
})
