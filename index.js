
var kue = require('kue')

var connection=require('./util/connection')
var createJob=require('./util/create-job')
var processJob=require('./util/process-job')

var queue = kue.createQueue();
var pagesVisited={};
var count=0
var db;


connection('mongodb://localhost:27017/test',function(error,dbObj) {
    if (error)
      console.log(error)
    else
    {
      db=dbObj;
      queue.process('web crawler',5,function(job,done){
        processJob(queue,job,db,done)
      })
    }
  })

queue.promote();

process.on('uncaughtException',function(err){
  console.log(err)
})

createJob(queue,'http://www.example.com')







