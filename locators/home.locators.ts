import { type Page } from '@playwright/test';

export function getHomeLocators(page: Page) {
  return {
    familyTitle: page.getByText('smith-family-ee'),
    calendarButton: page.getByText('Calendar', { exact: true }),
    tasksButton: page.getByText('Tasks', { exact: true }),
    rewardsButton: page.getByText('Rewards', { exact: true }),
    listsButton: page.getByText('Lists', { exact: true }),
    mealsButton: page.getByText('Meals', { exact: true }),
    recipesButton: page.getByText('Recipes', { exact: true }),
    photosButton: page.getByText('Photos', { exact: true }),
    profilesButton: page.getByText('Profiles', { exact: true }),
  };
}

export type HomeLocators = ReturnType<typeof getHomeLocators>;
