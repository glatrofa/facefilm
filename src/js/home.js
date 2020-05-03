import { logged } from './autenticazione.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onpaint = logged();
window.onload = logged();

const colorPrimary = '#e5af05';
const colorSecondary = '#00008b';

// classe per feedback grafici dopo l'interazioni con i post
class modalLike {
    constructor() {
        this.clicked = false;
    }

    static click() {
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

    static click() {
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

/*
let modalLikeClicked = false;
let modalDislikeClicked = false;

function modalLikeCLick() {
    if (!modalLikeClicked){
        $('#modal-like').modal('show');
        document.getElementById('link-like').style.color = colorSecondary;
        modalLikeClicked = true;
    }        
    else{
        $('#modal-like-removed').modal('show');
        document.getElementById('link-like').style.color = colorPrimary;
        modalLikeClicked = false;
    }
}

function modalDislikeCLick() {
    if (!modalDislikeClicked){
        $('#modal-dislike').modal('show');
        document.getElementById('link-dislike').style.color = colorSecondary;
        modalDislikeClicked = true;
    }        
    else{
        $('#modal-dislike-removed').modal('show');
        document.getElementById('link-dislike').style.color = colorPrimary;
        modalDislikeClicked = false;
    }
}

*/