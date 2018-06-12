var array = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
var options = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[3, 4, 5],
	[6, 7, 8],
	[6, 4, 2],
	[1, 4, 7],
	[2, 5, 8]
]; 
var first = [0, 2, 6, 8];  
var userChoice = "X";
var compChoice = "O";
var firstMove;
var playersTurn = false;
var squaresChosenByComputer = [];
var squaresChosenByPlayer = [];
var backgroundColor = $("#0").css("background-color");
var results = [0, 0];

function chooseXO() {
	reset();
	userChoice = prompt("Do you want to be X or O?", "X");
	userChoice = userChoice.toUpperCase();
	if (!userChoice) { 
		alert("You must type either 'X' or 'O'");
		chooseXO();
	} else if (userChoice !== null) {
		if (userChoice === "X") {
			compChoice = "O";
		} else if (userChoice === "O") {
			compChoice = "X";
		} else {
			alert("You must type either 'X' or 'O'");
			chooseXO();
		}
	}
}

$("#choice").click(function() {
	chooseXO();
});
$("#0").click(function() {
	playersMove(0);
});
$("#1").click(function() {
	playersMove(1);
});
$("#2").click(function() {
	playersMove(2);
});
$("#3").click(function() {
	playersMove(3);
});
$("#4").click(function() {
	playersMove(4);
});
$("#5").click(function() {
	playersMove(5);
});
$("#6").click(function() {
	playersMove(6);
});
$("#7").click(function() {
	playersMove(7);
});
$("#8").click(function() {
	playersMove(8);
});

function checkMove(who, val) {
	if (who.indexOf(val) < 0) {
		return true;
	}
}

function removeOption(val) {
	array.splice(array.indexOf(val), 1);
}

function superbag(sup, sub) {
	sup.sort();
	sub.sort();
	var i, j;
	for (i = 0, j = 0; i < sup.length && j < sub.length;) { 
		if (sup[i] < sub[j]) {
			++i;
		} else if (sup[i] == sub[j]) {
			++i;
			++j;
		} else {
			return false;
		}
	}
	return j == sub.length; 
}

//reset lai mang trong de choi tiep
function reset() {
	array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	squaresChosenByComputer = [];
	squaresChosenByPlayer = [];
	$("#message").html("");
	for (var i = 0; i < array.length; i++) {
		$("#" + i).html("");
		$("#" + i).css("background-color", backgroundColor);
	}
}

//Mau khi 3 o thang hang
function showWinningThree(arg) {
	for (var i = 0; i < arg.length; i++) {
		$("#" + arg[i]).css("background-color", "yellow");
	}
}

//Check nguoi thang
function finished(who, arr) {
	if(arr.length >= 3) { 
		for(var i = 0; i < options.length; i++) {
			if(superbag(arr, options[i])) { 
				setTimeout(function() { 
					showWinningThree(options[i]);
					$("#message").html(who + " won!")
					if(who === "Computer") {
						results[0] = results[0] + 1;
						$("#computerResults").html("Computer: " + "<span id='number'>" + results[0] + "</span>");
					}else if (who === "You") {
						results[1] = results[1] + 1;
						$("#yourResults").html("You: " + "<span id='number'>" + results[1] + "</span>");
					}
				}, 2000);

				//Dung khi co 1 ng thang
				setTimeout(function() {
					reset();
				}, 3500);

				//may tinh bat dau truoc
				if(who === "Computer" || who === "You") {
					setTimeout(function() {
						$(compFirstChoice()).html(compChoice);
					}, 4000);
					return;
				} else {
					playersTurn = true;
					return;
				}
			}
		}
	}
	
	//Reset het 9 o ma khong ai thang
	if (array.length === 0) { 
		setTimeout(function() {
			reset();
		}, 3500);; 

		if (who === "Computer") {
			$("#message").html("No Winner.<br>Computer's turn.");
			setTimeout(function() {
				$(compFirstChoice()).html(compChoice);
			}, 1000);
		} else {
			setTimeout(function() {
				playersTurn = true;
			}, 1000);
			$("#message").html("No Winner.<br>It's your turn.");
		}
	}
	
	else {
		if (who === "You") {
			setTimeout(function() {
				compMove();
			}, 500);
		} else {
			setTimeout(function() {
				playersTurn = true;
			}, 500);
			return;
		}
	}
}

//nguoi choi dau tien trong game
function compFirstChoice() {
	firstMove = first[Math.floor(Math.random() * first.length)]; 
	squaresChosenByComputer.push(firstMove);
	removeOption(firstMove);
	$("#" + firstMove).html(compChoice);
	playersTurn = true;
}

function whoStart(){
	reset();
	whoFirst = prompt("Who first: 1-You, 2-Computer", "1");
	if(whoFirst == "2"){
		compFirstChoice();
	}else if(whoFirst == "1"){
		playersTurn = true;
	}else{
			alert("You must type either '1' or '2'");
			whoStart();
		}
}

//May tinh di chuyen
function compMove() {
	var possibles = [];
	if (playersTurn === false) {
		//console.log("computer's turn");
		for (var i = 0; i < options.length; i++) {
			for (var j = 0; j < squaresChosenByComputer.length; j++){
				if (options[i].indexOf(squaresChosenByComputer[j]) > 0){
					possibles = options[i].filter(function(value) {
						return value !== squaresChosenByComputer[j];
					});
				}
				//trong 3 lan di chuyen comp khong dc 3 o
				if (j === squaresChosenByComputer.length - 1 && possibles.length === 2){
					for (var k = 0; k < possibles.length; k++) {
						if (checkMove(squaresChosenByPlayer, possibles[k])){
							if (checkMove(squaresChosenByComputer, possibles[k])) {
								$("#" + possibles[k]).html(compChoice);
								squaresChosenByComputer.push(possibles[k]);
								removeOption(possibles[k]);
								finished("Computer", squaresChosenByComputer);
								possibles.length = 0; 
								return;
							}
						}
					}
				}
					
				if (j === squaresChosenByComputer.length - 1 && possibles.length === 1){ 
					if (checkMove(squaresChosenByPlayer, possibles[0])){
						$("#" + possibles[0]).html(compChoice);
						squaresChosenByComputer.push(possibles[0]);
						removeOption(possibles[0]);
						finished("Computer", squaresChosenByComputer);
						possibles.length = 0;
						return;
					}
				}
			}
		}
		//console.log("random selection");
		var move = array[Math.floor(Math.random() * array.length)];
		$("#" + move).html(compChoice);
		squaresChosenByComputer.push(move);
		removeOption(move);
		finished("Computer", squaresChosenByComputer);
	}
}


function doTheFollowing(mark, choice, label, who) {
	$("#" + mark).html(choice);
	squaresChosenByComputer.push(update);
	removeOption(remove);
	finished(label, who);
}

//Nguoi choi di chuyen
var playersMove = function(squareClicked) {
	if (playersTurn === true) {
		if (checkMove(squaresChosenByPlayer, squareClicked)) {
			$("#" + squareClicked).html(userChoice);
			squaresChosenByPlayer.push(squareClicked);
			removeOption(squareClicked);
			playersTurn = false;
			finished("You", squaresChosenByPlayer);
		}
	}
}

