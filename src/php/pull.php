<?php

if ($_SERVER['HTTP_X_GITHUB_EVENT'] == 'push') {
    echo "ciao";
    echo shell_exec("cd ~");
    echo shell_exec("./refresh-site");    
    echo "fine script";
}

?>