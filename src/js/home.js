import { Logged } from './autenticazione.js';

// richiama funzioni non appena il documento è caricato
$(document).ready(function() {
    VisualizzaClassifica();
});

// verifica che l'utente abbia effettuato l'accesso
//window.onpaint = logged();
window.onload = Logged();

const colorPrimary = '#e5af05';
const colorSecondary = '#00008b';

// classe per feedback grafici dopo l'interazioni con i post
class modalLike {
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

class modalDislike {
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
            do{
                let string = '<li><a href='+'#?'+out.results[i].id+'>'+out.results[i].original_name+'</a></li>';
                document.getElementById('classifica_serie').innerHTML = string;
            }while (i <= 4);
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