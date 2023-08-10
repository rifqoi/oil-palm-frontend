(function () {
  // Use public isFlat if available, else fall back to private _flat
  var isFlat = L.LineUtil.isFlat ? L.LineUtil.isFlat : L.LineUtil._flat;

  function defineSnogylop(L) {
    var worldLatlngs = [
      L.latLng([90, 180]),
      L.latLng([90, -180]),
      L.latLng([-90, -180]),
      L.latLng([-90, 180]),
    ];

    L.extend(L.Polygon.prototype, {
      _setLatLngs: function (latlngs) {
        if (this.options.invert) {
          worldLatlngs = this.options.worldLatLngs
            ? this.options.worldLatLngs
            : worldLatlngs;
          // Create a new set of latlngs, adding our world-sized ring
          // first
          var newLatlngs = [];
          newLatlngs.push(worldLatlngs);

          for (var l in latlngs) {
            newLatlngs.push(latlngs[l]);
          }
          latlngs = [newLatlngs];
        }
        console.log(latlngs);
        L.Polyline.prototype._setLatLngs.call(this, latlngs);
      },
    });
  }

  if (typeof define === "function" && define.amd) {
    // Try to add snogylop to Leaflet using AMD
    define(["leaflet"], function (L) {
      defineSnogylop(L);
    });
  } else {
    // Else use the global L
    defineSnogylop(L);
  }
})();
