<?php

include './connessioneDatabase.php';

// avvio sessione
session_start();

// definizione variabili dal post
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$passwordCriptata = md5($password);

// esecuzione query
$query = "SELECT nome_utente, email FROM utenti WHERE email = '".$email."' AND password = '".$passwordCriptata."'";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){
    // login con successo
    $response[0] = array('nome_utente' => $row["nome_utente"], 'email' => $row["email"]);  
    $response[1] = session_id();
    // aggiunge l'email come parametro della sessione
    $_SESSION["email"] = $row["email"];
}
else{
    $queryEmailPresente = "SELECT email FROM utenti WHERE email = '".$email."'";
    $resultEmailPresente = mysqli_query($connection, $queryEmailPresente) or die(mysqli_error($connection));
    if(mysqli_num_rows($resultEmailPresente) != 0){
        // credenziali errate
        $response[0] = array('email' => 1);
    }
    else{
        // utente non registrato
        $response[0] = array('email' => null);
    }
    // distruzione sessione in caso di login fallito
    session_destroy();
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>