const fs = require('fs');
const Crawler = require('crawler');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const client = require('https');

const championNamesFolder = 'D:\\dragontail-11.24.1\\11.24.1\\data\\en_US\\champion'
const championNames = [];

fs.readdir(championNamesFolder, (err, file) => {
  file.forEach(file => {
    championNames.push(file.split('.')[0])
  })

  const c = new Crawler({
    maxConnections : 10,
    rateLimit: 2000,
    // This will be called for each crawled page
    callback : function (error, res, done) {
      if(error){
        console.log(error);
      }else{
        const $ = res.$;
        const championName = res.options.parameter1;
        const regex = new RegExp(`.+?${championName}_Render.png.+?`, 'msg');

        const dom = new JSDOM(res.body);
        const imgTags = dom.window.document.querySelectorAll("img");

        imgTags.forEach((tag) => {
          if(regex.test(tag.src)) {
            client.get(tag.src, (res) => {
              res.pipe(fs.createWriteStream(`renders/${championName}.png`));
            });
          }
        })


        // console.log(test)
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        console.log($("title").text());
      }
      done();
      console.log(done)
    }
  });

  championNames.forEach((name) => {
    let fixName = name.match(/[A-Z][a-z]+/g);
    fixName = fixName.join("_")
    c.queue({uri: `https://leagueoflegends.fandom.com/wiki/${fixName}`, parameter1: fixName});
  })

  console.log('Hello World')
})

