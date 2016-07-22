# supercluster [![Simply Awesome](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects) [![Build Status](https://travis-ci.org/mapbox/supercluster.svg?branch=master)](https://travis-ci.org/mapbox/supercluster)

A very fast JavaScript library for geospatial point clustering for browsers and Node. _A work in progress._

```js
var index = supercluster({
    radius: 40,
    maxZoom: 16
});
index.load(points);
index.getClusters([-180, -85, 180, 85], 2);
```

Modified to add convex hulls to the clusters, allowing display of that as the marker, rather than a point.

Demo still needs work as far as coloring by density, and some better labeling.
