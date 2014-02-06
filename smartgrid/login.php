<?php

    function clean($str) 
	{
		$str = @trim($str);
		if(get_magic_quotes_gpc()) 
		{
			$str = stripslashes($str);
		}
		return mysql_real_escape_string($str);
    }
     
	$user_id	= clean($_POST["empid"]);
	$password 	= clean($_POST["emppswd"]);
	$pssd		= "";
	 
 	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);       
	
	$sql = "SELECT salt FROM emp_details WHERE emp_id='$user_id'";
	$salt = mysql_query($sql);

	while($row = mysql_fetch_array($salt))
	{
		$pssd = $row['salt'];
	}
	
	$mypassword = hash("sha512", $password.$pssd);
	
	//Create query
    $qry="SELECT * FROM emp_details WHERE emp_id='$user_id' AND password='$mypassword'";
    $result=mysql_query($qry);
	
	$success = "false";
    $role = "-1";
    $verified ="-1";
	while($row = mysql_fetch_array($result))
	{	
		$empidd 	= $row['emp_id'];
		$role	= $row['role'];
		$verified	= $row['verified_flag'];
		setcookie("emp-id", $empidd, time()+3600);	
		setcookie("role", $role, time()+3600);	
		setcookie("verified", $verified, time()+3600);	
		$success = "true";
	}
	mysql_close($con);
	echo "{\"success\":$success,\"role\":\"$role\",\"verified\":$verified}";

?>
