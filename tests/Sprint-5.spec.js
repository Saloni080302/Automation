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
            const filePath = path.resolve(screenshotsFolder, 'test-failed.docx');
        }

})

let login_page_screenshot = path.resolve(screenshotsFolder,'loginpage.png');
let Home_page_screenshot = path.resolve(screenshotsFolder,'Homepage_screenshot.png');
let Delete_vehicle_screenshot = path.resolve(screenshotsFolder,'VehicleDeleted.png')
  test('login', async() => {
    browser = await chromium.launch({headless : false})
    page = await browser.newPage();
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

          // await page.pause();
          await page.waitForTimeout(3000);
          await page.locator('//div[@class="card"]').nth(1).click();  
          await page.waitForTimeout(2000);

          await page.getByText('車両削除').click();
          await page.getByPlaceholder('選択してください').click();
          await page.locator('div').filter({ hasText: /^売却$/ }).click();
          await page.locator('div').filter({ hasText: /^削除する$/ }).click();
          await page.locator('div').filter({ hasText: /^はい$/ }).click();
          await page.waitForTimeout(3000);

          await page.locator('//*[@class="slds-icon slds-icon-text-default slds-icon_x-small"]').nth(0).click();
          await page.waitForTimeout(6000);
          var countDetailsD1 = await page.locator('//div[@class="details-deleted"]').count();
          // await page.waitForTimeout(4000);
          console.log(countDetailsD1);
          if(countDetailsD1 != countDetailsD + 1){
          test.fail();
          }else{
          console.log('Test Passed Successfully, vehicle Deleted!!')
          }
      });
          
      test('recover', async () => {
       
        await page.getByRole('link', { name: '車両管理' }).click();
        await page.waitForTimeout(4000);

        await page.waitForTimeout(4000);

        var countDetailsD = await page.locator('//div[@class="details-deleted"]').count();
        console.log(countDetailsD);
          await page.pause();

        await page.locator('//div[@class="details-deleted"]').nth(0).click();
                await page.getByText('削除を取り消す').click();
        await page.locator('div').filter({ hasText: /^はい$/ }).click();
        var countDetailsD1 = await page.locator('//div[@class="details-deleted"]').count();
        // await page.waitForTimeout(4000);
        console.log(countDetailsD1);
        if(countDetailsD1 != countDetailsD - 1){
        test.fail();
        }else{
        console.log('Test Passed Successfully, vehicle Recovered!!')
        }
      });

      test('MaintainceInfo', async () => {
        await page.getByRole('link', { name: '車両管理' }).click();
        await page.waitForTimeout(4000);
        await page.getByRole('heading', { name: 'RV-000248' }).click();
        await page.waitForTimeout(1000);
      
        await page.getByRole('button', { name: '整備情報' }).click();
        await page.waitForTimeout(1000);
        
        await page.getByText('種別', { exact: true }).click();
        await page.locator('input[name="All"]').uncheck();
        await page.locator('input[name="Option 2"]').check();
        await page.waitForTimeout(1000);
        
        let filter = await page.locator('//span[@class="table-row-item"]').nth(0).textContent();
        await page.waitForTimeout(1000);
        
        if(filter != '車検整備'){
          test.fail();
        }else{
          console.log('Maintaince Info Filter, Success!');
        }
      
        await page.waitForTimeout(1000);
      
        await page.locator('//div[@class="half bottom"]').click();
        await page.waitForTimeout(1000);
      
        await page.getByText('種別', { exact: true }).click();
        await page.locator('input[name="All"]').check();
        await page.locator('//div[@class="half bottom"]').click();
        
      });

      test('MaintenanceHistoryRegistration', async () => {
        // const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
        var destName = `des${timestamp}`;
        // console.log('Destination name' + destName);
        // await page.goto('https://dm595--uat2.sandbox.my.site.com/s/?language=en_US');
        // await page.getByRole('img').nth(1).click();
        // await page.getByRole('link', { name: 'ログイン' }).click();
        // await page.getByPlaceholder('Email Address').click();
        // await page.getByPlaceholder('Email Address').fill('salonicuba@gmail.com');
        // await page.getByPlaceholder('Password').click();
        // await page.getByPlaceholder('Password').fill('Saloni@080302');
        // await page.getByRole('button', { name: 'Continue' }).click();
        // await page.goto('https://dm595--uat2.sandbox.my.site.com/loginflow/loginFlow.apexp?retURL=%2Fapex%2FCommunitiesLanding&sparkID=CCP_LOGINFLOW');
        // await page.getByRole('button', { name: '完了' }).click();
        await page.getByRole('link', { name: '車両管理' }).click();
        await page.locator('//*[@data-id="a1cIo0000023e9uIAA"]').nth(1).click();
        await page.getByRole('button', { name: '整備情報' }).click();
        await page.getByText('整備履歴登録').click();
        await page.locator('input[name="ScheduleType"]').click();
        await page.getByText('3か月点検').click();
        await page.locator('svg').nth(4).click();
        await page.getByRole('button', { name: 'Previous Month' }).dblclick();
        await page.getByRole('button', { name: '7', exact: true }).click();
        await page.getByRole('button', { name: '完了' }).click();
        // await page.locator('input[name="factoryType"]').click();
        await page.locator('//input[@placeholder="選択してください"]').nth(2).click();
        await page.locator('//p[@data-idd="自社"]').click();
        await page.locator('//input[@placeholder="入庫先を入力してください"]').fill(destName);
        await page.getByRole('button', { name: '次へ' }).click();
        await page.locator('.slds-rich-text-area__content').click();
        // await page.getByLabel('Compose text').press('CapsLock');
        await page.getByLabel('Compose text').fill('ABCDEF');
        await page.getByRole('button', { name: '次へ' }).click();
        await page.getByRole('button', { name: '登録する' }).click();
        await page.getByRole('button', { name: '車両詳細へ' }).click();
        // for(var i=0;i<5;i++){
      
        // }
        await page.waitForTimeout(4000);
        let sam ='X';
        let ispresent;
        ispresent = page.locator('//span[@class="table-row-item"]');
      
        for(var i=4;i<=46;i+=7){
          console.log(await page.locator('//span[@class="table-row-item"]').nth(i).isVisible());
          // let isTextPresent = 'wsjwkfcbsd';
          if(await page.locator('//span[@class="table-row-item"]').nth(i).isVisible()==true){
          let isTextPresent =await page.locator('//span[@class="table-row-item"]').nth(i).getAttribute('title');
          console.log(isTextPresent);
          if(isTextPresent == destName){
            console.log(isTextPresent);
            console.log('Maintenance Registration Passed Successfully!!');
            sam = isTextPresent;
            break;
          }
        }else{
          console.log('Failureee!!');
          test.fail()
        }
      }
    });
    
test('NotificationDetail', async () => {
  await page.locator('svg').nth(1).click();
   await page.waitForTimeout(4000);
   var countNotificationBefore = await page.locator('//div[@class="notification-card"]').count();
   console.log("Before:", countNotificationBefore);
 
   await page.waitForTimeout(6000);
 
   var regNumber = await page.locator('//div[@class="notification-data-header"]//h2').nth(0);
     const regNumberText = await regNumber.textContent(); // Retrieve the text content of the element
     console.log(regNumberText); // Print the reg number to the console
                 //   await page.pause();
 
     //  await page.locator('.vehicledetailmove > svg').click();
     await page.locator('.vehicledetailmove').first().click();
 
   await page.waitForTimeout(3000);
 var regNumberDetail = await page.locator('//p[@class="recdata"]').nth(0);
 const regNumberTextDetail = await regNumberDetail.textContent(); 
 console.log(regNumberTextDetail); 
 
 if(regNumberText != regNumberTextDetail){
     console.log('Test Failed!!')
     test.fail();
     }else{
     console.log('Test Passed Successfully!!')
     }
 });

test('NotificationYesIUnderstand', async () => {
 await page.locator('svg').nth(1).click();
  await page.waitForTimeout(4000);
  var countNotificationBefore = await page.locator('//div[@class="notification-card"]').count();
  console.log("Before:", countNotificationBefore);
  await page.waitForTimeout(3000);
//   var regNumber = await page.locator('//div[@class="notification-data-header"]//h2');
//     const regNumberText = await regNumber.textContent(); // Retrieve the text content of the element
//     console.log(regNumberText); // Print the reg number to the console
//                 //   await page.pause();
  await page.getByText('確認済みにする').first().click();
//   await page.waitForTimeout(6000);
  var countNotificationAfter = await page.locator('//div[@class="notification-card"]').count();
  console.log("After:",countNotificationAfter);
  if(countNotificationBefore != countNotificationAfter + 1){
    test.fail();
    }else{
    console.log('Test Passed Successfully!!')
    }
  
});

});
