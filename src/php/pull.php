<?php

$path = "/var/www/facefilm";

if ($_SERVER['HTTP_X_GITHUB_EVENT'] == 'push') {
    echo shell_exec("cd {$path}");
    echo shell_exec("sudo -u www-data git pull");
}

?>