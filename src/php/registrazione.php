<?php

include './connessioneDatabase.php';

// definizione variabili dal post
$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
$data_nascita = mysqli_real_escape_string($connection, $_POST["data_nascita"]);
$nazione = mysqli_real_escape_string($connection, $_POST["nazione"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$nome_utente = mysqli_real_escape_string($connection, $_POST["nome_utente"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$password_criptata = md5($password);

// controllo se l'email è già presente
$query = "SELECT email FROM utenti WHERE email = '".$email."'";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
$nrighe_email = mysqli_num_rows($result);
$query = "SELECT nome_utente FROM utenti WHERE nome_utente = '".$nome_utente."'";
$result = mysqli_query($connection, $query) or die(mysqli_error($connection));
$nrighe_username = mysqli_num_rows($result);
$response = array();
if($nrighe_email != 0){
    // email già usata
    $response[0] = 1;
}
else if($nrighe_username != 0){
    // nome utente già usato
    $response[0] = 2;
}
else if($nrighe_email == 0 && $nrighe_username == 0){
    // lock tabelle
    $queryL = "LOCK TABLES utenti WRITE";
    mysqli_query($connection, $queryL) or die(mysqli_error($connection));
    // registrazione con controllo presenza immagine
    if(getimagesize($_FILES["immagine"]["tmp_name"]) == false){
        $query = "INSERT INTO utenti (nome, cognome, data_nascita, nazione, email, nome_utente, password)"
            ."VALUES ('$nome', '$cognome', '$data_nascita', '$nazione', '$email', '$nome_utente', '$password_criptata')";
    } else {
        $immagine = addslashes($_FILES["immagine"]["tmp_name"]);
        $immagine = file_get_contents($immagine);
        $immagine = base64_encode($immagine);
        $query = "INSERT INTO utenti (nome, cognome, data_nascita, nazione, email, nome_utente, password, immagine)"
            ."VALUES ('$nome', '$cognome', '$data_nascita', '$nazione', '$email', '$nome_utente', '$password_criptata', '$immagine')";
    }    
    mysqli_query($connection, $query) or die(mysqli_error($connection));
    // unlock tabelle
    $queryU = "UNLOCK TABLES";
    mysqli_query($connection, $queryU) or die (mysqli_error($connection));    
    $response[0] = 0;
}
else{
    // risposta di errore
    $response[0] = "ERROR";
}

// ritorno dati al client
$json_data = json_encode($response);
echo $json_data; 

?>