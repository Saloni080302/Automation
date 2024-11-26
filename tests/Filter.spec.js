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

    //   const doc = new Document({
    //     sections: [
    //         {
    //             children: [

    //                 new Paragraph({
    //                     alignment: AlignmentType.CENTER, 
    //                     children: [
    //                         new TextRun({
    //                             text: "Sanity of Issue",
    //                             bold: true,
    //                         }),
    //                     ],
    //                 }),

    //                 new Paragraph({
    //                     children: [new TextRun("Failed at: "+failedmessage)],
    //                 }),
    //                 new Paragraph({
    //                     children: [
    //                         new ImageRun({
    //                             data: fs.readFileSync(failedscreenshot),
    //                             transformation: {
    //                                 width: 450,
    //                                 height: 350,
    //                             },
    //                         }),
    //                     ],
    //                 }),
    //             ]
    //   }]
    //         })
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
    await expect(page.locator('c-ccp2_-fuso-header').getByRole('img').nth(2)).toBeVisible({timeout:9000});
});
test('Search By Registration Number', async () => {
  await page.getByRole('link', { name: '車両管理' }).click();
  await page.getByPlaceholder('登録番号の下４桁を入力してください').click();
  await page.getByPlaceholder('登録番号の下４桁を入力してください').fill('2222');
  await page.getByPlaceholder('登録番号の下４桁を入力してください').press('Enter');
//   await page.pause();
  await page.waitForTimeout(4000);
  let count = await page.locator('//div[@class="card"]').count();
  if(count==2){
    let digits1 = await page.locator('//p[@class="Datahead"]').nth(0).textContent();
    let digits2 = await page.locator('//p[@class="Datahead"]').nth(6).textContent();
    
    // console.log(digits1.slice(-4) +"    " + digits2.slice(-4));
    if(digits1.slice(-4) == digits2.slice(-4) && digits2.slice(-4)== '2222'){
        console.log('Test Ran Successfully');
    }  
    
    }else{
    test.fail();
    }
  });


  test('Advanced Search Filter Icon', async () => {
    
    await page.getByRole('link', { name: '車両管理' }).click();
    // await page.getByRole('img', { name: 'filter vehicle' }).click();
    // await page.locator('div').filter({ hasText: /^車名$/ }).getByRole('img').click();
    // await page.locator('input[name="マツダ"]').check();
    // await page.locator('div').filter({ hasText: /^車名すべて日産マツダ三菱ふそういすゞUDトラック日野トヨタ$/ }).getByRole('img').click();
    // await page.locator('div').filter({ hasText: /^自動車の種別$/ }).getByRole('img').click();
    // await page.locator('input[name="普通"]').check();
    // await page.locator('div').filter({ hasText: /^自動車の種別すべて普通小型軽自動車大型特殊$/ }).getByRole('img').click();
    // await page.locator('div').filter({ hasText: /^初度登録からの経過期間0 年15 年15年以上$/ }).locator('input[name="rangeTwo"]').fill('6.66666666666');
    // await page.getByText('保存').click();
    await page.getByText('詳細検索').click();
  await page.locator('div').filter({ hasText: /^車名$/ }).getByPlaceholder('選択してください').click();
  await page.locator('input[name="マツダ"]').check();
  await page.getByText('保存').click();

    await page.waitForTimeout(6000);

    let count = await page.locator('//div[@class="card"]').count();
    if(count==2){
      let car1 = await page.locator('//p[@class="Datahead"]').nth(1).textContent();
      let car2 = await page.locator('//p[@class="Datahead"]').nth(7).textContent();
      
      let type1 = await page.locator('//p[@class="Datahead"]').nth(2).textContent();
      let type2 = await page.locator('//p[@class="Datahead"]').nth(8).textContent();
      
      // console.log(digits1.slice(-4) +"    " + digits2.slice(-4));
      if(car1 == car2 && car2 == 'マツダ' && type1==type2 && type2=='普通'){
          console.log('Test Ran Successfully');
      }
      }else{
      test.fail();
      }
  });

  test('Branch Selection', async () => {
    await page.getByRole('link', { name: '車両管理' }).click();
    await page.locator('div').filter({ hasText: /^所属先$/ }).getByRole('img').click();
    let bName = await page.locator('//div[@class="mm-filter-dropdown-rows"]').nth(1).textContent();
    console.log(bName);
    
    await page.locator('input[name="すべて"]').check();
    await page.locator('input[name="すべて"]').uncheck();
    
    await page.locator('//input[@type="checkbox"]').nth(1).click();
    
    await page.locator('.mm-drop-down-icon2').click();
    await page.waitForTimeout(3000);
    await page.locator('//div[@class="card"]').nth(0).click();
    await page.waitForTimeout(3000);
    
    if(await page.locator('//h3[@class="branch-All"]').isVisible({timeout:5000})){
      console.log('Visible');
      await page.locator('//h3[@class="branch-All"]').click();
    
      let bNumber = await page.locator('//div[@class="branch-card"]').count();
    
      for( var i=1 ; i <= bNumber ; i++ ){
        const branchCard = page.locator('//div[@class="branch-card"]/p').nth(i - 1);
        const titlebranch = await branchCard.getAttribute('title');
        // console.log("i-- "+titlebranch);
        // let titletext = await titlebranch.textContent();
        
        if (titlebranch && titlebranch.trim() === bName) {

          console.log('Test Ran successfully - Match found:', titlebranch);
          await page.locator('lightning-icon').filter({ hasText: 'Close' }).locator('svg').click();

          break;
        }else if(i!=bNumber){
          continue;
        }else{
          test.fail();
        }
    
      }
      
    }else{
      console.log('Not visible');
      const branchTitle = await page.locator('//div[@class="branches"]/h3').first();
      const title = await branchTitle.getAttribute('title');
      if(title && title == bName){
        console.log('Test Ran successfully - Match found:', title);
      }else{
        test.fail();
      }
    }
    });

    
    test('Sorting', async () => {
      await page.getByRole('link', { name: '車両管理' }).click();
      await page.getByText('並び替え').click();
      await page.locator('div').filter({ hasText: /^走行距離（長→短）$/ }).getByRole('radio').check();
      await page.locator('div').filter({ hasText: /^保存$/ }).click();
    
      var countDetails = await page.locator('//div[@class="details"]').count();
      var countDetailsD = await page.locator('//div[@class="details-deleted"]').count();
      await page.waitForTimeout(3000);
    
      if (countDetails > 1) {
        var mileage = await page.locator('//p[@class="Datahead"]').nth(3).textContent();
        var ans1 = parseInt(mileage?.replace(/,/g, '').replace(' km', ''));
        
        var mileage2 = await page.locator('//p[@class="Datahead"]').nth(9).textContent();
        var ans2 = parseInt(mileage2?.replace(/,/g, '').replace(' km', ''));
    
        console.log(ans1 + " . " + ans2);
        if (!(ans1 && ans2 && ans1 < ans2)) {
          console.log('Failedd!!! at if');
          test.fail();
        }
      } else if (countDetailsD > 1) {
        var mileage = await page.locator('//p[@class="Datahead-deleted"]').nth(3).textContent();
        var ans1 = parseInt(mileage?.replace(/,/g, '').replace(' km', ''));
        
        var mileage2 = await page.locator('//p[@class="Datahead-deleted"]').nth(9).textContent();
        var ans2 = parseInt(mileage2?.replace(/,/g, '').replace(' km', ''));
    
        console.log(ans1 + "  " + ans2);
        if (!(ans1 && ans2 && ans1 < ans2)) {
          console.log('Failedd!!! at if2');
          test.fail();
        }
      }
      console.log('Passedd!!!');
    });
    
  });

// //div[@class="mm-filter-dropdown-rows"]