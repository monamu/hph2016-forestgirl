import axios from 'axios';
import ol from 'openlayers';
import FeatureWrapper from './FeatureWrapper';
require('es6-promise').polyfill();

const aws = AWS;
const _$ = $;

let currentData = {};

// 初期設定
const env = {
  selfLocationIconImage: 'img/self.png',
  defaultLocation: {
    lon: 142.3605716228485,
    lat: 43.765143524274045,
    zoom: 10 } };
// 自分の位置を表示するFeature
let selfLocationFeature;
// Openlayers Mapのインスタンス
let ol3Map;
// デバイス表示layer
let deviceLayer;

// Mapの初期化
const prepareMap = () => {
  const positionData = (currentData)?currentData:env.defaultLocation;
  return new Promise((resolve) => {
    ol3Map = new ol.Map({
      target: 'ol3Map',
      renderer: ['canvas', 'dom'],
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM })],
      controls: ol.control.defaults({
        attributionOptions: ({
          collapsible: false }),
        zoom: false }).extend([
        // new HomeButton()
        ]),
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([
          positionData.lon,
          positionData.lat]),
        maxZoom: 18,
        zoom: env.defaultLocation.zoom }) });
    // 右寄せのZoom
    ol3Map.addControl(new ol.control.Zoom({ className: 'ol-zoom' }));
    // device表示用のレイヤーを追加
    deviceLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [] }) });
    ol3Map.addLayer(deviceLayer);
    resolve();
  });
};

// Featureを生成して、Mapに配置する
// この時点では生成と配置のみで表示は行わない（緯度経度が取得されていないので
// 自分の位置を表示するFeatureもここで設定する
const putFeatures = (params) => {
  const positionData = (currentData)?currentData:env.defaultLocation;
  const tempArr = [];
  // 自分の表示位置を初期の中心位置で作成する（この時点では非表示のまま
  selfLocationFeature = new FeatureWrapper(
    'self',
    '',
    positionData.lon,
    positionData.lat,
    env.selfLocationIconImage);
  selfLocationFeature.show();
  tempArr.push(selfLocationFeature);

  // レイヤーに表示
  deviceLayer.setSource(
    new ol.source.Vector({
      features: tempArr })
  );
  return Promise.resolve(params);
};

const getData = (id) => {
  let items = [
    {
      "lon": 142.3605716228485,
      "price": 123,
      "thetaUrl": "https://theta360.com/s/gbMh905mo8JV3PwgmnRFKPT1w",
      "lat": 43.765143524274045,
      "category": "1",
      "itemid": "1",
      "title": "○○近辺の白樺樹皮",
      "description": "説明文です"
    },
    {
      "lon": 143.55148315429688,
      "price": 6000,
      "thetaUrl": "https://theta360.com/s/iDhZBavRajKGpoY2Ov7rD19fA",
      "lat": 44.05798552253712,
      "category": "1",
      "itemid": "2",
      "title": "えんがる近辺の白樺樹皮",
      "description": "伐倒までサポートします！"
    }
  ];

  return new Promise((resolve, reject) => {
    if (id) {
      axios.get(
          `https://ify9s1x325.execute-api.ap-northeast-1.amazonaws.com/prod/items/${id}`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          console.log(response);
          resolve(response.data.Item);
        })
        .catch((response) => {
          alert('get item error see console log');
          console.error(response);
          reject(response);
        });
      // let result = {};
      // items.map((item) => {
      //   if (item.itemid === id) {
      //     result = item;
      //   }
      //   return item;
      // });
      // resolve(result);
    } else {
      axios.get(
          'https://ify9s1x325.execute-api.ap-northeast-1.amazonaws.com/prod/items',
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          console.log(response);
          resolve(response.data.Items);
        })
        .catch((response) => {
          alert('get item error see console log');
          console.error(response);
          reject(response);
        });
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
      currentData = item;
      _$('#title').text(item.title);
      _$('#description').text(item.description);
      _$('#price').text(item.price);
      const thetaEle = _$(
        '<blockquote id="thetaImage" data-width="500" data-height="375"' +
          ' class="ricoh-theta-spherical-image" >' +
        `<a href="${item.thetaUrl}" target="_blank">Spherical Image - RICOH THETA</a>` +
        '</blockquote>' +
        '<script async src="https://theta360.com/widgets.js" charset="utf-8"></script>'
      );
      thetaEle.appendTo(_$('#thetaImage'));
    })
    .then(() => {
      prepareMap()
        .then(() => {
          putFeatures();
        });
    });
};


if (_$('#listPage').length > 0) {
  listPage();
} else if (_$('#detailPage').length > 0) {
  detailPage(_$.Querystring('itemid'));
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
