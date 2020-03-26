<?php

include 'db-info.php';

$username = mysqli_real_escape_string($connection, $_POST["username"]);
$password = mysqli_real_escape_string($connection, $_POST["password"]);
$password_criptata = md5($password);

$query = "SELECT username, email FROM user WHERE username = '".$username."' AND password = '".$password_criptata."'";
$result = mysqli_query($connection, $query) or die("Access failed");
$rowsNumber = mysqli_num_rows($result);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$response = array();
if($rowsNumber != 0){
    $response[0] = array('username' => $row["username"], 'email' => $row["email"]);  
}
else{
    $response[0] = array('username' => null, 'email' => null);
}
$json_data = json_encode($response);
echo $json_data;

?>