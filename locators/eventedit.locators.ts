import { type Page } from '@playwright/test';

export function getEventEditLocators(page: Page) {
  return {
    addEventTitleInput: page.getByText('Add Event'),
    titleInput: page.getByPlaceholder('Title'),
    fromInput: page.getByPlaceholder('From'),
    untilInput: page.getByPlaceholder('Until'),
    jakeSmithProfile: page.getByText('Jake Smith'),
    addButton: page.getByRole('button', { name: 'Add' }),
  };
}

export type EventEditLocators = ReturnType<typeof getEventEditLocators>;
