
function generaCard(element, baseImageURL) {
    let card =  '<div class="card col-5 col-lg-3 px-0 mx-3 mb-3 shadow" id="' + element.id +'">' +
                        '<img class="card-img-top" src="';
    if (element.poster_path) {card += baseImageURL.concat('w342', element.poster_path)}
    card +=                 '" alt="Poster">' +
                        '<div class="card-body">' +
                            '<div class="card-title font-weight-bold">' + element.name + '</div>' +
                        '</div>' +
                        '<div class="card-footer"><span class="text-muted">';
    if(element.first_air_date) {card += element.first_air_date.substr(0,4)} 
    card +=                 '</span>'+
                        '</div>' +
                '</div>';
    return card;
}

export {generaCard};