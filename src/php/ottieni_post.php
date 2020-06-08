<?php
// importa variabile $connection per la connessione al db
include './connessione_database.php';
// inizalizza la varibaile profilo a false
$profilo = false;

// recupero pagina
$pagina = mysqli_real_escape_string($connection, $_POST["pagina"]);
if (isset($_POST["profilo"])) {
    $profilo = mysqli_real_escape_string($connection, $_POST["profilo"]);
}
// imposto il numero di post da visualizzare volta per volta
$postPerPagina = 4;

if($profilo){
    // query per la visualizzazione dei post più recenti del singolo utente nella pagina profilo
    session_start();
    $query =   "SELECT idPost, numeroCommenti, UNIX_TIMESTAMP(data) AS data, titolo, testo, id_serie, numero_stagione, numero_episodio, piace, dislike, utenti.nome_utente, immagine ". 
                "FROM utenti INNER JOIN (SELECT post.id AS idPost, COUNT(commenti.id) AS numeroCommenti, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, post.email, post.piace, post.dislike ".
                                        "FROM post LEFT JOIN commenti ON post.id = commenti.id_post ".
                                        "GROUP BY idPost) AS x ".
                                        "ON x.email = utenti.email ".
                "WHERE utenti.email = '". $_SESSION["email"] ."' ".
                "ORDER BY data DESC ".
                "LIMIT ". $pagina .", ". $postPerPagina;
}
else
    // query per la visualizzazione dei post più recenti pubblicati
    $query =   "SELECT idPost, numeroCommenti, UNIX_TIMESTAMP(data) AS data, titolo, testo, id_serie, numero_stagione, numero_episodio, piace, dislike, utenti.nome_utente, immagine ".
                "FROM utenti INNER JOIN (SELECT post.id AS idPost, COUNT(commenti.id) AS numeroCommenti, post.data, post.titolo, post.testo, post.id_serie, post.numero_stagione, post.numero_episodio, post.email, post.piace, post.dislike ".
                                        "FROM post LEFT JOIN commenti ON post.id = commenti.id_post ".
                                        "GROUP BY idPost) AS x ".
                                        "ON x.email = utenti.email ".
                "ORDER BY data DESC ".
                "LIMIT ".$pagina.", ".$postPerPagina;

$queryEscaped = mysqli_real_escape_string($connection, $query) ;
$response = array();

$result = mysqli_query($connection, $query) or die($response[0] = mysqli_error($connection));
$rowsNumber = mysqli_num_rows($result);
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
    $response[0] = null;
}

// ritorno dati al client
$jsonData = json_encode($response);
echo $jsonData;

?>