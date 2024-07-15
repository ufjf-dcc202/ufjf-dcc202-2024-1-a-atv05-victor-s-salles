// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("preferencias.html", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test("deve ter um meta viewport com atributo content com \"width=device-width, initial-scale=1.0\" no head", async ({
    page,
  }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("deve ter um título no head com o número da atividade, a palavra Preferências e o nome do aluno", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 5 - Preferências: (.*)/);
  });

  
  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main")).toBeVisible();
  });
  
  test("deve ter um título no main com o mesmo conteúdo do título do documento", async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > h1")).toHaveText(/DCC202 - Atividade 5 - Preferências: (.*)/);
  });

  test('o main deve ter um parágrafo logo após o título', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > h1+p")).toBeVisible();
  });

  test('O parágrafo deve ter dois links', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > h1+p > a")).toHaveCount(2);
  });

  test('O primeiro link deve levar para uma página sobre personagens', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    const link = page.locator("main > h1+p > a:first-child");
    await expect(link).toHaveAttribute("href", "personagens.html");
    await expect(link).toHaveText("personagens");
  });

  test('O primeiro parágrafo deve ter o texto como solicitado', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    const p = page.locator("main > h1+p");
    await expect(p).toHaveText("Esta é a página sobre minhas preferências entre os personagens. Temos também a página sobre personagens e a página principal.");
  });


  

  test('O segundo link deve levar para a página principal', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    const link = page.locator("main > h1+p > a:nth-child(2)");
    await expect(link).toHaveAttribute("href", "index.html");
    await expect(link).toHaveText("página principal");
  });

  test('A página deve ter uma tabela com cabeça e corpo', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > table")).toBeVisible();
    await expect(page.locator("main > table > thead")).toBeVisible();
    await expect(page.locator("main > table > tbody")).toBeVisible();
  });

  test('A cabeça da tabela deve ter quatro cabeçalhos com o texto solicitado', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > table > thead > tr > th")).toHaveCount(5);

    await expect(page.locator("main > table > thead th:nth-child(1)")).toHaveText('Personagem');
    await expect(page.locator("main > table > thead th:nth-child(2)")).toHaveText('História');
    await expect(page.locator("main > table > thead th:nth-child(3)")).toHaveText('Design');
    await expect(page.locator("main > table > thead th:nth-child(4)")).toHaveText('Personalidade');
    await expect(page.locator("main > table > thead th:nth-child(5)")).toHaveText('Total');
  });

  test('O corpo da tabela deve ter três linhas, com todas as células', async ({ page }) => {
    await page.goto(`file://${process.cwd()}/preferencias.html`);
    await expect(page.locator("main > table > tbody > tr")).toHaveCount(3);
    await expect(page.locator("main > table > tbody > tr > td ")).toHaveCount(15);
  });

  


});