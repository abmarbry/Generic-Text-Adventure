import Snippet from "./snippet.js";

function Processor (){
	Processor.htmlStrings = [];
	
	Processor.snippet = new Snippet();
	
	
	//HELPER FUNCTIONS
	Processor.processString = function(json, string){
		var fetcher = new WordFetcher(string);
			while(!fetcher.isEmpty()){
				var word = fetcher.next();
				//TO DO: minimize json data sent
				Processor.handleAndInsert(json, word);
			}
	}
	

	Processor.handleAndInsert = function(json, word){
		var parsedHTML = word;
		
		//TO DO LATER: If there's a choice / variable in the body, but none in the actual JSON
		if(Processor.isChoiceOrVariable(word)){
			if(Processor.isChoice(word)){
				var id = Processor.findInnerID(word);
				var data = Processor.findChoiceContent(json.choices.content, id);
				
				//var choice = new Choice(data);
				//parsedHTML = choice.getHTML();
			}
			else if (Processor.isVariable(word)){
				//TO DO: Extract variable, insert into wordFetcher, handleAndInsert again
			}
		}
		Processor.snippet.add(parsedHTML);
	}
	 
	 
	Processor.isChoiceOrVariable = function(word){
		//TO DO LATER: possible fix somewhere for splitting a word if there's a \t or something at the end
		return (word.charAt(0) === '<' && word.charAt(word.length-1) === '>');
	}
	

	Processor.isChoice = function(word){
		var bigWord = word.toUpperCase();
		return (bigWord.indexOf("CHOICE") !== -1); 
	}
	

	Processor.isVariable = function(word){
		var bigWord = word.toUpperCase();
		return (bigWord.indexOf("VARIABLE") !== -1); 
	}
	
	
	Processor.findInnerID = function(word){
		var start = word.indexOf("(")+1;
		var end = word.lastIndexOf(")");
		
		return word.substring(start, end);
	}
	
	
	Processor.findChoiceContent = function(data, id){
		$.each(data, function(key, value){
			if(value.id === id){
				console.log(value);
				return value;
			}
		})
	}
	
};





Processor.prototype.translate = function(json){
	var body = json.body;
	var bodyPos = 0;

	while(bodyPos < body.length){	
		Processor.processString(json, body[bodyPos]);
		Processor.snippet.addBreak();		
		bodyPos++;
	}
	
	/*
		X	1) Fetch word in "body"
		X	2) If end of String, make paragraph break
		X		a) If no other Strings in the array, mark exit condition true.
			3) Else if choice, process choice consequences
			4) Else if variable, insert variable accordingly
			5) Else, normal word, paste accordingly
		X	6) Go to 1) until exit condition is met
	*/
};





//CHOICE
function Choice(){
}






//WORD FETCHER
function WordFetcher(string){
	this.string = string;
	this.pos = 0;
}

WordFetcher.prototype.next = function(){
	var wordFound = false;
	var pos = this.pos;
	var string = this.string;
	
	while(!wordFound && pos < string.length) {
		var c = string.charAt(pos);
		if(c === ' '){
			pos++;
			c = string.charAt(pos);
		}
		else {
			wordFound = true;
		}
	}
	
	if(!wordFound){
		return "";
	}
	else{
		var end = pos;
		c = string.charAt(end);
		while(c !== ' ' && end < string.length){
			end++;
			c = string.charAt(end);
		}
		
		var word = string.substring(pos, end);
		this.pos = end;
		
		return word;
	}
}

WordFetcher.prototype.isEmpty = function(){
	return !(this.pos < this.string.length);
}
//WORD FETCHER END
 

export default Processor;