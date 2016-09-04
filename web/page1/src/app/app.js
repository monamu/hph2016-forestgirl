import axios from 'axios';
require('es6-promise').polyfill();

const aws = AWS;
const _$ = $;

const getData = (id) => {
  let items = [
    {
      "lon": 140,
      "price": 123,
      "thetaUrl": "https://theta360.com/s/gbMh905mo8JV3PwgmnRFKPT1w",
      "lat": 90,
      "category": "1",
      "itemid": "1",
      "title": "○○近辺の白樺樹皮",
      "description": "説明文です"
    },
    {
      "lon": 140,
      "price": 6000,
      "thetaUrl": "https://theta360.com/s/iDhZBavRajKGpoY2Ov7rD19fA",
      "lat": 90,
      "category": "1",
      "itemid": "2",
      "title": "えんがる近辺の白樺樹皮",
      "description": "伐倒までサポートします！"
    }
  ];

  return new Promise((resolve, reject) => {
    if (id) {
      let result = {};
      items.map((item) => {
        if (item.itemid === id) {
          result = item;
        }
        return item;
      });
      resolve(result);
    } else {
      resolve(items);
    }
  });
};


const listPage = () => {
  const tableEle = _$('#items');

  getData()
    .then((items) => {
      items.map((item) => {
        const el = $(
          `<tr>` +
            `<td><a href="detail.html?itemid=${item.itemid}">${item.itemid}</a></td>` +
            `<td>${item.thetaUrl}</td>` +
            `<td>${item.title}</td>` +
            `<td>${item.description}</td>` +
            `<td>${item.price}</td>` +
          `</tr>`);
        el.appendTo(tableEle);
      });
    });
};

const detailPage = (id) => {
  getData(id)
    .then((item) => {
      _$('#title').text(item.title);
      _$('#description').text(item.description);
      _$('#price').text(item.price);
      const thetaEle = $(`<a href="${item.thetaUrl}" target="_blank">Spherical Image - RICOH THETA</a>`);
      thetaEle.appendTo(_$('#thetaImage'));
    });

};


if (_$('#listPage').length > 0) {
  listPage();
} else if (_$('#detailPage').length > 0){
  detailPage($.Querystring('itemid'));
}


/*

<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >1 - <a href="https://theta360.com/s/gbMh905mo8JV3PwgmnRFKPT1w" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >2 - <a href="https://theta360.com/s/nhMBG2gOSDMDmKP2l0UCYxPim" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >3 - <a href="https://theta360.com/s/nHPR2xVT3Tl6uQlfVhfsX7gRw" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >4 - <a href="https://theta360.com/s/cIriuw3sMnkG0X336nwmdaylY" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >5 - <a href="https://theta360.com/s/fP9GveVnhpQSliZQGDzoTVy56" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >6 - <a href="https://theta360.com/s/iDhZBavRajKGpoY2Ov7rD19fA" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
<blockquote data-width="500" data-height="375" class="ricoh-theta-spherical-image" >7 - <a href="https://theta360.com/s/lTxa3larzzkVgQ3LiqSpwwtd6" target="_blank">Spherical Image - RICOH THETA</a></blockquote><script async src="https://theta360.com/widgets.js" charset="utf-8"></script>
*/
