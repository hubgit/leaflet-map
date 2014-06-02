/* globals L:false, Event:false, console:false */

'use strict';

Polymer('leaflet-map', {
  tiles: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  height: '500px',
  width: '100%',
  lat: 51.5,
  lng: 0,
  zoom: 10,

  ready: function() {
    L.Icon.Default.imagePath = 'leaflet/images';

    this.$.map.style.width = this.width;
    this.$.map.style.height = this.height;

    this.map = L.map(this.$.map).setView([this.lat, this.lng], this.zoom);
    L.tileLayer(this.tiles).addTo(this.map);

    this.markers = new L.MarkerClusterGroup({
      maxClusterRadius: 20
    });
    this.map.addLayer(this.markers);

    window.dispatchEvent(new Event('resize')); // redraw the map full size now it's visible
  },

  reset: function() {
    //this.markers.reset();
  },

  add: function(item) {
    console.log('add', item);

    var marker = L.marker([ item.lat, item.lng ]);//.addTo(this.map);

    if (item.popup) {
      marker.bindPopup(item.popup);
    }

    this.markers.addLayer(marker);

    return marker;
  }
});