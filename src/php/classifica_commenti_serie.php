<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';

// avvio sessione
session_start();

// esecuzione query
$query = "SELECT id_serie, COUNT(id) AS numero FROM post GROUP BY id_serie ORDER BY numero DESC LIMIT 10";
$response = array();
$result = mysqli_query($connection, $query) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
if($rowsNumber != 0){
    // ritorno dei dati
    $i = 0;
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $response[$i] = array('idSerie' => $row["id_serie"], 'numero' => $row["numero"]);
        $i ++;
    }    
}
else{
    $response[0] = "nessun risultato";
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>