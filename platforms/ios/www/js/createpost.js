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

$("#new_post_submit").click(function() {
	
	var formdata = formToJSON("#create_new_post");
	console.log(formdata);
	$(".notice").hide();
	
	$.ajax({ //Process the form using $.ajax()
			type 		: 'POST', //Method type
			url 		: 'http://gobeebot.com/', //Your form processing file url
			data 		: formdata, //Forms name
			dataType 	: 'json',
			success 	: function(data) {
				
				if (!data.success) { //If fails
					$("#public_info .failure.notice").show();
					console.log("error");
					if (data.errors) { //Returned if any error from process.php
						console.log(data.errors); //Throw relevant error
					}
				} 
				else {
					$("#public_info .success.notice").show();
					console.log("sent");
					console.log(JSON.stringify(data));
					$("#smallImage").css({"display" : "none"});
				}
			}
		});
	
	
});
    var watchID = null;

    // device APIs are available
    //
    function locateMe() {
        // Throw an error if no update is received every 30 seconds
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, options);
    }

    // onSuccess Geolocation
    //
    function onGeoSuccess(position) {
       /*
 var element = $('#geolocation');
        element.html('Latitude: '  + position.coords.latitude      + '<br />' +
                     'Longitude: ' + position.coords.longitude);
                     
*/
        $("input[name='lat']").val(position.coords.latitude);
        $("input[name='long']").val(position.coords.longitude);
        
        
        
        
    }

        // onError Callback receives a PositionError object
        //
        function onGeoError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

$(document).ready(function() {
	locateMe();
	
});
