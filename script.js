var array[0,1,2,3,4,5,6,7,8];
var option=[
	[0,1,2]
	[0,3,6]
	[0,4,8]
	[3,4,5]
	[6,7,8]
	[6,4,2]
	[1,4,7]
	[2,5,8]
];
var user="X";
var com="0";

function move(){
	var a = document.getElementById("movefm").textContent;
	reset();
	user = prompt("Do you want to be X or O: ", "Choose X or O");
	
}

function getValue(){
	var retVal = prompt("Do you want to be X or O: ", "Choose X or O");
	document.write("You are: " + retVal);
}