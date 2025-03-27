const{test, expect} =require ("@playwright/test")
test('Home Page', async ({page})=>{

    await page.goto('file:///D:/aboba/TYPINGSPEEDTESTGITHUB/index.html')


    await expect(page).toHaveTitle('Typing Speed Test')

    await page.close()
})