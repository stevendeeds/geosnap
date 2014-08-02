function connect(e){
			var term= {button:e};
			$.ajax({
				url:'http://lovelionstudio.com/_beebot/api.php',
				type:'POST',
				data:term,
				dataType:'json',
				error:function(jqXHR,text_status,strError){
				alert("no connection");},
				timeout:60000,
				success:function(data){
					$("#ajaxresult").html("");
					for(var i in data){
						$("#ajaxresult").append("<li>"+data[i]+"</li>");
					}
				}
			});
		}