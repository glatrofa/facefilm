<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';

// avvio sessione
session_start();

// definizione variabili
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);
$email = $_SESSION["email"];

$response = true;

// lock tabella
$queryL = "LOCK TABLES segnalazioni_post WRITE";
mysqli_query($connection, $queryL) or die($response = mysqli_error($connection));
// esecuzione query
$query = "INSERT INTO segnalazioni_post (idPost, email) "
    ."VALUES ('$idPost','$email')";
$result = mysqli_query($connection, $query) or die($response = mysqli_error($connection));
// unlock tabelle
$queryU = "UNLOCK TABLES";
mysqli_query($connection, $queryU) or die ($response = mysqli_error($connection));    

// ritorno dati al client
$json_data = json_encode($response);
echo $json_data; 


?>