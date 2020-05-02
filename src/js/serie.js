function Actor(id,name){
  this.id=id;
  this.name=name;
}

var actorName;

function getActor(actorName){
return fetch('https://api.themoviedb.org/3/search/person?api_key=d278f4116f977c4c40da51f004832a5a&language=it&query=${actorName}&page=1&include_adult=false=FwUKzu-PwJk')
.then(function(res){
  return res.json();
})


}