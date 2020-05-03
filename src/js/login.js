$(function showUserInfo() {
    $('#form-login').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '../php/login.php',
        crossOrigin: true,
        data: $(this).serialize(),
        dataType: 'json',
        success: function (data) {            
            if(data[0].email != null && data[0].email != 1){  
              console.log('SUCCESS '+data[0].email+' '+data[0].nome_utente+' '+data[1]);
              document.cookie = 'token='+data[1]+'; domain=awwa.sytes.net';
              console.log('cookie: '+document.cookie);
              /*
              setTimeout(function () {
                window.location.href = '../home.html';
              }, 0);
              */
            }
            else{
              if(data[0].email == 1){
                $('#modal-login').modal('show');
              }
              else{
                $('#modal-login-null').modal('show');
              } 
            }          
        },
        error: function (data) {
          //console.log('ERROR '+data[0]);
          $('#modal-login-error').modal('show');
        }
      });
    });
});

// dichiarare come stringhe i modal html
// document.getElementById('modal-login').innerHTML = modalLoginString;