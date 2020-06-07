import { checkID } from './autenticazione.js';

// verifica le credenziali di accesso dell'utente
$(function login() {
    $('#form_login').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '../php/login.php',
        crossOrigin: true,
        data: $(this).serialize(),
        dataType: 'json',
        success: function (data) {            
            if(data[0].email != null && data[0].email != 1){  
              //console.log('SUCCESS '+data[0].email+' '+data[0].nome_utente+' '+data[1]);
              if(data[1] != null)
                //console.log(checkID(data[1]));
                checkID(data[1])
              window.location.href = '../home.html';
            }
            else{
              if(data[0].email == 1){
                $('#modal_login').modal('show');
              }
              else{
                $('#modal_login_null').modal('show');
              } 
            }          
        },
        error: function (data) {
          //console.log('ERROR '+data[0]);
          $('#modal_login_error').modal('show');
        }
      });
    });
});

/* Funzione mostra password (icona eye): 
mostra la password per 0.5 secondi */
$('#toggle_password').on('click',function mostraPassword(){
  //console.log($('#password').prop('type'));
  $('#password').prop('type','text');
  //console.log($('#password').prop('type'));
  setTimeout(function(){
    $('#password').prop('type','password');
    //console.log($('#password').prop('type'));
  }, 500);
})