const fs = require('fs');
const Crawler = require('crawler');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const client = require('https');

const crawlerChampionImage = new Crawler({
  maxConnections : 10,
  rateLimit: 2000,
  // This will be called for each crawled page
  callback : function (error, res, done) {
    if(error){
      console.log(error);
    }else{
      const $ = res.$;
      const championName = res.options.parameter1;

      const regex = new RegExp(`.+?${championName}.png.+?`, 'msg');

      const dom = new JSDOM(res.body);
      const imgTags = dom.window.document.querySelectorAll("img");

      imgTags.forEach((tag) => {
        if(regex.test(tag.src)) {
          client.get(tag.src, (res) => {
            res.pipe(fs.createWriteStream(`renders/${championName}.png`));
          });
        }
      })

      console.log($("title").text());
    }
    done();
    console.log(done)
  }
});

const crawlerRenders = new Crawler({
  maxConnections: 10,
  callback: function (error, res, done) {
    if(error){
      console.log(error);
    }else {
      const $ = res.$;

      const dom = new JSDOM(res.body);
      const champMembers = dom.window.document.querySelectorAll("#content .category-page__member-link");

      const champNameRegex = RegExp('File:(.+?)\\.png');

      champMembers.forEach((member) => {
        const href = member.getAttribute('href');
        const champName = champNameRegex.exec(href)[1];

        crawlerChampionImage.queue({uri: `https://leagueoflegends.fandom.com/${href}`, parameter1: champName});
      });
    }
    done();
  }
})

crawlerRenders.queue('https://leagueoflegends.fandom.com/wiki/Category:Champion_renders')

