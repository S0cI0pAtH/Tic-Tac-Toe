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
    showResult: function(id){
        let msg = "";
        if( id == -1 ){
            if( this.currentPlayer == 1 )id = 2;
            else id = 1;
            msg = "Player " + id + " wins!";
        }else if( id == 0 ){
            msg = "Match Drawn!";
        }else if ( id >= 1 && id <= 2 ){
            msg = "Player " + id + " wins!";
        }
        this.result.innerHTML = msg;
    }
});