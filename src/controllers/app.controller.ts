import { Body, Controller, Post } from '@nestjs/common';
import puppeteer from 'puppeteer'

export class TrackRequestDto{
    trackNumber: string;
}

// JSSU1443420, JSSU1594998, JSSU1597298, JSSU1604611
@Controller()
export class AppController {
  @Post()
  async getIndexPage(@Body() body: TrackRequestDto) {
    try {
      (async () => {
        // Запускаем Puppeteer
        const browser = await puppeteer.launch({
          headless: false,
          //slowMo: 100,
          args: [
              '--no-sandbox',
              '--no-zygote',
              '--disable-web-security',
              '--disable-features=IsolateOrigins,site-per-process',
              '--disable-setuid-sandbox',
              '--disable-infobars',
              '--window-position=0,0',
              '--ignore-certifcate-errors',
              '--ignore-certifcate-errors-spki-list',
              //`--proxy-server=${newProxyURL}`,
          ],
        });
        
        const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });

        // Переходим на сайт Swire Shipping
        await page.goto('https://www.swireshipping.com/', { waitUntil: 'networkidle2' });

        // Ожидаем появления кнопки "Accept All Cookies"
        await page.waitForSelector('#accept-btn', { visible: true });

        const wait = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

        try {
            await wait(100);
            // Нажимаем на кнопку
            await page.click('#accept-btn');
        
            // Ожидаем загрузки страницы с полем ввода номера контейнера
            await page.waitForSelector('input[name="trackingTags"]'); // Измените селектор на актуальный, если он другой
        } catch (error) {
            console.log('Куков не было');
        }
      
        // Вводим номер контейнера
        const containerNumber = body.trackNumber; // 'JSSU1604611';
        await page.type('input[name="trackingTags"]', containerNumber);
      
        // Нажимаем на кнопку для выполнения поиска
        await page.click('button.block-btn-orange.search-btn'); // Проверьте селектор кнопки, если она отличается
      
        // Ожидаем перехода на следующий сайт и загрузки данных
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        try {
          const response = await page.waitForResponse((response) =>
            response.url().includes('https://www.swireshipping.com/backend/api/v1/trackContainersDetail'),
            { timeout: 5000 }
          );
        
          try {
            const data = await response.json(); // Получаем данные ответа в формате JSON
            console.log(`Данные для номера ${body.trackNumber}: `);
            console.log(data);
          } catch (error) {
            console.error('Ошибка при обработке ответа:', error);
          }
        } catch(error) {
          console.log('Данные не пришли! Идем дальше');
        }
        
        try {
             // Ожидание появления элемента с классом "recaptcha-checkbox-spinner"
            await page.waitForSelector('.recaptcha-checkbox-spinner', { visible: true, timeout: 3000 });

            // Клик по элементу
            await page.click('.recaptcha-checkbox-spinner');
        } catch (error) {
            console.log('Капчи не было');
        }        
        const trackingSuccessPromise = page.waitForSelector('ul[_ngcontent-ng-c92702720]', { visible: true });
        const containerNotFoundPromise = page.waitForSelector('app-track-n-trace-container-error', { visible: true });

        // Используем Promise.race для ожидания первого завершившегося промиса
        const result = await Promise.race([trackingSuccessPromise, containerNotFoundPromise]);

        if (result) {
            // Проверяем, какой элемент был найден
            const isTrackingSuccess = await page.evaluate(() => {
              return !!document.querySelector('ul[_ngcontent-ng-c92702720]');
            });
        
            if (!isTrackingSuccess) {
              // Проверяем текст элемента об ошибке
              const errorMessage = await page.evaluate(() => {
                const errorElement = document.querySelectorAll('p.big-text.paragraph-semibold-18.Primary-80');
                return errorElement[1]?.textContent || null;
              });
        
              if (errorMessage && errorMessage.includes('We are unable to find your Container details')) {
                console.log('Контейнер не найден: "We are unable to find your Container details."');
              } else {
                console.log('Элемент с сообщением об отсутствии контейнера не был найден.');
              }
            }
          }
      
        // Закрываем браузер
        await browser.close();
      })();
      
    } catch (error) {
      console.error('Ошибка во время запроса с помощью сложных парсеров:', error);
      return '';
    }
  }
}
