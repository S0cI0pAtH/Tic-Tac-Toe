'use strict'
var O = '<p style="text-align: center; font-size:80px;">O</p>';
var X = '<p style="text-align: center; font-size:80px;">X</p>';

function cell(_row, _col){
    this.row = _row;
    this.col = _col;
}

function Board(_tableName){
    this.allCell = [];
    this.tableName = _tableName;
    this.table = document.getElementById(_tableName);
    this.currentPlayer = 1;
    this.currentState = 0;
    this.isGameStarted = false;
    this.isGameEnded = true;
    this.state = [];
    this.timerCount = new timer(3,"counter");
    this.timerCount.boardObject = this;
    this.startButton = document.getElementById("startButton");
    this.stateButton = document.getElementById("stateButton");
    this.result = document.getElementById("result");
    this.playerLabel = document.getElementById("player");
}

Object.assign(Board.prototype, {
    loadTable: function(){
        if (this.table != null) {
            for (let i = 0; i < this.table.rows.length; i++) {
                this.allCell[i] = [];
                for (let j = 0; j < this.table.rows[i].cells.length; j++){
                    let ob = new cell(i, j );
                    ob.isValueSet = false;
                    ob.playerId = 0;
                    ob.cellObject = this.table.rows[i].cells[j];
                    this.allCell[i][j] = ob;
                    this.allCell[i][j].cellObject.innerHTML = "";
                    this.table.rows[i].cells[j].boardObject = this;
                    this.table.rows[i].cells[j].onclick = function () { this.boardObject.getval(this); };
                }
            }
        }
    }
});

Object.assign(Board.prototype,{
    loadGame: function(){
        this.loadTable();
        this.startButton.boardObject = this;
        this.startButton.onclick = function(){ this.boardObject.startGame(); }
    }
});


let ob = new Board("tiktokTable");
ob.loadGame();










