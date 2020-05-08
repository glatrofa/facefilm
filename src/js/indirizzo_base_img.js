import {APIKEY} from './key.js';


let getBaseImageURL = function() {
            const baseURL = 'https://api.themoviedb.org/3/';
            let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); /* con questo URL otteniamo il file di configurazione */
            fetch(url)
            .then(res => res.json())
            .then((data)=>{ /* 'data' è tutto l'oggetto JSON restituito dall'API */
                baseImageURL = data.images.secure_base_url; /* secure usa l'https */
                configData = data.images;
                console.log('config:', data); /* tutto l'oggetto JSON viene stampato nella console */
                console.log('il file config è stato prelevato');
                return baseImageURL;
            })
            .catch(function(err){
                alert(err);
            });
        };

export {getBaseImageURL};