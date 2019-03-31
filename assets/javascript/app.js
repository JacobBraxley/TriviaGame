const TriviaQuestion = class TriviaItem {
    constructor(q = "Are you a Teapot?", answerIndex = 0, options = ["Yes!"]) {
        this.question = q;
        this.correctAnswerIndex = answerIndex;
        this.possibleAnswers = options;
    }

    evaluateGuess(guess) {
        debugger;
        return (this.correctAnswerIndex === this.possibleAnswers.indexOf(guess));
    }
}

const currentlyShowing = false;

function showQuestions() {
    $("#start").addClass("d-none");
    $(".timeSection").removeClass("d-none");
    $(".question").removeClass("d-none");
    $(".options").removeClass("d-none");
}

const triviaGame = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unanswered: 0,

    timeoutForAQuestion: 15,
    timeTilNextQuestion: 2,

    questions: [],
    questionIndex: -1,

    timer: undefined,

    answerQuestion: function (guess) {
        clearInterval(this.timer);
        const right = this.questions[this.questionIndex].evaluateGuess(guess);
        debugger;
        if (right) {
            this.correctAnswers++;
            confetti.start();

        } else {
            this.incorrectAnswers++;
            const audio = new Audio('assets/sounds/error.mp3');
            audio.play();
        }

        setTimeout(() => { this.loadNextQuestion() }, this.timeTilNextQuestion * 1000);
    },

    tick: function () {
        const time = Number($("#timeLeft").text()) - 1;
        $("#timeLeft").text(time);

        if (time <= 0) { //timeout, fail condition.
            const audio = new Audio('assets/sounds/confused.mp3');
            audio.play();

            clearInterval(this.timer);
            this.unanswered++;
            setTimeout(() => { this.loadNextQuestion(); }, 4000); //Set to 4 seconds because the sound I'm playing is 4 seconds.
        }
    },

    loadNextQuestion: function () {
        confetti.stop();
        this.questionIndex++;
        if (this.questionIndex >= this.questions.length) {
            this.triggerEndScreen();
        }
        else {
            $("#timeLeft").text(this.timeoutForAQuestion);
            $(".question").text(this.questions[this.questionIndex].question);
            $("#option1").text(this.questions[this.questionIndex].possibleAnswers[0]);
            $("#option2").text(this.questions[this.questionIndex].possibleAnswers[1]);
            $("#option3").text(this.questions[this.questionIndex].possibleAnswers[2]);
            $("#option4").text(this.questions[this.questionIndex].possibleAnswers[3]);

            this.timer = setInterval(() => { this.tick(); }, 1000);
        }
    },

    triggerEndScreen: function () {
        

        $(".timeSection").addClass("d-none");
        $(".options").addClass("d-none");
        $(".question").html(`
        All done, heres how you did!<br>
        Correct Answers: ${this.correctAnswers}<br>
        Incorrect Answers: ${this.incorrectAnswers}<br>
        Unanswered: ${this.unanswered}
        `);

        $("#start").text("Start over?");
        $("#start").removeClass("d-none");
    },

    resetGame: function () {
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.unanswered = 0;
        this.questionIndex = -1;

        setQuestions();
        this.loadNextQuestion();
    }
}

class ConfettiFeature {
    //This class requires jQuery and the following html/css
    // CSS
    // body {
    //     margin: 0;
    //     overflow: hidden;
    //   }

    //   .confettiArea {
    //     position: relative;
    //     min-height: 100vh;
    //   }

    //   [class|="confetti"] {
    //     position: absolute;
    //   }

    //   .redConfetti {
    //     background-color: #E94A3F;
    //   }

    //   .yellowConfetti {
    //     background-color: #FAA040;
    //   }

    //   .blueConfetti {
    //     background-color: #5FC9F5;
    //   }

    // HTML
    // a class of confettiArea in the appropriate area.

    constructor(count = 250, width = 8, ratio = 0.4) {
        this.confettiAcount = count;
        this.confettiWidth = width;
        this.confettiRatio = ratio;
        this.active = false;
    }

    start() {
        this.active = true;
        for (let i = 0; i < this.confettiAcount; i++) {
            this.create(i);
        }
    }

    stop() {
        this.active = false;
    }

    create(i) {
        const width = Math.random() * this.confettiWidth;
        const height = width * this.confettiRatio;
        let colour;
        switch (Math.ceil(Math.random() * 3)) { //Add more or change them if you like.
            case 1:
                colour = "yellowConfetti";
                break;
            case 2:
                colour = "blueConfetti";
                break;
            default:
                colour = "redConfetti";
        }
        $('<div class="confetti-' + i + ' ' + colour + '"></div>').css({
            "width": width + "px",
            "height": height + "px",
            "top": -Math.random() * 20 + "%",
            "left": Math.random() * 100 + "%",
            "opacity": Math.random() + 0.5,
            "transform": "rotate(" + Math.random() * 360 + "deg)"
        }).appendTo('.confettiArea');

        this.drop(i);
    }

    drop(x) {
        $('.confetti-' + x).animate({
            top: "105%", //To get it off the page.
            left: "+=" + Math.random() * 15 + "%"
        }, Math.random() * 3000 + 3000, () => { if (confetti.active) { confetti.reset(x); } });
    }

    reset(x) {
        $('.confetti-' + x).animate({
            "top": -Math.random() * 20 + "%",
            "left": "-=" + Math.random() * 15 + "%"
        }, 0, () => {
            this.drop(x);
        });
    }
}

//Question Definition Area
function setQuestions() {
    let questions = [
        new TriviaQuestion("Which of the component is used for a primary display area?", 1, ["bigscreen", "jumbotron", "maindisplay", "div"]),
        new TriviaQuestion("Which of the following is used to define a bootstrap grid?", 2, ["box", "grid", "container", "object"]),
        new TriviaQuestion("Which do you use to change the style of an item from one state to another?", 0, ["animate", "new", "change", "overwrite"]),
        new TriviaQuestion("Which class do you include to create shadow boxes with Bootstrap?", 0, ["fade", "depth", "shadow", "borderbox"]),
        new TriviaQuestion("Which of the following do you use to control the look of your website for different devices?", 1, ["@display", "@media", "@displaysize", "@query"]),
        new TriviaQuestion("Which do you use to add a video to your website?", 3, ["htmltube", "media", "play", "video"]),
        new TriviaQuestion("Which of the following display types should you use to make a responsive element?", 0, ["flex", "block", "inline", "none"]),
        new TriviaQuestion("Which of the following should you use to select a class?", 2, ["#", "@", ".", "$"])
    ];

    //Now lets randomize them.
    let currentIndex = triviaGame.questions.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = questions[currentIndex];
        questions[currentIndex] = questions[randomIndex];
        questions[randomIndex] = temporaryValue;
    }

    triviaGame.questions = questions;
}

const confetti = new ConfettiFeature(50, 12, 0.4);

//dom events
$("#start").on("click", () => {    
    triviaGame.resetGame();
    showQuestions();
});

$(".options").on("click", function () {
    triviaGame.answerQuestion(this.innerText);
});