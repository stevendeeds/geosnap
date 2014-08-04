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

function likePost(post_token, that) {
	
	var auth_token = $("input[name='auth_token']").val();
    var handle = $("input[name='handle']").val();
/* 	alert(post_token); */
	
	var likevalues = "request=like_post&auth_token="+auth_token+"&handle="+handle+"&post_token="+post_token;
	
	$.ajax({ //Process the form using $.ajax()
			type 		: 'POST', //Method type
			url 		: 'http://gobeebot.com/', //Your form processing file url
			data 		: likevalues, //Forms name
			dataType 	: 'html',
			success 	: function(data) {
				
				var likedPost = $(that).parents(".feed_item").attr("id");
				$("#"+likedPost+" .loved img").attr("src", "img/heart_loved.svg");
				var oldnumber = parseInt($("#"+likedPost+" .loved span").html());
				var newnumber = oldnumber+1;
				$("#"+likedPost+" .loved span").html(newnumber);
				
			}
		}) //end ajax
	
	
	
}

var watchID = null;

function locateMe() {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
/*     watchID = navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, options); */
    watchID = navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
}

function onGeoSuccess(position) {

    $("input[name='lat']").val(position.coords.latitude);
    $("input[name='long']").val(position.coords.longitude);
    
    var formdata = formToJSON("#find_posts");
	
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
					var myarray = data.response; 
					$("#posts_near_me").html(" ");
					$.each(myarray, function(index, value){
						var handle = value.author_handle; 
						var data_location = value.data_location; 
						var author_avatar = value.author_avatar;
						var post_token = value.post_token;
						var times_seen = value.times_seen;
						var times_liked = value.times_liked;
						var special = value.special;
						$("#posts_near_me").append("<div class='row feed_item' id='"+special+"'><div class='twelve columns'><div class='author_info'><img src='"+author_avatar+"' /><strong>"+handle+"</strong><div class='clearfix'></div></div><div><img src='"+data_location+"' class='data_img' onClick='likePost(\""+post_token+"\", this)' /></div><div class='buttons'><div class='eye'><img src='img/eye_seen.svg' alt='' /><span>"+times_seen+"</span><div class='clearfix'></div></div><!--seen--><div class='loved'><img src='img/heart_unloved.svg' alt='' /><span>"+times_liked+"</span><div class='clearfix'></div></div><!--loved--><div class='more'></div><!--more--></div><!--buttons--></div></div>");
					});
				}
			}
		}) //end ajax
    
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