var kue = require('kue')
var q=new kue
//console.log(q)
q.complete(function(err, ids){
  ids.forEach( function( id ) {
    kue.Job.get(id, function(err, job){
    job.remove( function(){
      console.log( 'removed ', job.id );
    });
  });
});
console.log('complete  '+ids.length)
})
q.active(function(err, ids){
  ids.forEach( function( id ) {
    kue.Job.get(id, function(err, job){
    job.remove( function(){
      console.log( 'removed ', job.id );
    });
  });
});
console.log('active   '+ids.length)
})

q.inactive(function(err, ids){
  ids.forEach( function( id ) {
    kue.Job.get(id, function(err, job){
    job.remove( function(){
      console.log( 'removed ', job.id );
    });
  });
});
console.log('inactive  '+ids.length)
})
q.failed(function(err, ids){
  ids.forEach( function( id ) {
    kue.Job.get(id, function(err, job){
    job.remove( function(){
      console.log( 'removed ', job.id );
    });
  });
});
console.log('failed  '+ids.length)
})


