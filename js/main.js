// basic

$(window).load(function(){

	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
	
	
	// start
	var m = new Mondaine("mondaine", {});	

});