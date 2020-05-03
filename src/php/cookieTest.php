<html>
<body>

<?php
include 'autenticazione.php';
$email = "test@test.it";
creaCookie($email);
echo $_COOKIE[$email];
echo "sotto cookie";
/*
$key = creaCookie($email);
echo $key;
$_COOKIE[$email];
*/
?>

</body>
</html>