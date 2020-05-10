<?php

include './connessioneDatabase.php';

// definizione dell'elemento da modificare
$obiettivo = mysqli_real_escape_string($connection, $_POST["obiettivo"]);
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);
$respone = true;

if($obiettivo == "piace") {
    // lock tabelle
    $queryL = "LOCK TABLES post WRITE";
    mysqli_query($connection, $queryL) or die($response = mysqli_error($connection));
    // prelievo vecchio valore
    $query = "SELECT post.piace FROM post WHERE post.id = '".$idPost."'";
    $result = mysqli_query($connection, $query) or die($response = mysqli_error($connection));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $row = $row["piace"] ++;
    // inserimento nuovo valore
    $query = "UPDATE post SET post.piace = ".$row." WHERE post.id = '".$idPost."'";
    mysqli_query($connection, $query) or die($response = mysqli_error($connection));
    // unlock tabelle
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die ($response = mysqli_error($connection));
} else if($obiettivo == "dislike") {
    // lock tabelle
    $queryL = "LOCK TABLES post WRITE";
    mysqli_query($connection, $queryL) or die($response = mysqli_error($connection));
    // prelievo vecchio valore
    $query = "SELECT post.dislike FROM post WHERE post.id = '".$idPost."'";
    $result = mysqli_query($connection, $query) or die($response = mysqli_error($connection));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $row = $row["dislike"] ++;
    // inserimento nuovo valore
    $query = "UPDATE post SET post.dislike = ".$row." WHERE post.id = '".$idPost."'";
    mysqli_query($connection, $query) or die($response = mysqli_error($connection));
    // unlock tabelle
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die ($response = mysqli_error($connection));
} else {
    $respone = "nessun obiettivo selezionato";
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>