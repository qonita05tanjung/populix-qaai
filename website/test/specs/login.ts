import loginPage from "../pageobjects/login.page.ts"

const email = process.env.LOGIN_EMAIL as string
const password = process.env.LOGIN_PASSWORD as string

describe('Login Successfull', async () => {

    beforeEach(async () => {
        await browser.reloadSession()
        await loginPage.open()
    })

    it('should login with valid credentials', async () => {
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
    })

    it('should login with valid credentials before expired token', async () => {
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
        await loginPage.logout()
        await loginPage.verifyLogoutSuccess()
    })
})

describe('Login Unsuccessfull', async () => {

    beforeEach(async () => {
        await browser.reloadSession()
        await loginPage.open()
    })

    it('should not login with unregistered email', async () => {
        await loginPage.login('unregistered@example.com', password)
        await loginPage.verifyLoginFailed()
    })  

    it('should not login with wrong password', async () => {
        await loginPage.login(email, 'wrongpassword')
        await loginPage.verifyLoginFailed()
    })  

    it('should not login with empty email and password', async () => {
        await loginPage.login('', '')
        await loginPage.inputUsername.isDisplayed()
        await loginPage.inputPassword.isDisplayed()
        await loginPage.btnSubmit.isDisplayed()
    })

    it('should not login with invalid email format', async () => {
        await loginPage.login('xyz123', password)
        await loginPage.inputUsername.isDisplayed()
        await loginPage.inputPassword.isDisplayed()
        await loginPage.btnSubmit.isDisplayed()
    })
})

describe('Logout', async () => {

    beforeEach(async () => {
        await browser.reloadSession()
        await loginPage.open()
    })

    it('should logout successfully', async () => {
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
        await loginPage.logout()
        await loginPage.verifyLogoutSuccess()
    })
    
    it('should logout successfully before expired token', async () => {
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
        await loginPage.logout()
        await loginPage.verifyLogoutSuccess()
    })

    it('should not access home page after logout', async () => {
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
        await loginPage.logout()
        await loginPage.inputUsername.isDisplayed()
        await loginPage.inputPassword.isDisplayed()
        await loginPage.btnSubmit.isDisplayed()
    })
})