
const start_btn = document.querySelector(".start_btn button");
const infobox = document.querySelector(".infobox");
const exit_btn = infobox.querySelector(".buttons .quit");
const continue_btn = infobox.querySelector(".buttons .restart");
const quizbox = document.querySelector(".quizbox");
const resultbox = document.querySelector(".resultbox");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    infobox.classList.add("activeInfo"); 
}


exit_btn.onclick = ()=>{
    infobox.classList.remove("activeInfo"); 
}


continue_btn.onclick = ()=>{
    infobox.classList.remove("activeInfo"); 
    quizbox.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

let timeValue =  15;
let quecount = 0;
let quenumb = 1;
let userScore = 0;
let count;
let counterLine;
let widthValue = 0;

const restart_quiz = resultbox.querySelector(".buttons .restart");
const quit_quiz = resultbox.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quizbox.classList.add("activeQuiz"); 
    resultbox.classList.remove("activeResult"); 
    timeValue = 15; 
    quecount = 0;
    quenumb = 1;
    userScore = 0;
    widthValue = 0;


    showQuetions(quecount); 
    queCounter(quenumb); 
    clearInterval(count); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(quecount < questions.length - 1){ 
        quecount++; 
        quenumb++; 
        showQuetions(quecount); 
        queCounter(quenumb); 
        clearInterval(count); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }
    else{
        clearInterval(count); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(count); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[quecount].answer; 
    const allOptions = option_list.children.length;
    

    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    infobox.classList.remove("activeInfo"); 
    quizbox.classList.remove("activeQuiz"); 
    resultbox.classList.add("activeResult"); 
    const scoreText = resultbox.querySelector(".score_text");

    if (userScore >3 ){ 
        let scoreTag = '<span>and Yayy! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore >= 2){ 
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    count = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(count); 
            timeText.textContent = "Time Off"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[quecount].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show");

        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);

    function timer(){
        time += 1;
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}