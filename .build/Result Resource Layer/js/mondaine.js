

(function(root){
	
	// attach to window namespace
	window.Mondaine = mondaine;
	
	// request animation frame
	window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
	

	function mondaine(context, opts) {
		// constructor
		this.init(context, opts);
				
		// lay down markers
		this.initializeMarkers();
		this.initializeHandles();
		
		setTimeout(this.movement, 1000/60);
	}

	mondaine.prototype = {
		// initial config
		context: "",
		contextType: "2d",
		faceType: "default",
		handles: {
			hour: "",
			minute: "",
			second: ""
		},
		
		
		init: function(context, opts) {
			this.context = document.getElementById(context).getContext(this.contextType);
			this.context.beginPath();
		},
		
		
		getDate: function() {
		    var date;
		    try {
		        date = tizen.time.getCurrentDateTime();
		    } catch (err) {
		        console.error('Error: ', err.message);
		        date = new Date();
		    }

		    return date;
		},		
		
		initializeMarkers: function() {
			
			var c = this.context;
			var bed = $("#markers");
			
			for(var i=60; i>=0; i--)
			{
				var marker = $(document.createElement("div")).addClass("marker"); // create a new element
				
				if(i%5) marker.addClass("shallow-tip");
				else	marker.addClass("thick-tip");
				
				marker.css("transform", "rotate3d(0, 0, 1,"+i*6+"deg)");
				marker.appendTo(bed);
				
			}

		},
		
		initializeHandles: function() {
		
			var handleBed = $("#handles");
			
			// create DOM elements
			var base = $(document.createElement("div")).addClass("handle");
			this.handles.hour = base.clone().addClass("hour-handle");
			this.handles.minute = base.clone().addClass("minute-handle");
			this.handles.second = base.clone().addClass("second-handle");
			
			// attach them (so that they appear in the correct order)
			handleBed.append(this.handles.hour);
			handleBed.append(this.handles.minute);
			handleBed.append(this.handles.second);
		},
		
		moveHourHandle: function(time){
			var handleRef = this.handles.hour;
		},
		
		moveMinuteHandle: function(time){
			var handleRef = this.handles.minute;
		},
		
		moveSecondHandle: function(time){
			var handleRef = this.handles.second;
			
		},
		
		///
		movement: function() {
			var date = this.getDate();
			
			console.log(date);
			
			this.moveHourHandle(date);
			this.moveMinuteHandle(date);
			this.moveSecondHandle(date);
			
		}
			
	};
	
})(window);