$(document).ready(function(){
	var emp = $.cookie('emp-id');
	var role = $.cookie('role');
	var verified = $.cookie('verified');		

	if(emp == null || role != 0 || verified != 2){
		$.removeCookie('emp-id', { path: '/smartgrid/' });
		$.removeCookie('role', { path: '/smartgrid/' });
		$.removeCookie('verified', { path: '/smartgrid/' }); 	
		window.location = "../";
	}
});
