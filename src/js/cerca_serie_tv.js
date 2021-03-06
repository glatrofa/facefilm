import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
import { generaCard } from './genera_card.js';

const baseImageURL = 'https://image.tmdb.org/t/p/';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// richiama funzioni non appena il documento è caricato
document.addEventListener("DOMContentLoaded",function(){
    visualizzaClassificaTmdb();
    mostraSeriePopolari();
    scrollHandler();
    mostraSaluto();
});

// quando viene premuto il bottone 'Cerca' o l'utente preme 'Invio' sulla sua tastiera, 
// mostra le serie corrispondenti alla keyword in una serie di card
$('#mostra_poster').click(cercaPoster);
$('#cerca_serie').keyup(function enter(eventObject){if (eventObject.which == 13) cercaPoster();})

// ricerca i poster delle serie tv
function cercaPoster() {
    document.getElementById('classifica_laterale_Tmdb').classList.add('d-block'); // visualizza la classifica TMDB laterale, che è inizialmente nascosta
    let url2 = 'https://api.themoviedb.org/3/search/tv?api_key=' + APIKEY + '&language=it&page=1&query=' + $('#cerca_serie').val();
    console.log(url2);
    fetch(url2)
    .then(res => res.json())
    .then((data) => {
        //console.log('Checkout this JSON! ', data);
        document.getElementById('risultati_cerca_serie_tv').innerHTML = '';
        //console.log(baseImageURL);
        let dataSorted = sortByPopularityDesc(data.results); //ordinamento decrescente per popolarità dei risultati
        //console.log(dataSorted);
        if (dataSorted.length) {
            //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie
            for (let element of dataSorted) {
                let card = generaCard(element,baseImageURL);
                document.getElementById('risultati_cerca_serie_tv').innerHTML += card;
            }
        }
    })
    .catch((err) => {console.log(err)});
    
}

// visualizza le 10 serie più popolari su tmdb
function visualizzaClassificaTmdb() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key='+ APIKEY +'&language=it&sort_by=popularity.desc&page=1&timezone=Europe%2FItaly&include_null_first_air_dates=false';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Classifica TMDB ', out);
            let classifica = '';
            let ranking = 1;
            let topTen = out.results.slice(0,10); // prende solo le prime 10 serie TV tra le 20 serie fornite dall'API
            for (let serie of topTen) {
                classifica += '<li class="list-group-item px-0 px-lg-2 border-0 d-flex align-items-center">' + 
                                '<span class="h3 mr-3 text-nowrap">&#35; ' + ranking + '</span>' +
                                '<a href="./serie_tv.html?id=' + serie.id + '" class="awwa-secondary">' + serie.name + '</a>' +
                              '</li>';
                ranking += 1;                
            };
            document.getElementById('classifica_serie_Tmdb').innerHTML = classifica;
        })
        .catch(err => { throw err });
}

// ricerca le serie popolari
function mostraSeriePopolari() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key='+ APIKEY +'&language=it&sort_by=popularity.desc&page=1&timezone=Europe%2FItaly&include_null_first_air_dates=false';
    document.getElementById('risultati_cerca_serie_tv').innerHTML = '<div class="col-12 text-center h4 font-weight-bold awwa-secondary mb-5">Serie pi&ugrave; popolari su TMDB</div>';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //console.log('Checkout this JSON! ', data);
            //document.getElementById('risultati_cerca_serie_tv').innerHTML = '';
            if (data.results.length) {
                //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie, DA FINIRE
                for (var element of data.results) {
                    let card = generaCard(element,baseImageURL);
                    document.getElementById('risultati_cerca_serie_tv').innerHTML += card;
                }
            }
        })
        .catch(err => { throw err });
}

// ordina le serie trovare in ordine decrescente di popolarità
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
            },
            error: function () {
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.href = './html/login.html';
            }
        });
    });
});

// Quando si preme il bottone "Torna su" viene attivata questa funzione
function scrollHandler(){
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

// visualizza nella pagina le informazioni dell'utente
function mostraSaluto() {
    $.ajax({
      type: 'POST',
      url: '../php/profilo.php',
      crossOrigin: true,
      dataType: 'json',
      success: function (data) {
        //console.log('SUCCESS \n'+ JSON.stringify(data,null,2));
        $("#saluto").text("Ciao "+ data["nome"].toLowerCase() +" !");
      },
      error: function (data) {
        console.log('ERROR '+ JSON.stringify(data));
        snackbarErrore("Si &egrave; verificato un errore");
      }
    });
  }