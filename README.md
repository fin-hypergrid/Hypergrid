#Hypergrid by OpenFin
The Hypergrid control is a canvas based open source general purpose grid. The purpose of this project is to address the Finance/Big Data community's desire for a high performance, unlimited row data-grid. At the moment, it is in an alpha stage and still has a significant amount of work to be completed. These include bug-fixes/features/automated testing/etc.  Please try it out and let us know what you think.

## PluggableGridBehaviors
The design makes no assumptions about the data you wish to view which
allows for external data sources as well as external manipulation and
analytics.  Manipulations such as sorting, aggregation, and grouping 
can be achieved using external best of breed high-performant real time tools 
designed for such purposes.  

##The Super Easy Setup
If you just want to see hypergrid working you can run the [hypergrid installer](https://dl.openfin.co/services/download?fileName=hypergrid-installer&config=https://demoappdirectory.openf.in/desktop/deploy/hypergrid/hypergrid.json) or just goto the [website](https://demoappdirectory.openf.in/desktop/deploy/hypergrid/).

## Getting Started
1. This setup has been tested and works, if you have problems you most likely have security restrictions or proxy issues.  You may need to use sudo for npm and bower installs. Make sure you have internet access, node/npm, grunt-cli, and bower installed and working properly on your machine.
    1. [node installation](http://nodejs.org/download/)
    2. [grunt/grunt-cli installation](http://gruntjs.com/getting-started)
    3. [bower](http://bower.io/)
3. Clone this repo ```git clone https://github.com/openfin/Hypergrid.git```
4. cd into the cloned project ```cd Hypergrid```
5. Install the npm dependencies ```npm install```
6. Install the bower dependencies ```bower install```
7. Start the grunt process ```grunt serve```, after which your browser should automatically open

## Important notes
1. The packaging of this application and it's sub-components will change soon.  Currently we are using browserify packages distributed through bower with debowerify as the final build step.  We plan on replacing the bower distribution with proper npm packages.  This is a necessary step to begin building a proper testing harness.
2. The scrollbars have several issues that will be cleared up in the next few days.

## Q external data source
An example QGridBehavior can be enabled by editing the index.html found within the dev environment.

1. Make sure q 32 bit free version is installed [Q free version](http://kx.com/software-download.php)
2. Startup either bigtable.q ```q bigtable.q``` or sorttable.q ```q sorttable.q```
3. Make sure grunt serve is running
4. Edit the file examples/dev/index.html
    1. Comment out the line ```grid.setBehavior(new InMemoryGridBehavior());```
    2. Uncomment the line ```//grid.setBehavior(new QGridBehaviour('ws://localhost:5000/'));``` 
5. The grunt serve process should automatically refresh your web browser with the q driven grid

## Custom Scrollbars
Hypergrid utilizes a custom scrollbar component so as to not be limited to tables of 33MM pixels in width or height.   In addition to the custom scrollbar, The OpenFin Grid utilizes row and column cell scrolling, not pixel scrolling.  This has many benefits that become apparent over time.

## Road Map 
1. Test suite for all components and upstream dependency projects
2. Continued bug-fixing, refactoring, documentation and cleanup of the existing code base
3. Delegation of cell editing through GridBehavior / CellRendering objects
4. GridBehaviors for other data sources
5. Column reordering/resizing/autosizing
6. Hover event support
7. Tooltip support 
8. Layer abstraction
9. Refactor to non-prototype mixin based design
10. Make work in older and more browser types using [google polymer](https://www.polymer-project.org/)

## Feature List
* High performant canvas based
* Arbitrary row/col sizes
* Data per cell can be anything (text, numerical, nested arrays, etc.)
* Shape/size in both pixel and row/column count can change dynamically
* Infinite scrolling row/col through external high performant data sources (see Q examples)
* Copy to paste buffer selected cells (work in progress...)
* Multi-rectangle based selection model
* Mouse driven dragging selections
* Shift/control selection augmentation
* Fast arrow key navigation
* Non-linear accelerated vertical key navigation
* Custom scrollbar implementation for infinite scroll of large data sets
* Cell based scrolling (not pixel) 
* Pluggable behavior based eventing
* In place editing mechanism using html5 overlayed components
* Simple Q-based GridBehavior example provided with 2 q scripts. 100MM example, and 1MM sortable example
* Simple in memory based GridBehavior example provided
* Easily customizable and extensible cell rendering
* Npm/grunt-based full featured dev environment
* ...
