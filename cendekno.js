const puppeteer = require("puppeteer");
require("colors");

const client = ["bos", "gan", "kanjeng", "pateh"];
const clientWaitMessage = ["sabar", "sek nggeh", "riyen nggeh"];
const clientResponseMessage = ["kae pun", "mari wes", "mpun"];
(async () => {
  try {
    const uri = process.argv[2];
    const r_client = randomResponse(client);
    const r_cwm = randomResponse(clientWaitMessage);
    const r_crm = randomResponse(clientResponseMessage);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    if (typeof uri == "undefined" || uri == "") {
      throw new Error(
        `ngapunten ${r_client} url e jenengan harus di lebetke 😁`
      );
    }

    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    console.log(`hallo ${getTimeNow()} ${r_client}`);
    console.log(
      `${r_cwm} ${r_client} kulo cendek ne riyen url ${uri.brightBlue} nggeh`
    );
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

    console.log(`tasek proses nyendekne ${r_client} .... ⏳ \n`.blue);
    await page.click("input[type=submit]");

    if ((await page.url()) != "https://www.shorturl.at/shortener.php") {
      throw new Error(
        `koyone url seng ${r_client} lebetke (${uri}) mboten sesuai kaleh format url e niki ${r_client} 😢`
      );
    }

    let shortenurlinput = await page.waitFor("input[id=shortenurl]");
    let shortenUrlResult = await page.evaluate(
      (el) => el.value,
      shortenurlinput
    );
    console.log(`* ${r_crm} ${r_client} : ${shortenUrlResult} ✅ `.green);
    console.log(`* luwih cendek kan ${r_client} tekan : ${uri} ❗ \n`.yellow);
    console.log(
      `cara gawene cukup diblok url e ${r_client} trus di dulek CRTL + SHIFT + C utawi klik kanan trus copy ${r_client} 😁`
        .brightGreen
    );

    await browser.close();
  } catch (error) {
    console.log(
      `wadoo gagal di cendek ke, niki error e : ${error.message}`.brightRed
    );
    console.log(
      `monggo di dulek CTRL + C, kangge medal saking Commandline trus di jalan ke maleh 😁`
        .brightGreen
    );
  }
})();

function randomResponse(responseData) {
  let response;
  response = responseData[getRandomInt(responseData.length)];
  return response;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getTimeNow() {
  let timeNow, greeting;
  timeNow = new Date().toJSON().slice(11, 13);

  if (timeNow > "00" && timeNow < "12") {
    greeting = "enjing 🌞";
  } else if (timeNow >= "12" && timeNow <= "15") {
    greeting = "siang 🌅";
  } else if (timeNow > "15" && timeNow <= "18") {
    greeting = "sonten 🌥";
  } else if (timeNow > "18" && timeNow <= "00") {
    greeting = "wengi 🌙";
  }

  return `sugeng ${greeting}`;
}
