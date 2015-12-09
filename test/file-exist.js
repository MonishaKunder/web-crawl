'use strict'
var chai = require('chai')
var expect = chai.expect
var fs = require('fs')
var path = require('path')

describe('Project folder',function(){
	it('Should contain create-job.js in util folder',function(done){
		fs.lstat(path.join(__dirname, '../util/create-job.js'),function(err,obj){
  			expect(obj).to.not.equal(undefined);
  			done();
		})
	})
  it('Should contain process-job.js in util folder',function(done){
		fs.lstat(path.join(__dirname, '../util/process-job.js'),function(err,obj){
  		expect(obj).to.not.equal(undefined);
  		done();
		})
	})
})