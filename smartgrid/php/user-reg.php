<?php

	require_once('user-emailer.php');
	
	$user_fname		= $_POST['userfname'];
	$user_lname		= $_POST['userlname'];
	$user_loc		= $_POST['userloc'];
	$user_address	= $_POST['useraddress'];
	$user_email		= $_POST['useremail'];
	$user_mobileno	= $_POST['usermobile'];

	$mble = "+91";
	$mobile_no = $mble.$user_mobileno;

	define("MAX_LENGTH", 10);
	$intermediateSalt = md5(uniqid(rand(), true));
    $ver_code = substr($intermediateSalt, 0, MAX_LENGTH);
    
    $con = mysqli_connect("localhost","root","root","control_center");

	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql="INSERT INTO user_details (user_fname, user_lname, loc_code, address, email_id, mobile_no, ver_code, verified_flag)
	VALUES ('$user_fname','$user_lname','$user_loc','$user_address','$user_email','$mobile_no','$ver_code','0')";
		
	$success = true;
	if (!mysqli_query($con,$sql))
	{
		die('Error: ' . mysqli_error($con));
		$success = false;
	}
	
	mysqli_close($con);	
	
	$retVal = sendEmail($ver_code, $user_email, $user_fname);
	
	echo "{\"success\":$success}";

?>
