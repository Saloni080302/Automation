import { test,expect, chromium } from '@playwright/test';
const path = require('path')
import exp from 'constants';
const fs = require('fs');
import { json } from 'stream/consumers';
// const { Document, Packer, Paragraph, TextRun, AlignmentType, ImageRun } = require('docx');
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
let userdata;
// userdata = JSON.parse(JSON.stringify(require('./ccp_data.json')));
let browser,page; 
let failedmessage;
let screenshotsFolder = path.resolve(__dirname, '../screenshots');
var email = `testemail${timestamp}@gmail.com`

let failedscreenshot = path.resolve(__dirname, 'issue.png');
test.describe.serial('Regression Automation',()=>{

  test.afterEach(async({},testinfo)=>{

    if(testinfo.status == 'failed'){
      failedmessage = testinfo.title;
      await page.screenshot({path:failedscreenshot,fullPage:true});

      const doc = new Document({
        sections: [
            {
                children: [

                    new Paragraph({
                        alignment: AlignmentType.CENTER, 
                        children: [
                            new TextRun({
                                text: "Sanity of Issue",
                                bold: true,
                            }),
                        ],
                    }),

                    new Paragraph({
                        children: [new TextRun("Failed at: "+failedmessage)],
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: fs.readFileSync(failedscreenshot),
                                transformation: {
                                    width: 450,
                                    height: 350,
                                },
                            }),
                        ],
                    }),
                ]
      }]
            })
            const buffer = await Packer.toBuffer(doc);
            const filePath = path.resolve(screenshotsFolder, 'test-failed.docx');
            fs.writeFileSync(filePath, buffer);
        }

})

let login_page_screenshot = path.resolve(screenshotsFolder,'loginpage.png');
let Home_page_screenshot = path.resolve(screenshotsFolder,'Homepage_screenshot.png');
let Delete_vehicle_screenshot = path.resolve(screenshotsFolder,'VehicleDeleted.png')
  test('login', async() => {
    browser = await chromium.launch({headless : false})
    page = await browser.newPage();

    // await page.goto('https://dm595--uat2.sandbox.my.site.com/s');

    // await page.getByPlaceholder('Username').click();
    // await page.screenshot({path:login_page_screenshot});
    // await page.getByPlaceholder('Username').fill('sahil.hans@cubastion.com.uat2');
    // await page.waitForTimeout(1000);
    // await page.getByPlaceholder('Password').click();
    // await page.getByPlaceholder('Password').fill('abcd@1234');
    // await page.waitForTimeout(1000);
    // await page.getByRole('button', { name: 'Log in' }).click();
    await page.goto('https://dm595--uat2.sandbox.my.site.com/s/?language=en_US');
    await page.getByRole('img').nth(1).click();
    await page.getByRole('link', { name: 'ログイン' }).click();
    await page.getByPlaceholder('Email Address').click();
    await page.getByPlaceholder('Email Address').fill('salonicuba@gmail.com');
    await page.getByPlaceholder('Password').fill('Saloni@080302');
    await page.getByPlaceholder('Password').press('Enter');
    
    await page.waitForTimeout(7000);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('c-ccp2_-fuso-header').getByRole('img').nth(2)).toBeVisible({timeout:9000});
    await page.screenshot({path:Home_page_screenshot,fullPage:true});
    console.log("Login Sucessfully");
  });

  
test('Delete Vehicle', async () => {
    await page.getByRole('link', { name: '車両管理' }).click();
    await page.waitForTimeout(4000);
    var countDetailsD = await page.locator('//div[@class="details-deleted"]').count();
    console.log(countDetailsD);

    await page.waitForTimeout(3000);
    await page.locator('//div[@class="card"]').nth(1).click();
    await page.waitForTimeout(2000);
    // await page.pause();
    await page.getByText('車両削除').click();
    await page.getByText('はい').click();
    await page.getByPlaceholder('選択してください').click();
    await page.locator('div').filter({ hasText: /^削除済み$/ }).click();
    await page.locator('div').filter({ hasText: /^削除理由$/ }).getByPlaceholder('選択してください').click();
    await page.getByText('廃車').click();
    await page.getByText('保存').click();
    await page.waitForTimeout(3000);
    await page.screenshot({path:Delete_vehicle_screenshot,fullPage:true});

    await page.locator('//*[@class="slds-icon slds-icon-text-default slds-icon_x-small"]').nth(0).click();
    await page.waitForTimeout(6000);
    var countDetailsD1 = await page.locator('//div[@class="details-deleted"]').count();
    await page.waitForTimeout(4000);
    console.log(countDetailsD1);
    if(countDetailsD1 != countDetailsD + 1){
        test.fail();
    }else{
        console.log('Test Passed Successfully, vehicle Deleted!!')
    }
  });

});