<?php

include './connessioneDatabase.php';

// esecuzione query
$query = "SELECT id, data, titolo, testo, id_serie, numero_stagione, numero_episodio, nome_utente FROM post INNER JOIN utenti ON post.email = utenti.email ORDER BY data DESC";
$response = array();
$result = mysqli_query($connection, $query) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
//$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
if($rowsNumber != 0){
    // ritorno dei dati
    $i = 0;
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $response[$i] = array('nomeUtente' => $row["nome_utente"], 'idPost' => $row["id"], 'titolo' => $row["titolo"], 'testo' => $row["testo"], 'idSerie' => $row["id_serie"], 'stagione' => $row["numero_stagione"], 'episodio' => $row["numero_episodio"]);
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