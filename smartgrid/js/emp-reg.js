function registerEmp(){  
	var fname 	= $("#emp-fname").val().trim();
	var lname 	= $("#emp-lname").val().trim();
	var pswd 	= $("#emp-pswd").val().trim();
	var cnfmpswd= $("#emp-cnfm-pswd").val().trim();
	var sex		= $("#emp-sex").val().trim();
	var bdate 	= $("#emp-bdate").val().trim();
	var email 	= $("#emp-email").val().trim();
	var mobile 	= $("#emp-mobileno").val().trim();
	var address = $("#emp-address").val().trim();
	
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
		showMessage(ERROR,"emp-err-msg-div", "Please enter the First Name.", true);
		$("#emp-fname").focus();
		return;
	}
	
	if (!characters.test(fname)){
		showMessage(ERROR,"emp-err-msg-div", "First Name must contain only \"CHARACTERS\".", true);
		$("#emp-fname").focus();
		return;
	}
	
	if (lname == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Last Name.", true);
		$("#emp-lname").focus();
		return;
	}
	
	if (!characters.test(lname)){
		showMessage(ERROR,"emp-err-msg-div", "Last Name must contain only \"CHARACTERS\".", true);
		$("#emp-lname").focus();
		return;
	}
	
	if (pswd == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Password.", true);
		$("#emp-pswd").focus();
		return;
	}
	
	if (!alphanumeric.test(pswd)){
		showMessage(ERROR,"emp-err-msg-div", "Password must not contain \"SPECIAL CHARACTERS\".", true);
		$("#emp-pswd").focus();
		return;
	}
	
	if (cnfmpswd == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Confirm Password.", true);
		$("#emp-cnfm-pswd").focus();
		return;
	}

	if (pswd != cnfmpswd){
		showMessage(ERROR,"emp-err-msg-div", "Password does not match.", true);
		$("#emp-cnfm-pswd").focus();
		return;
	}
	
	if (sex == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please select an appropriate Sex.", true);
		$("#emp-sex").focus();
		return;
	}
	
	if (bdate == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Birthdate.", true);
		$("#emp-bdate").focus();
		return;
	}
	
	if (!validformat.test(bdate)){
		showMessage(ERROR,"emp-err-msg-div", "Date Format is YYYY-MM-DD.", true);
		$("#emp-bdate").focus();
		return;
	}
	
	if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield)){
		showMessage(ERROR,"emp-err-msg-div", "Invalid Year, Month, or Day.", true);
		$("#emp-bdate").focus();
		return;
	}
	
	if (email == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Email.", true);
		$("#emp-email").focus();
		return;
	}
	
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		showMessage(ERROR,"emp-err-msg-div", "Invalid E-mail address.", true);
		$("#emp-email").focus();
		return;
	}
	
	if (mobile == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Mobile Number.", true);
		$("#emp-mobileno").focus();
		return;
	}
	
	if (!digits.test(mobile)){
		showMessage(ERROR,"emp-err-msg-div", "Invalid Mobile Number.", true);
		$("#emp-mobileno").focus();
		return;
	}
	
	if (address == ""){
		showMessage(ERROR,"emp-err-msg-div", "Please enter the Address.", true);
		$("#emp-address").focus();
		return;
	}
	
	$("#emp-btn").hide();
	$("#emp-img").show();
	
	$.post("php/emp-reg.php",{
								empfname	: fname,
								emplname	: lname,
								emppswd		: pswd,
								empsex		: sex,
								empaddress 	: address,
								empbdate	: bdate,
								empemail	: email,
								empmobile	: mobile
							},
				function(response){
					if(response.success){
						$("#emp-fname").val('');
						$("#emp-lname").val('');
						$("#emp-pswd").val('');
						$("#emp-cnfm-pswd").val('');
						$("#emp-sex").val('');
						$("#emp-address").val('');
						$("#emp-bdate").val('');
						$("#emp-email").val('');
						$("#emp-mobileno").val('');
						
						$("#emp-img").hide();
						$("#emp-btn").show();
						
						$("#emp-reg-form").hide();
						
						showMessage(SUCCESS,"emp-form-response-div","Successful submission of the Employee Registration Form. Keep checking mails for further process and communication. <a href=\"#\" onclick=\"empchangethis();\" style=\"font-weight:bold;\">Click here</a> to register new employee.",false);					
					}else{
	
						$("#emp-img").hide();
						$("#emp-btn").show();
							
						showMessage(ERROR,"emp-err-msg-div","Unsuccessful submission of the Employee Registration Form. Try again!!!",true);
					}
				},
		"json");				
}

function empchangethis(){
	$("#emp-reg-form").show();
	$("#emp-form-response-div").html('');
}
