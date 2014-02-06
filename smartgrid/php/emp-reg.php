<?php

	require_once('emp-emailer.php');
		
	$emp_fname		= $_POST['empfname'];
	$emp_lname		= $_POST['emplname'];
	$emp_pswd		= $_POST['emppswd'];
	$emp_sex		= $_POST['empsex'];
	$emp_address	= $_POST['empaddress'];
	$emp_bdate		= $_POST['empbdate'];
	$emp_email		= $_POST['empemail'];
	$emp_mobileno	= $_POST['empmobile'];
	
	define("MAX_LENGTH", 6);
	$intermediateSalt = md5(uniqid(rand(), true));
    $salt = substr($intermediateSalt, 0, MAX_LENGTH);
	$mypassword = hash("sha512", $emp_pswd.$salt);
	
	$mble = "+91";
	$mobile_no = $mble.$emp_mobileno;
	
	$intermediateSalt = md5(uniqid(rand(), true));
    $ver_code = substr($intermediateSalt, 0, 10);
		
	$con = mysqli_connect("localhost","root","root","control_center");
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql = "INSERT INTO emp_details (emp_fname, emp_lname, password, sex, address, bdate, email_id, mobile_no, salt, ver_code, verified_flag, role)
	VALUES ('$emp_fname','$emp_lname','$mypassword','$emp_sex','$emp_address','$emp_bdate','$emp_email','$mobile_no','$salt','$ver_code','0', '0')";

	$success = true;
	$empID = "";

	if (!mysqli_query($con,$sql))
	{
		die('Error: ' . mysqli_error($con));
		$success = false;
	}else{
		$sql = "SELECT emp_id FROM emp_details WHERE password = '$mypassword'";
		$res = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($res,MYSQLI_NUM)){
			$empID = $row[0];
		}
	}
	
	mysqli_close($con);
	
	$retVal = sendEmail($ver_code, $emp_email, $emp_fname, $empID, $emp_pswd);	
	
	echo "{\"success\":$success}";

?>
