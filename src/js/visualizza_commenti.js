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

function visualizzaCommenti(data, testo, nomeUtente) {
    data = data.substring(0, data.indexOf("."));
    data = new Date(data * 1000);
    let dataFormattata = data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear() + " - " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    let commento = "<div><p>"+ nomeUtente +"</p><p>"+ testo +"</p><p>"+ dataFormattata +"</p></div>";
    return commento;
}

export { visualizzaModalCommento, visualizzaCommenti };