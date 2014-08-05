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


/******** ACTIVATE DEFAULT TEMPLATE ******/



/*********** TEMPLATING STUFF *********/

/******* FETCH DATA MODELS *******/



function changePage(choice, formdata) {

			
			$.ajax({ 
					type 		: 'POST', 
					url 		: 'http://gobeebot.com/',
					data 		: formdata, 
					dataType 	: 'json',
					success 	: function(result) {
						$("nav a").removeClass("active");
						$("a[name='"+choice+"']").addClass("active");	
						var templateSource = $("#"+choice).html();
					    var compiledTemplate = Handlebars.compile(templateSource);
				   		$("#content-placeholder").html(compiledTemplate(result));
					}, 
					error 		: function() {
						$("#alerts").html(JSON.stringify(result));
						
					}
		
			}); 

}
locateMe();
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
	
	
	changePage("posts_near_me", formToJSON("#form"));
	
});


/*changePage(choice, function() {});
changePage(choice, function(obj) {
	//bla
});

var myFunc = function() {//do stuff
};
function myFunc() {}

changePage("home", myFunc);	
*/	


	/*********** CHANGE TEMPLATE ***********/
	$("nav a").click(function() {
		locateMe();
		//SHOW ACTIVE PAGE BUTTON
			
			
		//SETUP HANDLEBARS TEMPLATE
		    var choice = $(this).attr("name");
		    $("input[name='request']").val(choice);
			if(choice === "new_post") {
				var templateSource = $("#"+choice).html();
			    var compiledTemplate = Handlebars.compile(templateSource);
		   		$("#content-placeholder").html(compiledTemplate());
			} else {
				var formdata = formToJSON("#form");	
				changePage(choice, formdata);
			}
	   		
	});	
	
	
/**************************************/