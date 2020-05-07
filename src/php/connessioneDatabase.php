<?php

header('Access-Control-Allow-Origin: *'); // risolve l'errore "Cross-Origin Read Blocking (CORB)"

$dbPassword = "Dtr1m0n%ci";
$dbUserName = "giuseppe";
$dbServer = "localhost";
$dbName = "awwa";
/*
$dbPassword = "";
$dbUserName = "root";
$dbServer = "localhost";
$dbName = "awwa";
*/

$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);
if($connection->connect_errno){
    exit("Database Connection Failed. Reason: ".$connection->connect_error);
}

?>