<?php
	
	set_time_limit(0);
	include('Crypt/RSA.php');

    $rsa = new Crypt_RSA();
    $rsa->setHash('sha1');
    $rsa->setMGFHash('sha1');
    $rsa->setEncryptionMode(CRYPT_RSA_ENCRYPTION_OAEP);
	
    $rsa->setPrivateKeyFormat(CRYPT_RSA_PRIVATE_FORMAT_PKCS1);
    $rsa->setPublicKeyFormat(CRYPT_RSA_PUBLIC_FORMAT_PKCS1);

    $res = $rsa->createKey(1024);

    $privateKey = $res['privatekey'];
    $publicKey  = $res['publickey'];

	$con = mysqli_connect("localhost","root","root","control_center");
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql = "UPDATE cc_seeddata SET cc_publickey = '$publicKey', cc_privatekey = '$privateKey'";
	$success = true;
	if (!mysqli_query($con,$sql))
	{
		die('Error: ' . mysqli_error($con));
		$success = false;
	}
	
	echo $success;
	mysqli_close($con);
	
?>
