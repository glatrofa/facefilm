import { logged } from './autenticazione.js';
import { APIKEY } from './key.js';
import { generaHeader, generaBody, generaFooter } from './genera_post.js';
import { snackbarSuccesso, snackbarErrore } from './visualizza_snackbar.js';
import { visualizzaCommenti } from './visualizza_commenti.js';

// verifica che l'utente abbia effettuato l'accesso
window.onload = logged();

// inizializza a 0 la variabile pagina per la gestione della visualizzazione dei post
let pagina = 0;

// richiama le seguenti funzioni non appena il documento è caricato
$(document).ready(function() {
    visualizzaPost(pagina);
    visualizzaClassificaAwwa();
    visualizzaClassificaTmdb();
    mostraSaluto();
    scrollHandler();
});

// visualizza le 5 serie più commentate sul sito AWWA
function visualizzaClassificaAwwa() {
    $.ajax({
        type: 'POST',
        url: './php/classifica_commenti_serie.php',
        crossOrigin: true,
        dataType: 'json',
        success: function (data) {
            //console.log('SUCCESS '+ data);
            let i;
            for(i = 0; i < data.length; i ++) {
                document.getElementById('classifica_serie_Awwa').innerHTML += "<li class='list-group-item px-0 px-lg-3 border-0'>" + 
                                                                                "<a href='./html/serie_tv.html?id="+ data[i].idSerie +"' id='link_"+ data[i].idSerie +"' title='Vai alla pagina della serie' class='awwa-secondary'></a>" +
                                                                              "</li>";
                richiediNomeSerie(data[i].idSerie,  data[i].numero);
            }
        },
        error: function (data) {
            console.log('ERROR '+ data);
            snackbarErrore("Si &egrave; verificato un errore");
        }
    });    
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
                                '<a href="./html/serie_tv.html?id=' + serie.id + '" class="awwa-secondary">' + serie.name + '</a>' +
                              '</li>';
                ranking += 1;                
            };
            document.getElementById('classifica_serie_Tmdb').innerHTML = classifica;
        })
        .catch(err => { throw err });
}

// ritorna il nome della serie per la visualizzazione della classifica
function richiediNomeSerie(idSerie, numero) {
    //let url = 'https://api.themoviedb.org/3/tv/popular?api_key='+ APIKEY +'&language=it&page=1';
    let url = 'https://api.themoviedb.org/3/tv/'+ idSerie +'?api_key='+ APIKEY +'&language=it';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            //console.log(out);
            document.getElementById("link_" + idSerie).innerHTML = '<span class="badge badge-pill h4 mr-2 bg-awwa-secondary text-white">' + 
                                                                    '<i class="fas fa-comments mr-1 text-white"></i>' + numero + '</span>'+ out.name;
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
                        // crea le stringhe con le informazioni sugli episodi
                        listaEpisodi += '<option value='+data.episodes[i].episode_number+'>'+data.episodes[i].name+'</option>';
                        i ++;
                    }      
                    if (data.length == 0)
                        listaEpisodi = '<option value='+'null'+'> Seleziona... </option>';
                }
                else
                    listaEpisodi = '<option value='+'null'+'>Nessun episodio trovato</option>';
                // stampa nel documento gli episodi
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
                // aggiorna la home dopo 3 secondi
                setTimeout(location.reload(), 3000);
            }
            else {
                console.log("In pubblicaPost() la response dal php è falsey");
                snackbarErrore("Si &egrave; verificato un errore");
                // aggiorna la home dopo 3 secondi
                setTimeout(location.reload(), 3000);
            }
        },
        error: function (data) {
            console.log('ERROR '+ data);
            snackbarErrore("Si &egrave; verificato un errore");
        }
      });
    });
});

// reindirizza al form contatti
function redirectFormContatti() {
    location.href = './html/contattaci.html';
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
            // visualizza i commenti di un post in un modal
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
                                    document.getElementById("modal_commenti_container").innerHTML += visualizzaCommenti(data[i].testo, data[i].nomeUtente,data[i].data);
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
                                            snackbarSuccesso("Commento pubblicato");
                                            // aggiorna la home dopo 3 secondi
                                            setTimeout(location.reload(), 3000);
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
                            console.log('ERROR ' + JSON.stringify(data));
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
}

// visualizza nella pagina le informazioni dell'utente
function mostraSaluto() {
    $.ajax({
      type: 'POST',
      url: './php/profilo.php',
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

// Quando l'utente scrolla di un certo numero di pixel, mostra il bottone "Torna su"
//window.onscroll = function() {scrollFunction()};
/*function scrollFunction() { 
  if (document.documentElement.scrollTop > 600 ) {
    document.getElementById("scroll_to_top").style.display = "block";
  } else {
    document.getElementById("scroll_to_top").style.display = "none";
  }
}*/

// Quando si preme il bottone "Torna su" viene attivata questa funzione
/*document.getElementById("scroll_to_top").addEventListener('click',function tornaSu(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;  
});*/

// funziona per la disconnessione dell'utente
$(function logout() {
    $("#logout").click(function () {
        $.ajax({
            type: 'POST',
            url: './php/logout.php',
            crossOrigin: true,
            success: function () {
                document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                location.href = './html/login.html';
            }
        });
    });
});

// funzione per la visualizzaizone di altri post nel feed principale
$(function visualizzaAltriPost() {
    $("#carica_altri_post").click(function () {
        pagina = pagina + 2;
        visualizzaPost(pagina);
    });
});