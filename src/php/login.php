<?php

include './connessioneDatabase.php';
include './autenticazione.php';

session_start();

$email = mysqli_real_escape_string($connection, $_POST["email"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$passwordCriptata = md5($password);

$query = "SELECT nome_utente, email FROM utenti WHERE email = '".$email."' AND password = '".$passwordCriptata."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){
    $response[0] = array('nome_utente' => $row["nome_utente"], 'email' => $row["email"]);  
    $response[1] = registraToken($row["email"]);
    $response[2] = $_SESSION['PHPSESSID'];
}
else{
    $queryEmailPresente = "SELECT email FROM utenti WHERE email = '".$email."'";
    $resultEmailPresente = mysqli_query($connection, $queryEmailPresente) or die("Access failed");
    if(mysqli_num_rows($resultEmailPresente) != 0){
        $response[0] = array('email' => 1);
    }
    else{
        $response[0] = array('email' => null);
    }
    session_destroy();
}

$jsonData = json_encode($response);
echo $jsonData;

?>