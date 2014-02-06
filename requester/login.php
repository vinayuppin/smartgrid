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
     
	$user_id	= "1";//clean($_POST["empid"]);
	$psswrd 	= "123";//clean($_POST["emppswd"]);

	$url ="http://180.215.64.154/smartgrid/php/req-login.php?username=".$user_id."&passwd=".$psswrd;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$curl_scraped_page = curl_exec($ch);
	curl_close($ch);
	
//	echo $curl_scraped_page;
	
	$json = json_decode($curl_scraped_page, true);
	print_r($json);
/*	echo $json['success']."\n";
	echo $json['data']."\n";
	echo $json['req_priv_key']."\n";
	echo $json['cc_priv_key']."\n";  */
//	$jsonone = $curl_scraped_page['success'];
//	echo "Hi".$jsonone;
//	foreach ($jsonone['items'] as $address)
//	{
	//	echo "items:". $address['address'] ."<br>";
//	};

/*	$myArray = json_decode($curl_scraped_page, true);
	echo $myArray['success']."\n";
	print_r($myArray['data']);
	foreach ($myArray['data'] as $value)
	{
		echo $myArray['data'].$value['id']."\n";
		echo $myArray['data'].$value['name']."\n";
		echo $myArray['data'].$value['address']."\n";
		echo $myArray['data'].$value['email']."\n";
		echo $myArray['data'].$value['mobile']."\n";
		echo $myArray['data'].$value['rr_no']."\n";
		echo $myArray['data'].$value['fixed_fee']."\n";
		echo $myArray['data'].$value['due']."\n";
		echo $myArray['data'].$value['int_on_due']."\n";
		echo $myArray['data'].$value['others']."\n";
		echo $myArray['data'].$value['excess_pmt']."\n";
		echo $myArray['data'].$value['deposit']."\n";
		echo $myArray['data'].$value['dis_on_deposit']."\n";
	};
//	echo $myArray['data']."\n";
	echo $myArray['req_priv_key']."\n";
	echo $myArray['cc_priv_key']."\n"; 

*/	
/*	 
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
*/
?>
