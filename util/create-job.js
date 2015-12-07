var count=0;
module.exports=function (queue,url){
 if(count>=10)
    return;
  count++

  var job = queue.create('web crawler', {
    title: 'crawlling',
    url:url
  }).removeOnComplete( true ).attempts(3).backoff( {delay: 1000*3, type:'fixed'} ).ttl(1000*15).save();

  job.on('complete', function(result){
    console.log('Successfully crawled '+job.data.url+'  TotalLinks '+result);
  })

  job.on('failed attempt', function(errorMessage, doneAttempts){
    console.log('Job failed'+doneAttempts);
    job.state('inactive').save()
  })

  job.on('failed', function(errorMessage){
    console.log('Failed  ' +job.data.url+' '+errorMessage);
  })

  job.on('progress',function(progress, data){
  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
  });
}