import { Logged } from './autenticazione.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onload = Logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    StampaInformazioniSerie();
});

function StampaInformazioniSerie() {
    let id = GetUrlParam(id, null);
    console.log(id);
}

function GetUrlParam(parameter, defaultvalue){
    let urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}