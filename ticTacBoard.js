'use strict'
var O = '<p style="text-align: center; font-size:80px;">O</p>';
var X = '<p style="text-align: center; font-size:80px;">X</p>';
let id = 1;










Object.assign(Board.prototype,{
    isWinnerFound: function(){
        let winnerFound = false;
        let id = 0;
        for( let i = 0; i < 3; i++ ){
            let pidRow = this.allCell[i][0].playerId;
            let foundRow = true;
    
            let pidCol = this.allCell[0][i].playerId;
            let foundCol = true;
    
            for(let j = 0; j < 3; j++ ){
                if( this.allCell[i][j].playerId != pidRow ){
                    foundRow = false;
                }
                if( this.allCell[j][i].playerId != pidCol ){
                    foundCol = false;
                }
            }
            if( foundRow && pidRow != 0){
                id = pidRow; winnerFound = true;
            }
            if( foundCol && pidCol != 0){
                id = pidCol; winnerFound = true;
            }
        }
        if( (this.allCell[0][0].playerId ==  this.allCell[1][1].playerId ) && (this.allCell[1][1].playerId == this.allCell[2][2].playerId ) && ( this.allCell[2][2].playerId != 0) ) { id = this.allCell[2][2].playerId; winnerFound = true; }
        if( (this.allCell[0][2].playerId ==  this.allCell[1][1].playerId ) && (this.allCell[1][1].playerId == this.allCell[2][0].playerId ) && ( this.allCell[0][2].playerId != 0) ) { id = this.allCell[0][2].playerId; winnerFound = true; }

        return { id: id, winnerFound: winnerFound };
    }
    

});



Object.assign(Board.prototype,{
    startGame: function(){
        if( this.timerCount.timeLimitExcedded ){
            this.isGameEnded = true;
            this.isGameStarted = false;
        }
        if( !this.isGameStarted && this.isGameEnded  ){
            this.isGameStarted = true;
            this.isGameEnded = false;
            this.timeLimitExcedded = false;
            this.reset();
            this.timerCount.startTimer();
        }else{
            alert("Game is already started!");
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

Object.assign(Board.prototype,{
    copyAllCell: function( ob ){
        this.state[this.currentState] = [];
        for( let i = 0; i < 3; i++ ){
            this.state[this.currentState][i] = [];
            for( let j = 0; j < 3; j++ ){
                this.state[this.currentState][i][j] = Object.assign({}, ob[i][j] );
            }
        }
    }
});

Object.assign(Board.prototype,{
    showResult: function(id){

        let msg = "";
        if( id == -1 ){
            if( this.currentPlayer == 1 )id = 2;
            else id = 1;
            msg = "Player " + id + " wins!";
        }else if( id == 0 ){
            msg = "Match Drawn!";
        }else{
            msg = "Player " + id + "wins!";
        }
        result.innerHTML = msg;
    }
});


let ob = new Board("tiktokTable");
ob.loadGame();



