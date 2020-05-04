<?php

if ( $_POST['payload'] ) {
    shell_exec( ‘cd ~ && ./refresh-site’ );
}

?>hi