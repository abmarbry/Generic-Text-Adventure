function Snippet(){
	this.htmlStrings = [];
	this.choiceNextSnippet = [];
	this.choiceConsequences = [];
	
	this.addChoiceHtmlString = function(index, body){
		var string = "<span class='choice' id='" + index + "'>" + body + "</span>";
		this.htmlStrings.push(string);
	}
}

Snippet.prototype.addHtmlChoice = function(nextSnippet, consequences, body){
	this.choiceNextSnippet.push(nextSnippet);
	this.choiceConsequences.push(consequences);
	//TO DO LATER: Handle if somehow they don't have the same length
	var index = this.choiceNextSnippet.length-1;
	this.addChoiceHtmlString(index, body);
}

Snippet.prototype.getChoiceParameters = function(index){
	return {nextSnippet: this.choiceNextSnippet[index],
			consequences: this.choiceConsequences[index]};
}

Snippet.prototype.add = function(string){
	this.htmlStrings.push(string);
}

Snippet.prototype.addBreak = function(){
	this.htmlStrings.push("</br></br>");
}


Snippet.prototype.getHtml = function(){
	var body = "";
	this.htmlStrings.forEach(function(string){
		body += string + ' ';
	});
	return body;
}

export default Snippet;