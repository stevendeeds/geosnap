
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
	      var smallImage = document.getElementById('user_avatar');
	      var photo_data_input = $("input[name='user_avatar']");
	
	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';
	
	      // Show the captured photo
	      // The inline CSS rules are used to resize the image
	      //
	      smallImage.src = "data:image/jpeg;base64," + imageData;
	      photo_data_input.val("data:image/jpeg;base64," + imageData);
	      
	      
	      
	      
	      
	      /*******************
	      *  SAVE THE AVATAR *
	      *******************/
	      
	      
	      var newsrc = $("input[name='user_avatar']").val();

	
		$("#user_avatar").attr("src", newsrc);
		
		var formdata = formToJSON("#public_avatar");
		console.log(formdata);
		$(".notice").hide();
		
		$.ajax({ //Process the form using $.ajax()
				type 		: 'POST', //Method type
				url 		: 'http://gobeebot.com/', //Your form processing file url
				data 		: formdata, //Forms name
				dataType 	: 'json',
				success 	: function(data) {
					
					if (!data.success) { //If fails
						$("#public_avatar .failure.notice").show();
						console.log("error");
						if (data.errors) { //Returned if any error from process.php
							console.log(data.errors); //Throw relevant error
						}
					} 
					else {
						$("#public_avatar .success.notice").show();
						console.log("sent");
						console.log(JSON.stringify(data));
					}
				}
			});
	      
	      
	      
	      
	      
	      
	      
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
