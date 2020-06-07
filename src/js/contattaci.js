// dichiarazione stringhe modal
const modalContattaciSuccess = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Email inviata</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Grazie per averci contatto.</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' id='redirectContattaciSuccess'>Torna alla home</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div>";
const modalContattaciError = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Si &egrave; verificato un errore</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Ci scusiamo per il disagio.</p></div><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div>";

// funzione per la memorizzazione del messaggio
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
                document.getElementById('modal-contattaci-success').innerHTML = modalContattaciSuccess;
                $('#modal-contattaci-success').modal('show');
                ("#redirectContattaciSuccess").click(function (){
                  location.href='../home.html';
                });
            }
            else {
                document.getElementById('modal-contattaci-error').innerHTML = modalContattaciError;
                $('#modal-contattaci-error').modal('show');
            }        
        },
        error: function (data) {
            console.log('ERROR \n'+ JSON.stringify(data,null,2));
            document.getElementById('modal-contattaci-error').innerHTML = modalContattaciError;
            $('#modal-contattaci-error').modal('show');
        }
      });
    });
});