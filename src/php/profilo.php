<?php

include './connessione_database.php';
// recupero identificativo dell'utente loggato
$email = mysqli_real_escape_string($connection, $_SESSION["email"]);
// definizione query recupero informazioni utente        
$query = "SELECT nome, cognome, data_nascita, nazione, nome_utente, immagine ".
                "FROM utenti ".
                "WHERE email = '".$email."'";
// definizione query sicure
//$queryPostEscaped = mysqli_real_escape_string($connection, $queryPost);
$queryEscaped = mysqli_real_escape_string($connection, $query);
// esecuzione query
$result = mysqli_query($connection, $queryEscaped) or die($response = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
if($rowsNumber != 0){
    // ritorno dei dati
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $response = array(  'nomeUtente' => $row["nome_utente"],
                    'nome' => $row["nome"],
                    'cognome' => $row["cognome"],
                    'data_nascita' => $row["data_nascita"],
                    'nazione' => $row["nazione"],
                    'immagine' => $row["immagine"]
                );
}
else{
    $response = "no rows";
}

// recupero pagina
//$pagina = mysqli_real_escape_string($connection, $_POST["pagina"]);
// imposto il numero di post da visualizzare volta per volta
//$postPerPagina = 2;
/*
// definizione query recupero post dell'utente
$queryPost = "SELECT idPost, numeroCommenti, UNIX_TIMESTAMP(data) AS data, titolo, testo, id_serie, numero_stagione, numero_episodio, piace, dislike, utenti.nome_utente, immagine ". 
            "FROM utenti INNER JOIN (SELECT post.id AS idPost, COUNT(commenti.id) AS numeroCommenti, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, post.email, post.piace, post.dislike ".
                                    "FROM post LEFT JOIN commenti ON post.id = commenti.id_post ".
                                    "GROUP BY idPost) AS x ON x.email = utenti.email ".
            "WHERE email = " . $email . " ".
            "ORDER BY data DESC ".
            "LIMIT " . $pagina . ", " . $postPerPagina;
            */


//$response = array();
// esecuzione query utente

                    /*
// esecuzione query post                    
$result = mysqli_query($connection, $queryPostEscaped) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);

if($rowsNumber != 0){
    // ritorno dei dati
    $i = 1;
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $response[$i] = array(  'nomeUtente' => $row["nome_utente"], 
                                'idPost' => $row["idPost"], 
                                'titolo' => $row["titolo"], 
                                'testo' => $row["testo"], 
                                'idSerie' => $row["id_serie"], 
                                'stagione' => $row["numero_stagione"], 
                                'episodio' => $row["numero_episodio"], 
                                'numeroCommenti' => $row["numeroCommenti"], 
                                'like' => $row["piace"], 
                                'dislike' => $row["dislike"], 
                                'data' => $row["data"], 
                                'immagine' => $row["immagine"]
                            );
        $i ++;
    }       
}
else{
    $response[0] = null;
}
*/

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>