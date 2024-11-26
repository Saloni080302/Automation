import { test,expect, chromium } from '@playwright/test';
const path = require('path')
import exp from 'constants';
const fs = require('fs');
import { json } from 'stream/consumers';
// const { Document, Packer, Paragraph, TextRun, AlignmentType, ImageRun } = require('docx');
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');

let userdata;
var create;
var edit;
userdata = JSON.parse(JSON.stringify(require('./ccpData.json')));
create = userdata.Create;
edit = userdata.Edit;
// let userdata;
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
let UserManagement_page_screenshot = path.resolve(screenshotsFolder,'UserManagement.png');
let UserAdd_page_screenshot = path.resolve(screenshotsFolder,'UserAdd_page.png');
let UserAdd2_page_screenshot = path.resolve(screenshotsFolder,'UserAddscreen_2.png');
let UserAddedconfirmed_screenshot = path.resolve(screenshotsFolder,'UserAddedconfirmed.png');

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



  var branchName = `Branch${timestamp}`;


  test.skip('Create Branch', async () => {
    await page.locator('c-ccp2_-fuso-header').getByRole('img').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: '所属管理' }).click();
    await page.waitForTimeout(2000);
    await page.getByText('所属追加').click();
    await page.waitForTimeout(2000);
    await page.locator('div').filter({ hasText: /^必須$/ }).getByPlaceholder('入力してください').click();
    await page.waitForTimeout(1000);
    await page.locator('div').filter({ hasText: /^必須$/ }).getByPlaceholder('入力してください').fill(branchName);
    await page.waitForTimeout(2000);
    //await page.getByPlaceholder('入力してください').nth(1).click();
    //await page.getByPlaceholder('入力してください').nth(1).fill('Delhi');
    await page.getByPlaceholder('郵便番号を入力してください').click();
    await page.getByPlaceholder('郵便番号を入力してください').fill(userdata.BranchCreate.postalcode);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('例：東京都').click();
    await page.getByPlaceholder('例：東京都').fill(userdata.BranchCreate.prefectures);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('例：品川区品川').click();
    await page.getByPlaceholder('例：品川区品川').fill(userdata.BranchCreate.municipalities);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('例：4-6-').click();
    await page.getByPlaceholder('例：4-6-').fill(userdata.BranchCreate.streetAddress);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('例：〇〇マンション000号/会社名など').click();
    await page.getByPlaceholder('例：〇〇マンション000号/会社名など').fill(userdata.BranchCreate.BuildingName);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('入力してください').nth(2).fill(userdata.BranchCreate.telephone);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('選択してください').first().click();
    await page.waitForTimeout(1000);
    // await page.getByText('New User1').click();
    // await page.waitForTimeout(1000);
    const firstOption = await page.locator('.lists .list-item').first();
    await firstOption.click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('選択してください').first().click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('選択してください').nth(1).click();
    // await page.waitForTimeout(1000);
    // await page.locator('div').filter({ hasText: /^RV-000039$/ }).click();
    // await page.waitForTimeout(1000);
    // await page.getByText('RV-000038').click();
    // await page.waitForTimeout(1000);
    const secondOption = await page.locator('.lists .list-item').first();
    await secondOption.click();
    // await page.waitForTimeout(1000);
    await page.getByPlaceholder('選択してください').nth(1).click();
    // await page.waitForTimeout(1000);




    await page.getByText('次へ').click();
    // await page.waitForTimeout(2000);

    // await expect(page.locator('//div[@class="company-name2"]')).toHaveText('Cubastion Consulting Pvt Ltd');
    // await expect( page.locator('//div[@class="branch-name2"]')).toHaveText(branchName);
    // await expect( page.locator('//div[@class="phone2"]')).toHaveText(userdata.BranchCreate.telephone);




    await page.getByText('次へ').click();
    await page.waitForTimeout(3000);
    await page.getByText('所属管理へ').click();
    await page.waitForTimeout(3000);
    //await page.screenshot({ path: 'screenshots/Branch Registration.png', fullPage: true });
  });

  var branchNames = `Branchs${timestamp}`;

  test.skip('Create Branch with required field missing', async () => {
    await page.locator('c-ccp2_-fuso-header').getByRole('img').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: '所属管理' }).click();
    await page.waitForTimeout(2000);
    await page.getByText('所属追加').click();
    // await page.waitForTimeout(2000);
    // await page.locator('div').filter({ hasText: /^必須$/ }).getByPlaceholder('入力してください').click();
    await page.waitForTimeout(1000);
    // await page.locator('div').filter({ hasText: /^必須$/ }).getByPlaceholder('入力してください').fill(branchName);
    // await page.waitForTimeout(2000);
    //await page.getByPlaceholder('入力してください').nth(1).click();
    //await page.getByPlaceholder('入力してください').nth(1).fill('Delhi');
    // await page.getByPlaceholder('郵便番号を入力してください').click();
    // await page.getByPlaceholder('郵便番号を入力してください').fill(userdata.BranchCreate.postalcode);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('例：東京都').click();
    // await page.getByPlaceholder('例：東京都').fill(userdata.BranchCreate.prefectures);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('例：品川区品川').click();
    // await page.getByPlaceholder('例：品川区品川').fill(userdata.BranchCreate.municipalities);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('例：4-6-').click();
    // await page.getByPlaceholder('例：4-6-').fill(userdata.BranchCreate.streetAddress);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('例：〇〇マンション000号/会社名など').click();
    // await page.getByPlaceholder('例：〇〇マンション000号/会社名など').fill(userdata.BranchCreate.BuildingName);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('入力してください').nth(2).fill(userdata.BranchCreate.telephone);
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('選択してください').first().click();
    // await page.waitForTimeout(1000);
    // await page.getByText('New User1').click();
    // await page.waitForTimeout(1000);
    // const firstOption = await page.locator('.lists .list-item').first();
    // await firstOption.click();
    // await page.waitForTimeout(1000);
    // await page.getByPlaceholder('選択してください').first().click();
    // await page.waitForTimeout(1000);
    // await page.getByPlaceholder('選択してください').nth(1).click();
    // await page.waitForTimeout(1000);
    // await page.locator('div').filter({ hasText: /^RV-000039$/ }).click();
    // await page.waitForTimeout(1000);
    // await page.getByText('RV-000038').click();
    // await page.waitForTimeout(1000);
    // const secondOption = await page.locator('.lists .list-item').first();
    // await secondOption.click();
    // await page.waitForTimeout(1000);
    // await page.getByPlaceholder('選択してください').nth(1).click();
    // await page.waitForTimeout(1000);




    await page.getByText('次へ').click();
    await page.waitForTimeout(2000);

    // await expect(page.locator('//div[@class="company-name2"]')).toHaveText('Cubastion Consulting Pvt Ltd');
    // await expect( page.locator('//div[@class="branch-name2"]')).toHaveText(branchName);
    // await expect( page.locator('//div[@class="phone2"]')).toHaveText(userdata.BranchCreate.telephone);
    let count1 = await page.locator('//input[@class="product-name invalid-input"]').count();

    if(count1 == 1){
      console.log('All required field validations working!! Create Branch');
    }else{
      test.fail();
    }
    



    // await page.getByText('次へ').click();
    // await page.waitForTimeout(3000);
    // //await page.locator('div').filter({ hasText: /^勤務地管理へ$/ }).nth(1).click();
    // await page.getByText('所属管理へ').click();
    // await page.waitForTimeout(3000);
    //await page.screenshot({ path: 'screenshots/Branch Registration.png', fullPage: true });
  });


  test.skip('Edit branch', async () => {
    await page.locator('c-ccp2_-fuso-header').getByRole('img').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: '所属管理' }).click();
    await page.waitForTimeout(2000);
    await page.locator('.cards-gap.no-scroll .card').nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByText('編集する').click();
    await page.waitForTimeout(1000);
    await page.locator('input[name="branch"]').click();
    await page.waitForTimeout(1000);
    await page.locator('input[name="branch"]').fill(branchNames);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('郵便番号を入力してください').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('郵便番号を入力してください').fill(userdata.BranchEdit.postalcode);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：東京都').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：東京都').fill(userdata.BranchEdit.prefectures);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：品川区品川').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：品川区品川').fill(userdata.BranchEdit.municipalities);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：4-6-').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：4-6-').fill(userdata.BranchEdit.streetAddress);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：〇〇マンション000号/会社名など').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('例：〇〇マンション000号/会社名など').fill(userdata.BranchEdit.BuildingName);
    await page.waitForTimeout(1000);
    await page.locator('input[name="contactNumber"]').click();
    await page.waitForTimeout(1000);
    await page.locator('input[name="contactNumber"]').fill(userdata.BranchEdit.telephone);
    await page.waitForTimeout(1000);
    //await page.locator('div', { hasText: /^Delete.*/ }).locator('path').first().click();
    // await page.locator('div', { hasText: /^所属会員会員を該当勤務地に配属するDelete.*/ }).click();
    // await page.locator('div').filter({ hasText: /^所属会員会員を該当勤務地に配属するDeleteNew User$/ }).locator('svg').click();
    // await page.waitForTimeout(1000);
    // await page.getByPlaceholder('選択してください').nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByText('保存').click();
    await page.waitForTimeout(2000);

    
    // await expect(page.locator('//div[@class="data"]').nth(0)).toHaveText('Cubastion Consulting Pvt Ltd');
    // await expect( page.locator('//div[@class="data"]').nth(2)).toHaveText(branchNames);
    // await expect( page.locator('//div[@class="data"]').nth(3)).toHaveText(userdata.BranchEdit.telephone);

  });

  test.skip('edit branch required field missing', async () => {
    await page.locator('c-ccp2_-fuso-header').getByRole('img').nth(1).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: '所属管理' }).click();
    await page.waitForTimeout(2000);
   
     await page.locator('.cards-gap.no-scroll .card').nth(3).click();
    await page.waitForTimeout(1000);
    await page.getByText('編集する').click();
    await page.locator('input[name="branch"]').click();
    await page.locator('input[name="branch"]').fill('');
    await page.getByText('保存').click();
    expect(await page.locator('//div[@class="slds-theme--error slds-notify--toast slds-notify slds-notify--toast forceToastMessage"]')).toBeVisible({timeout:9000});
    let count1 = await page.locator('//input[@class="Inputs {branchNameClass} invalid-input"]').count();
    if(count1==1){
      console.log('All required field validations working!! Edit Branch');
    }else{
      test.fail();
    }    
    // await expect(page.locator('//div[@class="data"]').nth(0)).toHaveText('Cubastion Consulting Pvt Ltd');
    // await expect( page.locator('//div[@class="data"]').nth(2)).toHaveText(branchName);
    // await expect( page.locator('//div[@class="data"]').nth(3)).toHaveText(userdata.BranchEdit.telephone);

  });

test('Delete Branch', async () => {


  await page.locator('c-ccp2_-fuso-header').getByRole('img').nth().click();
  await page.locator('ul').filter({ hasText: '所属管理' }).click();
  var delBranch = await page.locator('//span[@class="Text"]').nth(0).textContent();
  console.log(delBranch);
  await page.locator("(//div[@class='card'])[1]").click()
  await page.getByText('この所属を削除する').click();
  await page.getByText('はい').click();
  await page.waitForLoadState('networkidle');
  await page.locator('//*[@class="dropdown"]').first().click();
  await page.waitForTimeout(1000);
  await page.locator('//*[@class="list-item"]').nth(0).click();
  const checkbox = page.locator('//*[@name="vehiclecheckboxes"]');
  console.log(await checkbox.count());
  let checkboxcount = await checkbox.count();
  for(let i = 0 ; i< checkboxcount;i++){
    await checkbox.nth(i).click();
  }
  await page.waitForTimeout(1000);
  
  await page.getByPlaceholder('選択してください').nth(1).click();
  await page.locator('//*[@class="list-item"]').nth(0).click();

  const checkbox2 = page.locator('input[name="usercheckboxes"]');
  console.log(await checkbox2.count());
  let checkboxcount2 = await checkbox2.count();
  for(let i = 0 ; i< checkboxcount2;i++){
    await checkbox2.nth(i).click();
  }
  await page.waitForTimeout(1000);

  await page.locator('div').filter({ hasText: /^次へ$/ }).click();
  await page.getByText('完了').click();
  await page.waitForTimeout(1000);
  await page.locator('div').filter({ hasText: /^所属管理へ$/ }).nth(1).click();
 await expect(page.locator('//span[@class="Text"]').nth(0)).not.toHaveText(delBranch);
});

});