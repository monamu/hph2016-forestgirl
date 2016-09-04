import ol from 'openlayers';

// textをFeatureにあわせて表示する
const createTextStyle = (text) => new ol.style.Text({
  text,
  font: '18px "Meiryo"',
  fill: new ol.style.Fill({ color: 'black' }),
  stroke: new ol.style.Stroke({ color: 'white', width: '5' }),
  textBaseline: 'top' });
/**
 * ol.Featureのラッパークラス.
 * 初期状態では非表示
 */
export default class Feature extends ol.Feature {
  constructor(groupId, deviceId, lon, lat, imgSrc, label = '') {
    super({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(
          [lon, lat])),
      groupId,
      deviceId });
    // 緯度経度情報をプロパティとして保持する
    this.lonlat = { lon, lat };
    this.label = label;
    // 表示・非表示のためにiconStyleをプロパティを保持しておく
    this.iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0], // 基点を方向の中心・Y方向の0
        anchorOrigin: 'bottom-left', // 原点は下の左
        anchorXUnits: 'fraction', // X方向の単位（これで0.5が中心を示す
        anchorYUnits: 'pixels',
        // opacity: 0.75,
        src: imgSrc })),
      text: createTextStyle(this.label) });
    // 非表示用style
    this.hiddenStyle = new ol.style.Style({ image: null });
    this.isVisible = false;
    this.setStyle(this.hiddenStyle);
  }

  setLonlat({ lon, lat }) {
    // 緯度経度情報をプロパティとして保持する
    this.lonlat = { lon, lat };
    this.setGeometry(
      new ol.geom.Point(ol.proj.fromLonLat(
          [lon, lat])));
  }

  // 緯度経度を取得
  getLonlat() {
    return this.lonlat;
  }

  hide() {
    this.isVisible = false;
    this.setStyle(this.hiddenStyle);
  }
  show() {
    this.isVisible = true;
    this.setStyle(this.iconStyle);
  }
  isShown() {
    return this.isVisible;
  }
}
