<?php

include './connessioneDatabase.php';

// avvio sessione
session_start();

// definizione variabili dal post
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);
$email = mysqli_real_escape_string($connection, $_SESSION["email"]);
$testo = mysqli_real_escape_string($connection, $_SESSION["modal_commento_testo"]);

$response = true;

// lock tabelle
$queryL = "LOCK TABLES commenti WRITE";
mysqli_query($connection, $queryL) or die($response = mysqli_error($connection));
// esecuzione query
$query = "INSERT INTO commenti (id_utente, id_post, testo)"
    ."VALUES ('$email', '$idPost', '$testo')";
mysqli_query($connection, $query) or die($response = mysqli_error($connection));
// unlock tabelle
$queryU = "UNLOCK TABLES";
mysqli_query($connection, $queryU) or die ($response = mysqli_error($connection));

// ritorno dati al client
$json_data = json_encode($response);
echo $json_data; 

?>