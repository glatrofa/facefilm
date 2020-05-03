<?php

//header('Access-Control-Allow-Origin: *');
include 'db-connection.php';

$email = mysqli_real_escape_string($connection, $_POST["email"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$passwordCriptata = md5($password);
/*
$query = "SELECT nome_utente, email FROM utenti WHERE email = '".$email."' AND password = '".$passwordCriptata."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){
    $response[0] = array('nome_utente' => $row["nome_utente"], 'email' => $row["email"]);  
    $response[1] = 'login';
}
else{
    $response[0] = array('nome_utente' => null, 'email' => null);
    $response[1] = 'NO login';
}
*/
$responde = array('email' => $email, 'password' => $password, 'pc' => $passwordCriptata);  
$jsonData = json_encode($response);
echo $jsonData;

?>