<?php

	$status = $_POST['status'];

	$con = mysql_connect("localhost","root","root");

	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);

	$qry = "SELECT * FROM manufacture WHERE status = $status";

	$result = mysql_query($qry);
	$data = '';
	$success = FALSE;

	while($row = mysql_fetch_array($result)){
		$success = TRUE;
		if($data != ""){
			$data .=",";
		}
		$cckey = trim(preg_replace('/\s\s+/', '', $row[cc_pub_key]));
		$reqkey = trim(preg_replace('/\s\s+/', '', $row[req_pub_key]));
		$data .="{\"id\":\"$row[user_id]\",\"name\":\"$row[name]\",\"address\":\"$row[address]\",\"email\":\"$row[email]\",\"mobile\":\"$row[mobile]\",\"rr_number\":\"$row[rr_number]\",\"cc_pub_key\":\"$cckey\",\"req_pub_key\":\"$reqkey\"}";
	}

	if($success){
		echo "{\"success\": true,\"list\":[$data]}";
	}else{
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>

