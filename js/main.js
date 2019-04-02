import Processor from "./processor.js";

$( document ).ready(function() {
	
	//TO DO: Determine first JSON document to be fetched, add as parameter
	//TO DO: Remove constant when logic for finding files is implemented
	
	//locator.getLocation()
	fetchJSON("../Game_Content/Story/000.json");
});

var fetchJSON = function(fileName) {
	
	//TO DO: delegate to Locator?
	
	$.ajax({
	dataType: "text",
	url: fileName,
	})
    .done(function(data) {
		var json = $.parseJSON(data);
		loadSnippet(json);
    })
    .fail(function(e) {
		console.log(e);
		});
};
	

var loadSnippet = function(json){
	
	
	var processor = new Processor();
	
	processor.translate(json);
	
	//Insert putting data into Processor object,
	
	//insertIntoDocument(Processor.getOutput());
};

var goTo = function(fileName){
	/*
		TO DO: Delegate to Locator using Snippet data as input?
		
		1) If not exiting Scene, fetchJSON(fileName)
		2) If exiting a scene || act...
			a) go to correct pathname
			b) find metadata on act/scene/snippet
			c) fetchJSON(fileName)
	*/
};

var insertIntoDocument = function(data) {
	$("#snippet").html(data);
};