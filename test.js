'use strict'
var O = '<p style="text-align: center; font-size:80px;">O</p>';
var X = '<p style="text-align: center; font-size:80px;">X</p>';
let id = 1;

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
    getval: function(now){
        let self = now.boardObject;
        if( self.isGameEnded ){
            alert("Game Over!");
            return;
        }
        if( !self.isGameStarted){
            alert("Game not Started yet!");
            return;
        }
        if (self.timerCount.timeLimitExcedded ){
            if( self.currentPlayer == 1 ){
                console.log("player 2 wins");
                //result.innerHTML = "player 2 wins";
                self.showResult( 2 );
            }else{
                console.log("player 1 win");
                //result.innerHTML = "player 1 wins";
                self.showResult(1);
            }
            self.isGameEnded = true;
            self.isGameStarted = false;
            self.timerCount.timeLimitExcedded = false;
            return;
        }
        let col = now.cellIndex;
        let row = now.parentNode.rowIndex;
    
        if( self.allCell[row][col].isValueSet == false ){
            self.allCell[row][col].isValueSet = true;
            let savestr = "";
            if( self.currentPlayer == 1 ){
                self.currentPlayer = 2;
                self.allCell[row][col].playerId = 1;
                now.innerHTML = O;
                savestr = O;
            }else{
                self.currentPlayer = 1;
                self.allCell[row][col].playerId = 2;
                now.innerHTML = X;
                savestr = X;
            }
            self.currentState ++;    
            console.log("cur state "+self.currentState);

            this.copyAllCell(self.allCell );
            console.log(this.state[1]);


            self.timerCount.doResetTimer();

            let check = self.isWinnerFound();
            if( check.winnerFound ){
                //alert("winner found: " + check.id );
                console.log("winner found: " + check.id );
                //result.innerHTML = "player "+check.id+" wins";
                this.showResult( check.id );
                self.isGameEnded = true;
                self.isGameStarted = false;
                self.timerCount.timeLimitExcedded = true;
            }else if(self.currentState == 9 ){
                //alert("Match Drawn!");
                console.log("Match drawn!");
                //result.innerHTML = "Match drawn!";
                self.showResult(0);
                self.isGameEnded = true;
                self.isGameStarted = false;
                self.timerCount.timeLimitExcedded = true;
            }
            self.addStateButton(self.currentState);
            self.playerLabel.innerHTML = "Current Player : " + self.currentPlayer;

        }else{
            alert("cell is already selected!");
        }
    }
});

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

Object.assign(Board.prototype, {
    reset: function(){
        if( this.table != null ){
            for (let i = 0; i < this.table.rows.length; i++) {
                for (let j = 0; j < this.table.rows[i].cells.length; j++){
                    this.allCell[i][j].isValueSet = false;
                    this.allCell[i][j].playerId = 0;
                    this.allCell[i][j].cellObject.innerHTML = "";
                }
            }
        }
        this.currentPlayer = 1;
        this.currentState = 0;
        this.state = [];
    }
});


Object.assign(Board.prototype,{
    addStateButton: function(stateNo){
        let str = "";
        for( let i = 1; i <= stateNo; i++ ){
            str += '<button type="button" onclick="ob.goToState('+ i + ')">state'+i+'</button>';
        }
        this.stateButton.innerHTML = str;
    }

});
Object.assign(Board.prototype,{
    goToState: function(stateNo){
        console.log("state asche " + stateNo);
        for( let i = 0; i < 3; i++ ){
            for( let j = 0; j < 3; j++ ){
                this.allCell[i][j].playerId = this.state[stateNo][i][j].playerId;
                this.allCell[i][j].isValueSet = this.state[stateNo][i][j].isValueSet;
                this.allCell[i][j].cellObject.innerHTML = ( this.state[stateNo][i][j].playerId == 0 )? "": ( this.state[stateNo][i][j].playerId == 1 )? O: X;
                console.log(this.state[stateNo][i][j].playerId);
                
            }
        }
        this.currentPlayer = (stateNo % 2 == 0 )? 1: 2;
        this.currentState = stateNo;
        if( !this.isGameEnded ) this.addStateButton(stateNo);
        this.playerLabel.innerHTML = "Current Player : " + this.currentPlayer;
        

    }
});

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
        // if( this.timerCount.timeLimitExcedded == true ){
        //     this.timerCount.startTimer();
        // }
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
        console.log("printing");
        for( let i = 0; i < 3; i++ ){
            this.state[this.currentState][i] = [];
            for( let j = 0; j < 3; j++ ){
                this.state[this.currentState][i][j] = Object.assign({}, ob[i][j] );
            }
        }

        // console.log("all at once");

        // for( let k = 1; k <= this.currentState; k++ ){
        //     console.log("state " + k );
        //     for( let i = 0; i < 3; i++ ){
        //         for( let j = 0; j < 3; j++ ){
        //             console.log("at cell " + i + " " + j );
        //             console.log( this.state[this.currentState][i][j].playerId)
        //         }
        //     }
        // }

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



