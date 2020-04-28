const puppeteer = require("puppeteer");

const client = ["bos",'gan','tuan','normies'];
const clientWaitMessage = ["sabar","tunggu ye","bentar yak"];
const clientResponseMessage = ["noh udah","beres nih","selesai dah"];
(async () => {
    const uri = process.argv[2]
    const r_client = randomResponse(client);
    const r_cwm = randomResponse(clientWaitMessage);
    const r_crm = randomResponse(clientResponseMessage);

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

  if (typeof uri == 'undefined' || uri == "") {
      await browser.close();
  }

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  console.log(`hallo ${r_client}`);
  console.log(`${r_cwm} ${r_client} ane pendekin dulu url ${uri} nye`)
  await page.goto("https://www.shorturl.at/");
  await page.waitFor("#formurl");
  await page.waitFor("input[name=u]");

    await page.$eval(
      "input[name=u]",
      (el, shortenuri) => {
        el.value = shortenuri;
      },
      uri
    );

    console.log(`proses pendekin nih ${r_client} .... ⏳`);
    await page.click("input[type=submit]");


    if(await page.url() != "https://www.shorturl.at/shortener.php") {
        console.log(`sepertinya url yang ${r_client} masukkan (${uri}) tidak sesuai dengan format urlnya nih ${r_client}`)
        browser.close();
    }
    
    let shortenurlinput = await page.waitFor("input[id=shortenurl]")
    let shortenUrlResult = await page.evaluate(el => el.value, shortenurlinput);
    console.log(`${r_crm} ${r_client} : ${shortenUrlResult}`);
    console.log(`lebih pendek kan ${r_client} dari : ${uri} \n`);
    console.log(
      `cara pakainya cukup block urlnya ${r_client} trus tekan CRTL + SHIFT + C \n atau klik kanan copy ${r_client} 😁`
    );



  await browser.close();
})();

function randomResponse(responseData) {
    let response;
    response = responseData[getRandomInt(responseData.length)]
    return response;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
