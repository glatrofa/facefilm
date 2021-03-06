import { APIKEY } from './key.js';

// genera l'header del post
function generaHeader(nomeUtente, idPost, immagine) {
    let pathImmagine;
    if(immagine == null)
        pathImmagine = "http://awwa.sytes.net/img/profile_clip_art.png";
        //pathImmagine = "http://127.0.0.1:8080/edsa-AWWA/src/img/profile_clip_art.png"; // per la prova in locale
    else
        pathImmagine = "data:image;base64,'"+ immagine +"'";
    let header = "<div class='card shadow mb-3'><div class='card-header'>" +
                    "<div class='d-flex justify-content-between align-items-center'>" +
                        "<div class='d-flex justify-content-between align-items-center'>" +
                            "<div class='mr-2'>" +
                                "<img class='rounded-circle' width='45' src='"+ pathImmagine +"'>" +
                            "</div>" +
                            "<div class='ml-2'>" +
                                "<div class='h5 m-0' id='nome_utente' name='"+ idPost +"'>"+ nomeUtente +"</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='dropdown'>" +
                            "<button class='btn btn-link' type='button' id='dropdown-post' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                "<i class='fa fa-ellipsis-h awwa-secondary'></i>" +
                            "</button>" +
                            "<div class='dropdown-menu dropdown-menu-right' aria-labelledby='dropdown-post'>" +
                                "<a class='dropdown-item' id='"+ idPost +"-segnala' name='segnala'><i class='fas fa-frown mr-2 awwa-primary'></i>Segnala</a>" +
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
    let dataFormattata = data.getDay() + "/" + data.getMonth() + "/" + data.getFullYear() + " - " + data.getHours() + ":" + data.getMinutes(); // + ":" + data.getSeconds();
    let body = "<div class='card-body'>" +
                    "<div class='text-muted h7 mb-2'> <i class='fa fa-clock-o'></i> "+ dataFormattata +"</div>" +
                    "<a class='card-link'>" +
                        "<h5 class='card-title'>"+ titolo +"</h5>" +
                    "</a>" +
                    "<p class='card-text'>"+ testo +"</p>" +
                    "<div>" +
                        "<a href='./html/serie_tv.html?id="+ idSerie +"' id='link_"+ idSerie +"' title='Vai alla pagina della serie'>" + 
                            "<span class='badge text-white bg-awwa-secondary mr-1' id='nome_serie_"+ idSerie +"'></span>" +
                        "</a>" +
                        "<span class='badge text-white bg-awwa-secondary mr-1'>S "+ stagione +"</span>" +
                        "<span class='badge text-white bg-awwa-secondary'>Ep "+ episodio +"</span>" +
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
    let footer = "<div class='card-footer d-flex align-items-center'>" +
                    // ricordardi di un-commentare l'attributo style dei link
                    "<span class='badge badge-pill text-white bg-awwa-primary mr-1' id='"+ idPost +"-post_like_number'>"+ numeroLike +"</span><a class='card-link awwa-primary mr-3' id='"+ idPost +"' name='post_like'><i class='far fa-gem'></i> Mi piace </a>" +
                    "<span class='badge badge-pill text-white bg-awwa-primary mr-1' id='"+ idPost +"-post_dislike_number'>"+ numeroDislike +"</span><a class='card-link awwa-primary mr-3' id='"+ idPost +"' name='post_dislike'><i class='fas fa-poo'></i> Non mi piace </a>" +
                    "<span class='badge badge-pill text-white bg-awwa-primary mr-1' id='"+ idPost +"-post_comment_number'>"+ numeroCommenti +"</span><a class='card-link awwa-primary mr-3' id='"+ idPost +"' name='post_comment'><i class='fas fa-comments'></i> Commenta</a>" +
                "</div></div>";                
    return footer;
}

export { generaHeader, generaBody, generaFooter };