function registerAdmin(){  
	var fname 	= $("#admin-fname").val().trim();
	var lname 	= $("#admin-lname").val().trim();
	var pswd 	= $("#admin-pswd").val().trim();
	var cnfmpswd= $("#admin-cnfm-pswd").val().trim();
	var sex		= $("#admin-sex").val().trim();
	var des		= $("#admin-des").val().trim();	
	var bdate 	= $("#admin-bdate").val().trim();
	var email 	= $("#admin-email").val().trim();
	var mobile 	= $("#admin-mobileno").val().trim();
	var address = $("#admin-address").val().trim();
	
	var characters 		= /^[A-Za-z]+$/;  
	var alphanumeric 	= /^[0-9a-zA-Z]+$/;
	var digits 			= /^\d{10}$/;
	
	var validformat		= /^\d{4}-\d{2}-\d{2}$/;	
	var yearfield		= bdate.split("-")[0];
	var monthfield		= bdate.split("-")[1];
	var dayfield        = bdate.split("-")[2];
	var dayobj			= new Date(yearfield, monthfield-1, dayfield);
	
	var atpos			= email.indexOf("@");
	var dotpos 			= email.lastIndexOf(".");
		
	if (fname == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the First Name.", true);
		$("#admin-fname").focus();
		return;
	}
	
	if (!characters.test(fname)){
		showMessage(ERROR,"admin-err-msg-div", "First Name must contain only \"CHARACTERS\".", true);
		$("#admin-fname").focus();
		return;
	}
	
	if (lname == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Last Name.", true);
		$("#admin-lname").focus();
		return;
	}
	
	if (!characters.test(lname)){
		showMessage(ERROR,"admin-err-msg-div", "Last Name must contain only \"CHARACTERS\".", true);
		$("#admin-lname").focus();
		return;
	}
	
	if (pswd == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Password.", true);
		$("#admin-pswd").focus();
		return;
	}

	if (!alphanumeric.test(pswd)){
		showMessage(ERROR,"admin-err-msg-div", "Password must not contain \"SPECIAL CHARACTERS\".", true);
		$("#admin-pswd").focus();
		return;
	}
	
	if (cnfmpswd == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Confirm Password.", true);
		$("#admin-cnfm-pswd").focus();
		return;
	}

	if (pswd != cnfmpswd){
		showMessage(ERROR,"admin-err-msg-div", "Password does not match.", true);
		$("#admin-cnfm-pswd").focus();
		return;
	}
	
	if (sex == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please select an appropriate Sex.", true);
		$("#admin-sex").focus();
		return;
	}
	
	if (des == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please select an appropriate Designation.", true);
		$("#admin-des").focus();
		return;
	}
	
	if (bdate == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Birthdate.", true);
		$("#admin-bdate").focus();
		return;
	}
	
	if (!validformat.test(bdate)){
		showMessage(ERROR,"admin-err-msg-div", "Date Format is YYYY-MM-DD.", true);
		$("#admin-bdate").focus();
		return;
	}
	
	if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		showMessage(ERROR,"admin-err-msg-div", "Invalid Year, Month, or Day.", true);
		$("#admin-bdate").focus();
		return;
	}
	
	if (email == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Email.", true);
		$("#admin-email").focus();
		return;
	}
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		showMessage(ERROR,"admin-err-msg-div", "Invalid E-mail address.", true);
		$("#admin-email").focus();
		return;
	}
	
	if (mobile == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Mobile Number.", true);
		$("#admin-mobileno").focus();
		return;
	}
	
	if (!digits.test(mobile)){
		showMessage(ERROR,"admin-err-msg-div", "Invalid Mobile Number.", true);
		$("#admin-mobileno").focus();
		return;
	}
	
	if (address == ""){
		showMessage(ERROR,"admin-err-msg-div", "Please enter the Address.", true);
		$("#admin-address").focus();
		return;
	}
	
	$("#admin-btn").hide();
	$("#admin-img").show();
	
	$.post("php/admin-reg.php",{
									adminfname	: fname,
									adminlname	: lname,
									adminpswd	: pswd,
									adminsex	: sex,
									admindes	: des,
									adminaddress: address,
									adminbdate	: bdate,
									adminemail	: email,
									adminmobile	: mobile
								},
				function(response){
					if(response.success){
						$("#admin-fname").val('');
						$("#admin-lname").val('');
						$("#admin-pswd").val('');
						$("#admin-cnfm-pswd").val('');
						$("#admin-sex").val('');
						$("#admin-des").val('');
						$("#admin-address").val('');
						$("#admin-bdate").val('');
						$("#admin-email").val('');
						$("#admin-mobileno").val('');
												
						$("#admin-img").hide();
						$("#admin-btn").show();
						
						$("#admin-reg-form").hide();
						
						showMessage(SUCCESS,"admin-form-response-div","Successful submission of the Admin Registration Form. Keep checking mails for further process and communication. <a href=\"#\" onclick=\"adminchangethis();\" style=\"font-weight:bold;\">Click here</a> to register new admin.",false);					
					}else{
	
						$("#admin-img").hide();
						$("#admin-btn").show();
							
						showMessage(ERROR,"admin-err-msg-div","Unsuccessful submission of the Admin Registration Form. Try again!!!",true);
					}
				},
		"json");				
}

function adminchangethis(){
	$("#admin-reg-form").show();
	$("#admin-form-response-div").html('');
}
