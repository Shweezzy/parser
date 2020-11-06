//initial version, only for one day

const fs = require('fs');
const puppeteer = require('puppeteer');
const link = 'https://www.pravda.com.ua/news/';

const parserNewsWebView = async click => {
    try {
        let browser = await puppeteer.launch({heandless: true, slowMo: 100, devtools: true});
        let page = await browser.newPage();
        await page.setViewport({width: 1400, height: 900});
        await page.goto(link, {waitUntil: 'domcontentloaded'});
        for (let i = 0; i < click; i++) {
            const button = await page.$('.section_header_button');
            await button.click()
        }
        let html = await page.evaluate(async() => {
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
                    .href

                result.push({title, time, link})
            })
            return result
        })
        console.log(html[0].link.substr(0, 31))
        for (let i = 0; i < html.length - 1; i++) {
            if (html[i].link.substr(0, 31) == link) {
                await page.goto(html[i].link, {waitUntil: 'domcontentloaded'})
                await page
                    .waitForSelector('div.post_text')
                    .catch(e => console.log(e))

                    let article = await page.evaluate(async() => {
                    let article;
                    try {
                        article = document
                            .querySelector('div.post_text')
                            .innerText;
                    } catch (e) {
                        article = null;
                    }

                    return article
                })
                html[i]['text'] = article;
            }
        }

        console.log('news length -', html.length)

        await browser.close()
        fs.writeFile('pravda.json', JSON.stringify(html), function (err) {
            if (err) 
                throw err
            console.log('Saved pravda.json file')
        })

    } catch (e) {
        await browser.close()
        console.log(e);
    }
}

parserNewsWebView(0)