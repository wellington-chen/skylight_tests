import { test, expect } from '@playwright/test';
import { getLoginLocators } from '../locators/login.locators';
import { getHomeLocators } from '../locators/home.locators';
import { getCalendarSelectionLocators } from '../locators/calendarselection.locators';
import { getCalendarLocators } from '../locators/calendar.locators';
import { getEventEditLocators } from '../locators/eventedit.locators';

const SKYLIGHT_USERNAME = process.env.SKYLIGHT_USERNAME ?? '';
const SKYLIGHT_PASSWORD = process.env.SKYLIGHT_PASSWORD ?? '';

function createUniqueString(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getCurrentHoursPlusOne(): string {
  const date = new Date();
  const hours = date.getHours();
  const oneHourAhead = (hours + 1) % 24;
  const displayHour = oneHourAhead % 12 || 12;
  const period = oneHourAhead < 12 ? 'AM' : 'PM';
  return `${displayHour} ${period}`;
}

test.describe('Calendar', () => {
  test.beforeEach(async ({ page }) => {
    if (!SKYLIGHT_USERNAME || !SKYLIGHT_PASSWORD) {
      test.skip(true, 'SKYLIGHT_USERNAME and SKYLIGHT_PASSWORD must be defined');
    }
    //Sign In Flow
    await page.goto('https://ourskylight.com/');
    const signInLocators = getLoginLocators(page);
    const [popup] = await Promise.all([
      page.context().waitForEvent('page'),
      signInLocators.signinButton.first().click(),
    ]);

    const popupLocators = getLoginLocators(popup);
    await popupLocators.emailInput.first().fill(SKYLIGHT_USERNAME);
    await popupLocators.passwordInput.first().fill(SKYLIGHT_PASSWORD);
    await popupLocators.loginButton.first().click();
    await popup.waitForEvent('close', { timeout: 10000 });

    const calendarSelectionLocators = getCalendarSelectionLocators(page);
    await expect(calendarSelectionLocators.skylightTitle).toBeVisible();
    await calendarSelectionLocators.familyTitle.first().click();
  });

  test('create an event in the calendar', async ({ page }) => {
    const uniqueTitleString = createUniqueString();
    const homeLocators = getHomeLocators(page);
    const calendarLocators = getCalendarLocators(page);
    const eventEditLocators = getEventEditLocators(page);

    await expect(homeLocators.calendarButton).toBeVisible({ timeout: 10000 });
    await homeLocators.calendarButton.click();
    await expect(calendarLocators.todayButton).toBeVisible({ timeout: 10000 });
    await expect(calendarLocators.plusButton).toBeVisible({ timeout: 10000 });
    //Switching to week view
    await expect(calendarLocators.monthButton).toBeVisible({ timeout: 10000 });
    await calendarLocators.monthButton.click();
    await expect(calendarLocators.weekButton).toBeVisible({ timeout: 10000 });
    
    //Open Event Edit page
    await calendarLocators.plusButton.click();
    await calendarLocators.createEventButton.click();

    //Fill Event Edit page
    await expect(eventEditLocators.addEventTitleInput).toBeVisible({ timeout: 10000 });
    await eventEditLocators.titleInput.fill(uniqueTitleString);
    //Using function to modify from input to current hour + 1
    await eventEditLocators.fromInput.fill(getCurrentHoursPlusOne());
    await eventEditLocators.untilInput.fill('');
    await eventEditLocators.jakeSmithProfile.click();
    await eventEditLocators.addButton.click();
    //Did we make it back to the calendar page?
    await expect(calendarLocators.todayButton).toBeVisible({ timeout: 10000 });
    //Did the new event show up?
    await expect(page.getByText(uniqueTitleString).first()).toBeAttached({ timeout: 10000 });
  });
});
