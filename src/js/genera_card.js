
function generaCard(element, baseImageURL) {
    let card =  '<div class="card col-5 col-lg-3 px-0 mx-3 mb-3 shadow" id="' + element.id +'">' +
                        '<a data-toggle="tooltip" data-placement="top" title="Vai alla pagina della serie" href="./serie_tv.html?id=' + element.id + '">'; 
    if (!element.poster_path) {card += '<i class="fas fa-exclamation-triangle card-img-top"></i>'}
    else {
        card +=             '<img class="card-img-top" src="' + baseImageURL.concat('w342', element.poster_path) + '" alt="Poster">' + 
                        '</a>' +
                        '<div class="card-body text-center">' +
                            '<div class="card-title font-weight-bold">' + element.name + '</div>' +
                            '<button onclick="window.location.href = \'./serie_tv.html?id=' + element.id + '\';" class="btn">Vai alla pagina</button>' +
                        '</div>' +
                        '<div class="card-footer bg-white"><i class="fas fa-history"></i><span class="text-muted ml-2">';
    }
                        ;
    //else {card += '../img/eye-slash-solid.svg" style="width: 75% !important; margin: calc( calc(380px - 152px) / 2) auto calc( calc(380px - 152px) / 2) auto" '}
                    
    if(element.first_air_date) {card += element.first_air_date.substr(0,4)} 
    card +=                 '</span>'+
                        '</div>' +
                '</div>';
    return card;
}

export {generaCard};