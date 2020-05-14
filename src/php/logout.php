<?php

// richiamo sessione
session_start();
// distruzione sessione
session_unset();
session_destroy();
echo "sessione distrutta";

?>