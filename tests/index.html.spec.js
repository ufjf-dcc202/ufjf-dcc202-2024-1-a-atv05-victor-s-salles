// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("index.html", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test("deve ter um meta viewport com atributo content com \"width=device-width, initial-scale=1.0\" no head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("deve ter um título no head com o número da atividade e nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 5: (.*)/);
  });

  
  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main")).toBeVisible();
  });
  
  test("deve ter um título no main com o nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main > h1")).toHaveText(/DCC202 - Atividade 5: (.*)/);
  });

  test('o main deve ter um parágrafo logo após o título', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main > h1+p")).toBeVisible();
  });

  test('O parágrafo deve ter dois links', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    await expect(page.locator("main > h1+p > a")).toHaveCount(2);
  });

  test('O primeiro link deve levar para uma página sobre personagens', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const link = page.locator("main > h1+p > a:first-child");
    await expect(link).toHaveAttribute("href", "personagens.html");
    await expect(link).toHaveText("personagens");
  });

  test('O segundo link deve levar para uma página sobre preferências', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const link = page.locator("main > h1+p > a:nth-child(2)");
    await expect(link).toHaveAttribute("href", "preferencias.html");
    await expect(link).toHaveText("gosto deles");
  });


  test('O primeiro parágrafo deve ter o texto como solicitado', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/index.html`);
    const p = page.locator("main > h1+p");
    await expect(p).toHaveText(/Esta é a página principal do meu site sobre (.*). Temos também a página sobre personagens e o quanto gosto deles./);
  });

});