<?php

	$con = mysql_connect("localhost","root","root");

	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);

	$qry = "SELECT * FROM location";

	$result = mysql_query($qry);
	$data = '';
	$success = FALSE;

	while($row = mysql_fetch_array($result)){
		$success = TRUE;
		if($data != ""){
			$data .=",";
		}

		$data .="{\"id\":\"$row[location_id]\",\"name\":\"$row[location_name]\"}";
	}

	if($success){
		echo "{\"success\": true,\"list\":[$data]}";
	}else{
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>
