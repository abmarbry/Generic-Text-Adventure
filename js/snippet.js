function Snippet(){
	this.htmlStrings = [];
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