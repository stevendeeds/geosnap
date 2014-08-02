$(document).ready(function() {
    	$('form[name="loginForm"]').submit(function(event) { //Trigger on form submit

    		var postForm = { //Fetch form data
    			'request' : 'login',
    			'handle' 	: $('form[name="loginForm"] input[name="handle"]').val(), 
    			'password' : $('form[name="loginForm"] input[name="password"]').val(),
    			'app_token' : 'ArwZXQy226eePnAtMOPY'
    		};
    
    		$.ajax({ //Process the form using $.ajax()
    			type 		: 'POST', //Method type
    			url 		: 'http://gobeebot.com/', //Your form processing file url
    			data 		: postForm, //Forms name
    			dataType 	: 'json',
    			success 	: function(data) {
    			if (!data.success) { //If fails
    				alert("error");
    				if (data.errors.handle) { //Returned if any error from process.php
    					alert(data.errors.handle); //Throw relevant error
   					}
   				}
                   else
                   {
                        localStorage.setItem("userToken", data.user_token); //saving the user token locally
                        localStorage.setItem("userHandle", data.handle);
                        window.location.replace("index.html");
    					//alert(JSON.stringify(data));
    				}
    			},
                error:function(msg)
                   {
                        alert("Error while making a network connection "+msg);
                   }
    		});
    	    event.preventDefault(); //Prevent the default submit
    	});
    });