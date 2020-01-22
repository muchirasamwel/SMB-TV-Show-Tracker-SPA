<?php 
	$con=new mysqli('192.168.10.10','samkan','samkan','smbtvshow');
	if ($con->connect_error) {
		die("Database connection failed: ".$con->connect_error);
	}
