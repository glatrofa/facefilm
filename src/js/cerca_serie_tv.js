import { Logged } from './autenticazione.js';
import {APIKEY} from './key.js';

// verifica che l'utente abbia effettuato l'accesso
//window.onload = Logged();

// effettua il redirect sulla pagina della serie selezionata
$('#cerca_serie_bottone').click(function CercaSerie() {
    //console.log('serie selezionata '+$('#mostra_nome_serie :selected').val());
    window.location.href = './serie_tv.html?id='+$('#mostra_nome_serie :selected').val()+'';
});

// ricerca nel db tutte le serie comprendenti nel nome i caratteri inseriti nel form
$('#cerca_serie').keyup(function CercaNomeSerie() {
    let url = 'https://api.themoviedb.org/3/search/tv?api_key='+ APIKEY +'&language=it&page=1&query='+$(this).val()+'&include_adult=true';
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //console.log('Checkout this JSON! ', data);
            //console.log('dimensione '+data.results.length);
            let i = 0;            
            let lista = '';
            // ritornano al massimo 20 risultato per volta
            while (data.results.length >= 1 && i < data.results.length) {
                lista += '<option value='+data.results[i].id+'>'+data.results[i].name+'</option>';
                i ++;
            }      
            if (data.results.length == 0)
                lista = '<option value='+'null'+'> --- </option>';
            document.getElementById('mostra_nome_serie').innerHTML = lista;
        })
        .catch(err => { throw err });
});