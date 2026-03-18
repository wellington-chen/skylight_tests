import { type Page } from '@playwright/test';

export function getCalendarLocators(page: Page) {
  return {
    createEventButton: page.getByRole('button').filter({ has: page.locator('svg path[d*="M596.82"]') }),
    todayButton: page.getByText('Today', { exact: true }),
    plusButton: page.getByRole('button').filter({ has: page.locator('svg path[d*="M440.39"]') }),
    weekButton: page.getByRole('button', { name: 'Week' }),
    monthButton: page.getByRole('button', { name: 'Month' }),
  };
}

export type CalendarLocators = ReturnType<typeof getCalendarLocators>;
