<?php
	
	$msgdigest_two 	= $_GET['msgdigest_two'];
	$ciperbase 		= $_GET['ciperbase'];
	
	$ciperbase = str_replace(" ","+",$ciperbase);
	
	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("cloud_server_two", $con);

	$qry = "INSERT INTO metering_key (cur_date, msgdigest, cipherbase) VALUES (CURDATE(),'$msgdigest_two','$ciperbase')";
	$result = mysql_query($qry);

	if($result > 0){
		$success = true;
	}else{
		$success = false;
	}
	
	mysql_close($con);
	echo "{\"success\": \"$success\"}"; 
	
?>
