import {test,expect} from '@playwright/test'

test('Title and Url Verification',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const Title=await page.title();
    console.log('The Title is: ',Title);
    await expect(page).toHaveTitle('Automation Testing Practice');

    const URL=await page.url();
    console.log('The URL is ',URL);
    await expect(page).toHaveURL('"https://testautomationpractice.blogspot.com/');

    await page.waitForTimeout(3000);
})

test('InputBox Handling using different Locators',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const nameField=await page.locator('#name');  // locating using id attribute
    await expect(nameField).toBeEditable();   
    await nameField.fill('Rinsu');

    const EmailField=await page.locator("input[id='email']");  // locating using tag and id
    await expect(EmailField).toBeVisible();
    await EmailField.fill('rincy123@gmail.com');
    await expect(EmailField).toHaveValue('rincy123@gmail.com') //

    const PhoneField=await page.locator('[id="phone"]');  //locating using attribute value
    await expect(PhoneField).toBeEmpty();
    await PhoneField.fill('9645823698');

    const Address=await page.locator('//*[@id="textarea"]'); //locating using xpath
    await Address.fill('Rinsu Villa');

    await page.waitForTimeout(3000);
})

test('Handling Radio Button',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
     const FemaleRadioBtn=await page.locator("//input[@name='gender' and @value='female']");
    await  FemaleRadioBtn.check();
    await expect(FemaleRadioBtn).toBeChecked();

    const MaleRadioBtn=await page.locator("//input[@name='gender' and @value='male']").isChecked();
    await expect(MaleRadioBtn).toBeFalsy();

    await page.waitForTimeout(3000);
})

 test('Handling  CheckBoxes',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // checking a specific option monday 
    const Monday=await page.locator("//input[@id='monday' and @type='checkbox']");
    await Monday.check();
    await expect(Monday).toBeChecked();

    // checking multiple Options from the checkBox 
    const CheckBoxOptionLocators=[ "//input[@id='monday' and @type='checkbox']",
                                   "//input[@id='tuesday' and @type='checkbox']",
                                   "//input[@id='saturday' and @type='checkbox']"

    ]

    for(const CheckBox of CheckBoxOptionLocators)
    {
       await page.locator(CheckBox).check();
       await expect(page.locator(CheckBox)).toBeChecked();
    }
    await page.waitForTimeout(3000)
    for(const CheckBox of CheckBoxOptionLocators)
    {
        if(await page.locator(CheckBox).isChecked())
        {
            page.locator(CheckBox).uncheck();
            await expect(page.locator(CheckBox)).not.toBeChecked();
        }

    }
 })

 test('Handling Country Dropdown',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.selectOption('#country',"India");

    //check number of options in the dropdown 

    const Options=await page.locator("#country option");
    await expect(Options).toHaveCount(10);

 })
 test('Handling Colors Dropdown- Selecting multiple options',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.selectOption('#colors',['Yellow','Blue','Red']);
    //check number of options
    const Colors=await page.$$('#colors option')
    await expect(Colors.length).toBe(7)
 })

 test('Checking an option if the dropdown contain a particular value',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const AnimalsDropdown=await page.$$('#animals option')
    let status=true;

    for(const option of AnimalsDropdown)
    {
        const value=await option.textContent();
        console.log(value)
        if(value.includes('Lion'))
        {
        await page.selectOption('#animals','value');
        status=true;
        break;
        }
    }
 })

 test('Single File upload',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // upload single file then 
    await page.locator('#singleFileInput').setInputFiles("C:/Users/91628/Downloads/Playwright Notes.pdf");
    await page.waitForTimeout(3000)
 })

 test('Multiple File upload',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    // upload Multiple file then 
    await page.locator('#multipleFilesInput').setInputFiles(["C:/Users/91628/Downloads/Playwright Notes.pdf",
                                                           "C:/Users/91628/Downloads/Playwright interview questions set 2.pdf"
                                                             ]);
    await page.waitForTimeout(3000)
 })
 
test('Handling SearchBox',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator('#Wikipedia1_wikipedia-search-input').fill('Alert Box');
    await page.click('.wikipedia-search-button');
    await expect(page.locator('#Wikipedia1_wikipedia-search-results')).toBeVisible();
    await expect(page.locator('#Wikipedia1_wikipedia-search-results')).toHaveCount(6)
    await expect(page.locator('#Wikipedia1_wikipedia-search-results')).toContainText('Alerts')
    await page.waitForTimeout(3000)

})

test('Handling Dynamic Button',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const DynamicBtn=page.getByRole('button',{ name: /start|stop/i })
    await expect(DynamicBtn).toHaveText('START');
    await DynamicBtn.click();
    await expect(DynamicBtn).toHaveText('STOP');
})

test('Drag And Drop',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const source=await page.locator('#draggable');
    const target=await page.locator('#droppable');
    await source.dragTo(target);
    await page.waitForTimeout(3000);
})

test('Double Click',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const Btn=await page.locator("//button[normalize-space()='Copy Text']");
    await Btn.dblclick();
    const F2=await page.locator('#field2');
    await expect(F2).toHaveValue('Hello World!');
    await page.waitForTimeout(3000);
})

test('Mouse Hover',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const PointMeBtn=await page.locator("//button[normalize-space()='Point Me']");
    await PointMeBtn.hover();
})

test('Simple Alert Handling',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('alert',async dialog=>{
        expect(dialog.type).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!');
        dialog.accept();
    })
    await page.click("//button[@id='alertBtn']");
    await page.waitForTimeout(3000);
})

test('Confirm Alert Handling',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('alert',async dialog=>{
        expect(dialog.type).toContain(' confirm alert')
        expect(dialog.message()).toContain('Press a button!');
        dialog.dismiss();
    })
    await page.click("//button[@id='confirmBtn']");
    await expect(page.locator("#demo")).toHaveText('You pressed Cancel!')
    await page.waitForTimeout(3000);
})

test('Prompt Alert Handling',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('alert',async dialog=>{
        expect(dialog.type).toContain(' prompt alert')
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        dialog.accept('Rincy Athul');
    })
    await page.click("//button[@id='promptBtn']");
    await expect(page.locator("#demo")).toHaveText('Hello Rincy Athul! How are you today?')
    await page.waitForTimeout(3000);
})

test('Date picker',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.click("//input[@id='datepicker']");
    const day='20';
    const month='March';
    const year='1999';

    while(true)
    {

        const currentYear=await page.locator(".ui-datepicker-year")
        const currentMonth=await page.locator("ui-datepicker-month")

        if(currentYear===year && currentMonth===month)
        {
         break;
        }
        await page.locator("//a[@title='Prev']").click();

        const dates=await page.$$(".ui-state-default ");
        for(const dt of dates)
        {
            const DateElement=await dt.textContent();
            if(DateElement===day)
            {
           await dt.click();
           break;
            }
        }
    }
})

test('Web Table-Pagination Handling',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const Table=await page.locator('#productTable');
    const rows=await page.locator('tbody tr td');
    console.log('number of rows: ',rows.count());
    await expect(rows.count()).toBe(20)
    const columns=await page.locator('thead tr th');
    console.log('number of columns: ',columns.count());
    await expect(columns.count()).toBe(4);


    /*

    // select a product 
    const MatchedRow=await rows.filter({
        has: page.locator('td'),
        hasText:'Laptop'
    })
    await MatchedRow.locator('#input').check();
    await page.waitForTimeout(3000)

    */

    // Select Multiple Products

    await SelectProducts(rows,page,'Laptop')
    await SelectProducts(rows,page,'Tablet')


    async function SelectProducts(rows,page,name)
    {
        const MatchedRow=await rows.filter({
        has: page.locator('td'),
        hasText:name
    })
    await MatchedRow.locator('#input').check();
    await page.waitForTimeout(3000)
    }

    








})

