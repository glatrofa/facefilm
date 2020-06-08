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
function visualizzaCommenti(idCommento, testo, nomeUtente, data) {
    // Formato data nel db: 2020-05-09 12:17:13.00000
    data = data.substring(0, data.indexOf(".")); // Formato data in questo momento: 2020-05-09 12:17:13
    let annoMeseGiorno = data.substring(0, data.indexOf(" ")); // Formato annoMeseGiorno: AAAA-MM-GG
    let oreMinutiSecondi = data.substring(data.indexOf(" ") + 1, data.length); // Formato oreMinutiSecondi: hh:mm:ss
    //data = new Date(data * 1000);
    //let dataFormattata = data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear() + " - " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    let commento =  '<div class="row mb-2">' + 
                        '<div class="col-3 text-center">' + 
                            '<img src="https://picsum.photos/40/40" alt="Utente" class="rounded-circle" width="40px">' + 
                            '<h6>' + nomeUtente + '</h6>' + 
                        '</div>' + 
                        '<div class="col-9">' +
                            '<div class="row justify-content-between commenti">' + 
                                '<div class="text-dark">' + 
                                    '<span>' + testo + '</span>' + 
                                '</div>' + 
                                "<div class='dropdown'>" +
                                    "<button class='btn btn-link py-0' type='button' id='dropdown-commento' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                        "<i class='fa fa-ellipsis-h fa-sm awwa-secondary'></i>" +
                                    "</button>" +
                                    "<div class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdown-commento'>" +
                                        "<a class='dropdown-item' id='"+ idCommento +"-segnala' name='segnala_commento'>" + 
                                            "<i class='fas fa-frown mr-2 awwa-primary'></i>" + 
                                            "Segnala" + 
                                        "</a>" +
                                    "</div>" +
                                "</div>" +                              
                            '</div>' + 
                            '<div class="row data text-muted h7 mr-0 text-right">' + 
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