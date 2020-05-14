import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
import { generaHeader, generaBody, generaFooter } from './genera_post.js';
import { snackbarSuccesso, snackbarErrore } from './visualizza_snackbar.js';
import { visualizzaCommenti } from './visualizza_commenti.js';

console.log(document.body.scrollTop, document.documentElement.scrollTop);

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// colore primario per i tasti del post
const colorPrimary = '#e5af05';
// colore secondario per i tasti del post
const colorSecondary = '#00008b';
// contenuto modal per post pubblicato con successo
//const modalPostPubblicazioneSuccess = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Post pubblicato</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Per vedere l'ultimo post pubblicato aggiorna la pagina o clicca il tasto qui sotto.</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' onclick='redirectHome()'>Aggiorna home</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Chiudi</button></div></div>";
// contenuto modal per post non pubblicato
//const modalPostPubblicazioneError = "<div class='modal-dialog modal-dialog-centered modal-sm' role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>Errore pubblicazione post</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'><p>Ci scusiamo per il disagio.<br>Se il problema persiste utilizza il form contattaci per segnalare l'accaduto.<br>Grazie.</p></div><div class='modal-footer'><button type='button' class='btn btn-primary' onclick='redirectFormContatti()'>Vai al form contatti</button><button type='button' class='btn btn-secondary' data-dismiss='modal'>Chiudi</button></div></div>";
//let modalLikeClicked = false;
//let modalDislikeClicked = false;
// inizializza a 0 per la gestione della visualizzaizone dei post
let pagina = 0;

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaPost(pagina);
    visualizzaClassifica();    
});

/*
// funzione per la selezione o deselezione del mi piace di un post
$(function controllaMiPiace() {
    $('#post_like').click(function () {
        if(!modalLikeClicked) {
            //$('#modal_like').modal('show');
            document.getElementById('post_like').style.color = colorSecondary;
            modalLikeClicked = true;
            // aggiunge la classe show alla snackbar
            document.getElementById("snackbar_like").classList.add("show");
            // dopo 3 secondi, rimuove la classe show dal DIV
            setTimeout(function(){ document.getElementById("snackbar_like").classList.remove("show"); }, 2500);
        }
        else {
            //$('#modal_like_removed').modal('show');
            document.getElementById('post_like').style.color = colorPrimary;
            modalLikeClicked = false;
            // aggiunge la classe show alla snackbar
            document.getElementById("snackbar_like_removed").classList.add("show");
            // dopo 3 secondi, rimuove la classe show dal DIV
            setTimeout(function(){ document.getElementById("snackbar_like_removed").classList.remove("show"); }, 2500);
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
            // aggiunge la classe show alla snackbar
            document.getElementById("snackbar_dislike").classList.add("show");
            // dopo 3 secondi, rimuove la classe show dal DIV
            setTimeout(function(){ document.getElementById("snackbar_dislike").classList.remove("show"); }, 2500);
        }
        else {
            //$('#modal_dislike_removed').modal('show');
            document.getElementById('post_dislike').style.color = colorPrimary;
            modalDislikeClicked = false;
            // aggiunge la classe show alla snackbar
            document.getElementById("snackbar_dislike_removed").classList.add("show");
            // dopo 3 secondi, rimuove la classe show dal DIV
            setTimeout(function(){ document.getElementById("snackbar_dislike_removed").classList.remove("show"); }, 2500);            
        }
    });
});
*/

// visualizza le 5 serie più popolari su tmdb
function visualizzaClassifica() {
    $.ajax({
        type: 'POST',
        url: './php/classifica_commenti_serie.php',
        crossOrigin: true,
        dataType: 'json',
        success: function (data) {
            //console.log('SUCCESS '+ data);
            let i;
            //let classifica = "";
            for(i = 0; i < data.length; i ++) {
                document.getElementById('classifica_serie').innerHTML += "<li><a href=' + '#' + ' id='link_"+ data[i].idSerie +"'></a></li>";
                richiediNomeSerie(data[i].idSerie,  data[i].numero);
            }
            //document.getElementById('classifica_serie').innerHTML = classifica;
        },
        error: function (data) {
            //console.log('ERROR '+ data);
            snackbarErrore("Si &egrave; verificato un errore");
        }
    });    
}

function richiediNomeSerie(idSerie, numero) {
    //let url = 'https://api.themoviedb.org/3/tv/popular?api_key='+ APIKEY +'&language=it&page=1';
    let url = 'https://api.themoviedb.org/3/tv/'+ idSerie +'?api_key='+ APIKEY +'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            document.getElementById("link_" + idSerie).innerHTML = out.name + " #" + numero;
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
                //console.log('result', data);
                //console.log('numero stagioni ', data.number_of_seasons);
                //console.log('stagioni ', data.seasons);
                let listaStagioni = '<option value="null"> Seleziona </option>';
                if(data.number_of_seasons != 0) {
                    let j = 0;                         
                    while (j < data.number_of_seasons) {
                        // crea le stringhe con le informazioni sulle stagioni
                        listaStagioni += '<option value='+data.seasons[j].season_number+'>'+data.seasons[j].name+'</option>';
                        j ++;
                    }      
                    if (data.length == 0)
                        listaStagioni = '<option value='+'null'+'> --- </option>';                
                }
                else
                    listaStagioni = '<option value='+'null'+'>Nessuna stagione</option>';
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
$(function pubblicaPost() {
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
            console.log('SUCCESS '+ data);
            if(data) {
                snackbarSuccesso("Post pubblicato");
            }
            else {
                //document.getElementById('modal_post_pubblicazione_error').innerHTML = modalPostPubblicazioneError;
                //$('#modal_post_pubblicazione_error').modal('show');
                snackbarErrore("Si &egrave; verificato un errore");
                // aggiorna la home dopo 3 secondi
                setTimeout(redirectHome(), 3000);
            }
        },
        error: function (data) {
            //console.log('ERROR '+ data);
            snackbarErrore("Si &egrave; verificato un errore");
        }
      });
    });
});

// reindirizza al form contatti
function redirectFormContatti() {
    location.href = './html/contattaci.html';
}

// aggiorna la home dopo la pubblicazione di un post
function redirectHome() {
    location.href = '.';
}


// mostra nella home i post più recenti
function visualizzaPost(pagina) {    
    $.ajax({
        type: 'POST',
        url: './php/ottieni_post.php',
        crossOrigin: true,
        data: {
            pagina: pagina
        },
        dataType: 'json',
        success: function (data) {
            //console.log("paginazione successo " + data);
            //document.getElementById("sezione_post").innerHTML = "";
            let i;
            for (i = 0; i < data.length; i++) {
                document.getElementById("sezione_post").innerHTML += generaHeader(data[i].nomeUtente, data[i].idPost)+generaBody(data[i].data, data[i].titolo, data[i].testo, data[i].idSerie, data[i].stagione, data[i].episodio)+generaFooter(data[i].idPost, data[i].idSerie, data[i].like, data[i].dislike, data[i].numeroCommenti);
            }
            // aggiorna il numero di mi piace del post
            $(function aggiornaMiPiace() {
                $("a[name='post_like']").click(function (event) {
                    $.ajax({
                        type: 'POST',
                        url: './php/aggiorna_contatore_post.php',
                        crossOrigin: true,
                        data: {
                            idPost: event.target.id,
                            obiettivo: 'piace',
                        },
                        dataType: 'json',
                        success: function (data) {
                            //console.log('SUCCESS '+ data);
                            if(data[0]){
                                snackbarSuccesso("Mi piace aggiunto");
                                // aggiorna valore like singolo post
                                document.getElementById(event.target.id + "-post_like_number").innerHTML = data[1];
                            } else {
                                snackbarErrore("Si &egrave; verificato un errore");
                            }
                        },
                        error: function (data) {
                            //console.log('ERROR '+ data);
                            snackbarErrore("Si &egrave; verificato un errore");
                        }
                    });
                });
            });
            // aggiorna il numero di non  mi piace del post
            $(function aggiornaNonMiPiace() {
                $("a[name='post_dislike']").click(function (event) {
                    //console.log(event.target.id);
                    $.ajax({
                        type: 'POST',
                        url: './php/aggiorna_contatore_post.php',
                        crossOrigin: true,
                        data: {
                            idPost: event.target.id,
                            obiettivo: 'dislike',
                        },
                        dataType: 'json',
                        success: function (data) {
                            //console.log('SUCCESS '+ data);
                            if(data[0]){
                                snackbarSuccesso("Non mi piace aggiunto");
                                // aggiorna valore dislike singolo post
                                document.getElementById(event.target.id + "-post_dislike_number").innerHTML = data[1];
                            } else {
                                snackbarErrore("Si &egrave; verificato un errore");
                            }    
                        },
                        error: function (data) {
                            //console.log('ERROR '+ data);
                            snackbarErrore("Si &egrave; verificato un errore");
                        }
                    });
                });
            });
            // segnala il post
            $(function segnalaPost() {
                $("a[name='segnala']").click(function (event) {
                    //console.log(event.target.id);
                    $.ajax({
                        type: 'POST',
                        url: './php/segnala_post.php',
                        crossOrigin: true,
                        data: {
                            idPost: event.target.id.substring(0, event.target.id.indexOf("-")),
                        },
                        dataType: 'json',
                        success: function (data) {
                            //console.log('SUCCESS '+ data);
                            if(data){
                                snackbarSuccesso("Post segnalato");
                            } else {
                                snackbarErrore("Si &egrave; verificato un errore");
                            }    
                        },
                        error: function (data) {
                            //console.log('ERROR '+ data);
                            snackbarErrore("Si &egrave; verificato un errore");
                        }
                    });
                });
            });            
            // visualizza commenti di un post in un modal
            $(function visualizzaCommentiModal() {
                $("a[name='post_comment']").click(function (event) {                    
                    //let idPostCommento = event.target.id.substring(0, event.target.id.indexOf("-"))
                    let idPost = event.target.id;
                    console.log("commento cliccato" + idPost);                    
                    $.ajax({
                        type: 'POST',
                        url: './php/ottieni_commenti.php',
                        data: {
                            idPost: idPost, 
                        },
                        crossOrigin: true,
                        dataType: 'json',
                        success: function (data) {
                            //console.log("successo ajax " + data[0].testo + ' ' + data[0].nomeUtente + ' ' + data[0].data);
                            if(data[0] != null){
                                //document.getElementById("modal_commenti_container").innerHTML = visualizzaModalCommento(idPost);
                                document.getElementById("modal_commenti_container").innerHTML = "";
                                let i;
                                for (i = 0; i < data.length; i++) {    
                                    document.getElementById("modal_commenti_container").innerHTML += visualizzaCommenti(data[i].testo, data[i].nomeUtente);
                                }
                            } else {
                                document.getElementById("modal_commenti_container").innerHTML = "Nessun commento";
                            }
                            $('#modal_commenti').modal('show');
                            $(function postaCommentoModal() {
                                $('#modal_form_commento').on('submit', function () {
                                    $.ajax({
                                        type: 'POST',
                                        url: './php/pubblica_commento.php',
                                        crossOrigin: true,
                                        data: $(this).serialize() + "&idPost=" + idPost,
                                        dataType: 'json',
                                        success: function (data) {            
                                            //console.log("dati post commento SUCCESS " + data);
                                            if(data != true){
                                                // mostra cracker
                                                snackbarErrore("Si &egrave; verificato un errore");
                                            }
                                        },
                                        error: function (data) {
                                            //console.log("dati post commento ERROR " + data);
                                            snackbarErrore("Si &egrave; verificato un errore");
                                        }
                                    });
                                });
                            })                            
                            /*
                            $('#modal_commenta_post').click(function (idPost) {
                                $('#modal_aggiungi_commento').modal('show');
                                $('#modal_form_commento').on('submit', function (e) {
                                    e.preventDefault();
                                    $.ajax({
                                        type: 'POST',
                                        url: '../php/pubblica_commento.php',
                                        crossOrigin: true,
                                        data: {
                                            idPost: idPost,
                                            testo: document.getElementById("modal_commento_testo").value,
                                        },
                                        dataType: 'json',
                                        success: function (data) {            
                                            console.log("dati post commento " + data);
                                            if(data == true){
                                                // mostra cracker
                                            } else {
                                                // mostra cracker
                                            }
                                        },
                                        error: function (data) {
                                            //console.log('ERROR '+data[0]);
                                            $('#modal_login_error').modal('show');
                                        }
                                    });
                                });
                            });
                            */
                        },
                        error: function (data) {
                            //console.log('ERROR ' + data);
                            snackbarErrore("Si &egrave; verificato un errore");
                        }
                    });
                });
            });
        },
        error: function (data) {
            //console.log('ERROR ' + data);
            snackbarErrore("Si &egrave; verificato un errore");
        }
    });
}

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

$(function logout() {
    $("#logout").click(function () {
        $.ajax({
            type: 'POST',
            url: './php/logout.php',
            crossOrigin: true,
            success: function () {
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.href = '.';
            }
        });
    });
});

$(function visualizzaAltriPost() {
    $("#carica_altri_post").click(function () {
        pagina = pagina + 2;
        visualizzaPost(pagina);
    });
});