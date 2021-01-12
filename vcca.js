const puppeteer = require('puppeteer');

// ディレクトリを作成
const fs = require("fs");

// 'tmp'が存在するかチェック
if (!fs.existsSync('output')) {
  // 'tmp'ディレクトリを作成 
  fs.mkdirSync('output', (err, folder) => {
    if (err) throw err;
    console.log(folder);
  });
}
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  if(process.argv[2]){
    for(let i=2;i<process.argv.length;i++){
      let url = "https://voxelcanvas.me/view/?m=" + process.argv[i];
      await page.goto(url,{"waitUntil" : "networkidle0", "timeout": 0});
      await page.evaluate( () => document.getElementsByTagName("a")[0].style.cssText = "display:none;")
      await page.screenshot({path: "./output/" + process.argv[i] + '.png'});
    }
  }
  await browser.close();
})();