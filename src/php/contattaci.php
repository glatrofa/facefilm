<?php

include './connessione_database.php';

// prelievo variabili dal client
$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$messaggio = mysqli_real_escape_string($connection, $_POST["messaggio"]);
$oggetto = mysqli_real_escape_string($connection, $_POST["oggetto"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);

//Invio mail
$headers = "MIME-Version: 1.0" . "\r\n"
. "Content-type:text/html;charset=UTF-8" . "\r\n"
. "From: <". $email ."> ". "\r\n";
echo mail("g.latrofa3@studenti.poliba.it", $oggetto, $messaggio, $headers) or die(mysqli_error($connection));

/*
// lock tabella
$queryL = "LOCK TABLES messaggi WRITE";
mysqli_query($connection, $queryL) or die(mysqli_error($connection));
// esecuzione query
$query = "INSERT INTO messaggi (nome, email, oggetto, messaggio)"
    ."VALUES ('$nome', '$email' , '$oggetto', '$messaggio')";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
// unlock tabelle
$queryU = "UNLOCK TABLES";
mysqli_query($connection, $queryU) or die (mysqli_error($connection));    

// ritorno dati al client
$json_data = json_encode($result);
echo $json_data; 
*/

?>