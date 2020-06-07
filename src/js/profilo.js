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
  mostraDatiUtente();
  mostraPostUtente();
  scrollHandler();
});

// visualizza nella pagina le informazioni dell'utente
function mostraDatiUtente() {
  $.ajax({
    type: 'POST',
    url: '../php/profilo.php',
    crossOrigin: true,
    dataType: 'json',
    success: function (data) {
      console.log('SUCCESS \n'+ JSON.stringify(data,null,2));
      $("#nome_utente").text(data["nomeUtente"]);
      $("#nome").text(data["nome"].toLowerCase());
      $("#cognome").text(data["cognome"].toLowerCase());
      $("#data_nascita").text(dataEuropea(data["data_nascita"]));
      $("#nazione").text(data["nazione"]);
      $("#email").text(data["email"]);
      $("#saluto").text("Ciao "+ data["nome"].toLowerCase() +" !");
    },
    error: function (data) {
      console.log('ERROR '+ data);
      snackbarErrore("Si &egrave; verificato un errore");
    }
  });
}

// mostra i post più recenti dell'utente
function mostraPostUtente() {
  $.ajax({
      type: 'POST',
      url: '../php/ottieni_post.php',
      crossOrigin: true,
      data: {
          pagina: pagina,
          profilo: true
      },
      dataType: 'json',
      success: function (data) {
          console.log("paginazione successo " + JSON.stringify(data) + "\n" + typeof data + "\n" + data.length); //data è un Object e non ha la proprietà length
          //document.getElementById("sezione_post").innerHTML += generaHeader(data.nomeUtente, data.idPost, data.immagine)+generaBody(data.data, data.titolo, data.testo, data.idSerie, data.stagione, data.episodio)+generaFooter(data.idPost, data.idSerie, data.like, data.dislike, data.numeroCommenti);
          //document.getElementById("sezione_post").innerHTML = "";
          let i;
          for (i = 0; i < data.length; i++) {
              document.getElementById("sezione_post").innerHTML += generaHeader(data[i].nomeUtente, data[i].idPost, data[i].immagine)+generaBody(data[i].data, data[i].titolo, data[i].testo, data[i].idSerie, data[i].stagione, data[i].episodio)+generaFooter(data[i].idPost, data[i].idSerie, data[i].like, data[i].dislike, data[i].numeroCommenti);
          }
          // aggiorna il numero di mi piace del post
          $(function aggiornaMiPiace() {
              $("a[name='post_like']").click(function (event) {
                  $.ajax({
                      type: 'POST',
                      url: '../php/aggiorna_contatore_post.php',
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
                      url: '../php/aggiorna_contatore_post.php',
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
                      url: '../php/segnala_post.php',
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
                      url: '../php/ottieni_commenti.php',
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
                                      url: '../php/pubblica_commento.php',
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

// funzione per la visualizzaizone di altri post nel feed principale
$(function visualizzaAltriPost() {
  $("#carica_altri_post").click(function () {
      pagina = pagina + 2;
      mostraPostUtente();
  });
});

// Funzione che formatta le date in formato europeo
function dataEuropea(data) {
    let giorno = data.substring(8);
    let mese = data.substring(5,7);
    let anno = data.substring(0,4);
    return data = giorno + ' / ' + mese + ' / ' + anno;
}