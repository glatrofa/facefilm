<html>
<body>

<?php
include 'autenticazione.php';
$email = "test@test.it";
$token = creaToken();
setcookie($email, $token, time() + 3600, "../");
echo $_COOKIE[$email];
/*
$key = creaCookie($email);
echo $key;
$_COOKIE[$email];
*/
?>

</body>
</html>