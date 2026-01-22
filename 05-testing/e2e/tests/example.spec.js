// @ts-check
import { test, expect } from '@playwright/test';

// 1. lo más recomendable es usar Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS como último recurso

test('buscar empleos y aplicar a una oferta', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Buscar'}).click()

  const jobCards = page.locator('.job-listing-card')

  await expect(jobCards.first()).toBeVisible()

  const firstJobTitle = jobCards.first().locator('h3')
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior')

  await page.getByRole('button', { name: 'Iniciar sesión' }).click()

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first()
  await applyButton.click()

  page.getByRole('button', { name: 'Aplicado'}).first()
})