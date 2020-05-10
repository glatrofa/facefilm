import { APIKEY } from './key.js';

// genera l'header del post
function generaHeader(nomeUtente, idPost) {
    let header = "<div class='card shadow mb-3'><div class='card-header'>" +
                    "<div class='d-flex justify-content-between align-items-center'>" +
                        "<div class='d-flex justify-content-between align-items-center'>" +
                            "<div class='mr-2'>" +
                                "<img class='rounded-circle' width='45' src='https://picsum.photos/50/50'>" +
                            "</div>" +
                            "<div class='ml-2'>" +
                                "<div class='h5 m-0' id='nome_utente' name='"+ idPost +"'>"+ nomeUtente +"</div>" +
                            "</div>" +
                        "</div>" +
                        "<div>" +
                            "<div class='dropdown'>" +
                                "<button class='btn btn-link dropdown-toggle' type='button' id='gedf-drop1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                    "<i class='fa fa-ellipsis-h'></i>" +
                                "</button>" +
                                "<div class='dropdown-menu dropdown-menu-right' aria-labelledby='gedf-drop1'>" +
                                    "<div class='h6 dropdown-header'>Opzioni</div>" +
                                    "<a class='dropdown-item' href='#'>Segnala</a>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
    return header;
}

// genera il body del post
function generaBody(data, titolo, testo, idSerie, stagione, episodio) {
    //console.log('vecchia data ', data);
    data = data.substring(0, data.indexOf("."));
    //console.log('data fomatatta', data);
    data = new Date(data * 1000);
    //console.log('nuova data ', data.getDay() + '/' + data.getMonth() + '/' + data.getFullYear() + ' - ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds());
    let dataFormattata = data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear() + " - " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    let body = "<div class='card-body'>" +
                    "<div class='text-muted h7 mb-2'> <i class='fa fa-clock-o'></i> "+ dataFormattata +"</div>" +
                    "<a class='card-link'>" +
                        "<h5 class='card-title'>"+ titolo +"</h5>" +
                    "</a>" +
                    "<p class='card-text'>"+ testo +"</p>" +
                    "<div>" +
                        "<span class='badge badge-primary btn gold-style' id='nome_serie_"+ idSerie +"'></span>" +
                        "<span class='badge badge-primary btn gold-style'>S "+ stagione +"</span>" +
                        "<span class='badge badge-primary btn gold-style'>Ep "+ episodio +"</span>" +
                    "</div>" +
                "</div>";
    return body;    
}

// ritorna il nome della serie in base all'id della serie presente nel post
function getNomeSerie(idSerie) {
    let url = 'https://api.themoviedb.org/3/tv/'+ idSerie +'?api_key='+ APIKEY +'&language=it';
    fetch(url)
            .then(res => res.json())
            .then((data) => {
                //console.log('nome serie', data.name);
                //nomeSerie = data.name;
                document.getElementById("nome_serie_"+ idSerie).innerHTML = data.name;
                //console.log('tipo ',typeof(data.name));
            })
            .catch(err => { throw err });    
}

// genera il footer del post
function generaFooter(idPost, idSerie, numeroLike, numeroDislike, numeroCommenti) {
    getNomeSerie(idSerie);
    let footer = "<div class='card-footer'>" +
                    "<span class='badge badge-pill bg-awwa-primary mr-2' id='"+ idPost +"-post_like_number'>"+ numeroLike +"</span><a class='card-link awwa-primary post' id='"+ idPost +"' name='post_like' data-toggle='modal' href=''><i class='fa fa-diamond'></i> Mi piace </a>" +
                    "<span class='badge badge-pill bg-awwa-primary mr-2' id='"+ idPost +"-post_dislike_number'>"+ numeroDislike +"</span><a class='card-link awwa-primary post' id='"+ idPost +"' name='post_dislike' data-toggle='modal' href=''><i class='fa fa-diamond'></i> Non mi piace </a>" +
                    "<span class='badge badge-pill bg-awwa-primary mr-2' id='"+ idPost +"-post_comment_number'>"+ numeroCommenti +"</span><a class='card-link awwa-primary post' id='"+ idPost +"' name='post_comment' data-toggle='modal' href=''><i class='fa fa-diamond'></i> Commenta </a>" +
                "</div></div>";                
    return footer;
}

export { generaHeader, generaBody, generaFooter };