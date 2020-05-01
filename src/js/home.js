let modalLikeClicked = false;
let modalDislikeClicked = false;
const colorPrimary = '#e5af05';
const colorSecondary = '#00008b';

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