// durata della visualizzazione della snackbar
let durata = 2500;

// visualizza snackbar per evento con successo
function snackbarSuccesso(stringa) {
    // aggiunge il testo alla snackbar
    document.getElementById("snackbar_successo").innerHTML = stringa;
    // aggiunge la classe show alla snackbar
    document.getElementById("snackbar_successo").classList.add("show");
    // dopo un certo numero di millisecondi, rimuove la classe show dal DIV
    setTimeout(function(){ document.getElementById("snackbar_successo").classList.remove("show"); }, durata);
}

// visualizza snackbar per evento con errore
function snackbarErrore(stringa) {
    // aggiunge il testo alla snackbar
    document.getElementById("snackbar_errore").innerHTML = stringa;
    // aggiunge la classe show alla snackbar
    document.getElementById("snackbar_errore").classList.add("show");
    // dopo un certo numero di millisecondi, rimuove la classe show dal DIV
    setTimeout(function(){ document.getElementById("snackbar_successo").classList.remove("show"); }, durata);
}

export { snackbarSuccesso, snackbarErrore };