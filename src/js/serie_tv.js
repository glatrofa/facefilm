import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';


// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    stampaInformazioniSerie();
});

function stampaInformazioniSerie() {
    // https://developers.themoviedb.org/3/tv/get-tv-details
    let id = getParameterByName('id');
    //console.log(id);
    let url = 'https://api.themoviedb.org/3/tv/'+id+'?api_key='+ APIKEY +'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('Checkout this JSON! ', data);
            let posterSize = 'w185'; //w500 per desktop, immagine più grande
            document.getElementById('poster').src = 'http://image.tmdb.org/t/p/'+posterSize+data.poster_path;
            document.getElementById('navbar_nome_serie').innerHTML = data.name;
            document.getElementById('nome').innerHTML = data.name;
            // da formattare le date in formato europeo
            document.getElementById('anno_inizio').innerHTML = data.first_air_date;
            document.getElementById('anno_termine').innerHTML = data.last_air_date;        
            document.getElementById('media_voti').innerHTML = data.vote_average+'/10';
            document.getElementById('numero_voti').innerHTML = data.vote_count;
            document.getElementById('numero_stagioni').innerHTML = data.number_of_seasons;
            document.getElementById('numero_episodi').innerHTML = data.number_of_episodes;
            // visualizza registi
            let i = 0;
            let registi = '';
            while (i < data.created_by.length) {
                registi += data.created_by[i].name+' ';
                i ++;
            }   
            document.getElementById('registi').innerHTML = registi;
            // visualizza attori
            visualizzaAttori(id, APIKEY);
            visualizzaStagioni(id, APIKEY, data.number_of_seasons);
            visualizzaEpisodi(id, APIKEY);
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
            while (i < data.cast.length) {
                attori += '<p>Nome: '+data.cast[i].name+' Personaggio: '+data.cast[i].character+'<img src='+'http://image.tmdb.org/t/p/'+posterSize+data.cast[i].profile_path+' /></p>';
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