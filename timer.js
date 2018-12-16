'use strict'
function timer(_time, _textId){
    this.timeLimit = _time;
    this.textId = _textId;
    this.stopTimer = false;
    this.resetTimer = false;
    this.timeLimitExcedded = false;
    this.counter = _time;
}

Object.assign(timer.prototype,{
    countDown: function(){
        return function () {
            console.log(this.counter);
            if( this.resetTimer == true ){
                this.counter = this.timeLimit;
                this.resetTimer = false;
            }
            if( this.counter == 0 ){
                this.timeLimitExcedded = true;
                return 0;
            }else{
                return this.counter--;
            }
        };
    }()
});

Object.assign(timer.prototype,{
    
    startTimer: function(){
        console.log("starting");
        let self = this;
        function abcd() {
            if(self.stopTimer == true || self.timeLimitExcedded == true ){
                return;
            }
            let value = self.countDown();
            if( value == 0 ) value = "Time Out";
            document.getElementById(self.textId).innerHTML = value;
    
            if( value == "Time Out" ){
                self.timeLimitExcedded == true;
                self.boardObject.showResult(-1);
                //tem.startTimer();
            }else{
                setTimeout(abcd, 1000);
            }
            
        };
        this.counter = this.timeLimit;
        self.timeLimitExcedded = false;

        abcd();
    }

});
Object.assign(timer.prototype,{

    doStopTimer: function(){
        console.log("here");
        this.stopTimer = true;
        this.timeLimitExcedded = true;
    }
});

Object.assign(timer.prototype,{
    doResetTimer: function(){
        this.resetTimer = true;
    }
});


// let tem = new timer(5, "counter" );
// tem.startTimer();




