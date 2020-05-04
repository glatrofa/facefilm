<?php

if ( $_POST['payload'] ) {
    shell_exec( ‘cd /var/www/drupalsites/git-repo/ && git reset –hard HEAD && git pull’ );
}

?>hi