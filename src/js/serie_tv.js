import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onload = logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    stampaInformazioniSerie();
    scrollHandler();
});

const baseImageURL = 'https://image.tmdb.org/t/p/';

function stampaInformazioniSerie() {
    // https://developers.themoviedb.org/3/tv/get-tv-details
    let id = getParameterByName('id');
    //console.log(id);
    let url = 'https://api.themoviedb.org/3/tv/'+id+'?api_key='+ APIKEY +'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('Checkout this JSON! ', data);
            document.getElementById('nome').innerHTML = data.name;
            let posterSize = 'w500'; //Formati disponibili: ["w92","w154","w185","w342","w500","w780","original"]
            document.getElementById('poster').src = baseImageURL + posterSize + data.poster_path;
            document.getElementById('nome_originale').innerHTML += data.original_name;
            document.getElementById('descrizione_serie').innerHTML += data.overview;
            document.getElementById('anno_inizio').innerHTML += dataEuropea(data.first_air_date);
            document.getElementById('anno_termine').innerHTML += dataEuropea(data.last_air_date);        
            // visualizza registi
            let registi = '';
            data.created_by.forEach(regista => {
                registi += regista.name + ' , ';
            });
            registi = registi.substring(0,registi.length-2)
            document.getElementById('registi').innerHTML += registi;
            document.getElementById('numero_stagioni').innerHTML += data.number_of_seasons;
            document.getElementById('numero_episodi').innerHTML += data.number_of_episodes;
            document.getElementById('media_voti').innerHTML = '<span class="h4 mr-2">' + data.vote_average + '</span>' +'<span>/10</span>';
            //document.getElementById('stelle_voto').style = '--rating: ' + data.vote_average;
            createRatingStars(data.vote_average);
            document.getElementById('numero_voti').innerHTML = '( ' + data.vote_count + ' voti)';
            creaCarouselCast(id,APIKEY);
            // visualizza gli attori
            //visualizzaAttori(id, APIKEY);
            visualizzaStagioni(id, APIKEY, data.number_of_seasons);
            visualizzaEpisodi(id, APIKEY);
        })
        .catch(err => { throw err });
}

function creaCarouselCast(id, APIKEY) {
    let carousel = '';
    carousel += '<div id="carousel_cast" class="carousel slide" data-ride="carousel">' + 
                    /*'<ol class="carousel-indicators">' + 
                        '<li data-target="#carousel_cast" data-slide-to="0" class="active"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="1"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="2"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="3"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="4"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="5"></li>' + 
                        '<li data-target="#carousel_cast" data-slide-to="6"></li>' + 
                    '</ol>' + */
                    '<div class="carousel-inner" id="attori2"></div>' +
                    '<a class="carousel-control-prev" href="#carousel_cast" role="button" data-slide="prev">' + 
                        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' + 
                        '<span class="sr-only">Precedente</span>' + 
                    '</a>' + 
                    '<a class="carousel-control-next" href="#carousel_cast" role="button" data-slide="next">' + 
                        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' + 
                        '<span class="sr-only">Successivo</span>' + 
                    '</a>' + 
                '</div>';
    document.getElementById('attori').innerHTML += carousel;
    //console.log('la struttura base del carousel è stata messa in #attori ?',document.getElementById('attori').innerHTML);
    // https://developers.themoviedb.org/3/tv/get-tv-credits
    let url = 'https://api.themoviedb.org/3/tv/'+id+'/credits?api_key='+APIKEY+'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('Checkout this JSON! ', data);      
            let posterSize = 'w342'; //Formati disponibili: ["w92","w154","w185","w342","w500","w780","original"]
            let attori2 = '';
            for (let attore of data.cast) {
                attori2 +=  '<div class="carousel-item">' + 
                                '<img src="' + baseImageURL + posterSize + attore.profile_path + '" class="d-block mx-auto" alt="Attore">' + 
                                '<div class="d-none d-md-block text-center text-white bg-awwa-secondary">' + 
                                    '<h5>' + attore.name + '</h5>' + 
                                    '<span>Personaggio: ' + attore.character + '</span>' + 
                                '</div>' + 
                            '</div>';
            }
            document.getElementById('attori2').innerHTML = attori2;
            //console.log('i vari carousel-item sono stati messi in #attori2?',document.getElementById('attori2'));
            document.getElementById('attori2').firstChild.classList.add('active');
            //console.log('first child di div#attori2',document.getElementById('attori2').firstChild);
        })
        .catch(err => { throw err });

}

function visualizzaAttori(id, APIKEY) {
    // https://developers.themoviedb.org/3/tv/get-tv-credits
    let url = 'https://api.themoviedb.org/3/tv/'+id+'/credits?api_key='+APIKEY+'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('Checkout this JSON! ', data);      
            let i = 0;
            let posterSize = 'w185';
            let attori = '';
            /*let attori2 = '';
            for (let attore of data.cast) {
                attori2 += '<div class="carousel-item">' + 
                '<img src="' + baseImageURL + posterSize + attore.profile_path + '" class="d-block w-100" alt="Attore">' + 
                '<div class="carousel-caption d-none d-md-block">' + 
                  '<h5>' + attore.name + '</h5>' + 
                  '<p>Personaggio: ' + attore.character + '</p>' + 
                '</div>' + 
                '</div>';
            }
            data.cast.forEach(attore => {
                attori2 += '<div class="carousel-item">' + 
                '<img src="' + baseImageURL + posterSize + attore.profile_path + '" class="d-block w-100" alt="Attore">' + 
                '<div class="carousel-caption d-none d-md-block">' + 
                  '<h5>' + attore.name + '</h5>' + 
                  '<p>Personaggio: ' + attore.character + '</p>' + 
                '</div>' + 
                '</div>';
            })
            document.getElementById('attori2').innerHTML = attori2;
            document.getElementById('attori2').firstChild.classList.add('active');
            document.getElementById('attori2').firstChild.classList.add('show'); */
            while (i < data.cast.length) {
                attori += '<p>Nome: '+data.cast[i].name+' Personaggio: '+data.cast[i].character+'<img src='+baseImageURL+posterSize+data.cast[i].profile_path+' /></p>';
                i ++;
            }   
            document.getElementById('attori').innerHTML = attori;      
        })
        .catch(err => { throw err });
}

function visualizzaStagioni(id, APIKEY, numeroStagioni) {
    // https://developers.themoviedb.org/3/tv-seasons/get-tv-season-details
}

function visualizzaEpisodi(id, APIKEY) {
    // https://developers.themoviedb.org/3/tv-episodes/get-tv-episode-details
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function createRatingStars(vote_average){
    var span = document.createElement('SPAN'); //crea l'elemento del DOM che conterrà le 5 stelle
    span.id = 'stelle_voto';
    span.style = '--rating: ' + vote_average; //crea la variabile CSS che determinerà la quota di riempimento delle 5 stelle
    // aggiunge le 5 stelle (icone di Font Awesome)
    for (let i = 0; i < 5; i++)
        span.innerHTML += '<i class="fas fa-star"></i>';
    /* sintassi metodo insertBefore: 
       parentNode.insertBefore(newNode, referenceNode) */
    document.getElementById('stelle').appendChild(span);
}

// Gestione logout
$(function logout() {
    $("#logout").click(function () {
        $.ajax({
            type: 'POST',
            url: '../php/logout.php',
            crossOrigin: true,
            success: function () {
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.href = './login.html';
            }
        });
    });
});

function scrollHandler(){
    // Quando si preme il bottone "Torna su" viene attivata questa funzione
    document.getElementById("scroll_to_top").addEventListener('click',function tornaSu(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    });  
    window.onscroll = function() {
        if (document.documentElement.scrollTop > 600 ) {
            document.getElementById("scroll_to_top").style.display = "block";
          } else {
            document.getElementById("scroll_to_top").style.display = "none";
          }
        };
}

function dataEuropea(data) {
    let giorno = data.substring(8);
    let mese = data.substring(5,7);
    let anno = data.substring(0,4);
    return data = giorno + ' / ' + mese + ' / ' + anno;
}