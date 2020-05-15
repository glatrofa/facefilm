<?php

// definizione parametri
//$dbPassword = "";
//$dbUserName = "root";
$dbPassword = "Dtr1m0n%ci";
$dbUserName = "giuseppe";
$dbServer = "localhost";
$dbName = "awwa";

//connessione al database
$connection = new mysqli($dbServer, $dbUserName, $dbPassword, $dbName);
if($connection->connect_errno){
    exit("Database Connection Failed. Reason: ".$connection->connect_error);
}

?>