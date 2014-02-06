var SUCCESS = "success";
var ERROR 	= "error";

function showMessage(type, id, msg, timeout){
	var code = "<div class=\"alert alert-"
			+ type
			+ "\">"
			+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">\&times;</button>";

	if (type == "success") {
		code += "<b>Success!!</b>";
	} else if (type == "error") {
		code += "<b>Error!!</b>";
	}

	code += "&nbsp;&nbsp;<span>" + msg + "</span>" + "</div>";
	$("#" + id).html(code);

	if (timeout)
		setTimeout(function(){$("#"+id).html('')},10000);
}

function loginEmp(){
	var id 		= $("#emp-id").val().trim();
	var pswd 	= $("#emp-pswdd").val().trim();
	
	if (id == ""){
		showMessage(ERROR,"login-err-msg-div", "Please enter the Employee ID.", true);
		$("#emp-id").focus();
		return;
	}
	
	if (pswd == ""){
		showMessage(ERROR,"login-err-msg-div", "Please enter the Password.", true);
		$("#emp-pswdd").focus();
		return;
	}
	
	$("#login-btn").hide();
	$("#login-img").show();
	
	$.post("login.php",{
							empid		: id,
							emppswd		: pswd
						},
				function(response){
					if(response.success){
						$("#login-img").hide();
						$("#login-btn").show();

						if(response.role == 0 && response.verified == 2)
							window.location = "emp/";
						else if(response.role == 1 && response.verified == 1)	
							window.location = "empadmin/";
						else if(response.role == 2 && response.verified == 1)
							window.location = "useradmin/";
						else {
							$.removeCookie('emp-id', { path: '/smartgrid/' });
							$.removeCookie('role', { path: '/smartgrid/' });
							$.removeCookie('verified', { path: '/smartgrid/' });
							showMessage(ERROR,"login-err-msg-div", "Access Denied / Not Permitted.", true);
							}
					} else {						
						$("#login-img").hide();
						$("#login-btn").show();
						
						showMessage(ERROR,"login-err-msg-div", "Invalid login details. Try again!!!", true);
					}
				},
		"json");
}

function logout(){
	$.removeCookie('emp-id', { path: '/smartgrid/' });
	$.removeCookie('role', { path: '/smartgrid/' });
	$.removeCookie('verified', { path: '/smartgrid/' });
	window.location = "../";
} 
