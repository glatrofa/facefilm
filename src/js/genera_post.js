const { APIKEY } = require("./key");

// genera l'header del post
function generaHeader(nomeUtente, idPost) {
    let header = '<div class="card-header">' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                            '<div class="mr-2">' +
                                '<img class="rounded-circle" width="45" src="https://picsum.photos/50/50">' +
                            '</div>' +
                            '<div class="ml-2">' +
                                '<div class="h5 m-0" id="nome_utente" name="'+ idPost +'">'+ nomeUtente +'</div>' +
                            '</div>' +
                        '</div>' +
                        '<div>' +
                            '<div class="dropdown">' +
                                '<button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<i class="fa fa-ellipsis-h"></i>' +
                                '</button>' +
                                '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">' +
                                    '<div class="h6 dropdown-header">Opzioni</div>' +
                                    '<a class="dropdown-item" href="#">Segnala</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    return header
}

// genera il body del post
function generaBody(data, titolo, testo, idSerie, stagione, episodio) {
    let url = 'https://api.themoviedb.org/3/tv/'+ idSerie +'?api_key='+ APIKEY +'&language=it';
    let nomeSerie = null;
    fetch(url)
            .then(res => res.json())
            .then((data) => {
                nomeSerie = data.name;
            })
            .catch(err => { throw err });
    let body = '<div class="card-body">' +
                    '<div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> '+ data +'</div>' +
                    '<a class="card-link">' +
                        '<h5 class="card-title">'+ titolo +'</h5>' +
                    '</a>' +
                    '<p class="card-text">'+ testo +'</p>' +
                    '<div>' +
                        '<span class="badge badge-primary btn gold-style">'+ nomeSerie +'</span>' +
                        '<span class="badge badge-primary btn gold-style">S '+ stagione +'</span>' +
                        '<span class="badge badge-primary btn gold-style">Ep '+ episodio +'</span>' +
                    '</div>' +
                '</div>';
    return body;
}

// genera il footer del post
function generaFooter(numeroLike, numeroDislike, nuumeroCommenti) {
    let footer = '<div class="card-footer">' +
                    '<a class="card-link text-gold post" id="post_like" data-toggle="modal" href=""><i class="fa fa-thumbs-up"></i> Mi piace <span class="badge badge-primary">'+ numeroLike +'</span></a>' +
                    '<a class="card-link text-gold post" id="post_dislike" data-toggle="modal" href=""><i class="fa fa-thumbs-down"></i> Non mi piace <span class="badge badge-primary">'+ numeroDislike +'</span></a>' +
                    '<a class="card-link text-gold post" id="post_comment" data-toggle="modal" href=""><i class="fa fa-comment"></i> Commenta <span class="badge badge-primary">'+ nuumeroCommenti +'</span></a>' +
                '</div>';
    return footer;
}

export { generaHeader, generaBody, generaFooter };