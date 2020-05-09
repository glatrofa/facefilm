import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
// verifica che l'utente abbia effettuato l'accesso
// window.onload = logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaClassifica();
});

// effettua il redirect sulla pagina della serie selezionata
$('#cerca_serie_bottone').click(function cercaSerie() {
    //console.log('serie selezionata '+$('#mostra_nome_serie :selected').val());
    window.location.href = './serie_tv.html?id='+$('#mostra_nome_serie :selected').val()+'';
});

// quando viene premuto il bottone 'Cerca', mostra le serie corrispondenti alla keyword
// in una serie di card, DA FINIRE
$('#mostra_poster').click(function cercaPoster() {
    let url2 = 'https://api.themoviedb.org/3/search/tv?api_key=' + APIKEY + '&language=it&page=1&query=' + $('#cerca_serie').val()
    console.log(url2);
    fetch(url2)
    .then(res => res.json())
    .then((data) => {
        console.log('Checkout this JSON! ', data);
        document.getElementById('risultati_ricerca').innerHTML = '';
        const baseImageURL = 'https://image.tmdb.org/t/p/';
        console.log(baseImageURL);
        if (data.results.length) {
            //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie, DA FINIRE
            for (var element of data.results) {
                let cards =  '<div class="card col-5 col-lg-3 px-0 mx-3 mb-3 shadow">' +
                                '<img class="card-img-top" src="' + baseImageURL.concat('w342', element.poster_path) + '" alt="Poster">' +
                                '<div class="card-body">' +
                                    '<div class="card-title font-weight-bold">' + element.name + '</div>' +
                                    '<p class="text-truncate h7">' + element.overview + '</p>' +
                                '</div>' +
                                '<div class="card-footer"><span class="text-muted">' + element.first_air_date.substr(0,4) + '</span></div>'+
                            '</div>' +
                        '</div>';
                document.getElementById('risultati_ricerca').innerHTML += cards;
            }
        }
    })
    .catch((err) => {console.log(err)});
    
});

// visualizza le 10 serie più popolari su tmdb
function visualizzaClassifica() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key='+ APIKEY +'&language=it&sort_by=popularity.desc&page=1&timezone=Europe%2FItaly&include_null_first_air_dates=false';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            //console.log('Checkout this JSON! ', out);
            let i = 0;            
            let classifica = '';
            do{
                classifica += '<li><a href="./serie_tv.html?id='+out.results[i].id+'">'+out.results[i].name+'</a></li>';                
                i ++;
            }while (i <= 9);
            document.getElementById('classifica_serie').innerHTML = classifica;
        })
        .catch(err => { throw err });
}
