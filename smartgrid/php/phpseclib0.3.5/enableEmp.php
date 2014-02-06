<?php

	include('Crypt/RSA.php');
	require_once('../emp-enabler.php');

	$id 	= $_POST['id'];
	$flag 	= $_POST['flag'];
	$enflag = $_POST['enflag'];
	$locid  = $_POST['loc_id'];
	
	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);
	
	$loccode = " ";
	if($flag == 2 && $enflag == 1){
		$loccode = " ,loc=$locid ";
	}
	
	$qry = "UPDATE emp_details SET verified_flag=$flag".$loccode."WHERE emp_id=$id";
	$result = mysql_query($qry);

	if($result > 0){
		if($flag == 2 && $enflag == 1){
			
			set_time_limit(0);

			$rsa = new Crypt_RSA();
			$rsa->setHash('sha1');
			$rsa->setMGFHash('sha1');
			$rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_OAEP);
			
			$rsa->setPrivateKeyFormat(CRYPT_RSA_PRIVATE_FORMAT_PKCS1);
			$rsa->setPublicKeyFormat(CRYPT_RSA_PUBLIC_FORMAT_PKCS1);

			$res = $rsa->createKey(1024);

			$privateKey = $res['privatekey'];
			$publicKey  = $res['publickey'];
			
			$sql_one = "INSERT INTO private_key (emp_id, priv_key) VALUES ('$id','$privateKey')";
			$qry_one = mysql_query($sql_one);
			
			$sql_two = "INSERT INTO public_key (emp_id, pub_key) VALUES ('$id','$publicKey')";
			$qry_two = mysql_query($sql_two);
			
			$sql_three = "SELECT emp_fname, email_id FROM emp_details WHERE emp_id = $id";
			$qry_three = mysql_query($sql_three);

			while($row = mysql_fetch_array($qry_three))
			{
				$fname = $row['emp_fname'];
				$emailid = $row['email_id'];
			}
			
			$email = sendEmail($emailid, $fname);
			
			echo "{\"success\": true}";
		}else{
			echo "{\"success\": true}";
		}
		}else{
			echo "{\"success\": false}";
	}

	mysql_close($con);

?>
