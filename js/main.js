$( document ).ready(function() {
	//TO DO: Determine first JSON document to be fetched, add as parameter
	fetchJSON();
});

var fetchJSON = function() {
	$.ajaxSetup({beforeSend: function(xhr){
	if (xhr.overrideMimeType)
	{
		xhr.overrideMimeType("application/json");
	}
	}
	});
	
	
	$.getJSON(getFileName())
    .done(function(json) {
		loadSnippet(json);
    })
    .fail(function(e) {
		console.log(e);
		
    });
};	

var getFileName = function(){
	//TO DO: Determine which part of the act/story the user is at
	return "Game_Content/Story/000.json";
};

var loadSnippet = function(json){
	var rawData = json;
	
	
	
	//Insert putting data into Processor object,
	//calling something like Processor.getOutput() that returns HTML
	
	insertIntoDocument(rawData.body);
}

var insertIntoDocument = function(data) {
	$("#snippet").html(data);
}