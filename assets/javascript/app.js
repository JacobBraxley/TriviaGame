var triviaItem = {
    question: "",
    possibleAnswers: [],
    correctAnswerIndex: 0,

    evaluateGuess: function(guess) {
        return (correctAnswerIndex === possibleAnswers.indexof(guess));
    }
}

var triviaGame = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,

    timeoutForAQuestion: 30,
    timeTilNextQuestion: 4,

    questions: [],
    questionIndex: 0,

    guess: function(guess) {
        //TODO - cancel Timeout
        var right = questions[questionIndex].evaluateGuess(guess);
        if(right) {
            correctAnswers++;
            //TODO - Video
        } else {
            incorrectAnswers++;
            //TODO - Video
        }
        loadNextQuestion();
    },

    timeout: function() {
        unanswered++;
        loadNextQuestion();
    },

    loadNextQuestion: function() {
        //TODO - domUpdates
        //TODO - start Timer
        if(++this.questionIndex == this.questions.length) {
            this.triggerEndScreen();
        }

    },

    triggerEndScreen: function() {
        //TODO - domUpdates
    },

    resetGame: function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.questionIndex = 0; 
        loadNextQuestion();
    }
}

//Question Definition Area
// jumbotron
// container
// animate
// shadowbox
// media sizing differences
// play video in background
// 
// 

//dom .on("click", ) Area.