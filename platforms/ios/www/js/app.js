/****** PHONEGAP INIT *******/

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
	/****** GEO LOCATION ********/
	
	
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
	function locateMe() {
	    var options = { timeout: 30000 };
	    watchID = navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
	}
	locateMe();
	
	
	
	
	
	/****** CAMERA STUFF *********/

		
		
	    var pictureSource;   // picture source
	    var destinationType; // sets the format of returned value 
	
	    // Wait for Cordova to connect with the device
	    //
	    document.addEventListener("deviceready",onDeviceReady,false);
	
	    // Cordova is ready to be used!
	    //
	    function onDeviceReady() {
	        pictureSource=navigator.camera.PictureSourceType;
	        destinationType=navigator.camera.DestinationType;
	    }
	
	    // Called when a photo is successfully retrieved
	    //
	    function onPhotoDataSuccess(imageData) {
	      // Uncomment to view the base64 encoded image data
	      // console.log(imageData);
	
	      // Get image handle
	      //
	      var smallImage = document.getElementById('smallImage');
	      var photo_data_input = $("input[name='post_data']");
	
	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';
	
	      // Show the captured photo
	      // The inline CSS rules are used to resize the image
	      //
	      smallImage.src = "data:image/jpeg;base64," + imageData;
	      photo_data_input.val("data:image/jpeg;base64," + imageData);
	    }
	
	    // Called when a photo is successfully retrieved
	    //
	    function onPhotoURISuccess(imageURI) {
	      // Uncomment to view the image file URI 
	      // console.log(imageURI);
	
	      // Get image handle
	      //
	      var largeImage = document.getElementById('largeImage');
	
	      // Unhide image elements
	      //
	      largeImage.style.display = 'block';
	
	      // Show the captured photo
	      // The inline CSS rules are used to resize the image
	      //
	      largeImage.src = imageURI;
	    }
	
	    // A button will call this function
	    //
	    function capturePhoto() {
	      // Take picture using device camera and retrieve image as base64-encoded string
	      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
	      	quality: 50,
	      	targetWidth: 400,
		  	targetHeight: 400,
	        destinationType: navigator.camera.DestinationType.DATA_URL
	       });
	    }
	
	    // A button will call this function
	    //
	    function capturePhotoEdit() {
	      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
	      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	        destinationType: navigator.camera.DestinationType.DATA_URL });
	    }
	
	    // A button will call this function
	    //
	    function getPhoto(source) {
	      // Retrieve image file location from specified source
	      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	        destinationType: navigator.camera.DestinationType.FILE_URI,
	        sourceType: source });
	    }
	
	    // Called if something bad happens.
	    // 
	    function onFail(message) {
	      alert('Failed because: ' + message);
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
						$("nav a[name='"+choice+"']").addClass("active");	
						var templateSource = $("#"+choice).html();
					    var compiledTemplate = Handlebars.compile(templateSource);
				   		$("#content-placeholder").html(compiledTemplate(result));
					}, 
					error 		: function(result) {
						$("#alerts").html(JSON.stringify(result));
						
					}
		
			}); 

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
	
	
	changePage("posts_near_me", formToJSON("#form"));
	
});


	/*********** CHANGE TEMPLATE ***********/
	$("nav a").click(function() {
		locateMe();
		//SHOW ACTIVE PAGE BUTTON
			
			
		//SETUP HANDLEBARS TEMPLATE
		    var choice = $(this).attr("name");
		    $("input[name='request']").val(choice);
			if(choice === "new_post") {
				$("nav a").removeClass("active");
				$("nav a[name='"+choice+"']").addClass("active");	
				var templateSource = $("#"+choice).html();
			    var compiledTemplate = Handlebars.compile(templateSource);
		   		$("#content-placeholder").html(compiledTemplate());
			} else {
				var formdata = formToJSON("#form");	
				changePage(choice, formdata);
			}
	   		
	});	
	
	
	
	
	
	
	
	
/************ TAP ACTIONS ******************/	
	
	$('#content-placeholder').on('click', '.big_button a', function() {
	    capturePhotoEdit();
	});
	$('#content-placeholder').on('click', '#new_post_submit', function() {
		var formdata = formToJSON("#form");
	    $.ajax({ 
				type 		: 'POST', 
				url 		: 'http://gobeebot.com/',
				data 		: formdata, 
				dataType 	: 'json',
				success 	: function(data) {
					if (!data.success) { //If fails
						console.log("error");
						if (data.errors) { 
							console.log(data.errors);
						}
					} 
					else {
						console.log("sent");
						console.log(JSON.stringify(data));
						$("#smallImage").css({"display" : "none"});
					}
				}, 
				error 		: function(result) {
					$("#alerts").html(JSON.stringify(result));
					
				}
	
		}); 
	});
	
	
/**************************************/