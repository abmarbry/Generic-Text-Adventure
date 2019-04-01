//Line 2 or 4, which one is better?
//var Processor = {};

function Processor (){};

Processor.prototype.translate = function(json){
	var body = json.body;
	console.log(body);
	var bodyPos = 0;
	var bodyLength = body.length;
	
	while( bodyPos < bodyLength){
		
		var fetcher = new WordFetcher(body[bodyPos]);
		while(!fetcher.isEmpty()){
			var word = fetcher.next();
		}
		
	}
	
	/*
		1) Fetch word in "body"
		2) If end of String, make paragraph break
			a) If no other Strings in the array, mark exit condition true.
		3) Else if choice, process choice consequences
		4) Else if variable, insert variable accordingly
		5) Else, normal word, paste accordingly
		6) Go to 1) until exit condition is met
	*/
 };


//WORD FETCHER
function WordFetcher(string){
	this.string = string;
	this.stringPos = 0;
}

WordFetcher.prototype.next = function(){
	//TO DO
	return "";
}

WordFetcher.prototype.isEmpty = function(){
	//TO DO
	return true;
}
 

export default Processor;