<?php

include './connessioneDatabase.php';
/*$connection = mysqli_connect("localhost", "root", "", "awwa");
if(mysqli_connect_errno()){
    exit("Database Connection Failed. Reason: ". mysqli_connect_error());
} */

// recupero pagina
$pagina = mysqli_real_escape_string($connection, $_POST["pagina"]);
// imposto il numero di post da visualizzare volta per volta
$postPerPagina = 2;

// esecuzione query
// SELECT post.id, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, utenti.nome_utente, COUNT(commenti.id) AS numero_commenti FROM utenti INNER JOIN (post LEFT JOIN commenti ON post.id = commenti.id_post) ON post.email = utenti.email ORDER BY data DESC
// SELECT idPost, data, titolo, testo, id_serie, numero_stagione, numero_episodio, utenti.nome_utente FROM utenti INNER JOIN (SELECT DISTINCT(post.id) AS idPost, COUNT(commenti.id) AS numero_commenti, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, post.email FROM post LEFT JOIN commenti ON post.id = commenti.id_post) AS x ON x.email = utenti.email ORDER BY data DESC
$query =   "SELECT idPost, numeroCommenti, UNIX_TIMESTAMP(data) AS data, titolo, testo, id_serie, numero_stagione, numero_episodio, piace, dislike, utenti.nome_utente, immagine 
            FROM utenti INNER JOIN (SELECT post.id AS idPost, COUNT(commenti.id) AS numeroCommenti, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, post.email, post.piace, post.dislike 
                                    FROM post LEFT JOIN commenti 
                                    ON post.id = commenti.id_post 
                                    GROUP BY idPost) AS x 
            ON x.email = utenti.email 
            ORDER BY data DESC 
            LIMIT ".$pagina.", ".$postPerPagina."";
$query_escaped = mysqli_real_escape_string($connection, $query) ;
$response = array();
//$response = array('nomeUtente' => "pep", 'idPost' => "22", 'titolo' => "Belo", 'testo' => "superbelo", 'idSerie' => "10721", 'stagione' => "2", 'episodio' => "2", 'numeroCommenti' => "3", 'like' => "4", 'dislike' => "5", 'data' => "1589462020.37589", 'immagine' => "null");

$result = mysqli_query($connection, $query_escaped) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
//$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
if($rowsNumber != 0){
    // ritorno dei dati
    $i = 0;
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
    $response[1] = null;
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>