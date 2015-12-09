'use strict'
var chai = require('chai')
var expect = chai.expect

var kue = require('kue');

var connection=require('../util/connection')
var addToDb=require('../util/add-to-db')
var createJob=require('../util/create-job')
var processJob=require('../util/process-job')

describe('createJob',function () {
	it('Should be a function',function(){
		expect(typeof createJob).to.equal('function');
	})

	it('Should create job for url',function(done){
		var queue = kue.createQueue();
		var job=createJob(queue,'http://www.example.com')
		expect(job.data.url).to.equal('http://www.example.com')
		done();
	})
})

describe('processJob',function () {
	var db;
	before(function(done){
		connection('mongodb://localhost:27017/test',function(error,dbObj) {
			db=dbObj;
			done();
		});
	})

	it('Should be a function',function(){
		expect(typeof processJob).to.equal('function');
	})

	it('Should process the job',function(doneIt){
		var queue = kue.createQueue();
		var noOfJobs;
		var job=createJob(queue,'http://www.example.com')
		queue.process('web crawler',3,function(job,done){
      processJob(queue,job,db,done)
  	})
  	doneIt()
	})
	
})

