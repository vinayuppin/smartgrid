<?php

	require_once('admin-emailer.php');
		
	$emp_fname		= $_POST['adminfname'];
	$emp_lname		= $_POST['adminlname'];
	$emp_pswd		= $_POST['adminpswd'];
	$emp_sex		= $_POST['adminsex'];
	$emp_des		= $_POST['admindes'];
	$emp_address	= $_POST['adminaddress'];
	$emp_bdate		= $_POST['adminbdate'];
	$emp_email		= $_POST['adminemail'];
	$emp_mobileno	= $_POST['adminmobile'];
	
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
	VALUES ('$emp_fname','$emp_lname','$mypassword','$emp_sex','$emp_address','$emp_bdate','$emp_email','$mobile_no','$salt','$ver_code','0', '$emp_des')";

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
