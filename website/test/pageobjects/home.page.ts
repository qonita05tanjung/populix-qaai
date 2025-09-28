import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get searchInput () {
        return $('[type="text"]');
    }

    public get searchButton () {
        return $('[type="submit"]');
    }

    public get logoutButton () {
        return $('//button[text()="Logout"]');
    }

    public get movieCards () {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div)[1]');
    }

    public get movieTitles () {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div/div/h3)[1]');
    }

    public get movieYears () {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div/div/p)[1]');
    }

    public get movieRatings () {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div/div[2]/span)[1]');
    }

    public get movieDescription() {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div/p)[1]')
    }

    public get movieGenders() {
        return $('(//div[@data-slot="card"]/div[@data-slot="card-content"]/div/div[3]/span)[1]')
    }

    public get noMovieFoundText() {
        return $('[data-slot="alert-description"]')
    }

}

export default new HomePage();
