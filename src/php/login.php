<?php

include 'db-connection';
//ciao
$username = mysqli_real_escape_string($connection, $_POST["nome_utente"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$password_criptata = md5($password);

$query = "SELECT nome_utente, email FROM utenti WHERE nome_utente = '".$username."' AND password = '".$password_criptata."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){
    $response[0] = array('nome_utente' => $row["nome_utente"], 'email' => $row["email"]);  
}
else{
    $response[0] = array('nome_utente' => null, 'email' => null);
}
$json_data = json_encode($response);
echo $json_data;

?>