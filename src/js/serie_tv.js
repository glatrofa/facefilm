import { Logged } from './autenticazione.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onload = Logged();

// effettua il redirect sulla pagina della serie selezionata
$('#cerca_serie_bottone').click(function CercaSerie() {
    console.log('serie selezionata '+$('#mostra_nome_serie :selected').val());
});

// ricerca nel db tutte le serie comprendenti nel nome i caratteri inseriti nel form
$('#cerca_serie').keyup(function CercaNomeSerie() {
    //$('#target').html($(this).val());
    let api = 'd278f4116f977c4c40da51f004832a5a';
    let url = 'https://api.themoviedb.org/3/search/tv?api_key='+api+'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log('Checkout this JSON! ', out);
            console.log('dimensione '+out.results.length);
            let i = 0;            
            let lista = '';
            while (out.results.length >= 1 && i < out.results.length) {
                lista += '<option value='+out.results[i].id+'>'+out.results[i].name+'</option>';
                i ++;
            }      
            if (out.results.length == 0)
                lista = '<option value='+'null'+'> --- </option>';
            document.getElementById('mostra_nome_serie').innerHTML = lista;
        })
        .catch(err => { throw err });
});