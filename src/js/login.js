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
              console.log('SUCCESS '+data[0].email+' '+data[0].nome_utente);
              /*            
              setTimeout(function () {
                window.location.href = ".";
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
          /*
          alert('Error');
          let string = '<div class="alert alert-danger" role="alert">'+'<h3>An error has occurred</h3>'+'</div>';
          document.getElementById('user-info').innerHTML = string;
          */
        }
      });
    });
});

/*
$(function c() {
    $('#form-login').on('submit', function a() {
        alert('ciao');
        console.log('ciao');
    });
});
*/