const puppeteer = require('puppeteer')
const base_url = 'https://tinnhiemmang.vn/';

const main = async () => {
    const browser = await puppeteer.launch()
    const page = (await browser.pages())[0]

    const getBlackListAccount = async () => {
        await page.goto(`${base_url}tra-cuu-tai-khoan`);
        await page.waitForNetworkIdle();
        var accElListLength = await page.evaluate(async () => {
            const pagingEls = document.querySelectorAll('#list-obj ul li.page-item.normar');
            const totalPage = +pagingEls[pagingEls.length - 1].textContent
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const getAccount = async () => {
                var currentPage = +document.querySelector('#list-obj ul li.page-item.active').textContent;
                const accElList = document.querySelectorAll('#list-obj ul li.item1');

                let accElLists = []
                accElList.forEach(x => {
                    const iconEl = x.querySelector('.icon3 img').src;
                    const accNumber = x.querySelector('.meta .webkit-box-2').textContent.trim();
                    const accName = x.querySelector('.meta .date.font12').textContent.trim();
                    const linkEl = x.querySelector('.org a');
                    const bankName = linkEl.textContent.trim();
                    const link = linkEl.href.trim();
                    const status = x.querySelector('.status').textContent.trim()

                    accElLists.push({
                        icon: iconEl,
                        accNumber,
                        accName,
                        bankName,
                        link,
                        status
                    })
                });
                if (currentPage < totalPage) {
                    const pages = document.querySelectorAll(".page-item");
                    pages[pages.length - 1].querySelector('a').click()
                    await delay(1000)
                    const account = await getAccount();
                    accElLists = accElLists.concat(account)
                }
                return accElLists
            }
            const account = await getAccount()
            return account
        });

        return accElListLength;
    }

    return {
        getBlackListAccount
    }
}

module.exports = main