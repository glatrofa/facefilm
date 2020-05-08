<?php

include './connessioneDatabase.php';

// definizione variabili dal post
$idSerie = mysqli_real_escape_string($connection, $_POST["post_serie"]);
$numeroStagione = mysqli_real_escape_string($connection, $_POST["post_stagione"]);
$numeroEpisodio = mysqli_real_escape_string($connection, $_POST["post_episodio"]);
$postTesto = mysqli_real_escape_string($connection, $_POST["post_testo"]);
//echo $idSerie;
//echo $numeroStagione;
//echo $numeroEpisodio;
//echo $postTesto;
/*
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
*/
// ritorno dati al client
$response = $idSerie.' '.$numeroStagione.' '.$numeroEpisodio.' '.$postTesto;
$jsonData = json_encode($response);
echo $jsonData;

?>