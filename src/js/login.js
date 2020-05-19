import { checkID } from './autenticazione.js';

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

// dichiarare come stringhe i modal html
// document.getElementById('modal-login').innerHTML = modalLoginString;

$('#toggle_password').on('click',function(){
  console.log('click ricevuto');
  $('#password').type = 'text';
  setTimeout(function nascondiNuovamente(){
    $('#password').type = 'password';
    console.log($('#password'));
  },1000);
})