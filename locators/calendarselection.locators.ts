import { type Page } from '@playwright/test';

export function getCalendarSelectionLocators(page: Page) {
  return {
    skylightTitle: page.getByText('Skylight'),
    familyTitle: page.getByText('smith-family-ee'),
  };
}

export type CalendarSelectionLocators = ReturnType<typeof getCalendarSelectionLocators>;
