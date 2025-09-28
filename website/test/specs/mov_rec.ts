import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page.ts'
import loginPage from '../pageobjects/login.page.ts'

const email = process.env.LOGIN_EMAIL as string
const password = process.env.LOGIN_PASSWORD as string

describe('Get Movie Recommendation Successfully', () => {

    beforeEach(async () => {
        await browser.reloadSession()
        await loginPage.open()
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
    })

    it('should movie recommendations is exist', async () => {
        await HomePage.searchInput.setValue('Inception')
        await HomePage.searchButton.click()
        await expect(HomePage.movieCards).toExist()
        await expect(HomePage.movieTitles).toExist()
        await expect(HomePage.movieYears).toExist()
        await expect(HomePage.movieRatings).toExist()
    })

    it('should movie recommendations with gender is exist', async () => {
        await HomePage.searchInput.setValue('Action')
        await HomePage.searchButton.click()
        await expect(HomePage.movieGenders).toExist()
    })

    it('should movie recommendations with description is exist', async () => {
        await HomePage.searchInput.setValue('A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.')
        await HomePage.searchButton.click()
        await expect(HomePage.movieDescription).toExist()
    })
})

describe('Failed to Get Movie Recommendation', () => {
    beforeEach(async () => {
        await browser.reloadSession()
        await loginPage.open()
        await loginPage.login(email, password)
        await loginPage.verifyLoginSuccess()
    })

    it('should get error message with invalid input', async () => {
        await HomePage.searchInput.setValue('&#(*$&(#*&$')
        await HomePage.searchButton.click()
        await expect(HomePage.noMovieFoundText).toExist()
    })

    it('should button search is disabled when input is empty', async () => {
        await HomePage.searchInput.setValue('')
        await expect(HomePage.searchButton).toBeDisabled()
    })

    it('should get no movie found text when movie not found', async () => {
        await HomePage.searchInput.setValue('zzxxqypl')
        await HomePage.searchButton.click()
        await expect(HomePage.noMovieFoundText).toExist()
    })
})

