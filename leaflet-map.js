/* globals L:false, Event:false, console:false */

'use strict';

Polymer('leaflet-map', {
  tiles: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
  height: '500px',
  width: '100%',
  lat: 51.5,
  lng: 0,
  zoom: 2,
  clusterSize: 20,

  ready: function() {
    L.Icon.Default.imagePath = 'bower_components/leaflet-map/leaflet/images';

    this.$.map.style.width = this.width;
    this.$.map.style.height = this.height;

    this.map = L.map(this.$.map).setView([this.lat, this.lng], this.zoom);

    L.tileLayer(this.tiles).addTo(this.map);

    this.markers = new L.MarkerClusterGroup({
      maxClusterRadius: this.clusterSize
    });

    this.layer = L.geoJson();

    this.markers.addLayer(this.layer);

    this.map.addLayer(this.layer); // TODO: this.markers

    window.dispatchEvent(new Event('resize')); // redraw the map full size now it's visible
  },

  dataChanged: function() {
    this.layer.clearLayers();

    if (this.data) {
      this.layer.addData(this.data);
      //this.map.fitBounds(this.layer.getBounds());
    }
  }
});