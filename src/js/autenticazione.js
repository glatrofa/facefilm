// controlla id parametro con l'id del cookie PHPSESSID
function checkID(id) {
    // controlla l'esistenza del cookie
    if(document.cookie.split(';').some((item) => item.includes('PHPSESSID='+id+'')))
        return true;
    else{
        window.location.href = 'http://awwa.sytes.net/html/login.html';
        //window.location.href = 'http://127.0.0.1:8080/edsa-AWWA/src/html/login.html'; // per la prova in locale
        return false;
    }
}

// verifica che l'utente abbia effettuato l'accesso
function logged() {
    $.ajax({
        type: 'POST',
        url: 'http://awwa.sytes.net/php/autenticazione.php',
        //url: 'http://127.0.0.1:8080/edsa-AWWA/src/php/autenticazione.php', // per la prova in locale
        crossOrigin: true,
        dataType: 'text',
        success: function (data) {            
            if(data == null){
                console.log('data null');
                window.location.href = 'http://awwa.sytes.net/html/login.html';
                //window.location.href = 'http://127.0.0.1:8080/edsa-AWWA/src/html/login.html'; //per la prova in locale
            }
            else{
                checkID(data);
            }
        },
        error: function () {
            console.log('ajax error');
            window.location.href = 'http://awwa.sytes.net/html/login.html';
            //window.location.href = 'http://127.0.0.1:8080/edsa-AWWA/src/html/login.html'; // per la prova in locale
        }
      });
}

export { checkID, logged };