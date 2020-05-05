// controlla id parametro con l'id del cookie PHPSESSID
function CheckID(id) {
    if(document.cookie.split(';').some((item) => item.includes('PHPSESSID='+id+'')))
        return true;
    else{
        window.location.href = 'http://awwa.sytes.net/html/login.html';
        return false;
    }
}

// verifica che l'utente abbia effettuato l'accesso
function Logged() {
    $.ajax({
        type: 'POST',
        url: 'http://awwa.sytes.net/php/autenticazione.php',
        crossOrigin: true,
        dataType: 'text',
        success: function (data) {            
            if(data == null){
                console.log('data null');
                window.location.href = 'http://awwa.sytes.net/html/login.html';                
            }
            else{
                CheckID(data);
            }
        },
        error: function () {
            console.log('ajax error');
            window.location.href = 'http://awwa.sytes.net/html/login.html';            
        }
      });
}

export { CheckID, Logged };