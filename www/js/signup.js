$(document).ready(function() {
    	$('form[name="signupForm"]').submit(function(event) { //Trigger on form submit

    		var postForm = { //Fetch form data
    			'request' : 'signup',
    			'handle' 	: $('form[name="signupForm"] input[name="handle"]').val(), 
    			'email' : $('form[name="signupForm"] input[name="email"]').val(),
    			'password' : $('form[name="signupForm"] input[name="password"]').val(),
    			'app_token' : 'ArwZXQy226eePnAtMOPY'
    		};
    
    		$.ajax({ //Process the form using $.ajax()
    			type 		: 'POST', //Method type
    			url 		: '/', //Your form processing file url
    			data 		: postForm, //Forms name
    			dataType 	: 'json',
    			success 	: function(data) {
    				
    			if (!data.success) { //If fails
    				if (data.errors.handle) { //Returned if any error from process.php
    					alert(data.errors.handle); //Throw relevant error
   					}
   				} else {
    					alert(data.response);
    				}
    			}
    		});
    	    event.preventDefault(); //Prevent the default submit
    	});
    });