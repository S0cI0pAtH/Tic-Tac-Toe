


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
            this.addStateButton(0);
            this.showResult(5)
        }else{
            alert("Game is already started!");
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
    precheck: function(){
        let self = this;
        if( self.isGameEnded ){
            alert("Game Over!");
            return false;
        }else if( !self.isGameStarted){
            alert("Game not Started yet!");
            return false;
        }else if (self.timerCount.timeLimitExcedded ){
            if( self.currentPlayer == 1 ){
                console.log("player 2 wins");
                self.showResult( 2 );
            }else{
                console.log("player 1 win");
                self.showResult(1);
            }
            self.isGameEnded = true;
            self.isGameStarted = false;
            self.timerCount.timeLimitExcedded = false;
            return false;
        }
        return true;
    }
});

Object.assign(Board.prototype, {
    getval: function(now){
        let self = now.boardObject;
        if( !self.precheck() ) return;

        let col = now.cellIndex;
        let row = now.parentNode.rowIndex;
    
        if( self.allCell[row][col].isValueSet == false ){
            self.allCell[row][col].isValueSet = true;
            if( self.currentPlayer == 1 ){
                self.currentPlayer = 2;
                self.allCell[row][col].playerId = 1;
                now.innerHTML = O;
            }else{
                self.currentPlayer = 1;
                self.allCell[row][col].playerId = 2;
                now.innerHTML = X;
            }
            self.currentState ++;
            this.copyAllCell(self.allCell );
            self.timerCount.doResetTimer();

            let check = self.isWinnerFound();
            if( check.winnerFound || self.currentState == 9){
                if( check.winnerFound ) this.showResult( check.id );
                else this.showResult(0);

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
