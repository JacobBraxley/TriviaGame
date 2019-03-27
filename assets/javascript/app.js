const TriviaQuestion = class  TriviaItem {
    constructor(q = "Are you a Teapot?", answerIndex = 0, options = ["Yes!"]) {
        this.question = q;
        this.correctAnswerIndex = answerIndex;
        this.possibleAnswers = options;
    }

    evaluateGuess(guess) {
        return (this.correctAnswerIndex === this.possibleAnswers.indexof(guess));
    }
}

var currentlyShowing = false;

function questionTime(show = true) {
    if(currentlyShowing != show) {
        if(show) {
            $("#start").addClass("d-none");
            $(".timeSection").removeClass("d-none");
            $(".question").removeClass("d-none");
            $(".option1").removeClass("d-none");
            $(".option2").removeClass("d-none");
            $(".option3").removeClass("d-none");
            $(".option4").removeClass("d-none");
        } else {
            $("#start").removeClass("d-none");
            $(".timeSection").addClass("d-none");
            $(".question").addClass("d-none");
            $(".option1").addClass("d-none");
            $(".option2").addClass("d-none");
            $(".option3").addClass("d-none");
            $(".option4").addClass("d-none");
        }
    }
}

var triviaGame = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,

    timeoutForAQuestion: 4,
    timeTilNextQuestion: 2,

    questions: [],
    questionIndex: -1,

    timer: undefined,

    guess: function(guess) {
        clearInterval(this.timer);
        var right = this.questions[this.questionIndex].evaluateGuess(guess);
        if(right) {
            this.correctAnswers++;
            //TODO - Video
            setTimeout(this.loadNextQuestion, this.timeTilNextQuestion * 1000);
        } else {
            this.incorrectAnswers++;
            //TODO - Video
            setTimeout(this.loadNextQuestion, this.timeTilNextQuestion * 1000);
        }
        loadNextQuestion();
    },

    tick: function() {
        var time = Number($("#timeLeft").text()) - 1;
        $("#timeLeft").text(time);

        if(time <= 0) { //timeout, fail condition.
            debugger;
            clearInterval(this.timer);
            this.unanswered++;
            //TODO - load timeout video.
            setTimeout(this.loadNextQuestion, this.timeTilNextQuestion * 1000);
        }
    },

    loadNextQuestion: function() {
        questionTime(true);
        //Boring but we're just going to keep iterating through the list.
        this.questionIndex++;
        if(this.questionIndex >= this.questions.length) {
            this.triggerEndScreen();
        }
        else {
            $("#timeLeft").text(this.timeoutForAQuestion);
            $(".question").text(this.questions[this.questionIndex].question);
            $(".option1").text(this.questions[this.questionIndex].possibleAnswers[0]);
            $(".option2").text(this.questions[this.questionIndex].possibleAnswers[1]);
            $(".option3").text(this.questions[this.questionIndex].possibleAnswers[2]);
            $(".option4").text(this.questions[this.questionIndex].possibleAnswers[3]);
           
            this.timer = setInterval(this.tick, 1000);
            if(++this.questionIndex == this.questions.length) {
                this.triggerEndScreen();
            }
        }
    },

    triggerEndScreen: function() {
        questionTime(false);

    },

    resetGame: function() {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.questionIndex = -1; 
        loadNextQuestion();
    }
}

//Question Definition Area
function setQuestions() {
    triviaGame.questions = [
        new TriviaQuestion("Which of the component is used for a primary display area?", 1, ["bigscreen", "jumbotron", "maindisplay", "div"]),
        new TriviaQuestion("Which of the following is used to define a bootstrap grid?", 2, ["box", "grid", "container", "object"]),
        new TriviaQuestion("Which do you use to change the style of an item from one state to another?", 0, ["animate", "new", "change", "overwrite"]),
        new TriviaQuestion("Which class do you include to create shadow boxes with Bootstrap?", 0, ["fade", "depth", "shadow", "borderbox"]),
        new TriviaQuestion("Which of the following do you use to control the look of your website for different devices?", 1, ["@display", "@media", "@displaysize", "@query"]),
        new TriviaQuestion("Which do you use to add a video to your website?", 3, ["htmltube", "media", "play", "video"]),
        new TriviaQuestion("Which of the following display types should you use to make a responsive element?", 0, ["flex", "block", "inline", "none"]),
        new TriviaQuestion("Which of the following should you use to select a class?", 2, ["#", "@", ".", "$"])
    ];
}
setQuestions();  //There isn't much use for defining the function at this time.

//dom events
$("#start").on("click", function() {
    triviaGame.loadNextQuestion();
});