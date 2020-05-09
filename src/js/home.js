import { logged } from './autenticazione.js';
import {APIKEY} from './key.js';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

const colorPrimary = '#e5af05';
const colorSecondary = '#00008b';
const modalPostPubblicazioneSuccess = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Post pubblicato</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div></div>";
const modalPostPubblicazioneError = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Errore pubblicazione post</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Ci scusiamo per il disagio.<br>Se il problema persiste utilizza il form contattaci per segnalare l'accaduto.<br>Grazie.</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' onclick='redirectFormContatti()'>Vai al form contatti</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Chiudi</button></div></div>";
let modalLikeClicked = false;
let modalDislikeClicked = false;

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaClassifica();
});

// funzione per la selezione o deselezione del mi piace di un post
$(function controllaMiPiace() {
    $('#post_like').click(function () {
        if(!modalLikeClicked) {
            //$('#modal_like').modal('show');
            document.getElementById('post_like').style.color = colorSecondary;
            modalLikeClicked = true;
            // Get the snackbar DIV
            document.getElementById("snackbar_like").className = "show";
            // Add the "show" class to DIV
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ document.getElementById("snackbar_like").className.replace("show", ""); }, 3000);
        }
        else {
            //$('#modal_like_removed').modal('show');
            document.getElementById('post_like').style.color = colorPrimary;
            modalLikeClicked = false;
            // Get the snackbar DIV
            let x = document.getElementById("snackbar_like_removed");
            // Add the "show" class to DIV
            x.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    });
});

// funzione per la selezione o deselezione del non mi piace di un post
$(function controllaNonMiPiace() {
    $('#post_dislike').click(function () {
        if(!modalDislikeClicked) {
            //$('#modal_dislike').modal('show');
            document.getElementById('post_dislike').style.color = colorSecondary;
            modalDislikeClicked = true;
            // Get the snackbar DIV
            let x = document.getElementById("snackbar_dislike");
            // Add the "show" class to DIV
            x.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        else {
            //$('#modal_dislike_removed').modal('show');
            document.getElementById('post_dislike').style.color = colorPrimary;
            modalDislikeClicked = false;
            // Get the snackbar DIV
            let x = document.getElementById("snackbar_dislike_removed");
            // Add the "show" class to DIV
            x.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    });
});

// visualizza le 5 serie più popolari su tmdb
function visualizzaClassifica() {
    let url = 'https://api.themoviedb.org/3/tv/popular?api_key='+ APIKEY +'&language=it&page=1';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Checkout this JSON! ', out);
            //console.log('nome1 '+out.results[0].original_name);
            let i = 0;            
            let classifica = '';
            do{
                classifica += '<li><a href='+'#?'+out.results[i].id+'>'+out.results[i].original_name+'</a></li>';                
                i ++;
            }while (i <= 9);
            document.getElementById('classifica_serie').innerHTML = classifica;
            /*
            let results = [];
            out.array.forEach(element => {
                
            });
            */
            /*
            out.forEach(function (value, i) {
               results[i] = {'nome':value.original_name, 'popolarita':value.popularity};
            });
            console.log('results: ', resuls);
            */
        })
        .catch(err => { throw err });
}

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
                let listaSerie = '<option value="null"> Seleziona </option>';
                // ritornano al massimo 20 risultato per volta
                while (data.results.length >= 1 && i < data.results.length) {
                    listaSerie += '<option value='+data.results[i].id+'>'+data.results[i].name+'</option>';
                    i ++;
                }      
                if (data.results.length == 0)
                    listaSerie = '<option value='+'null'+'> --- </option>';
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
                console.log('result', data);
                console.log('numero stagioni ', data.number_of_seasons);
                console.log('stagioni ', data.seasons);
                let listaStagioni = '<option value="null"> Seleziona </option>';
                if(data.number_of_seasons != 0) {
                    let j = 0;
                    //if(data.seasons[0] == null)
                        //j = 1;                          
                    while (j < data.number_of_seasons) {
                        listaStagioni += '<option value='+data.seasons[j].season_number+'>'+data.seasons[j].name+'</option>';
                        j ++;
                    }      
                    if (data.length == 0)
                        listaStagioni = '<option value='+'null'+'> --- </option>';                
                }
                else
                    listaStagioni = '<option value='+'null'+'>Nessuna stagione</option>';
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
                let listaEpisodi = '<option value="null"> Seleziona </option>';           
                if(data.episodes.length != 0){
                    let i = 0;                 
                    while (i < data.episodes.length) {
                        listaEpisodi += '<option value='+data.episodes[i].episode_number+'>'+data.episodes[i].name+'</option>';
                        i ++;
                    }      
                    if (data.length == 0)
                        listaEpisodi = '<option value='+'null'+'> --- </option>';
                }
                else
                    listaEpisodi = '<option value='+'null'+'>Nessun episodio</option>';
                document.getElementById('post_episodio').innerHTML = listaEpisodi;
            })
            .catch(err => { throw err });
    });    
});

// pubblica il post
$(function login() {
    $('#form_post').on('submit', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: './php/pubblica_post.php',
        crossOrigin: true,
        data: {
            idSerie: document.getElementById('post_serie').value,
            numeroStagione: document.getElementById('post_stagione').value,
            numeroEpisodio: document.getElementById('post_episodio').value,
            testo: document.getElementById('post_testo').value,
            titolo: document.getElementById('post_titolo').value,
        },
        dataType: 'json',
        success: function (data) {            
            console.log('SUCCESS '+data);
            if(data) {
                document.getElementById('modal_post_pubblicazione_success').innerHTML = modalPostPubblicazioneSuccess;
                $('#modal_post_pubblicazione_success').modal('show');
            }
            else {
                document.getElementById('modal_post_pubblicazione_error').innerHTML = modalPostPubblicazioneError;
                $('#modal_post_pubblicazione_error').modal('show');
            }
        },
        error: function (data) {
            console.log('ERROR '+data);
            document.getElementById('modal_post_pubblicazione_error').innerHTML = modalPostPubblicazioneError;
            $('#modal_post_pubblicazione_error').modal('show');
        }
      });
    });
});

// reindirizza al form contatti
function redirectFormContatti() {
    location.href = './contattaci.html';
}