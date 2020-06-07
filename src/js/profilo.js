import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
import { generaHeader, generaBody, generaFooter } from './genera_post.js';

// verifica che l'utente abbia effettuato l'accesso
 window.onload = logged();

$(document).ready(function() {
  mostraDatiUtente();
  mostraPostUtente();
  scrollHandler();
});

function mostraDatiUtente() {
  $.ajax({
    type: 'POST',
    url: '../php/profilo.php',
    crossOrigin: true,
    dataType: 'json',
    success: function (data) {
      console.log('SUCCESS '+ data);
    },
    error: function (data) {
      console.log('ERROR '+ data);
      snackbarErrore("Si &egrave; verificato un errore");
    }
  });
}

function mostraPostUtente() {
    
}

function scrollHandler(){
    // Quando si preme il bottone "Torna su" viene attivata questa funzione
    document.getElementById("scroll_to_top").addEventListener('click',function tornaSu(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    });  
    window.onscroll = function() {
        if (document.documentElement.scrollTop > 600 ) {
            document.getElementById("scroll_to_top").style.display = "block";
          } else {
            document.getElementById("scroll_to_top").style.display = "none";
          }
        };
}

