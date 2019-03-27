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
// jumbotron,  Which of the component is used for a primary display area?   bigscreen, jumbotron, maindisplay, div
// container, Which of the following is used to define a bootstrap grid?  box, grid, container, object
// animate,  Which do you use to change the style of an item from one state to another? animate, new, change, overwrite
// shadowbox Which class do you include to create shadow boxes with Bootstrap?  fade, depth, shadow, borderbox
// media sizing differences Which of the following do you use to control the look of your website for different devices? @display, @media, @displaysize, @query
// play video Which do you use to add a video to your website?  htmltube, media, play, video
// flexbox, Which of the following display types should you use to make a responsive element?  flex, block, inline, none
// class, Which of the following should you use to select a class? #, @, ., $

function resetQuestions() {
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
//dom .on("click", ) Area.
