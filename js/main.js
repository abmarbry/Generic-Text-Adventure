import Processor from "./processor.js";
import Snippet from "./snippet.js";
import Locator from "./locator.js";

//singletons that I too wish it weren't global
var snippet;
var processor;
var locator;

$( document ).ready(function() {
	
	//TO DO: Determine first JSON document to be fetched, add as parameter
	//TO DO: Remove constant when logic for finding files is implemented
	processor = new Processor();
	locator = new Locator();
	fetch("Act_1/Scene_1/000");
	
});

var fetch = function(pathWithoutExtension){
	locator.fetchData(pathWithoutExtension).then(function(data){
		var json = $.parseJSON(data);
		loadSnippet(json);
	});
}
	

var loadSnippet = function(json){
	snippet = processor.translate(json);
	
	insertIntoDocument(snippet.getHtml());
	processor.clear();
	//TO DO LATER: hopefully modularize the listeners more or something
	setChoiceListeners();
};

var handleChoice = function(index){
	var choiceParameters = snippet.getChoiceParameters(index);
	
	fetch(choiceParameters.nextSnippet);
	//	TO DO:
	//	1) delegate consequences to State
	//X	2) delegate finding new snippet to Locator
}


var setChoiceListeners = function(){
	$('.choice').click(function(e){
		handleChoice(e.target.id);
	})
}

var insertIntoDocument = function(data) {
	$("#snippet").html(data);
}; 