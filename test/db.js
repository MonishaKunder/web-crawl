'use strict'
var chai = require('chai')
var expect = chai.expect

var connection=require('../util/connection')
var addToDb=require('../util/add-to-db')

describe('Connection',function(){
	it('Should be a function',function(){
		expect(typeof connection).to .equal('function');
	})

	it('Should connect to mongodb',function(done){
		connection('mongodb://localhost:27017/test',function(error,db) {
    	expect(error).to.equal(null);
    	db.close()
    	done();
    })
	})
})

describe('addToDb',function(){
	it('Should be a function',function(){
		expect(typeof addToDb).to .equal('function');
	})

	it('Should store object in database',function(done){
		var obj={
			url:'http://www.example.com',
			name:'viewport',
			content:'initial-scale=1, minimum-scale=1, width=device-width'
		}
		connection('mongodb://localhost:27017/test',function(error,db) {
			addToDb(db,obj,function(err,doc){
				expect(err).to.equal(null);
				expect(doc.ops[0].url).to.equal('http://www.example.com');
				expect(doc.ops[0].name).to.equal('viewport');
				expect(doc.ops[0].content).to.equal('initial-scale=1, minimum-scale=1, width=device-width');
				done()
			});
		});
	});
})