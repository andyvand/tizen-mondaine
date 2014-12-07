

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
		
 		setInterval(function() { this.movement(); }.bind(this), 1000/60);
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
		        //console.error('Error: ', err.message);
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
			var hours = time.getHours() - 12;
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			var angle = (hours * 30) + (minutes/2) + (seconds/120);
			
			handleRef.css("transform", "rotate3d(0, 0, 1, "+ angle +"deg)");
		},
		
		moveMinuteHandle: function(time){
			var handleRef = this.handles.minute;
			var minutes = time.getMinutes();
			var seconds = time.getSeconds();
			var angle = (minutes * 6) + (seconds /10);
			
			handleRef.css("transform", "rotate3d(0, 0, 1, " + angle +"deg)");
		},
		
		moveSecondHandle: function(time){
			var handleRef = this.handles.second;
			var seconds = time.getSeconds();
			var mseconds = time.getMilliseconds();
			var angle = (seconds * 6) + (mseconds *6/1000);
			
			handleRef.css("transform", "rotate3d(0, 0, 1, " + angle +"deg)");
			
		},
		
		///
		movement: function() {
			var date = this.getDate();

			this.moveHourHandle(date);
			this.moveMinuteHandle(date);
			this.moveSecondHandle(date);
			
		}
			
	};
	
})(window);