<?php

if ($_SERVER['HTTP_X_GITHUB_EVENT'] == 'push') {
    echo "ciao";
    shell_exec("cd ~" && "./refresh-site");
    //shell_exec("./refresh-site");    
}

?>