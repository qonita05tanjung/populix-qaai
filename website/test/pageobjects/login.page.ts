import { $ } from '@wdio/globals'
import Page from './page.js';
import homePage from './home.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#email');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('//button[text()="Sign In"]');
    }

    public get alertError () {
        return $('//div[@data-slot="alert"]/div');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public async logout () {
        await homePage.logoutButton.click();
    }

    public async verifyLoginSuccess () {
        await expect(browser).toHaveUrl('https://movie-finder-d128b.web.app/')
        await expect(homePage.logoutButton).toBeDisplayed()
        await expect(homePage.searchInput).toBeDisplayed()
        await expect(homePage.searchButton).toBeDisplayed()
    }

    public async verifyLoginFailed () {
        await expect(this.alertError).toBeDisplayed()
        await expect(this.alertError).toHaveText('Invalid login credentials')
    }

    public async verifyLogoutSuccess () {
        await expect(browser).toHaveUrl('https://movie-finder-d128b.web.app/login')
        await expect(this.inputUsername).toBeDisplayed()
        await expect(this.inputPassword).toBeDisplayed()
        await expect(this.btnSubmit).toBeDisplayed()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('login');
    }
}

export default new LoginPage();
