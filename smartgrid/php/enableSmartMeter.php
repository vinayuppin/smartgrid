<?php

	$id = $_POST['id'];
	$flag = $_POST['flag'];

	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);

	$qry = "UPDATE manufacture SET status = $flag WHERE user_id=$id";
	$result = mysql_query($qry);

	if($result > 0){
		echo "{\"success\": true}";
	} else {
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>

