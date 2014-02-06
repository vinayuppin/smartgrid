<?php

	function getIP($getIP){	

		$con=mysql_connect("localhost","root","root");
		if (!$con) {
		  die('Could not connect: ' . mysql_error());
		}

		mysql_select_db("control_center", $con);
		
		$sql_one = "SELECT ip_address FROM ip_addr WHERE server_name='".$getIP."'";
		$ipaddr = mysql_query($sql_one);

		while($row = mysql_fetch_array($ipaddr))
		{
			$ip_addr = $row['ip_address'];
		}

		mysql_close($con);
		return $ip_addr;
	}

?>
