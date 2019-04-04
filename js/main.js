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
	
	fetch("TITLE");
	
});

//TO DO LATER: refactor fetch so that it as a callback function instead of loadSnippet() so the fn doesn't have to be so bulky
var fetch = function(pathData){
	locator.fetchData(pathData).then(function(data){
		var json = $.parseJSON(data);
		loadSnippet(json);
	});
}

var loadSnippet = function(json){
	
	snippet = processor.translate(json);
	
	
	if(!snippet.choiceIsOutside){
		insertIntoSnippet(snippet.getHtml());
	}
	else{
		insertIntoOutside(json.title, json,subtitle, snippet.getHtml());
	}
	
	processor.clear();
	//TO DO LATER: hopefully modularize the listeners more or something
	setChoiceListeners();
};

var handleChoice = function(index){
	//TO DO LATER: store choice parameters somewhere else so snippet doesn't have to be global
	var choiceParameters = snippet.getChoiceParameters(index);
	processor.handleChoice(choiceParameters.consequences);
	
	if(!choiceParameters.itOutside()){
		var pathWithoutExtension = locator.formatPathData(choceParameters.next);
	}
	
	fetch(choiceParameters.next);
}


var setChoiceListeners = function(){
	$('.choice').click(function(e){
		handleChoice(e.target.id);
	})
}

var insertIntoSnippet = function(data) {
	$("#snippet").html(data);
}; 

var insertIntoSnippet = function(title, subtitle, body){
	console.log("cool");
}