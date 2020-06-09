<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';

// avvio sessione
session_start();

// definizione variabili dal post
$idPost = mysqli_real_escape_string($connection, $_POST["idPost"]);

// esecuzione query
$query = "SELECT commenti.id, commenti.testo, commenti.data, utenti.nome_utente FROM commenti INNER JOIN utenti ON commenti.id_utente = utenti.email WHERE id_post = '" . $idPost . "'";
$response = array();
$result = mysqli_query($connection, $query) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
if($rowsNumber != 0){
    // ritorno dei dati
    $i = 0;
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $response[$i] =   array('id' => $row["id"],
                                'testo' => $row["testo"], 
                                'data' => $row["data"], 
                                'nomeUtente' => $row["nome_utente"],
                                );
        $i ++;
    }    
}
else{
    $response[0] = null;
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>