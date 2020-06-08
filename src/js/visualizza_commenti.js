/*
function visualizzaModalCommento(idPost) {
    let modal = "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<h5 class='modal-title'>Commenti</h5>" +
                        "<button type='button' class='btn btn-primary'><i class='fa fa-plus-circle'></i></button>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                    "</div>" +
                    "<div class='modal-body' id='"+ idPost +"-modal_commenti_container'></div>" +
                    "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" +
                    "</div>" +
                "</div>";
    return modal;
}
*/

// funzione per la generazione dei commenti nel modal
function visualizzaCommenti(testo, nomeUtente, data) {
    // Formato data nel db: 2020-05-09 12:17:13.00000
    data = data.substring(0, data.indexOf(".")); // Formato data in questo momento: 2020-05-09 12:17:13
    let annoMeseGiorno = data.substring(0, data.indexOf(" ")); // Formato annoMeseGiorno: AAAA-MM-GG
    let oreMinutiSecondi = data.substring(data.indexOf(" ") + 1, data.length); // Formato oreMinutiSecondi: hh:mm:ss
    //data = new Date(data * 1000);
    //let dataFormattata = data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear() + " - " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    let commento =  '<div class="row">' + 
                        '<div class="col-2">' + 
                            '<img src="https://picsum.photos/40/40" alt="Utente" class="rounded-circle" width="40px">' + 
                            '<h6>' + nomeUtente + '</h6>' + 
                        '</div>' + 
                        '<div class="col-10">' +
                            '<div class="row commenti">' + 
                            testo +                          
                            '</div>' + 
                            '<div class="row data">' + 
                                dataEuropea(annoMeseGiorno) + '&nbsp;-&nbsp;' + oreMinutiSecondi + 
                            '</div>' + 
                        '</div>' + 
                    '</div>';
    return commento;
}

// Funzione che formatta le date in formato europeo
function dataEuropea(data) {
    let giorno = data.substring(8);
    let mese = data.substring(5,7);
    let anno = data.substring(0,4);
    return data = giorno + '/' + mese + '/' + anno;
}


export { visualizzaCommenti };