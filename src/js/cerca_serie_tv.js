import { logged } from './autenticazione.js';
import {APIKEY} from './key.js';
import {getBaseImageURL} from './indirizzo_base_img.js';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaClassifica();
});

// effettua il redirect sulla pagina della serie selezionata
$('#cerca_serie_bottone').click(function cercaSerie() {
    //console.log('serie selezionata '+$('#mostra_nome_serie :selected').val());
    window.location.href = './serie_tv.html?id='+$('#mostra_nome_serie :selected').val()+'';
});

// ricerca nel db tutte le serie comprendenti nel nome i caratteri inseriti nel form
$('#cerca_serie').keyup(function cercaNomeSerie() {
    let url = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIKEY +'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //console.log('Checkout this JSON! ', data);
            //console.log('dimensione '+data.results.length);
            let i = 0;            
            let lista = '';
            // ritornano al massimo 20 risultato per volta
            while (data.results.length >= 1 && i < data.results.length) {
                lista += '<option value='+data.results[i].id+'>'+data.results[i].name+'</option>';
                i ++;
            }      
            if (data.results.length == 0)
                lista = '<option value='+'null'+'> --- </option>';
            document.getElementById('mostra_nome_serie').innerHTML = lista;
        })
        .catch(err => { throw err });
});

// quando viene premuto il bottone 'Cerca', mostra le serie corrispondenti alla keyword
// in una serie di card, DA FINIRE, VADO A MANGIARE
$('#mostra_poster').click(function cercaPoster() {
    let url2 = 'https://api.themoviedb.org/3/search/tv?api_key=' + APIKEY + '&language=it&page=1&query=' + $('#cerca_serie').val()
    const image_base_url = 
    //console.log(url2);
    fetch(url2)
    .then(res => res.json())
    .then((data) => {
        let cards = '';
        if (data.results.lenght) {
            //per ogni elemento dell'array dei risultati crea una card con poster e descrizione serie, DA FINIRE
            data.results.forEach(element => {
                card = '<div class="card shadow">' +
                                '<img class="card-img-top" src="' + getBaseImageURL().concat('w') + '" alt="Poster">' +
                                '<div class="card-body">' +
                                    '<div class="card-title">Titolo serie</div>' +
                                    '<p>qui ci potrebbe stare una breve descrizione della serie, magari quella fornita da API ma in versione ridotta</p>' +
                                '</div>' +
                                '<div class="card-footer"><span class="text-muted">Data pubblicazione</span></div>'+
                        '</div>';
            });
        }
    })
    
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