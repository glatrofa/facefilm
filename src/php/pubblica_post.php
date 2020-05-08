<?php

include './connessioneDatabase.php';

// definizione variabili dal post
$idSerie = mysqli_real_escape_string($connection, $_POST["idSerie"]);
$numeroStagione = mysqli_real_escape_string($connection, $_POST["numeroStagione"]);
$numeroEpisodio = mysqli_real_escape_string($connection, $_POST["numeroEpisodio"]);
$testo = mysqli_real_escape_string($connection, $_POST["testo"]);
$titolo = mysqli_real_escape_string($connection, $_POST["titolo"]);
$email = $_SESSION["email"];

// lock tabelle
$queryL = "LOCK TABLES post WRITE";
mysqli_query($connection, $queryL) or die(mysqli_error($connection));
// esecuzione query
$query = "INSERT INTO post (email, titolo, testo, id_serie, numero_stagione, numero_episodio)"
    ."VALUES ('$email', '$titolo', '$testo', '$idSerie', '$numeroStagione', '$numeroEpisodio')";
$result = mysqli_query($connection, $query) or die($response = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
// unlock tabelle
$response = array();
$queryU = "UNLOCK TABLES";
mysqli_query($connection, $queryU) or die (mysqli_error($connection));

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>