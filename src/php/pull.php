<?php

$path = "/var/www/facefilm";

if ($_SERVER['HTTP_X_GITHUB_EVENT'] == 'push') {
    echo "ciao";
    echo shell_exec("cd {$path}");
    echo shell_exec("sudo -u www-data git pull");
    //echo shell_exec("./refresh-site");    
    //echo shell_exec("cd {$path} && /usr/bin/git reset --hard origin/master && /usr/bin/git clean -f && /usr/bin/git pull 2>&1");
    echo "fine script";
}

?>