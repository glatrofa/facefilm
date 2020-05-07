import { Logged } from './autenticazione.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onpaint = logged();
//window.onload = Logged();

const colorPrimary = '#e5af05';
const colorSecondary = '#00008b';

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    VisualizzaClassifica();
});

// classe per feedback grafici dopo l'interazioni con i post
class ModalLike {
    constructor() {
        this.clicked = false;
    }

    static Click() {
        if(!this.clicked){
            $('#modal-like').modal('show');
            document.getElementById('post-like').style.color = colorSecondary;
            this.clicked = true;
        }else{
            $('#modal-like-removed').modal('show');
            document.getElementById('post-like').style.color = colorPrimary;
            this.clicked = false;
        }
    }
}

class ModalDislike {
    constructor() {
        this.clicked = false;
    }

    static Click() {
        if (!this.clicked){
            $('#modal-dislike').modal('show');
            document.getElementById('post-dislike').style.color = colorSecondary;
            this.clicked = true;
        }else{
            $('#modal-dislike-removed').modal('show');
            document.getElementById('post-dislike').style.color = colorPrimary;
            this.clicked = false;
        }
    }
}

// visualizza le 5 serie più popolari su tmdb
function VisualizzaClassifica() {
    let api = 'd278f4116f977c4c40da51f004832a5a';
    let url = 'https://api.themoviedb.org/3/tv/popular?api_key='+api+'&language=it&page=1';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Checkout this JSON! ', out)
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
$(function VisualizzaSerie() {
    $('#cerca_serie').keyup(function CercaNomeSerie() {
        let api = 'd278f4116f977c4c40da51f004832a5a';
        let url = 'https://api.themoviedb.org/3/search/tv?api_key='+api+'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
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
        //let idSerie = $('#post_serie :selected').val();
        //VisualizzaStagioni(api, idSerie);
        //$('#post_serie').change(VisualizzaStagioni());
    });
});

$(function VisualizzaStagioni() {
    $('#post_serie').change( function() {        
        let api = 'd278f4116f977c4c40da51f004832a5a';
        let idSerie = $('#post_serie :selected').val();
        let url = 'https://api.themoviedb.org/3/tv/'+idSerie+'?api_key='+api+'&language=it';
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

$(function VisualizzaEpisodi() {
    $('#post_stagione').change( function() {
        let api = 'd278f4116f977c4c40da51f004832a5a';
        let idSerie = $('#post_serie :selected').val();
        let numeroStagione = $('#post_stagione :selected').val();
        let url = 'https://api.themoviedb.org/3/tv/'+idSerie+'/season/'+numeroStagione+'?api_key='+api+'&language=it';
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