Wu.Graph = Wu.Graph || {};
Wu.Graph.Year = Wu.Evented.extend({

	_initialize : function (options) {

		// Tis is for enabling different kinds of graphs
		if ( this.options.type != 'annualCycles' ) return;

		// Prepares all the data into right format
		this.renderData(this.options.data);
		
		// Init graph
		this.initGraph();
		
		// Set date
		this.updateDayOfYear();
		
		// Update buttons (this is on slider, aka external)
		this.checkEnds();
		
		// Add events listners
		this.addHooks();

	},

	// Listen to events
	addHooks : function () {
		// Wu.Mixin.Events.on('animationSlide', this.sliding, this);
		Wu.Mixin.Events.on('sliderUpdate', this.sliding, this);
		Wu.Mixin.Events.on('sliderMoveBackward', this.moveBackward, this);
		Wu.Mixin.Events.on('sliderMoveForward', this.moveForward, this);
		Wu.Mixin.Events.on('setSliderTitle', this.setTitle, this)
	},

	// When slider is sliding
	sliding : function (e) {
		this._sliderValue = e.detail.value;
		this.updateDayOfYear();
	},

	// When setting title
	setTitle : function (e) {
		var title = e.detail.title;
		this._title.innerHTML = title;
	},

	// Skipping one year back in time
	moveBackward : function () {

		if ( this.disableBackward ) return;

		this.currentYear--;

		console.log('moveBackward', this.slider);

		var currentDay = this.years[this.currentYear][this.currentDay-1];
		if ( !currentDay ) {
			this._sliderValue = this.finalDay.Doy;
			this.slider.set([this._sliderValue]);
		}

		this.updateDayOfYear();

		this.checkEnds();		

	},

	// Skipping one year ahead in time
	moveForward : function () {
		
		if ( this.disableForward ) return;
		
		this.currentYear++;

		var currentDay = this.years[this.currentYear][this.currentDay-1];
		if ( !currentDay ) {
			this._sliderValue = this.finalDay.Doy;
			this.slider.set([this._sliderValue]);
		}
	
		this.updateDayOfYear();

		this.checkEnds();
	},

	// returns moment.js object
	getCurrentDate : function (day) {

		// get day/year
		var day = day;
		var year = this.currentYear;

		// create moment date from year/day
		var date = moment().dayOfYear(day).year(year);

		// return moment.js object
		return date;
	},


	// Check if we are at the beginning or the end of the data
	checkEnds : function () {

		// FORWARD BUTTON
		if ( this.currentYear == this.yearNames[this.yearNames.length-1] ) {
			this.disableForward = true;
		} else {
			this.disableForward = false;
		}

		// BACKWARD BUTTON
		if ( this.currentYear == this.yearNames[0] ) {
			this.disableBackward = true;
		} else {
			this.disableBackward = false;
		}

		// Fire event, so that slider can disable buttons
		Wu.Mixin.Events.fire('updateSliderButtons', { detail : {
			disableForward  : this.disableForward,
			disableBackward : this.disableBackward

		}});			

	},

	renderData : function (allYears) {

		// Array of JSON with all days with every year, one by one
		this.allYears = allYears;

		// Array of JSON with all days, categorized by year
		this.years = this.sanitizeYears(this.allYears);

		// Array of JSON with all days, categorized by year
		this.days = this.sanitizeDays(this.allYears);

		// Get min, max and average values for one year
		this.maxSCF = this.getMaxSCF(this.days);
		this.minSCF = this.getMinSCF(this.days);
		this.avgSCF = this.getAvgSCF(this.days);
		
		// Create blank array
		this.allData = [];

		// Populate array with data
		this.maxSCF.forEach(function (mx,i) {
			var obj = {
				no   : i,
				max  : mx,
				date : this._dateFromNo(i),				
				min  : this.minSCF[i],
				avg  : this.avgSCF[i]
			};
			this.allData.push(obj);
		}.bind(this));	


		this.ticks = [];

		var currentMonth = '';

		this.allYears.forEach(function (y) {
			var year = y.Year;
			var month = this.getMonthName(y.Doy, y.Year);
			var doy = y.Doy;
		  	var blankDate = new Date(year, 0);
	  		var date = new Date(blankDate.setDate(doy));
			var day = date.getDate();
			var monthNo = date.getMonth()+1;			

			if (currentMonth != month) {
				currentMonth = month;
				
				this.ticks.push({ 
					month   : month, 
					year    : year,
					doy     : doy,
					monthNo : monthNo
				});
			}

		}.bind(this))



		// Year Names
		this.yearNames = [];
		for ( var y in this.years ) {
			var _y = parseInt(y);
			if ( !isNaN(_y) ) {
				this.yearNames.push(_y);
			}
		}

		this.currentYear = this.yearNames[this.yearNames.length-1];

		// SAVE THE LAST DAY IN THE TIME LINE
		// Get object
		var lastDay = this.allYears[this.allYears.length-1];

		// Get last year
		var lastYear = lastDay.Year;

		// Get last day of year
		var lastDoy = lastDay.Doy;

		// Get last month name
		var lastMonth = this.getMonthName(lastDoy, lastYear);

		// Set date, so that we can get month number, and day of month number
	  	var blankDate = new Date(lastYear, 0);
  		var setDate = new Date(blankDate.setDate(lastDoy));

  		// Get last month number
		var lastDofMonth = setDate.getDate();

		// Get last day of last month
		var lastMonthNo = setDate.getMonth()+1;

		// Store final day
		this.finalDay = {
			Year    : lastYear,
			Month   : lastMonth,
			Day     : lastDofMonth,
			Doy     : lastDoy,
			MonthNo : lastMonthNo
		}


		// SAVE THE FIRST DAY IN THE TIME LINE
		// Get object
		var firstDay = this.allYears[0];

		// Get last year
		var firstYear = firstDay.Year;

		// Get last day of year
		var firstDoy = firstDay.Doy;

		// Get last month name
		var firstMonth = this.getMonthName(firstDoy, firstYear);

		// Set date, so that we can get month number, and day of month number
	  	var blankDate = new Date(firstYear, 0);
  		var setDate = new Date(blankDate.setDate(firstDoy));

  		// Get last month number
		var firstDofMonth = setDate.getDate();

		// Get last day of last month
		var firstMonthNo = setDate.getMonth()+1;


		this.firstDay = {
			Year    : firstYear,
			Month   : firstMonth,
			Day     : firstDofMonth,
			Doy     : firstDoy,
			MonthNo : firstMonthNo
		}
	
		this._sliderValue = this.finalDay.Doy;


		// Set slider to current day
		Wu.Mixin.Events.fire('setSlider', { detail : {
			value : this._sliderValue
		}});

	},


	initGraph : function () {


		// AVERAGE DATA FOR ALL YEARS

		// Prepare DC dimensions
		var ndx     = crossfilter(this.allData);
		var xDim    = ndx.dimension(function(d) { return d.date });
		var yMaxDim = xDim.group().reduceSum(function(d) { return d.max });
		var yMinDim = xDim.group().reduceSum(function(d) { return d.min });
		var yAvgDim = xDim.group().reduceSum(function(d) { return d.avg });

    	var minDate = xDim.bottom(1)[0].date;
		var maxDate = xDim.top(1)[0].date;

		// DATA FOR CURRENT YEAR

		// Data will get populated in updateGraph()
		this.graphData = [];

		// Prepare DC dimensions
		this.ndx = crossfilter(this.graphData);

		// LINE DIMENSION
		// THIS PART CHANGES FOR EVERY MOVE
		var thisXdim = this.ndx.dimension(function(d) { return d.date });
		var yThisDim = thisXdim.group().reduceSum(function(d) { return d.SCF; });

		// SCATTER DIMENSION
		var scatterDim = thisXdim.group().reduceSum(function(d) { 
			return d.SCF
		}.bind(this));

		// debug save
		this._dcCache = {
			scatterDim : scatterDim,
			yThisDim : yThisDim
		}

		var graphOuterContainer = Wu.DomUtil.create('div', 'big-graph-outer-container', this.options.appendTo);

		var graphInfoContainer = Wu.DomUtil.create('div', 'big-graph-info-container', graphOuterContainer);

		this._title = Wu.DomUtil.create('div', 'big-graph-title', graphInfoContainer);

		this.dayNameTitle = Wu.DomUtil.create('div', 'big-graph-current-day', graphInfoContainer);

		this.currentSCF = Wu.DomUtil.create('div', 'big-graph-current-scf inline', graphInfoContainer);

		var graphInnerContainer = Wu.DomUtil.create('div', 'big-graph-inner-container', graphOuterContainer)

		// Get HTML element, and define it as graph container
		var hitslineChart = dc.compositeChart(graphInnerContainer)


		// Run graph
		hitslineChart
		.width(500).height(220)
		.dimension(xDim)
	
		.x(d3.time.scale().domain([minDate,maxDate]))
	 	.y(d3.scale.linear().domain([0, 100]))

		.clipPadding(10)   	
		.elasticY(false)
		.elasticX(false)
		.brushOn(false)
		.transitionDuration(0)			

		// Each of these will be a new graph
		.compose([

			// MAX value
			dc.lineChart(hitslineChart)
				.group(yMaxDim)
				.colors('#DDDDDD')
				.renderArea(true)   	
				.renderDataPoints(false)
				.xyTipsOn(false),

			// MIN value
			dc.lineChart(hitslineChart)
				.group(yMinDim)
				.colors('#ffffff')
				.renderArea(true)   	
				.renderDataPoints(false)
				.xyTipsOn(false),

			// AVERAGE value
			dc.lineChart(hitslineChart)
				.group(yAvgDim)
				.colors('#999999')
				.renderDataPoints(false)
				.xyTipsOn(false),

			// THIS YEAR value – LINE
			dc.lineChart(hitslineChart)
				.group(yThisDim)
				.colors('#ff6666')
				.renderDataPoints(false)
				.xyTipsOn(false),

			// THIS YEAR value – LAST DATE (DOT)
			dc.scatterPlot(hitslineChart)
				.group(scatterDim)
				.symbolSize(8)
				.excludedOpacity(0)
				.colors('#ff0000')
				.symbol('triangle-up')
				.keyAccessor(function(d) {
					if ( this.graphData && d.key == this.graphData[this.graphData.length-1].date ) return +d.key;
					return false;
				}.bind(this))
				.valueAccessor(function(d) {
					if ( this.graphData && d.key == this.graphData[this.graphData.length-1].date ) return +d.value;
					return false;
				}.bind(this))
		]);
	
		hitslineChart
		.xUnits(d3.time.months)
		.xAxis()
		.tickFormat(d3.time. format('%b'))

		dc.renderAll(); 

	},


	updateGraph : function () {

		// Current year
		var year = this.currentYear;

		// Day on slider (this can be more than 365, as it can start in the middle of the year).
		var day = this.currentDay;

		// Reset graph data
		this.graphData = [];

		// Rebuild graph data
		this.years[year].forEach(function (d, i) {
			var doy = i+1;
			if ( doy < day ) this.graphData.push(d);
		}.bind(this));

		// If we're at the end of the road
		if ( !this.years[year][day-1] ) {
			// this.stopPlaying();
			return;
		}

		// Clear old data
		this.ndx.remove();

		// Add new data	
		this.ndx.add(this.graphData);

		// Redraw graph
		dc.redrawAll();
		// dc.redrawAll(this._dcCache.yThisDim);
		// dc.redraw()
		// this.ndx.redraw();

		// console.log('this.ndx', this.ndx);
		// console.log('dc:', dc);

		var scf = Math.round(this.years[year][day-1].SCF * 100) / 100;

		// Update HTML
		this.dayNameTitle.innerHTML = this.dayName;
		this.currentSCF.innerHTML = 'SCF: ' + scf + '%';

	},

	getMaxSCF : function (days) { 

		var eachDay = [];

		for ( var day in days ) {

			var maxD = false;		

			if( Object.prototype.toString.call( days[day] ) === '[object Array]' ) {

				if ( !maxD ) maxD = days[day][1].SCF;
				days[day].forEach(function (d) { 
					if ( d.SCF > maxD ) maxD = d.SCF 
				});
				eachDay[day] = Math.round(maxD);
			}

		}

		return eachDay;

	},

	getMinSCF : function (days) { 

		var eachDay = [];

		for ( var day in days ) {	

			var minD = false;

			if (_.isArray(days[day])) { 
				if ( !minD ) minD = days[day][1].SCF;
				days[day].forEach(function (d) { if ( d.SCF < minD ) minD = d.SCF });
				eachDay[day] = Math.round(minD);
			}
		}

		return eachDay;

	},

	getAvgSCF : function (days) {

		var eachDay = [];

		for ( var day in days ) {		
			if (_.isArray(days[day])) {
				var avg = 0;
				days[day].forEach(function(d) { avg += d.SCF; });
				eachDay[day] = Math.round(avg / days[day].length);
			}
		}
		return eachDay;
	},

	sanitizeDays : function (allYears) {

		var days = [];
		allYears.forEach(function (each) {
			if ( !days[each.Doy] ) days[each.Doy] = [];
			days[each.Doy].push(each);
		})
		return days;
	},


	sanitizeYears : function (allYears) {

		var years = [];
		var currentYear = '';

		allYears.forEach(function (each) {
			// New year!
			if (currentYear != each.Year) {
				currentYear = each.Year;
				years[currentYear] = [];
			}

			var thisYear = {
				SCF : each.SCF,
				date : this._dateFromNo(each.Doy)
			}

			years[currentYear].push(thisYear)
		}.bind(this))

		return years;
	},

	_dateFromNo : function (no) {
	  	var blankDate = new Date(2014, 0);
  		var date = new Date(blankDate.setDate(no));
		return date;
	},

	getMonthName : function (doy, year) {
		var monthNames = [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ];
	  	var blankDate = new Date(year, 0);
  		var date = new Date(blankDate.setDate(doy));
		var day = date.getDate();
		var monthIndex = date.getMonth();
		return monthNames[monthIndex];
	},

	updateDayOfYear : function () {

		// Month names
		var monthNames = [ "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember" ];

		// Start figuring out what day we are showing
		var year = this.currentYear;
		var day  = this.currentDay  = this._sliderValue;

		// Check how many days it's in the current year
		var daysInYear = this.years[this.currentYear].length-1;		

		if ( day > daysInYear || !day ) day = this.currentDay = daysInYear;	
	
	  	var blankDate = new Date(year, 0);
  		var date = new Date(blankDate.setDate(day));
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		// todo: fix -- this.dayName is off by one day (sometimes...)
		// rewrite with moment.js (takes into account leap years, etc... :)
		this.dayName = day + ' ' + monthNames[monthIndex] + ' ' + year;

		this.updateGraph();
	},
});
