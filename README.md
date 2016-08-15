# supercluster [![Simply Awesome](https://img.shields.io/badge/simply-awesome-brightgreen.svg)](https://github.com/mourner/projects) [![Build Status](https://travis-ci.org/mapbox/supercluster.svg?branch=master)](https://travis-ci.org/mapbox/supercluster)

A very fast JavaScript library for geospatial point clustering for browsers and Node. _A work in progress._

Modified to add rectangular extents to the clusters. This version also accepts web mercator coordinates
instead of lat/long.

In order to create an importable module, run the following command:

`browserify index.js --standalone supercluster -g uglifyify > {output-file}`
