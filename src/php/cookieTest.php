<?php
setcookie("test_cookie", "test", time() + 3600, '/');
setcookie("email", "chiave segreta", time() + 3600, '/');
?>
<html>
<body>

<?php
if(count($_COOKIE) > 0) {
    echo "Cookies are enabled.";
    echo $_COOKIE["test_cookie"];
    echo $_COOKIE["email"];
} else {
    echo "Cookies are disabled.";
}
?>

</body>
</html>