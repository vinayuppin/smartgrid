<?php

	$code = $_GET['code'];
	$email = $_GET['email'];

	$con = mysql_connect("localhost","root","root");
	if (!$con) {
	  die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("control_center", $con);
	
	$sql = "UPDATE user_details SET verified_flag = 1 WHERE ver_code='$code' and email_id='$email'";
	$res = mysql_query($sql);
	if ($res == 0)
		{
			die('Error: ' . mysql_error());
		}
		
	mysql_close($con);

?>
<!DOCTYPE html>
<html lang="en">
	
	<head>
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
		<style>
			body{
					background:	url(../img/img_01.png);
					color:		#767676;
				}
		</style>		
		<script type="text/javascript" src="../js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="../js/bootstrap.js"></script>
	</head>
	
	<body>
	    <div style="padding:2% 5% 5% 5%;">
	        
	        <div class="media">
				<div class="media-body">
					<h3 class="media-heading" style="text-align:center; margin-top:20px; margin-bottom:30px;">Mangalore Electricity Supply Company Limited (MESCOM)</h3>
					<h1 class="media-heading" style="text-align:center;">RaQP - A Range Query Privacy preserving for <br>Smart Grid Information System</h1>
				</div>
			</div>
					
			<div style="padding: 0% 25%; margin-bottom:30px; margin-top:30px;">
				<div class="alert alert-success">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<h3 align="center">Thank you!! Your Email ID is confirmed</h3>
				</div>
			</div>		
				
			<div style="padding: 0% 15%; margin-bottom:30px; margin-top:30px;">
				<div class="alert alert-info">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<h4 align="center">Details of Consumer ID and Revenue Register Number (RR_number) for Smart Meter will be mailed soon. Keep checking mails for further process and communication.</h4>
				</div>
			</div>
			
		</div>
	</body>

</html>
