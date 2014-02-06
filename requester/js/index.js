$(document).ready(function(){
	var flag = $.cookie('emp-id');		
	var role = $.cookie('role');	
	var verified = $.cookie('verified');	

	if(flag != null){
		if(role == 0 && verified == 2)
			window.location = "emp/";
		else if(role == 1 && verified == 1)
			window.location = "empadmin/";
		else if(role == 2 && verified == 1)
			window.location = "useradmin/";
		}
});

