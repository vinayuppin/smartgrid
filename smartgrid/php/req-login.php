<?php

	$user_id = $_GET['username'];
	$passwd = $_GET['passwd'];
	
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
	
	$mypassword = hash("sha512", $passwd.$pssd);
	
	//Create query
    $qry="SELECT * FROM emp_details WHERE emp_id='$user_id' AND password='$mypassword'";
    $result=mysql_query($qry);
	
	$success 	= "false";
    $role 		= "";
    $verified 	= "";
	$empidd 	= "";
	$role 		= "";

	while($row = mysql_fetch_array($result))
	{
		$empidd 	= $row['emp_id'];
		$role		= $row['role'];
		$verified	= $row['verified_flag'];
	}
	
	if($verified == 2 && $role == 0)
	{	
		$qry="SELECT ud.user_id, ud.user_fname, ud.user_lname, ud.address, ud.email_id, ud.mobile_no, rd.rr_number, rd.fixed_fee, rd.due, rd.int_on_due, rd.others, rd.excess_pmt, rd.deposit, rd.dis_on_deposit FROM user_details ud, emp_details ed, rr_details rd WHERE ed.emp_id=$user_id AND ed.loc = ud.loc_code AND ud.verified_flag=2 AND ud.monthly_flag=0 AND rd.user_id = ud.user_id;";
		$result=mysql_query($qry);
		
		$data = "";

		while($row = mysql_fetch_array($result))
		{
			$success = "true";
			if($data != ""){
				$data .=",";
			}
			$data .="{\"id\":\"$row[user_id]\",\"name\":\"".$row['user_fname']." ".$row['user_lname']."\",\"address\":\"$row[address]\",\"email\":\"$row[email_id]\",\"mobile\":\"$row[mobile_no]\",\"rr_no\":\"$row[rr_number]\",\"fixed_fee\":\"$row[fixed_fee]\",\"due\":\"$row[due]\",\"int_on_due\":\"$row[int_on_due]\",\"others\":\"$row[others]\",\"excess_pmt\":\"$row[excess_pmt]\",\"deposit\":\"$row[deposit]\",\"dis_on_deposit\":\"$row[dis_on_deposit]\"}";
		}
		
	    $qry="SELECT pr.priv_key, cc.cc_privatekey FROM private_key pr, cc_seeddata cc WHERE pr.emp_id=$user_id";
		$result=mysql_query($qry);

		$req_priv_key 	= "";
		$cc_priv_key	= "";
		
		while($row = mysql_fetch_array($result))
		{
			$req_priv_key 	= $row['priv_key'];
			$cc_priv_key	= $row['cc_privatekey'];
		}
		
		$req_priv_key = trim(preg_replace('/\s\s+/', '', $req_priv_key));
		$cc_priv_key = trim(preg_replace('/\s\s+/', '', $cc_priv_key));
		$success = "true";
		
		echo "{\"success\":$success,\"data\":[$data],\"req_priv_key\":$req_priv_key,\"cc_priv_key\":$cc_priv_key}";		

	}else{
		
		echo "{\"success\":$success}";	

	}
	
	mysql_close($con);

?>
