/****** PHONEGAP INIT *******/
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
/****************************/




/******* HELPERS ********/
Handlebars.registerHelper('each', function(context, options) {
  var ret = "";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});
/************************/





/******* PHONEGAP FUNCTIONS *************/
function locateMe() {
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
}

function onGeoSuccess(position) {
    $("input[name='lat']").val(position.coords.latitude);
    $("input[name='long']").val(position.coords.longitude);
}

// onError Callback receives a PositionError object
//
function onGeoError(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


$(document).ready(function() {
	if(! localStorage.getItem("userToken")) {
		/*********************************/
		//  send them to login template  //
		/*********************************/
	}
	else {
		$("input[name='auth_token']").val(localStorage.getItem("userToken"));
		$("input[name='handle']").val(localStorage.getItem("userHandle"));
	}
	
});


/***************************************/


/********** APP FUNCTIONS **************/

	/******** FORM TO JSON *******/
	function formToJSON( selector )
	{
	     var form = {};
	     $(selector).find(':input[name]:enabled').each( function() {
	         var self = $(this);
	         var name = self.attr('name');
	         if (form[name]) {
	            form[name] = form[name] + ',' + self.val();
	         }
	         else {
	            form[name] = self.val();
	         }
	     });
	
	     return form;
	}
	
	
	

/***************************************/



/*********** TEMPLATING STUFF *********/

	/******* MODEL METHODS ***********/
	var MODEL_METHOD = {
 
        loadPostsNearMe : function(){
			$("input[name='request']").val("posts_near_me");
			locateMe();
			var formdata = formToJSON("#form");
            $.ajax({
                url:"http://gobeebot.com/test.php",
                method:'POST',
                data: formdata,
                success:this.handlerData
 
            });
        }
	};
	/*********************************/

	/******* FETCH DATA MODELS *******/
	function getData(forTemplate) {
		switch(forTemplate) {
			case "home":
/* 				MODEL_METHOD.loadPostNearMe(); */
				
				break;
			case "create":
				$("input[name='request']").val("new_post");
				locateMe();
				var formdata = formToJSON("#form");
				break;
			case "notifications":
				$("input[name='request']").val("");
				//var data = "";
				break;
			case "settings":
				$("input[name='request']").val("");
				//var data = "";
				break;
			
		}
		
		return data;
		
	}
	
	/******** ACTIVATE DEFAULT TEMPLATE ******/
		var source   = $("#home").html();
		var template = Handlebars.compile(source);
		var data = getData("home");
		$("#content-placeholder").html(template(data));
	
	
	
	$("nav a").click(function() {
	
		/********** SHOW ACTIVE PAGE BUTTON ******/
			$("nav a").removeClass("active");
			$(this).addClass("active");	
		/********** SETUP HANDLEBARS TEMPLATE ******/
		    var choice = $(this).attr("name");
		    var templateSource = $("#"+choice).html();
		    var compiledTemplate = Handlebars.compile(templateSource);
		/********** GET DATA FOR PARTICULAR TEMPLATE ****/
	   		var data = getData(choice);   		
	   	/********** COMPILE TEMPLATE ********/
	   		$("#content-placeholder").html(compiledTemplate(data));
	   		
	});	
	
	
/**************************************/