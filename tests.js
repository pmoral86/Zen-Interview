const assert = require('chai').assert;
const { Builder, By, Key, until } = require('selenium-webdriver');


describe('Testes do Input de Search do BlogAgi', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
      });
    
      after(async function() {
        await driver.quit();
      });
        
    beforeEach(async function() {
        await driver.get("https://blogdoagi.com.br/"); // indo para o Blog
        await driver.manage().window().maximize(); // maximizando a janela
    });

    it('Validando funcionamento da Lupa', async function() {
        await driver.findElement(By.id("search-open")).click();
        let inputSearch = await driver.findElement(By.name("s"));
        assert.exists(inputSearch);
    });

    it('Validando uma pesquisa inválida', async function() {
        await driver.findElement(By.id("search-open")).click();
        await driver.findElement(By.name("s")).sendKeys("<script>Alert 'oi'</script>");
        let inputSearch = await driver.findElement(By.name("s"));
        await inputSearch.submit();
        let falseResult = await driver.findElement(By.xpath("//*[@id='primary']/section"));
        assert.isOk(falseResult, "Nenhum resultado");
    });

    
    it('Validando a pagination', async function() {
        await driver.findElement(By.id("search-open")).click();
        await driver.findElement(By.name("s")).sendKeys("agibank");
        let inputSearch = await driver.findElement(By.name("s"));
        await inputSearch.submit();
        let falseResult = await driver.findElement(By.xpath("//*[@id='primary']/nav/div/a[3]/span[1]"));
        assert.isOk(falseResult, "Nenhum resultadomais velho");
    });
})