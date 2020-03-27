<?php

include 'db-connection.php';

$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
$data_nascita = mysqli_real_escape_string($connection, $_POST["data_nascita"]);
$nazione = mysqli_real_escape_string($connection, $_POST["nazione"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$username = mysqli_real_escape_string($connection, $_POST["username"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);

mysql_query("INSERT INTO ".$tbl_name." (nome,cognome,data_nascita,nazione,email,username,password) VALUES ('$nome','$cognome','$data_nascita','$nazione','$email','$username','$password')",$db)
$result = mysqli_query($connection, $query) or die("Access failed");
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){ 
    echo "Registrazione effettuata";
}
else{
    $response[0] = array('nome_utente' => null, 'email' => null);
    echo "Registrazione non effettuata";
}
$json_data = json_encode($response);
echo $json_data;

?>