<?php

	$status = $_POST['status'];

	$con = mysql_connect("localhost","root","root");

	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);

	$qry = "SELECT u.user_id,u.user_fname,u.user_lname,u.address,l.location_name,u.email_id,u.mobile_no FROM user_details u, location l WHERE u.verified_flag = $status AND u.loc_code = l.location_id";

	$result = mysql_query($qry);
	$data = '';
	$success = FALSE;

	while($row = mysql_fetch_array($result)){
		$success = TRUE;
		if($data != ""){
			$data .=",";
		}

		$data .="{\"id\":\"$row[user_id]\",\"name\":\"".$row['user_fname']." ".$row['user_lname']."\",\"address\":\"$row[address]\",\"loc\":\"$row[location_name]\",\"email\":\"$row[email_id]\",\"mobile\":\"$row[mobile_no]\"}";
	}

	if($success){
		echo "{\"success\": true,\"list\":[$data]}";
	}else{
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>
