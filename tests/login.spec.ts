import { test, expect } from '@playwright/test';
import { getLoginLocators } from '../locators/login.locators';
import { getHomeLocators } from '../locators/home.locators';
import { getCalendarSelectionLocators } from '../locators/calendarselection.locators';

const SKYLIGHT_USERNAME = process.env.SKYLIGHT_USERNAME ?? '';
const SKYLIGHT_PASSWORD = process.env.SKYLIGHT_PASSWORD ?? '';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://ourskylight.com/');
    await expect(page).toHaveURL(/ourskylight\.com/);
  });

  test('log in and verify home page elements', async ({ page }) => {
    if (!SKYLIGHT_USERNAME || !SKYLIGHT_PASSWORD) {
      test.skip(true, 'SKYLIGHT_USERNAME and SKYLIGHT_PASSWORD must be set in .zshrc');
    }

    const signInLocators = getLoginLocators(page);
    const calendarSelectionLocators = getCalendarSelectionLocators(page);

    const [popup] = await Promise.all([
      page.context().waitForEvent('page'),
      signInLocators.signinButton.first().click(),
    ]);

    const popupLocators = getLoginLocators(popup);
    await popupLocators.emailInput.first().fill(SKYLIGHT_USERNAME);
    await popupLocators.passwordInput.first().fill(SKYLIGHT_PASSWORD);
    await popupLocators.loginButton.first().click();

    await popup.waitForEvent('close', { timeout: 10000 });
    await expect(calendarSelectionLocators.skylightTitle).toBeVisible();
    await expect(calendarSelectionLocators.familyTitle).toBeVisible();

    await calendarSelectionLocators.familyTitle.click();
    const homeLocators = getHomeLocators(page);
    await expect(homeLocators.familyTitle.nth(1)).toBeVisible();
    await expect(homeLocators.calendarButton).toBeVisible({ timeout: 10000 });
    await expect(homeLocators.tasksButton).toBeVisible();
    await expect(homeLocators.rewardsButton).toBeVisible();
    await expect(homeLocators.listsButton).toBeVisible();
    await expect(homeLocators.mealsButton).toBeVisible();
    await expect(homeLocators.recipesButton).toBeVisible();
    await expect(homeLocators.photosButton).toBeVisible();
    await expect(homeLocators.profilesButton).toBeVisible();
  });
});
