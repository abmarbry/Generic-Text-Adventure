
Locator.prototype.fetchData = function(fileExtension){
	var fileName = this.BASE_FILE + fileExtension + ".json";

	return $.ajax({
	dataType: "text",
	url: fileName,
	})
    .done(function(data) {
		return data;	
    })
    .fail(function(e) {
		//TO DO LATER: fix this
		console.log(e);
		return e;
		});
}

function Locator(){
	this.BASE_FILE = "../Game_Content/Story/"
}


export default Locator;

/*

Locator.prototype.parse = function(string){
}

Locator.changeAct = function(actName){
}

Locator.changeScene = function(sceneName){
}

Locator.changeSnippet = function(snippetName){
}

Locator.getLocation = function(){
}
*/