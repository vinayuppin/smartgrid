<?php

	$status = $_POST['status'];

	$con = mysql_connect("localhost","root","root");

	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);
	
	$qry = "";
	
	if($status !=1){
		$qry = "SELECT e.emp_id,e.emp_fname,e.emp_lname,e.address,e.email_id,e.mobile_no, l.location_name FROM emp_details e, location l WHERE e.verified_flag = $status AND e.role=0 AND e.loc=l.location_id";
	}else{
		$qry = "SELECT emp_id,emp_fname,emp_lname,address,email_id,mobile_no FROM emp_details WHERE verified_flag = $status AND role=0";
	}
	
	$result = mysql_query($qry);
	$data = '';
	$success = FALSE;

	while($row = mysql_fetch_array($result)){
		$success = TRUE;
		if($data != ""){
			$data .=",";
		}
		if($status !=1)
			$data .="{\"id\":\"$row[emp_id]\",\"name\":\"".$row['emp_fname']." ".$row['emp_lname']."\",\"address\":\"$row[address]\",\"email\":\"$row[email_id]\",\"mobile\":\"$row[mobile_no]\",\"location\":\"$row[location_name]\"}";
		else
			$data .="{\"id\":\"$row[emp_id]\",\"name\":\"".$row['emp_fname']." ".$row['emp_lname']."\",\"address\":\"$row[address]\",\"email\":\"$row[email_id]\",\"mobile\":\"$row[mobile_no]\"}";
	}

	if($success){
		if($status == 1)
		{
			$qry = "SELECT l.location_id,l.location_name FROM location l LEFT JOIN emp_details e ON l.location_id = e.loc WHERE e.loc IS NULL";

			$res = mysql_query($qry);
			$locdata = '';
			$success = FALSE;

			while($row = mysql_fetch_array($res)){
				$success = TRUE;
				if($locdata != ""){
					$locdata .=",";
				}
				$locdata .="{\"id\":\"$row[location_id]\",\"location\":\"$row[location_name]\"}";
			}
			echo "{\"success\": true,\"list\":[$data],\"loclist\":[$locdata]}";
		}else
		{	
			echo "{\"success\": true,\"list\":[$data]}";
		}
	}else{
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>
