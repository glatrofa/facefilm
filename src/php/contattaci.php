<?php

include './connessioneDatabase.php';

// definizione variabili dal post
$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$messaggio = mysqli_real_escape_string($connection, $_POST["messaggio"]);
$oggetto = mysqli_real_escape_string($connection, $_POST["oggetto"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);

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

/*
if(isset( $_POST['name']))
$name = $_POST['name'];
if(isset( $_POST['email']))
$email = $_POST['email'];
if(isset( $_POST['message']))
$message = $_POST['message'];
if(isset( $_POST['subject']))
$subject = $_POST['subject'];

$content="From: $name \n Email: $email \n Message: $message";
$recipient = "g.latrofa3@studenti.poliba.it";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die(mysqli_error($connection));
echo "Email sent!";
*/

?>