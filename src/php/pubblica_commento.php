<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';

// avvio sessione
session_start();

// definizione variabili dal post
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);
$email = mysqli_real_escape_string($connection, $_SESSION["email"]);
$testo = mysqli_real_escape_string($connection, $_POST["modal_commento_testo"]);

if (isset($_SESSION["email"])) {
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
    $response = true;
}
else
$response = true;

// ritorno dati al client
$json_data = json_encode($response);
echo $json_data; 

?>