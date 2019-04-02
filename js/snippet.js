function Snippet(){
	this.htmlStrings = [];
}

Snippet.prototype.add = function(string){
	this.htmlStrings.push(string);
}

Snippet.prototype.addBreak = function(){
	this.htmlStrings.push("</br>");
}


Snippet.prototype.get = function(){
	//TO DO
	//After implementing, ensure proper spaces between words.
	return this.htmlStrings;
}

export default Snippet;