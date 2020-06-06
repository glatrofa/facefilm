import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// ricerca nel db tutte le serie comprendenti nel nome i caratteri inseriti nel form
$(function visualizzaSerie() {
    $('#cerca_serie').keyup(function cercaNomeSerie() {
        let url = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIKEY +'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log('Checkout this JSON! ', data);
                //console.log('dimensione '+data.results.length);
                let i = 0;            
                let listaSerie = '<option value="null"> Scegli... </option>';
                // ritornano al massimo 20 risultato per volta
                while (data.results.length >= 1 && i < data.results.length) {
                    listaSerie += '<option value='+data.results[i].id+'>'+data.results[i].name+'</option>';
                    i ++;
                }      
                if (data.results.length == 0)
                    listaSerie = '<option value='+'null'+'> Nessuna serie trovata </option>';
                document.getElementById('post_serie').innerHTML = listaSerie;
            })
            .catch(err => { throw err });
    });
});

// visualizza le stagioni della serie selezionata
$(function visualizzaStagioni() {
    $('#post_serie').change( function() {        
        let idSerie = $('#post_serie :selected').val();
        let url = 'https://api.themoviedb.org/3/tv/'+idSerie+'?api_key='+ APIKEY +'&language=it';
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                //console.log('result', data);
                //console.log('numero stagioni ', data.number_of_seasons);
                //console.log('stagioni ', data.seasons);
                let listaStagioni = '<option value="null"> Scegli... </option>';
                if(data.number_of_seasons != 0) {
                    let j = 0;                         
                    while (j < data.number_of_seasons) {
                        // crea le stringhe con le informazioni sulle stagioni
                        listaStagioni += '<option value='+data.seasons[j].season_number+'>'+data.seasons[j].name+'</option>';
                        j ++;
                    }      
                    if (data.length == 0)
                        listaStagioni = '<option value='+'null'+'> Seleziona... </option>';                
                }
                else
                    listaStagioni = '<option value='+'null'+'>Nessuna stagione trovata</option>';
                // stampa nel documento le stagioni
                document.getElementById('post_stagione').innerHTML = listaStagioni;
            })
            .catch(err => { throw err });
    });
});

// visualizza gli episodi della stagione selezionata
$(function visualizzaEpisodi() {
    $('#post_stagione').change( function() {
        let idSerie = $('#post_serie :selected').val();
        let numeroStagione = $('#post_stagione :selected').val();
        let url = 'https://api.themoviedb.org/3/tv/'+idSerie+'/season/'+numeroStagione+'?api_key='+ APIKEY +'&language=it';
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log('episodi', data);
                let listaEpisodi = '<option value="null"> Scegli... </option>';           
                if(data.episodes.length != 0){
                    let i = 0;                 
                    while (i < data.episodes.length) {
                        listaEpisodi += '<option value='+data.episodes[i].episode_number+'>'+data.episodes[i].name+'</option>';
                        i ++;
                    }      
                    if (data.length == 0)
                        listaEpisodi = '<option value='+'null'+'> Seleziona... </option>';
                }
                else
                    listaEpisodi = '<option value='+'null'+'>Nessun episodio trovato</option>';
                document.getElementById('post_episodio').innerHTML = listaEpisodi;
            })
            .catch(err => { throw err });
    });    
});