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
    await page.waitForTimeout(6000);

  });

  
  test('Download Vehicle List', async () => {
  await page.getByRole('link', { name: '車両管理' }).click();
  await page.getByText('ダウンロード').click();
  await page.locator('div').filter({ hasText: /^次へ$/ }).click();
  await page.getByPlaceholder('名前を入力してください。').click();
  await page.getByPlaceholder('名前を入力してください。').fill('DownloadAllVehicles22.csv');
//   await page.locator('//p[@class="buttontxt2"]').click();

await page.waitForTimeout(2000);
  const [download] = await Promise.all([
    page.waitForEvent('download'),  // Wait for the download event
    page.click('//p[@class="buttontxt2"]')  // Trigger the download
]);


// Get the path of the downloaded file
const path = await download.path();

console.log(`Downloaded file path: ${path}`);

// Optionally, validate the file's existence or properties
const fs = require('fs');
if (fs.existsSync(path)) {
    console.log('File downloaded successfully from List!');
} else {
    console.log('File download failed.');
    test.fail();
}



  });

  test('Download Vehicle Detail', async () => {
    await page.getByRole('link', { name: '車両管理' }).click();
    await page.locator('//div[@class="card"]').first().click();
    await page.getByText('ダウンロード').click();
    await page.getByPlaceholder('名前を入力してください。').click();
    await page.getByPlaceholder('名前を入力してください。').fill('DownloadAllVehicle2024.csv');
    // await page.locator('p').filter({ hasText: /^ダウンロード$/ }).click();

    await page.waitForTimeout(2000);
  const [download] = await Promise.all([
    page.waitForEvent('download'),  // Wait for the download event
    await page.locator('p').filter({ hasText: /^ダウンロード$/ }).click()
    // Trigger the download
]);


// Get the path of the downloaded file
const path = await download.path();

console.log(`Downloaded file path: ${path}`);

// Optionally, validate the file's existence or properties
const fs = require('fs');
if (fs.existsSync(path)) {
    console.log('File downloaded successfully from detail!');
} else {
    console.log('File download failed.');
    test.fail();
}
  });

});