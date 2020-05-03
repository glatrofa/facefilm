<?php

function creaToken() {
    $time = time();
    return md5($time);
}

function creaCookie($email) {
    $token = creaToken();
    // crea un cookie della durata di 1 giorno (86400 * 30) o 1 ora (3600)
    setcookie($email, $token, time() + 3600, "../");
    return $token;
}

function eliminaCookie($email) {
    $token = $_COOKIE[$email];
    setcookie($email, $token, time() - 3600, "/");
}

function confrontaCookie($email) {
    if($_POST["key"] == $_COOKIE[$email]){
        creaCookie($email);        
    }
    else{
        header('Location: ../html/login.html');
    }
}

?>