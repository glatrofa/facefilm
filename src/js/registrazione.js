$(function Registrazione() {
    $('#form-registrazione').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '../php/registrazione.php',
        crossOrigin: true,
        data: $(this).serialize(),
        dataType: 'json',
        success: function (data) {
          console.log(data[0]);
          switch (data[0]) {
            case 0:
              document.getElementById('modal-registrazione-success').innerHTML = modalRegistrazioneSuccess;
              $('#modal-registrazione-success').modal('show');              
              break;
            case 1:
              $('#modal-registrazione-email').modal('show');              
              break;
            case 2:
              $('#modal-registrazione-username').modal('show');
              break;
            default:
              $('#modal-registrazione-error').modal('show');
          }          
        },
        error: function (data) {
          console.log(data[0]);
          $('#modal-registrazione-error').modal('show');
        }
      });
    });
});

function RedirectRegistrazioneSuccess() {
  location.href='./login.html';
}

// dichiarazione stringhe modal
let modalRegistrazioneSuccess = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Registrazione effettuata</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Grazie per esserti registrato.<br>Puoi procedere al login.</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' onclick='RedirectRegistrazioneSuccess()'>Vai a login</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div></div>";