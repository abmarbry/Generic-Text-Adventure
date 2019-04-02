function Snippet(){
	this.htmlStrings = [];
	this.choiceNextSnippet = [];
	this.choiceConsequences = [];
	
	this.pushChoiceHtmlString = function(index, body){
		var string = "<span class='choice' onclick='handleChoice(" + index + ")'>" + body + "</span>";
		this.htmlStrings.push(string);
	}
}

Snippet.prototype.pushHTMLChoice = function(nextSnippet, consequences, body){
	this.choiceNextSnippet.push(nextSnippet);
	this.choiceConsequences.push(consequences);
	//TO DO LATER: Handle if somehow they don't have the same length
	var index = this.choiceNextSnippet.length-1;
	this .pushChoiceHtmlString(index, body);
}

Snippet.prototype.add = function(string){
	this.htmlStrings.push(string);
}

Snippet.prototype.addBreak = function(){
	this.htmlStrings.push("</br></br>");
}


Snippet.prototype.get = function(){
	var body = "";
	this.htmlStrings.forEach(function(string){
		body += string + ' ';
	});
	return body;
}

export default Snippet;