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