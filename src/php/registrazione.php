<?php

include './connessioneDatabase.php';

$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
$data_nascita = mysqli_real_escape_string($connection, $_POST["data_nascita"]);
$nazione = mysqli_real_escape_string($connection, $_POST["nazione"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$username = mysqli_real_escape_string($connection, $_POST["nome_utente"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$password_criptata = md5($password);

$query = "INSERT INTO utenti ('nome', 'cognome', 'data_nascita', 'nazione', 'email', 'nome_utente', 'password')"
        ."VALUES ('$nome', '$cognome' , '$data_nascita', '$nazione', '$email', '$username', '$password_criptata')";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
/*
$query = "SELECT email FROM utenti WHERE email = '".$email."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$nrighe_email = mysqli_num_rows($result);
$query = "SELECT username FROM user WHERE username = '".$username."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$nrighe_username = mysqli_num_rows($result);
$response = array();
if($nrighe_email != 0){
    $response[0] = 1;
}
else if($nrighe_username != 0){
    $response[0] = 2;
}
else if($nrighe_email == 0 && $nrighe_username == 0){
    $queryL = "LOCK TABLES user WRITE";
    mysqli_query($connection, $queryL) or die(mysqli_error($connection));
    $query = "INSERT INTO user (username, email, password)"
        ."VALUES ('$username', '$email', '$password_criptata')";
    mysqli_query($connection, $query) or die(mysqli_error($connection));
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die (mysqli_error($connection));    
    $response[0] = 0;
}
else
    $response[0] = "ERROR";
$json_data = json_encode($response);
echo $json_data; 
*/

?>