# lol-champs-renders-download

Small project which I used to download 165 images of LoL champions from [https://leagueoflegends.fandom.com/](https://leagueoflegends.fandom.com/wiki/Category:Champion_renders). 
Instead of going through every champion manually and downloading their render image I built a this.

### How it works
First it gets all the champion names. I get them from [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) which is Riot way of centralizing League of Legends 
game data and assets. After that I loop through all the champion names and on every champion I crawl the champion fandom and I get all the img tags and find the tag
with src that has the champion Render. Lastly I just download the image from src and store it into my machine
