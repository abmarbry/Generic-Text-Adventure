import * as processor from "./processor.js";

$( document ).ready(function() {
	
	//TO DO: Determine first JSON document to be fetched, add as parameter
	//TO DO: Remove constant when logic for finding files is implemented
	fetchJSON("../Game_Content/Story/000.json";);
});

var fetchJSON = function(fileName) {
	
	$.ajax({
	dataType: "text",
	url: fileName,
	})
    .done(function(data) {
		var json = $.parseJSON(data);
		console.log(json);
		loadSnippet(json);
    })
    .fail(function(e) {
		console.log(e);
		});
};
	

var loadSnippet = function(json){
	var rawData = json;
	
	//Insert putting data into Processor object,
	//calling something like Processor.getOutput() that returns Snippet object
	
	insertIntoDocument(rawData.body/*change to Processors HTML*/);
};

var goTo = function(fileName){
	/*
		1) If not exiting Scene, fetchJSON(fileName)
		2) If exiting a scene || act...
			a) go to correct pathname
			b) find metadata on act/scene/snippet
			c) fetchJSON(fileName)
	*/
};

var getFileNameWithType = function(){
	//TO DO: Determine which part of the act/story the user is at, add JSON extension
};

var insertIntoDocument = function(data) {
	$("#snippet").html(data);
};