<?php

include './connessioneDatabase.php';

// definizione dell'elemento da modificare
$obiettivo = mysqli_real_escape_string($connection, $_POST["obiettivo"]);
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);
$response = array();
$response[0] = true;

if($obiettivo == "piace") {
    // lock tabelle
    $queryL = "LOCK TABLES post WRITE";
    mysqli_query($connection, $queryL) or die($response[1] = mysqli_error($connection));
    // prelievo vecchio valore
    $query = "SELECT piace FROM post WHERE id = '".$idPost."'";
    $result = mysqli_query($connection, $query) or die($response[2] = mysqli_error($connection));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $response[9] = $row["piace"] + 1;
    // inserimento nuovo valore
    $query = "UPDATE post SET piace = ".$response[9]." WHERE id = '".$idPost."'";
    mysqli_query($connection, $query) or die($response[3] = mysqli_error($connection));
    // unlock tabelle
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die ($response[4] = mysqli_error($connection));
} else if($obiettivo == "dislike") {
    // lock tabelle
    $queryL = "LOCK TABLES post WRITE";
    mysqli_query($connection, $queryL) or die($response[5] = mysqli_error($connection));
    // prelievo vecchio valore
    $query = "SELECT dislike FROM post WHERE id = '".$idPost."'";
    $result = mysqli_query($connection, $query) or die($response[6] = mysqli_error($connection));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $response[9] = $row["dislike"] + 1;
    // inserimento nuovo valore
    $query = "UPDATE post SET dislike = ".$response[9]." WHERE id = '".$idPost."'";
    mysqli_query($connection, $query) or die($response[7] = mysqli_error($connection));
    // unlock tabelle
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die ($response[8] = mysqli_error($connection));
} else {
    $response = "nessun obiettivo selezionato";
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>