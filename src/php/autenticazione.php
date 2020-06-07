<?php

// ritorno dell'id sessione se presente
if(session_id() != "")
    echo session_id();
else
    echo null;

?>