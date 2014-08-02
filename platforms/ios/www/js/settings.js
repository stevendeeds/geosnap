$( document ).ready(function() {
	

	//THESE VALUES WILL EVENTUALLY COME FORM localStorage
	var token = localStorage.getItem("userToken");
    var handle = localStorage.getItem("userHandle");
    
    
    var formdata = {"handle" : handle, "auth_token" : token, "request" : "preferences", "preference_type" : "load"};
    
    
    $.ajax({ //Process the form using $.ajax()
			type 		: 'POST', //Method type
			url 		: 'http://gobeebot.com/', //Your form processing file url
			data 		: formdata, //Forms name
			dataType 	: 'json',
			success 	: function(data) {
					
					console.log(data);
				
					var user = JSON.stringify(data.user);
					var prefs = JSON.stringify(data.user_preferences);
					
					console.log(prefs);
					console.log(user);
					$("input[name='auth_token']").val(token);
					$("input[name='user_name']").attr("placeholder", data.user_preferences.name);
					$("input[name='handle']").attr("placeholder", data.user.handle);
					$("textarea[name='user_description']").html(data.user_preferences.desc);
					$("input[name='user_email']").attr("placeholder", data.user.email);
					$("input[name='user_phone']").attr("placeholder", data.user_preferences.phone);
					$("#user_avatar").attr("src", data.user_preferences.avatar);
				
			}
		});
    
});

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


$("#public_info_submit").click(function() {
	
	var formdata = formToJSON("#public_info");
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
				}
			}
		});
	
	
});

$("#private_info_submit").click(function() {
	
	var formdata = formToJSON("#private_info");
	console.log(formdata);
	$(".notice").hide();
	
	$.ajax({ //Process the form using $.ajax()
			type 		: 'POST', //Method type
			url 		: 'http://gobeebot.com/', //Your form processing file url
			data 		: formdata, //Forms name
			dataType 	: 'json',
			success 	: function(data) {
				
				if (!data.success) { //If fails
					$("#private_info .failure.notice").show();
					console.log("error");
					if (data.errors) { //Returned if any error from process.php
						console.log(data.errors); //Throw relevant error
					}
				} 
				else {
					$("#private_info .success.notice").show();
					console.log("sent");
					console.log(JSON.stringify(data));
				}
			}
		});
});


$("#public_avatar_submit").click(function() {
	
	
});

$(document).ready(function() {
	userSession();
})

function logout() {
		localStorage.removeItem("userToken");
		localStorage.removeItem("userHandle");
		window.location.replace("login.html");
	}
