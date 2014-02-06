<?php

	require_once('mailer/class.phpmailer.php');
	require_once('getIPValue.php');

	function sendEmail($email, $name){
		
		error_reporting(E_STRICT);
		date_default_timezone_set('Asia/Calcutta');
		
		$ip_addr = getIP("control_center");
		$mail	= new PHPMailer();
		
		$body	= "Hello $name,<br/><br/>".
				  "Welcome to Mangalore Electricity Supply Company Limited (MESCOM).Your account has been authorised for accessing MESCOM.<br/>".
				  "---------------------------------------------------------------------------------<br/>".
				  " This is an auto generated email. Please DONOT reply.<br/>".
				  "---------------------------------------------------------------------------------<br/><br/>".
				  "Thank you,<br/><br/>".
				  "With Regrads,<br/>".
				  "-MESCOM<br/>";
		
		$mail->IsSMTP(); 										// telling the class to use SMTP
		$mail->SMTPAuth   = true;                  				// enable SMTP authentication
		$mail->SMTPSecure = "ssl";                 				// sets the prefix to the servier
		$mail->Host       = "smtp.gmail.com";      				// sets GMAIL as the SMTP server
		$mail->Port       = 465;                   				// set the SMTP port for the GMAIL server
		$mail->Username   = "sunnysfavis8@gmail.com"; 			// GMAIL username
		$mail->Password   = "Shrinika"; 						// GMAIL password
		
		$mail->SetFrom('raqpmescom@gmail.com', 'MESCOM');
		$mail->AddReplyTo('raqpmescom@gmail.com','MESCOM');
		$mail->Subject    = "MESCOM - Account Authorization.";
		$mail->MsgHTML($body);
		$mail->AddAddress($email, $name);
		$ret = $mail->Send();
		
		if(!$ret) {
			return false;
		} else {
			return true;
		}
	}

?>
