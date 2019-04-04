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
	
	fetch({
		nextAct: "Act_1",
		nextScene: "Scene_1",
		nextSnippet: "000"
		});
	
});

var fetch = function(pathData){
	var pathWithoutExtension = locator.formatPathData(pathData);
	
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
	processor.handleChoice(choiceParameters.consequences);
	
	fetch(choiceParameters.next);
}


var setChoiceListeners = function(){
	$('.choice').click(function(e){
		handleChoice(e.target.id);
	})
}

var insertIntoDocument = function(data) {
	$("#snippet").html(data);
}; 