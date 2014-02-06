function registerUser(){  	
	var fname 	= $("#user-fname").val().trim();
	var lname 	= $("#user-lname").val().trim();
	var loc 	= $("#user-loc").val().trim();
	var email 	= $("#user-email").val().trim();
	var mobile 	= $("#user-mobileno").val().trim();
	var address = $("#user-address").val().trim();
	
	var characters 	= /^[A-Za-z]+$/;  
	var digits 		= /^\d{10}$/;
	
	var atpos	= email.indexOf("@");
	var dotpos	= email.lastIndexOf(".");
	
	if (fname == ""){
		showMessage(ERROR,"user-err-msg-div", "Please enter the First Name.", true);
		$("#user-fname").focus();
		return;
	}
	
	if (!characters.test(fname)){
		showMessage(ERROR,"user-err-msg-div", "First Name must contain only \"CHARACTERS\".", true);
		$("#user-fname").focus();
		return;
	}
	
	if (lname == ""){
		showMessage(ERROR,"user-err-msg-div", "Please enter the Last Name.", true);
		$("#user-lname").focus();
		return;
	}
	
	if (!characters.test(lname)){
		showMessage(ERROR,"user-err-msg-div", "Last Name must contain only \"CHARACTERS\".", true);
		$("#user-lname").focus();
		return;
	}
	
	if (loc == ""){
		showMessage(ERROR,"user-err-msg-div", "Please select an appropriate Location.", true);
		$("#user-loc").focus();
		return;
	}
	
	if (email == ""){
		showMessage(ERROR,"user-err-msg-div", "Please enter the Email.", true);
		$("#user-email").focus();
		return;
	}
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		showMessage(ERROR,"user-err-msg-div", "Invalid E-mail address.", true);
		$("#user-email").focus();
		return;
	}
	
	if (mobile == ""){
		showMessage(ERROR,"user-err-msg-div", "Please enter the Mobile Number.", true);
		$("#user-mobileno").focus();
		return;
	}
	
	if (!digits.test(mobile)){
		showMessage(ERROR,"user-err-msg-div", "Invalid Mobile Number.", true);
		$("#user-mobileno").focus();
		return;
	}
	
	if (address == ""){
		showMessage(ERROR,"user-err-msg-div", "Please enter the Address.", true);
		$("#user-address").focus();
		return;
	}
	
	$("#user-btn").hide();
	$("#user-img").show();
	
	$.post("php/user-reg.php",{
									userfname	: fname,
									userlname	: lname,
									userloc		: loc,
									useraddress	: address,
									useremail	: email,
									usermobile	: mobile
								},
				function(response){
					if(response.success){
						$("#user-fname").val('');
						$("#user-lname").val('');
						$("#user-loc").val('');
						$("#user-address").val('');
						$("#user-email").val('');
						$("#user-mobileno").val('');
						
						$("#user-img").hide();
						$("#user-btn").show();
	
						$("#user-reg-form").hide();
						
						showMessage(SUCCESS,"user-form-response-div","Successful submission of the User Registration Form. Keep checking mails for further process and communication. <a href=\"#\" onclick=\"usrchangethis();\" style=\"font-weight:bold;\">Click here</a> to register new user.",false);
					}else{
						
						$("#user-img").hide();
						$("#user-btn").show();
	
						showMessage(ERROR,"user-err-msg-div","Unsuccessful submission of the User Registration Form. Try again!!!",true);
					}
				},
		"json");				
}

function usrchangethis(){
	$("#user-reg-form").show();
	$("#user-form-response-div").html('');
}
