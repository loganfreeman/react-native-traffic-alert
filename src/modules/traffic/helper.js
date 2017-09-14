import cheerio from 'cheerio-without-node-native';

function extractZoomTo(s) {
  let zoom_to = s.split(';')[0];
  let re = /zoom_to\('(\d+.\d+)',\s*'(-?\d+.\d+)'\)/;
  let match = re.exec(zoom_to)
  return {
    latitude: Number(match[1]),
    longitude: Number(match[2])
  }
}

export function extractTrafficReport(html) {
  let $ = cheerio.load(html);
  let incidents = [];
  let constructions = [];
  $('#list_incidents').children().each((index, child) => {
    let descriptions = $(child).text().split(/\r?\n/).filter(s => s.trim().length > 0).map(s => s.trim());
    //let zoomto = $(child).find('.zoomincidents a').attr('onclick').match('zoom_to\((.*)\)')[1].replace(/'/g, '');
    let zoomto = $(child).find('.zoomincidents a').attr('onclick');
    if(zoomto) {
      incidents.push({
        title: descriptions[0],
        time: descriptions[2],
        detail: descriptions[1].split(/\t+/),
        zoomto: extractZoomTo(zoomto)
      })
    }
  })

  $('#list_constructionlist').children().each((index, child) => {
    let descriptions = $(child).text().split(/\r?\n/).filter(s => s.trim().length > 0).map(s => s.trim());
    //let zoomto = $(child).find('.zoomincidents a').attr('onclick').match('zoom_to\((.*)\)')[1].replace(/'/g, '');
    let zoomto = $(child).find('.zoomincidents a').attr('onclick');
    if(zoomto) {
      constructions.push({
        title: descriptions[0],
        time: descriptions[2],
        detail: descriptions[1].split(/\t+/),
        zoomto: extractZoomTo(zoomto)
      })
    }

  });

  return {
    incidents,
    constructions
  }
}
