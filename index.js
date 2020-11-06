const fs = require('fs');
const puppeteer = require('puppeteer');

//link for pasrsing
let link = 'https://www.pravda.com.ua/news/';

const parserNewsWebView = async click => {
    try {
        let browser = await puppeteer.launch({heandless: true, slowMo: 100, devtools: true});
        let page = await browser.newPage();
        await page.setViewport({width: 1400, height: 900});
        await page.goto(link, {waitUntil: 'domcontentloaded'});
        for (let i = 0; i < click; i++) {
            let html = await page.evaluate(async() => {
                let dateOfNews = await document.querySelectorAll('a.section_header_button');
                let published = await document
                    .querySelector('.section_header_date span')
                    .innerText;
                let result = [];
                let container = await document.querySelectorAll('div.article_news_list');
                container.forEach(item => {
                    let title = item
                        .querySelector('div.article_header')
                        .innerText;
                    let time = item
                        .querySelector('div.article_time')
                        .innerText;
                    let link = item
                        .querySelector('.article_header a')
                        .href;
                    let publicationDate = published;
                    let previousDate = dateOfNews[0].href

                    result.push({title, time, link, publicationDate, previousDate});
                })
                return result;
            })
            //added object on JSON
            fs.appendFileSync('pravda.json', JSON.stringify(html), function (err) {
                if (err) 
                    throw err
            })
            //switch a days
            await page.goto(html[0].previousDate, {waitUntil: 'domcontentloaded'});
        }
        console.log('Saved pravda.json file')
        await browser.close();
    } catch (e) {
        await browser.close()
        console.log(e);
    }
}

//Number of days
parserNewsWebView(1)