import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';

// verifica che l'utente abbia effettuato l'accesso
// window.onload = logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaClassifica();
    mostraSeriePopolari();
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
        let dataSorted = sortByPopularityDesc(data.results); //ordinamento decrescente per popolarità dei risultati
        //console.log(dataSorted);
        if (dataSorted.length) {
            //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie, DA FINIRE
            for (var element of dataSorted) {
                let card =  '<div class="card col-5 col-lg-3 px-0 mx-3 mb-3 shadow" id="' + element.id +'">' +
                                '<img class="card-img-top" src="';
                if (element.poster_path) {card += baseImageURL.concat('w342', element.poster_path)}
                card +=             '" alt="Poster">' +
                                '<div class="card-body">' +
                                    '<div class="card-title font-weight-bold">' + element.name + '</div>' +
                                '</div>' +
                                '<div class="card-footer"><span class="text-muted">';
                if(element.first_air_date) {card += element.first_air_date.substr(0,4)} 
                card +=             '</span>'+
                                '</div>' +
                            '</div>';
                document.getElementById('risultati_ricerca').innerHTML += card;
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

function mostraSeriePopolari() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key='+ APIKEY +'&language=it&sort_by=popularity.desc&page=1&timezone=Europe%2FItaly&include_null_first_air_dates=false';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('Checkout this JSON! ', data);
            document.getElementById('risultati_ricerca').innerHTML = '';
            const baseImageURL = 'https://image.tmdb.org/t/p/';
            if (data.results.length) {
                //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie, DA FINIRE
                for (var element of data.results) {
                    let card =  '<div class="card col-5 col-lg-3 px-0 mx-3 mb-3 shadow" id="' + element.id +'">' +
                                    '<img class="card-img-top" src="';
                    if (element.poster_path) {card += baseImageURL.concat('w342', element.poster_path)}
                    card +=             '" alt="Poster">' +
                                    '<div class="card-body">' +
                                        '<div class="card-title font-weight-bold">' + element.name + '</div>' +
                                    '</div>' +
                                    '<div class="card-footer"><span class="text-muted">';
                    if(element.first_air_date) {card += element.first_air_date.substr(0,4)} 
                    card +=             '</span>'+
                                    '</div>' +
                                '</div>';
                    document.getElementById('risultati_ricerca').innerHTML += card;
                }
            }
        })
        .catch(err => { throw err });
}

function sortByPopularityDesc(jsonSerieTv) {
    var jsonSortedCres = jsonSerieTv.slice(0); //espediente per copiare il contenuto del'array senza referenziarlo
    jsonSortedCres.sort(function(a,b) {
        return a.popularity - b.popularity;
    });
    var jsonSortedDesc = jsonSerieTv.slice(0); //espediente per copiare il contenuto del'array senza referenziarlo
    for (let i=0;i<jsonSerieTv.length;i++) {
        jsonSortedDesc[jsonSerieTv.length-1-i] = jsonSortedCres[i]; //inverte ordinamento da crescente a decrescente
    }
    return jsonSortedDesc;
}

// Gestione del bottone "Torna su"
var scrollButton = document.getElementById("scroll_to_top");

// Quando l'utente scrolla di un certo numero di pixel, mostra il bottone "Torna su"
window.onscroll = function() {scrollFunction()};

function scrollFunction() { 
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

// Quando si preme il bottone "Torna su" viene attivata questa funzione
scrollButton.addEventListener('click',function tornaSu(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;  
});
