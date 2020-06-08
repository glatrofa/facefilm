$(document).ready(function() {
    scrollHandler();
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
