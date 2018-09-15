$(document).ready(function(){

    //Create list of variables needed
    var questions = [{
        question: "What pixar film feature a helpful fish with short term memory?",
        answers: ["Cars", "Monsters Inc.", "Finding Nemo", "Brave"],
        answer: "Finding Nemo"
    },
    {
        question: "What Pixar movie featured the Mexican Day of the Dead?",
        answers: ["Monsters Inc.", "Finding Nemo", "Coco", "Wall-e"],
        answer: "Coco"
    },
    {
        question: "What Pixar movie features a company harvesting energy from screems?",
        answers: ["Coco", "Monsters Inc.", "Finding Nemo", "Brave"],
        answer: "Monsters Inc."
    },
    {
        question: "This Pixar movie featured the song 'You've Got a Fiend in Me'.",
        answers: ["Inside Out", "Toy Story", "Coco", "Up"],
        answer: "Toy Story"
    },
    {
        question: "This movie features a hard working robot that gets to explore space.",
        answers: ["Up", "Toy Story", "Brave", "Wall-e"],
        answer: "Wall-e"
    },
    {
        question: "This movie featured a talking dog, a wilderness explorer, and a bird named Kevin.",
        answers: ["Up", "Toy Story", "Coco", "Cars"],
        answer: "Up"
    },
    {
        question: "The family of super heros has to deal with living in a world where they have to hide their powers.",
        answers: ["Brave", "Cars", "Ratatouille", "The Incredibles"],
        answer: "The Incredibles"
    },
    {
        question: "This movie takes you into the mind of Riley.",
        answers: ["Brave", "Inside Out", "Wall-e", "The Incredibles"],
        answer: "Inside Out"
    },
    {
        question: "This movie's main character strives to become a chef.", 
        answers: ["The Incredibles", "Inside out", "Ratatouille", "Cars"],
        answer: "Ratatouille"
    },
    {
        question: "This movie has a race maniac that learns to slow down while in a small town on Route 66",
        answers: ["Wall-e", "The Incredibles", "Cars", "Brave"],
        answer: "Cars"
    }//,
    // {
    //     question: "This movie featured an inventory named Flik.",
    //     answers: ["Cars", "Brave", "Inside Out", "A Bug's Life"],
    //     answer: "A Bug's Life"
    // }
];
    // var answers = [];
    var timer;
    var answersCorrect = 0;
    var answersTimed = 0;
    var answersWrong = 0;
    var questionsAsked = 0;
    var timeLeft;
    var resultScreen;

    //reset function
    function restart(){
        answersCorrect = 0;
        answersTimed = 0;
        answersWrong = 0;
        questionsAsked = 0;
        $(".question").empty();
        $(".answers").empty();
        $(".timer").empty();
        clearInterval(timer);
        // add start button with id to start
        var startButton = $("<button>");
        startButton.text("Start!");
        startButton.attr("class", "startButton btn" );
        $(".question").append(startButton);
    };

    function displayQuestion(){
        //clear previous or start button
        $(".question").empty();
        $(".answers").empty();
        //if no more questions display results
        if( questionsAsked === questions.length){
            //display results and stop
            $(".question").append($("<h2>").text("Results:"));
            $(".answers").append($("<p>").text("Answers Correct: " + answersCorrect));
            $(".answers").append($("<p>").text("Answers Incorrect: " + answersWrong));
            $(".answers").append($("<p>").text("Timed out: " + answersTimed));
            //add button to restart
            var restartButton = $("<button>").text("Restart");
            restartButton.attr("class", "restartButton");
            //append restart button (with same class as start button) to DOM
            $(".answers").append(restartButton);
        } else{
            //set question
            $(".question").append($("<h2>").text((questionsAsked+1) + ': ' + questions[questionsAsked].question));
            //set options
            var optionsDiv = $("<div>");
            // alert(questions[questionsAsked].answers.length);
            for (var i = 0; i < questions[questionsAsked].answers.length; i++){
                // alert(questions[questionsAsked].answers[i]);
                //need to make buttons
                var option = $("<button>").text(questions[questionsAsked].answers[i]);
                option.attr("data-answer", questions[questionsAsked].answers[i] );
                option.attr("class", "answerBtn btn");
                if( questions[questionsAsked].answers[i] === questions[questionsAsked].answer){
                    //add class to know correct
                    option.addClass("correct");
                }
                optionsDiv.append(option);
            }
            $(".answers").append(optionsDiv);
            //create timer
            timeLeft = 30;
            //running every second
            timer = setInterval( count, 1000 );
        }

    };

    function count(){
        //increment element to display
        timeLeft--;
        //display time left
        $(".timer").text(timeLeft);
        //if time left is zero clear interval
        if(timeLeft === 0){
            //time out function
            clearInterval(timer);
            //if results
            if(resultScreen){
                resultScreen = 0;
                displayQuestion();
            } else{
                //else time out
                answersTimed++;
                questionsAsked++;
                $(".question").prepend($("<h3>").text("Time Up!"));
                //highlight correct
                $(".correct").attr("class", "btn btn-success");
                //disable buttons from answering again
                $(".answerBtn").attr("class", "btn");
                resultTimer();
                
            }
            

        }
        
    };

    function selectAnswer(){
        var answerVal = $(this).attr("data-answer");
        if (answerVal === questions[questionsAsked].answer){
            //answered correctly
            answersCorrect++;
            $(".question").prepend($("<h3>").text("Correct!"));
        } else {
            //answered incorrectly
            answersWrong++;
            $(".question").prepend($("<h3>").text("Sorry, Wrong Answer!"));
            //mark correct one?
        }
        //increment question
        questionsAsked++;
        //highlight correct
        $(".correct").attr("class", "btn btn-success");
        //disable buttons from answering again
        $(".answerBtn").attr("class", "btn");
        $(this).attr("class", "btn btn-primary");
        //start 5 sec timer with result
        resultTimer();

    }

    function resultTimer(){
        clearInterval(timer);
        timeLeft = 5;
        resultScreen = 1;
        timer = setInterval(count, 1000);
        
    };

    

    //event listener for start buttons
    $(document).on("click", ".startButton", displayQuestion);
    $(document).on("click", ".restartButton", restart);
    $(document).on("click", ".answerBtn", selectAnswer);
    restart();

})