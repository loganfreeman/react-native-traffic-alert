import cheerio from 'cheerio-without-node-native';


export function extractTrafficReport(html) {
  let $ = cheerio.load(html);
  let incidents = [];
  let constructions = [];
  $('#list_incidents').children().each((index, child) => {
    let descriptions = $(child).text().split(/\r?\n/).filter(s => s.trim().length > 0).map(s => s.trim());
    let zoomto = $(child).find('.zoomincidents a').text();
    incidents.push({
      descriptions,
      zoomto
    })
  })

  $('#list_constructionlist').children().each((index, child) => {
    let descriptions = $(child).text().split(/\r?\n/).filter(s => s.trim().length > 0).map(s => s.trim());
    let zoomto = $(child).find('.zoomincidents a').text();
    constructions.push({
      descriptions,
      zoomto
    })
  })

  return {
    incidents,
    constructions
  }
}
