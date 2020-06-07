<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';
// avvio sessione
session_start();

// recupero identificativo dell'utente loggato
$email = mysqli_real_escape_string($connection, $_SESSION["email"]);
// definizione query recupero informazioni utente        
$query = "SELECT nome_utente, nome, cognome, data_nascita, nazione, immagine FROM utenti WHERE email = '". $email ."'";
$queryEscaped = mysqli_real_escape_string($connection, $query);
// esecuzione query
$result = mysqli_query($connection, $queryEscaped) or die($response = mysqli_error($connection));
// ritorno dei dati
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array(  'nomeUtente' => $row["nome_utente"],
                    'nome' => $row["nome"],
                    'cognome' => $row["cognome"],
                    'data_nascita' => $row["data_nascita"],
                    'nazione' => $row["nazione"],
                    'immagine' => $row["immagine"],
                    'email' => $email
            );

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>