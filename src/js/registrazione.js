$(function signup() {
    $('#form-signup').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '../php/registrazione.php',
        crossOrigin: true,
        data: $(this).serialize(),
        dataType: 'json',
        success: function () {
          alert('Registrazione avvenuta con successo.');
          window.location.href = '../home.html';
        },
        error: function () {
          $('#modal-registrazione-error').modal('show');
        }
      });
    });
});

// dichiarare come stringhe i modal html
// document.getElementById('modal-login').innerHTML = modalLoginString;