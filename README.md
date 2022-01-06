# lol-champs-renders-download

Small project which I used to download 165 images of LoL champions from [https://leagueoflegends.fandom.com/](https://leagueoflegends.fandom.com/wiki/Category:Champion_renders). 
Instead of going through every champion manually and downloading their render image I built a this.

### How it works
First it gets all the champion names. I get them from [League of Legends Fandom](https://leagueoflegends.fandom.com/wiki/Category:Champion_renders). After
crawling the page I get all the link hrefs for the renders and loop through them. On every loop I crawl the champion fandom page,
find their render img and download it to my machine.
