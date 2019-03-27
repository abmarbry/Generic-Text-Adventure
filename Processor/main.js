$( document ).ready(function() {
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
		loadFirstSnippet(json);
    })
    .fail(function(e) {
		console.log(e);
		
    });
};	

var getFileName = function(){
	//TO DO
	return "Game_Content/Story/000.json";
};

var loadFirstSnippet = function(json){
	var rawData = json;
	
	console.log(rawData);
}