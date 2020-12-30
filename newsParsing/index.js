const fs = require('fs');
const puppeteer = require('puppeteer');

//link for pasrsing
let link = 'https://www.pravda.com.ua/news/';

const parserNewsWebView = async click => {
    try {
        let browser = await puppeteer.launch({
            heandless: true,
            slowMo: 100,
            devtools: true
        });
        let page = await browser.newPage();
        await page.setViewport({
            width: 1400,
            height: 900
        });
        await page.goto(link, {
            waitUntil: 'domcontentloaded'
        });
        for (let i = 0; i < click; i++) {
            let html = await page.evaluate(async () => {
                let dateOfNews = await document.querySelectorAll('a.section_header_button');
                let published = await document
                    .querySelector('.section_header_date span')
                    .innerText;
                let result = [];
                let container = await document.querySelectorAll('div.article_news_list');
                container.forEach(item => {
                    let title = item
                        .querySelector('div.article_header a')
                        .lastChild
                        .textContent;
                    let addTime = item
                        .querySelector('div.article_time')
                        .textContent;
                    let link = item
                        .querySelector('.article_header a')
                        .href;
                    let publicationDate = published;
                    let previousDate = dateOfNews[0].href;
                    let dateOfParsing = new Date().toLocaleString();
                    let text = item
                        .querySelector('div.article_subheader')
                        .textContent
                        .replace(/(\r\n|\n|\r)/gm, " ");
                    result.push({
                        title,
                        addTime,
                        link,
                        publicationDate,
                        dateOfParsing,
                        previousDate,
                        text
                    });
                });
                return result;
            });
            //parsing text after following the link
            for (let i = 0; i < html.length - 1; i++) {
                if (html[i].link.substr(8, 10) == 'www.pravda') {
                    await page.goto(html[i].link, {
                        waitUntil: 'domcontentloaded'
                    })
                    await page
                        .waitForSelector('div.post_text')
                        .catch(e => console.log(e));

                    let article = await page.evaluate(async () => {
                        let article;
                        try {
                            article = document
                                .querySelector('div.post_text')
                                .innerText
                                .replace(new RegExp("\\r?\\n", "g"), "");;
                        } catch (e) {
                            article = null;
                        }

                        return article;
                    })
                    html[i].text += article;
                } else {
                    html.splice(i, 1);
                };
            };
            //added object on JSON
            fs.appendFileSync('pravda.json', JSON.stringify(html), function (err) {
                if (err)
                    throw err
            })
            //switch a days
            await page.goto(html[0].previousDate, {
                waitUntil: 'domcontentloaded'
            });
        };
        console.log('Saved pravda.json file')
        await browser.close();
    } catch (e) {
        await browser.close()
        console.log(e);
    };
};

//Number of days
parserNewsWebView(0);
