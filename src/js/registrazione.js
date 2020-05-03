$(function signup() {
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
              alert('Registrazione avvenuta con successo.');
              window.location.href = '../home.html';
              break;
            case 1:
              $('#modal-registrazione-username').modal('show');
              break;
            case 2:
              $('#modal-registrazione-email').modal('show');
              break;
            default:
              $('#modal-registrazione-error').modal('show');
          }          
        },
        error: function () {
          console.log(data[0]);
          $('#modal-registrazione-error').modal('show');
        }
      });
    });
});

// dichiarare come stringhe i modal html
// document.getElementById('modal-login').innerHTML = modalLoginString;