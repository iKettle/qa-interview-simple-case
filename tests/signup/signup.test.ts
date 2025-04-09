import { test, expect } from '@playwright/test'
import { SignupPage } from './SignupPage'
import { existingUsers } from '../../test-setup/localstorage.setup'

const existingUser = existingUsers[0]
const newUser = {
    email: 'newtest1@mail.com',
    password: 'newTestPassword!',
    firstName: 'NewTest1',
    lastName: 'NewTestsson1',
}
let  signupPage

test.describe('Sign up page ', () => {
  test.beforeEach(async ({page}) => {
    signupPage = new SignupPage(page)
    await signupPage.goto()
  })

  test.afterEach(async () => {
    //Here should be code that removes newly created users from db
  })

  test('creating a new user', async ({ page }) => {
    await signupPage.inputFirstName(newUser.firstName)
    await signupPage.inputLastName(newUser.lastName)
    await signupPage.inputEmail(newUser.email)
    await signupPage.inputPassword(newUser.password)
    await signupPage.clickSubmit()

    await expect(page.getByText(`Welcome ${newUser.firstName} ${newUser.lastName}`)).toBeVisible()
    await expect(page.getByRole('button').getByText('Log out')).toBeVisible()
  })

  test('signup with existing user', {
    annotation: {
      type: 'issue',
      description: 'Should be raised a ticket for showing error message when existing user trying to signup',
    },
  }, async ({ page }) => {
    await signupPage.inputFirstName(existingUser.firstName)
    await signupPage.inputLastName(existingUser.lastName)
    await signupPage.inputEmail(existingUser.email)
    await signupPage.inputPassword(existingUser.password)
    
    const logs:string[] = []
    page.on('console', msg => logs.push(msg.text()))

    await signupPage.clickSubmit()

    expect(logs).toContain('User already exists')

    //Here should be proper assertions after implementation of error message
  })

})
