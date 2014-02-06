<?php

	require_once('user-auth-emailer.php');
	
	$id = $_POST['id'];
	$flag = $_POST['flag'];
	$usflag = $_POST['usflag'];
	$fixedfee = $_POST['fixedfee'];
	$due = $_POST['due'];
	$intondue = $_POST['intondue'];
	$others = $_POST['others'];
	$excesspay = $_POST['excesspay'];
	$deposit = $_POST['deposit'];
	$disondep = $_POST['disondep'];

	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);

	$qry = "UPDATE user_details SET verified_flag=$flag WHERE user_id=$id";
	$result = mysql_query($qry);

	if($result > 0){
		
		if($flag == 2 && $usflag == 1){
			
			$qry = "INSERT INTO rr_details(user_id, fixed_fee, due, int_on_due, others, excess_pmt, deposit, dis_on_deposit) 
					VALUES ($id,$fixedfee,$due,$intondue,$others,$excesspay,$deposit,$disondep)";
			$result = mysql_query($qry);
			
			if($result > 0){

				$rrnumber = "";
				$qry = "SELECT rr_number FROM rr_details WHERE user_id=$id";
				$result = mysql_query($qry);
				
				while($row = mysql_fetch_array($result)){
					$rrnumber = $row['rr_number'];
				}	
				
				$sql = "SELECT cc_publickey FROM cc_seeddata";
				$result = mysql_query($sql);
				$cc_publickey = "";
				while($row = mysql_fetch_array($result))
				{
					$cc_publickey = $row['cc_publickey'];
				}
				
				$sql = "SELECT * FROM user_details WHERE user_id=$id";
				$result = mysql_query($sql);
				$locationId = "";
				$name = "";
				$address = "";
				$emailID = "";
				$mobile = "";
				
				while($row = mysql_fetch_array($result))
				{				
					$locationId = $row['loc_code'];
					$name = $row['user_fname']." ".$row['user_lname'];
					$address = $row['address'];
					$emailID = $row['email_id'];
					$mobile = $row['mobile_no'];
				}	
				
				$sql = "SELECT emp_id FROM emp_details WHERE loc=$locationId";
				$result = mysql_query($sql);
				$empId = "";
				while($row = mysql_fetch_array($result))
				{
					$empId = $row['emp_id'];
				}
				
				$sql = "SELECT pub_key FROM public_key WHERE emp_id=$empId";
				$result = mysql_query($sql);
				$reqPublicKey = "";
				while($row = mysql_fetch_array($result))
				{
					$reqPublicKey = $row['pub_key'];
				}	
					
				$qry = "INSERT INTO manufacture(name, address, email, mobile, rr_number, cc_pub_key, req_pub_key, user_id, status) 
						VALUES ('$name','$address','$emailID','$mobile','$rrnumber','$cc_publickey','$reqPublicKey','$id', '0')";
				$result = mysql_query($qry);
				
				$retVal = sendEmail($rrnumber, $id, $name, $emailID);				
			}
			echo "{\"success\": true}";
		} else {
		echo "{\"success\": true}";
	}} else {
		echo "{\"success\": false}";
	}

	mysql_close($con);

?>
