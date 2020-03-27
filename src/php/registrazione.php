<?php

include 'db-connection.php';
/*
$nome = mysqli_real_escape_string($connection, $_POST["nome"]);
$cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
$data_nascita = mysqli_real_escape_string($connection, $_POST["data_nascita"]);
$nazione = mysqli_real_escape_string($connection, $_POST["nazione"]);
$email = mysqli_real_escape_string($connection, $_POST["email"]);
$username = mysqli_real_escape_string($connection, $_POST["username"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);

/*
$query = "SELECT * FROM utenti " .
          "WHERE username = '$username' " .
          "OR email = '$email' ";
$result = mysql_query($query) or die (mysql_error());

if (mysql_num_rows($result) != 0)
{
 while ($row = mysql_fetch_array($result))
 {
  //username giÃ  presente nel db
  if ($row['username'] == $username)
  {
   echo "<p>";
   echo "L'username, <b>" . $row['username'] . "</b> Ã¨ giÃ  in uso da un altro utente, scegliere uno diverso";
   echo "</p>";
  }
  //email giÃ  presente nel db
  if ($row['username'] == $_POST['email'])
  {
   echo "<p>";
   echo "La casella E-mail, <b>" . $row['email'] . "</b> Ã¨ giÃ  presente nel Data Base, scegliere una diversa";
   echo "</p>";
  }
 }

mysql_query("SELECT * FROM $utenti WHERE email = '$email'");
//mysql_query("INSERT INTO "$utenti" (nome,cognome,data_nascita,nazione,email,username,password) VALUES ('$nome','$cognome','$data_nascita','$nazione','$email','$username','$password')";
*/

$query("INSERT INTO utenti (nome ,cognome ,data_nascita ,nazione ,email ,nome_utente ,password) VALUES ('vito','difonzo','12','12','323','323','giti','ciao')");
$result = mysqli_query($connection, $query) or die("Access failed");

?>