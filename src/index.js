const cards=document.querySelectorAll(".game__card");
let firstCard;
let secondCard;
let hasClass=false;
let twoClickOnly=false;
let countOfFlip=0;
let countOfAllCards=cards.length/2;


const addClass=(e)=>{
    if(twoClickOnly) return; //чтобы не открывались три карточки одновременно
    const target=e.target.parentElement;
    target.classList.add('flip');

    if(target===firstCard) return; //проверка, чтобы не выбирать одну и ту же карточку дважды
    if(!hasClass){
        hasClass=true;
        firstCard=target;
    }else{
        hasClass=false;
        secondCard=target;
        checkTwoCards()
    }
};

const equalCard=()=>{
    firstCard.removeEventListener('click',addClass);
    secondCard.removeEventListener('click',addClass)
};

const checkTwoCards=()=>{
    const sameCard=firstCard.dataset.name === secondCard.dataset.name;
    sameCard ? equalCard():removeClass();
    if(sameCard){     //останавливаем игру при проверке
        countOfFlip++;
        if(countOfFlip===countOfAllCards){
            stop();
        }
    }
};
cards.forEach(card=>{
    card.addEventListener("click", addClass); //на каждую картоку слушатель для добавления класса

    const shakeCard=Math.floor(Math.random()*cards.length);//мешаем карточки
    card.style.order=shakeCard;
});

const reset=()=>{
    firstCard=null;
    secondCard=null;
    hasClass=false;
    twoClickOnly=false;
};

const removeClass=()=>{  //развернуть обратно, при несовпадении dataset.name
    twoClickOnly=true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset()
    },1000);
};

//timer
const M=document.getElementById('minutes');
const S=document.getElementById('seconds');
const Ms=document.getElementById('milliseconds');

let minutes=0;
let seconds=0;
let milliseconds=0;
let interval;

const endTime=document.getElementById("modal-message");
const result=document.createElement("p");
const again=document.querySelector(".modal__btn");
const modal = document.getElementById('modal');

function start () {
    if (countOfFlip===countOfAllCards) return;
    milliseconds++;
    if (milliseconds < 9) {
        Ms.innerText = "0" + milliseconds;
    }
    if (milliseconds > 9) {
        Ms.innerText = milliseconds;
    }
    if (milliseconds > 99) {
        seconds++;
        S.innerHTML = "0" + seconds;
        milliseconds = 0;
        Ms.innerText = "0" + milliseconds;
    }

    if (seconds < 9) {
        S.innerText = "0" + seconds;
    }
    if (seconds > 9) {
        S.innerText = seconds;
    }
    if (seconds > 59) {
        minutes++;
        M.innerHTML = "0" + minutes;
        seconds = 0;
        S.innerText = "0" + seconds;
    }
}

const firstClick=document.getElementById("game"); //начало таймера при первом клике

firstClick.addEventListener('click', ()=>{
    clearInterval(interval);
    interval=setInterval(start,10);
});

function stop() {
    result.innerText = `Your time: ${minutes} min ${seconds} sec ${milliseconds} ms`;//вывод в модалку
    endTime.append(result);
    modal.style.display = 'flex';
    clearInterval(interval);
}

again.onclick = function restart() {
    modal.style.display = 'none';
    location.reload();
};