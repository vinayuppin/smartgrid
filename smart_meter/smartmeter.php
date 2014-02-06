<?php

	include('Crypt/AES.php');
	include('Crypt/RSA.php');

	date_default_timezone_set('Asia/Calcutta'); 
	
	$rr_number 	= "";
	$curr_meas 	= "";
	$pre_meas 	= "";
	$used_units	= "";
	$bill_number= "";

	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("smart_meter", $con);
	
	$sql_one = "SELECT rr_number FROM seed_data";
	$rr_no = mysql_query($sql_one);
	while($row = mysql_fetch_array($rr_no))
	{
		$rr_number = $row['rr_number'];
	}

//	echo "RR number: ".$rr_number;	
	
	$meas_id = rand(1,10);
	$sql_two = "SELECT * FROM measurement WHERE meas_id = $meas_id";
	$meas = mysql_query($sql_two);
	while($row = mysql_fetch_array($meas))
	{
		$curr_meas 	= $row['curr_meas'];
		$pre_meas	= $row['pre_meas'];	
		$used_units	= $row['used_units'];
	}
	
	$reading_date = date("Y-m-d"); 
	
//	echo "RR number: ".$rr_number." Cur mes: ".$curr_meas." pre mes: ".$pre_meas." used units: ".$used_units." ".$reading_date;

	$sql_three = "INSERT INTO metering (reading_date, curr_meas, pre_meas, used_units, rr_number, confirm_flag)
				VALUES ('$reading_date','$curr_meas','$pre_meas','$used_units','$rr_number','0')";
	mysql_query($sql_three);	
		
	$sql_four = "SELECT bill_number FROM metering WHERE reading_date = '".$reading_date."'";
	$bill_no = mysql_query($sql_four);
	while($row = mysql_fetch_array($bill_no))
	{
		$bill_number = $row['bill_number'];
	}
		
	$metering_data = $bill_number.",,,,,".$reading_date.",,,,,".$curr_meas.",,,,,".$pre_meas.",,,,,".$used_units.",,,,,".$rr_number;

//	echo "Plain text: ".$metering_data."\n\n";
	
	$cipher = new Crypt_AES(CRYPT_AES_MODE_CTR);
	define("MAX_LENGTH", 19);

	$intermediateKeyone = md5(uniqid(rand(), true));
	$keyone = substr($intermediateKeyone, 0, MAX_LENGTH);

	$intermediateKeytwo = md5(uniqid(rand(), true));
	$keytwo = substr($intermediateKeytwo, 0, MAX_LENGTH);

	$key = $keyone.$keytwo;
	$cipher->setKey($key);
	
	$encryp = $cipher->encrypt($metering_data);
	$enbase = base64_encode($encryp);

//	echo "Encrypted data: ".$encryp."\n\n";
//	echo "Encoded: ".$enbase."\n\n";
//	echo "Decoded: ".base64_decode($enbase)."\n\n";
//	echo "Decrypted data: ".$cipher->decrypt(base64_decode($enbase))."\n\n";
		
	$sql_five = "SELECT pub_key_req FROM seed_data";
	$reqpubkey = mysql_query($sql_five);
	while($row = mysql_fetch_array($reqpubkey))
	{
		$pub_key_req = $row['pub_key_req'];
	}

//	echo "Public key of requester: ".$pub_key_req."\n\n";
    
    set_time_limit(0);
    $rsa_req = new Crypt_RSA();
    $rsa_req->setHash('sha1');
    $rsa_req->setMGFHash('sha1');
    $rsa_req->setEncryptionMode(CRYPT_RSA_ENCRYPTION_OAEP);
    
	$rsa_req->loadKey($pub_key_req); // public key
	
    $ciphertext_req = $rsa_req->encrypt($key);
	$ciperbase_req = base64_encode($ciphertext_req);

//	echo "Encrypted data: ".$ciphertext_req."\n\n";
//	echo "Encoded data: ".$ciperbase_req."\n\n";
	
	$metering_session = $rr_number.",,,,,".$reading_date.",,,,,".$enbase.",,,,,".$ciperbase_req;

//	echo "\nEnBase : ".$enbase;
//	echo "Metering session: ".$metering_session;
	
	$sql_six = "SELECT 	pub_key_cc FROM seed_data";
	$ccpubkey = mysql_query($sql_six);
	while($row = mysql_fetch_array($ccpubkey))
	{
		$pub_key_cc = $row['pub_key_cc'];
	}
	
//	echo "Public key of control center: ".$pub_key_cc."\n\n";

    mysql_close($con);
    
    $rsa_cc = new Crypt_RSA();
    $rsa_cc->setHash('sha1');
    $rsa_cc->setMGFHash('sha1');
    $rsa_cc->setEncryptionMode(CRYPT_RSA_ENCRYPTION_OAEP);
    
	$rsa_cc->loadKey($pub_key_cc); // public key

    $ciphertext_cc = $rsa_cc->encrypt($metering_session);
	$ciperbase_cc = base64_encode($ciphertext_cc);

//	echo "Encrypted meterin session: ".$ciphertext_cc."\n\n";

	$ip_cc = "116.202.110.243";
	
//	echo "Encoded metring data: ".$ciperbase_cc."\n\n";

	$url ="http://".$ip_cc."/smartmeter/recvdata.php?ciperbase_cc=".$ciperbase_cc;
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$curl_scraped_page = curl_exec($ch);
	curl_close($ch);
	
//	$response = str_replace(" ","+",$curl_scraped_page);
//	echo "Response from server: ".$curl_scraped_page."\n";
//	echo "\nResponse: ".$curl_scraped_page."\n";
//	if($ciperbase_req == $curl_scraped_page)
//		echo "\nMatched\n";
//	else
//		echo "\nNot matche\n";

	$myArray = json_decode($curl_scraped_page, true);
	$response = $myArray['success'];
	
	if($response == true){

		$con = mysql_connect("localhost","root","root");
		if (!$con) {
		  die('Could not connect: ' . mysql_error());
		}

		mysql_select_db("smart_meter", $con);
		
		$sql_seven = "UPDATE metering SET confirm_flag = 1 WHERE bill_number =$bill_number AND reading_date ='$reading_date'";
		mysql_query($sql_seven);
		mysql_close($con);
		echo "Bill Generated successfully...";
	}

?>
