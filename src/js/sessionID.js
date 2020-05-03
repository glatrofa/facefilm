// controlla id parametro con l'id del cookie PHPSESSID
function checkID(id) {
    if(document.cookie.split(';').some((item) => item.includes('PHPSESSID='+id+''))){
        return true;
        console.log('gli id corrispondono');
    }
    else{
        window.location.href = 'http://awwa.sytes.net/html/login.html';
        return false;
    }
}

export { checkID };