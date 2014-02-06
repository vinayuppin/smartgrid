<?php

	require_once('mailer/class.phpmailer.php');
	require_once('getIPValue.php');

	function sendEmail($rrnumber, $id, $name, $email){
		
		error_reporting(E_STRICT);
		date_default_timezone_set('Asia/Calcutta');

		$ip_addr = getIP("control_center");
		$mail	= new PHPMailer();
		
		$body	= "Hello $name,<br/><br/>".
				  "Welcome to Mangalore Electricity Supply Company Limited (MESCOM).".
				  "Your request has been verified & validated. Smart Meter will be deployed as soon as possible in the provided location.<br/>".
				  "Details of Consumer ID and Revenue Register Number (RR_number) for Smart Meter are as follows:<br/>".
				  "Consumer ID: $id<br/>".
				  "Revenue Register Number (RR_number): $rrnumber<br/>".
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
		$mail->Username   = "dada231@gmail.com"; 				// GMAIL username
		$mail->Password   = "Shalini_7"; 						// GMAIL password
		
		$mail->SetFrom('raqpmescom@gmail.com', 'MESCOM');
		$mail->AddReplyTo('raqpmescom@gmail.com','MESCOM');
		$mail->Subject    = "MESCOM - Smart Meter Autherization.";
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
