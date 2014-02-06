<?php
	
	$msgdigest_one 	= $_GET['msgdigest_one'];
	$enbase 		= $_GET['enbase'];

	$enbase = str_replace(" ","+",$enbase);
	
	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("cloud_server_one", $con);

	$qry = "INSERT INTO metering_data (msgdigest_one, enbase) VALUES ('$msgdigest_one','$enbase')";
	$result = mysql_query($qry);

	if($result > 0){
		$success = true;
	}else{
		$success = false;
	}
	
	mysql_close($con);
	echo "{\"success\": \"$success\"}"; 

?>
