$(document).ready(function() {
	if(! localStorage.getItem("userToken")) {
		window.location.replace("login.html");
	}
	else {
		$("input[name='auth_token']").val(localStorage.getItem("userToken"));
		$("input[name='handle']").val(localStorage.getItem("userHandle"));
		$("span#data").attr("data-token", localStorage.getItem("userToken"));
		$("span#data").attr("data-handle", localStorage.getItem("userHandle"));
		var userToken = localStorage.getItem("userToken");
	}
	
})
	


	