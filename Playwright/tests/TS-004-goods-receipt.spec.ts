import {test, expect} from '@playwright/test'
import {login, selectStore} from './resources/user.step'
import {config} from './config'
import {getShelfByStoreName} from './resources/shelf.repository'
import {getFirstValue} from './resources/goods-receipt-list.repository'
import * as grVariable from './variable/gr.variable'


test.describe('TS-004: Good receipt', ()=> {
    test('Create goods receipt' , async ({browser, page}) => {
        const context = await browser.newContext();
        test.setTimeout(120000)
    // login 

        await login(page, config.USERNAME, config.PASSWORD)
        await selectStore(page)
    
    // create goods_receipt
        await page.locator(grVariable.grList).click();
        await page.locator(grVariable.createGr).click();
        await page.locator(grVariable.inputStore1).click();
        await page.locator('xpath = //div[@class="v-list-item__title"]/parent::div/parent::div/parent::div/div[2]').click();

        const input_product_id = await page.locator(grVariable.inputProduct);
        await input_product_id.fill('Bee001-1');
        await input_product_id.press('Enter');

        await page.locator(grVariable.addProductButton).click();
        await page.locator(grVariable.inputNumberOfGr).fill('10');
        await page.locator(grVariable.saveGrButton).click();
        await page.locator(grVariable.confirmGrButton).click();
        await page.screenshot({path:'create_good_receipt.png'});  
        await browser.close();
    })

    test('Pickup goods receipt' ,  async ({browser, page}) => {
        const context = await browser.newContext();
        test.setTimeout(120000)
    // login 
        await login(page, config.USERNAME, config.PASSWORD)
        await selectStore(page)
        
    
    // pickup goods_receipt
        await page.locator(grVariable.grList).click();
        await page.locator(grVariable.selectFristGr).click();
        await page.locator(grVariable.signButton).click();

        // Wait for the canvas element to load
        const canvas = await page.waitForSelector(grVariable.signCanvas);
        const canvas_locator = page.locator(grVariable.signCanvas);
        
        // Get the bounding box of the canvas
        const canvasBoundingBox = await canvas.boundingBox();
        // console.log(canvasBoundingBox);

        // Calculate the center coordinates of the canvas
        const centerX = canvasBoundingBox.x + canvasBoundingBox.width / 2;
        const centerY = canvasBoundingBox.y + canvasBoundingBox.height / 2;

        // Click on the center of the canvas
        await canvas_locator.click(centerX, centerY);
        // await canvas_locator.mouse.move(centerX, centerY);
        // await canvas_locator.mouse.down();   
        
        await page.locator(grVariable.saveSignButton).click();

        await page.waitForTimeout(3000);
        await page.screenshot({path:'pickup_good_receipt.png'});  
        await browser.close();
    })


    test('QC goods receipt' , async ({browser, page}) => {
        const context = await browser.newContext();
        test.setTimeout(120000)
    // login 
        await login(page, config.USERNAME, config.PASSWORD)
        await selectStore(page)
        
    // qc goods_receipt
        await page.locator('xpath = //a[@href="/goods-receipt-list?tab=pending"]').click();
        await page.locator('xpath = //div[contains(text(),"ตรวจสอบสินค้า")]').click();
        await page.screenshot({path:'click_qc_good_receipt.png'});
        await page.locator('xpath = //tbody/tr[1]/td[7]/button[1]').click();
        // await page.locator('xpath = //button[@class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--default orange accent-4"]').click();
        await page.screenshot({path:'before_qc_good_receipt.png'});

        await page.locator('xpath = //div[@class="d-flex justify-center"]//img').click();
        await page.locator('xpath = //button[@class="v-btn v-btn--text theme--light v-size--default"]').click();
        await page.locator('xpath = //tr[@class="_qc-table-row _last-box"]').click();
        const number = await page.locator('xpath = //td[4]').innerText();
        console.log(number);
        await page.locator('xpath = //td[5]//input').fill(number);
        await page.locator('xpath = //td[10]//input').fill('0.1');

        await page.locator('xpath = //td[12]/button').click();
        

        // Enable the "dialog" event to handle notifications
        page.on('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        
        // Wait for the dialog (notification) to appear
        await page.waitForEvent('dialog');

        await page.locator('xpath = //button[@class="ml-4 v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--default primary"]').click();
        await page.waitForTimeout(3000);
        await page.screenshot({path:'qc_good_receipt.png'});
        await browser.close();
    })


    test('Map goods receipt' , async ({browser, page}) => {
        const context = await browser.newContext();
        test.setTimeout(120000)
    
    // login 
        await login(page, config.USERNAME, config.PASSWORD)
        await selectStore(page)    

    // map goods_receipt
        const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJkMjF6TFhOMFowQmhhMmwwWVRweGQyVnlkSGt4TWpNMFFBPT0iLCJkaXNwbGF5TGFuZ3VhZ2UiOnsiY29kZTIiOiJUSCIsImNvZGUzIjoiVEhBIiwibmFtZSI6IlRoYWlsYW5kIiwiaWQiOjEwNn0sInByZWZBdXRvTWVzc2FnZUxhbmd1YWdlIjoiVEgiLCJzdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVkQnkiOnsiZW1haWwiOiJzeXN0ZW1AYWtpdGFodWIuY29tIn0sInVwZGF0ZWRCeSI6eyJlbWFpbCI6InN5c3RlbUBha2l0YWh1Yi5jb20ifSwid2FyZWhvdXNlIjp7InN0YXR1cyI6ImFjdGl2ZSIsInR5cGUiOiJ2ZW5kb3IiLCJuYW1lIjoiTmFuIDIxMTUiLCJzaG9ydG5lc3NOYW1lIjoiTmFuIDIxMTUiLCJwcm92aWRlciI6eyJuYW1lIjoidmVuZG9yX2FraXRhIiwidHlwZSI6InZlbmRvciIsImlkIjoiNWYzY2ZhNTRmMTFhZmVlZWI5ZjIxZmYxIn0sImNvZGUiOiIxNjc2NTI5MDk1NzE3IiwiaWQiOiI2M2VkY2RjNzBiYmNkYjM3YWExYzM1OTcifSwicm9sZXMiOlt7InBlcm1pc3Npb25zIjpbInN0b3JlLnN0b3JlLioiLCJzdG9yZS5zdG9yZS5yZWFkIiwic3RvcmUuc3RvcmUuY3JlYXRlIiwic3RvcmUuc3RvcmUuZWRpdCIsInN0b3JlLnN0b3JlLmRlbGV0ZSIsInN0b3JlLmlkZW50aWZ5LmFwcHJvdmUiLCJzdG9yZS5pZGVudGlmeS5yZWplY3QiLCJ3bXMucHJpY2luZ1BsYW4uKiIsIndtcy5wcmljaW5nUGxhbi5yZWFkIiwid21zLnByaWNpbmdQbGFuLmNyZWF0ZSIsIndtcy5wcmljaW5nUGxhbi5lZGl0Iiwid21zLndhcmVob3VzZS4qIiwid21zLndhcmVob3VzZS5yZWFkIiwid21zLndhcmVob3VzZS5jcmVhdGUiLCJ3bXMud2FyZWhvdXNlLmVkaXQiLCJ3bXMud2FyZWhvdXNlLmRlbGV0ZSIsIm1hbmFnZW1lbnQucm9sZS4qIiwibWFuYWdlbWVudC5yb2xlLnJlYWQiLCJtYW5hZ2VtZW50LnJvbGUuY3JlYXRlIiwibWFuYWdlbWVudC5yb2xlLmVkaXQiLCJtYW5hZ2VtZW50LnJvbGUuZGVsZXRlIiwibG9naXN0aWMudHJhY2tpbmdOdW1iZXIuKiIsImxvZ2lzdGljLnRyYWNraW5nTnVtYmVyLnJlYWQiLCJsb2dpc3RpYy50cmFja2luZ051bWJlci5jcmVhdGUiLCJvcmRlci1yZXBvcnQub3JkZXIuKiIsIm9yZGVyLXJlcG9ydC5vcmRlci5yZWFkIiwib3JkZXItcmVwb3J0Lm9yZGVyLmV4cG9ydCIsIm9yZGVyLXJlcG9ydC5pbnZvaWNlLioiLCJvcmRlci1yZXBvcnQuaW52b2ljZS5yZWFkIiwib3JkZXItcmVwb3J0Lmludm9pY2UuZXhwb3J0Iiwid21zLmZ1bGZpbGxtZW50UmVwb3J0LioiLCJ3bXMuZnVsZmlsbG1lbnRSZXBvcnQucmVhZCIsIndtcy5mdWxmaWxsbWVudFJlcG9ydC5leHBvcnQiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LioiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LnJlYWQiLCJ3bXMuZ29vZHNSZWNlaXB0UmVwb3J0LmV4cG9ydCIsIndtcy5wYXJjZWxSZXBvcnQuKiIsIndtcy5wYXJjZWxSZXBvcnQucmVhZCIsIndtcy5wYXJjZWxSZXBvcnQuZXhwb3J0Iiwib3JkZXIub3JkZXJSZXBvcnQuKiIsIm9yZGVyLm9yZGVyUmVwb3J0LnJlYWQiLCJvcmRlci5vcmRlclJlcG9ydC5leHBvcnQiLCJ3bXMuKiJdLCJuYW1lIjoibWFuYWdlciIsImlkIjoiNjNlZGNkYzcwYmJjZGI1ODI2MWMzNTk5In1dLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTE2VDA2OjM3OjEzLjc2OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTE2VDA2OjM3OjEzLjc2OVoiLCJpZCI6NTcyLCJsYXN0TmFtZSI6IjIxMTUiLCJ0ZWwiOiIwOTAwMDA5MDk4IiwiZmlyc3ROYW1lIjoiTmFuIiwiZW1haWwiOiJuYW4yMTE1d21zQG1haWwuY29tIiwiaWF0IjoxNjg1Njc4MzA1LCJleHAiOjE3MTcyMTQzMDV9.JOLRlmMKpSwaxnBb0mZJEm46VFO5XS-T5Du3mia5Z-M"

        await page.locator('xpath = //a[@href="/goods-receipt-list?tab=pending"]').click();
        await page.locator('xpath = //div[contains(text()," รอจัดเก็บ ")]').click();
        
        // await page.waitForRequest('https://api.staging.akitahub.com/wms/goods-receipt-item-boxes?state=using&page=1&limit=10&search=&order=desc&sort-by=shelveFinishedAt');
        
        const firstValue = await getFirstValue(userToken)
        const store_name = firstValue.store_name

        await page.setViewportSize({ width: 390, height: 844 });
        await page.locator('xpath = //a[@class="elevation-6 v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-btn--active v-size--default primary"]').click();
        await page.locator('xpath = //img[@src="/img/qr-code.png"]').click();
        await page.keyboard.type(firstValue.response);
        await page.keyboard.press('Enter');
        await page.locator('xpath = //a[@class="title v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded v-btn--router theme--light v-size--large primary"]').click();
        
        
        await page.locator('xpath = //img[@src="/img/qr-code.png"]').click();
        const returnedText = await getShelfByStoreName(userToken,store_name);
        await page.keyboard.type(returnedText);
        await page.keyboard.press('Enter');
        await page.locator('xpath = //button[@class="_w-60-percent v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--large primary"]').click();
        await page.waitForTimeout(5000);

        await page.screenshot({path:'map_good_receipt.png'});  
        await browser.close();
    })
})