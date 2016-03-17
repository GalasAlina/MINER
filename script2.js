// entities ---------------------------
var matrix = {
	width: 10,
	height: 10,
	bombAmount: 10
};

var cells = [];
var cellsCounter = 0;

function Cell(){
	this.isOpened = false;
	this.isBomb = false;
};

//------------------------------------------------------
function createMatrix(matrix) {
	matrix.cellAmount = matrix.width * matrix.height;
	var matrixDiv = document.getElementById('text');
	matrixDiv.innerHTML = '';
	for (var i = 0; i < matrix.cellAmount; i++) {
		cells[i] = new Cell();
		var div = document.createElement('div');
		div.className = 'cell';
		div.id = i;
//--------FUNCTION TO OPEN CELLS!!!!!------------------------------		

		div.onclick = function() {openCell(this.id);};
		div.oncontextmenu = function() {
			if (this.className == 'cell flag') {
				this.className = 'cell';
			} else {
				this.className = 'cell flag';
			}
			return false;
			};
//----------------end of the function-------------------------------------
		matrixDiv.appendChild(div);
	}
	
	var counter = 0;
	while (counter < matrix.bombAmount) {
		var bombIndex = Math.floor(Math.random() * matrix.cellAmount);
		if (!cells[bombIndex].isBomb) {
			cells[bombIndex].isBomb = true;
			counter++;
		} 
	}	
};

function openCell(id1) {
	
	if (cells[id1].isOpened) {return};
	cells[id1].isOpened = true;
	++cellsCounter;
	
	var div = document.getElementById(id1);
	if (cells[id1].isBomb) {
		//open all bombs
		for (var k = 0; k < matrix.cellAmount; k++) {
			if (cells[k].isBomb) {
				document.getElementById(k).className = 'cell bomb';
			}
		}
		div.innerHTML ='B!';
		alert ('LOOOOSER!!!');
		finish();
		return;
		//end of the game
	} else {
		var	closeBombs = countCloseBombs(id1);	//count bombs around this cell
		div.innerHTML = closeBombs;
		if(cellsCounter == matrix.cellAmount - matrix.bombAmount) {
			alert('!!!!');
			finish();
			return;
		};
		
		if (closeBombs == 0) {
		for (var l = -1; l <= 1; l++) {
		for (var m = - matrix.width; m <= matrix.width; m += matrix.width) {
			var index = parseInt(id1) + l + m;
			if ((index % matrix.width == 0 ^ id1 % matrix.width == 0 && 
						index % matrix.width == matrix.width - 1 ^ id1 % matrix.width == matrix.width - 1) == 1) {
				break;//do not count it, because it's on another side of field
			} else if (index >= 0 && index < matrix.cellAmount && !cells[index].isOpened && l + m != 0) {
				//cells[id1].isOpened = true;
				openCell(index);
			} 
		}
	}//todo recursion
		
	}
	}
	
	
};

function countCloseBombs(id2) {
	var closeBombs = 0;
		for (var l = -1; l <= 1; l++) {
			for (var m = - matrix.width; m <= matrix.width; m += matrix.width) {
				var index = +id2 + l + m;
				if (index % matrix.width == 0 ^ id2 % matrix.width == 0 && 
						index % matrix.width + id2 % matrix.width == matrix.width - 1) {
					//do not count it, because it's on another side of field
				} else if (index >= 0 && index < matrix.cellAmount 
						&& cells[index].isBomb) {
					closeBombs++;
				} 
			}
		}
		return closeBombs;
};

function finish() {
		document.getElementById('text').innerHTML = '';
		createMatrix(matrix);
		cellsCounter= 0;
}

//-----------------------------------------
createMatrix(matrix);
