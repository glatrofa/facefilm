import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
import { snackbarSuccesso, snackbarErrore } from './visualizza_snackbar.js';
import { generaHeader, generaBody, generaFooter } from './genera_post.js';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// inizializza a 0 la variabile pagina per la gestione della visualizzazione dei post
let pagina = 0;

// richiama le seguenti funzioni non appena il documento è caricato
$(document).ready(function() {
    scrollHandler();
});

// ricerca nel db tutte le serie comprendenti nel nome i caratteri inseriti nel form
$(function visualizzaSerie() {
    $('#cerca_serie').keyup(function cercaNomeSerie() {
        let url = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIKEY +'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log('Checkout this JSON! ', data);
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

// visualizza i post ricercati in base agli attributi selezionati
$(function cercaPost() {
    $("#bottone_cerca_post").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../php/cerca_post.php',
            crossOrigin: true,
            data: {
                idSerie: document.getElementById('post_serie').value,
                numeroStagione: document.getElementById('post_stagione').value,
                numeroEpisodio: document.getElementById('post_episodio').value,
                pagina: pagina,
            },
            dataType: 'json',
            success: function (data) {
                console.log("paginazione successo " + JSON.stringify(data) + "\n" + typeof data + "\n" + data.length); //data è un Object e non ha la proprietà length
                let i;
                for (i = 0; i < data.length; i++) {
                    document.getElementById("sezione_post").innerHTML += generaHeader(data[i].nomeUtente, data[i].idPost, data[i].immagine)+generaBody(data[i].data, data[i].titolo, data[i].testo, data[i].idSerie, data[i].stagione, data[i].episodio)+generaFooter(data[i].idPost, data[i].idSerie, data[i].like, data[i].dislike, data[i].numeroCommenti);
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
                                    console.log("in aggiornaMiPiace data[0] è falsey");
                                    snackbarErrore("Si &egrave; verificato un errore");
                                }
                            },
                            error: function (data) {
                                console.log('ERROR '+ data);
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
                                    console.log("in aggiornaNonMiPiace() data[0] è falsey");
                                    snackbarErrore("Si &egrave; verificato un errore");
                                }    
                            },
                            error: function (data) {
                                console.log('ERROR '+ data);
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
                                    console.log("in segnalaPost() data è falsey");
                                    snackbarErrore("Si &egrave; verificato un errore");
                                }    
                            },
                            error: function (data) {
                                console.log('ERROR '+ data);
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
                                                    // mostra snackbar
                                                    console.log("in postaCommentoModal() la response dal php è false");
                                                    snackbarErrore("Si &egrave; verificato un errore");
                                                }
                                            },
                                            error: function (data) {
                                                console.log("dati post commento ERROR " + data);
                                                snackbarErrore("Si &egrave; verificato un errore");
                                            }
                                        });
                                    });
                                })
                            },
                            error: function (data) {
                                console.log('ERROR ' + data);
                                snackbarErrore("Si &egrave; verificato un errore");
                            }
                        });
                    });
                });
            },
            error: function (data) {
                console.log('ERROR in visualizzaPost(pagina) \n' + JSON.stringify(data,null,2));
                snackbarErrore("Si &egrave; verificato un errore");
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

// funziona per la disconnessione dell'utente
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

// funzione per la visualizzaizone di altri post nel feed principale
$(function visualizzaAltriPost() {
    $("#carica_altri_post").click(function () {
        pagina = pagina + 2;
        cercaPost();
    });
});