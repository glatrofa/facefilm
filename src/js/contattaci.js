import { snackbarSuccesso, snackbarErrore } from './visualizza_snackbar.js';

// invio della mail contenente i dati inseriti nel form contatti
$(function contattaci() {
    $('#form_contattaci').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '../php/contattaci.php',
        crossOrigin: true,
        data: $(this).serialize(),
        dataType: 'json',
        success: function (data) {
            console.log('SUCCESS \n'+ JSON.stringify(data,null,2));
            if (data) {
                snackbarSuccesso("Grazie per averci contattato! Verrai subito reindirizzato alla home.");
                setTimeout(function(){
                  location.href='../home.html';
                }, 3000);       
            }
            else {
                snackbarErrore("Si &egrave; verificato un errore");
            }        
        },
        error: function (data) {
            console.log('ERROR \n'+ JSON.stringify(data,null,2));
            snackbarErrore("Si &egrave; verificato un errore");
        }
      });
    });
});