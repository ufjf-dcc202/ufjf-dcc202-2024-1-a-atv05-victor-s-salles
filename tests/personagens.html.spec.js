// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("personagens.html", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test("deve ter um meta viewport com atributo content com \"width=device-width, initial-scale=1.0\" no head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("deve ter um título no head com o número da atividade, a palavra Personagens e o nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 5 - Personagens: (.*)/);
  });

  
  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("main")).toBeVisible();
  });
  
  test("deve ter um título no main com o mesmo conteúdo do título do documento", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("main > h1")).toHaveText(/DCC202 - Atividade 5 - Personagens: (.*)/);
  });

  test('o main deve ter um parágrafo logo após o título', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("main > h1+p")).toBeVisible();
  });

  test('O parágrafo deve ter dois links', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("main > h1+p > a")).toHaveCount(2);
  });

  test('O primeiro parágrafo deve ter o texto como solicitado', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    const p = page.locator("main > h1+p");
    await expect(p).toHaveText(/Esta é a página sobre os personagens de (.*). Temos também a página sobre o quanto gosto de cada um deles e a página principal./);
  });

  test('O primeiro link deve levar para uma página sobre preferências', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    const link = page.locator("main > h1+p > a:first-child");
    await expect(link).toHaveAttribute("href", "preferencias.html");
    await expect(link).toHaveText("o quanto gosto");
  });

  test('O segundo link deve levar para a página principal', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    const link = page.locator("main > h1+p > a:nth-child(2)");
    await expect(link).toHaveAttribute("href", "index.html");
    await expect(link).toHaveText("página principal");
  });

  test('A página deve ter uma lista de definições com 3 filhos div', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    const lista = page.locator("main > dl");
    await expect(lista).toBeVisible();
    await expect(page.locator("main > dl > div")).toHaveCount(3);
  });

  test('Cada definição deve ter um termo e dados', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/personagens.html`);
    await expect(page.locator("main > dl > div:nth-child(1) > dt")).toBeVisible();
    await expect(page.locator("main > dl > div:nth-child(1) > dd")).toBeVisible();

    await expect(page.locator("main > dl > div:nth-child(2) > dt")).toBeVisible();
    await expect(page.locator("main > dl > div:nth-child(2) > dd")).toBeVisible();

    await expect(page.locator("main > dl > div:nth-child(3) > dt")).toBeVisible();
    await expect(page.locator("main > dl > div:nth-child(3) > dd")).toBeVisible();

  });

});