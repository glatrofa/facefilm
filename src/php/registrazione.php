<?php

include './connessioneDatabase.php';

$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
$data_nascita = mysqli_real_escape_string($connection, $_POST["data_nascita"]);
//$nazione = mysqli_real_escape_string($connection, $_POST["nazione"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$username = mysqli_real_escape_string($connection, $_POST["nome_utente"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);

$query=("INSERT INTO `utenti` (`nome`, `cognome`, `data_nascita`, `nazione`, `email`, `nome_utente`, `password`) VALUES ('".$nome."', '".$cognome."' , '".$data_nascita."', 'italia', '".$email."', '".$username."', '".$password."');");

$result = mysqli_query($connection, $query) or die("Access failed");
?>