<?php

$dbPassword = "root";
$dbUserName = "root";
$dbServer = "localhost";
$dbName = "awwa";

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);
if($connection->connect_errno){
    exit("Database Connection Failed. Reason: ".$connection->connect_error);
}

?>