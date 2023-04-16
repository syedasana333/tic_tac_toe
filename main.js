let box = document.getElementsByClassName('box');
let currentPlayer = 'playerX';
let winnerCombination = [    
    ['01','02','03'],
    ['04','05','06'],
    ['07','08','09'],
    ['01','05','09'],
    ['03','05','07'],
    ['01','04','07'],
    ['02','05','08'],
    ['03','06','09']
];
let player1 = [];
let player2 = [];
let resetbtn = document.getElementById('reset')
let xWins = 0;
let oWins = 0;
let draws = 0;
let xWinsDisplay = document.getElementById('x-wins')
let oWinsDisplay = document.getElementById('o-wins')
let drawsDisplay = document.getElementById('draws')
let turn = document.getElementById('turn')

start();
function start(){
    Array.from(box).forEach((elem) => {
        elem.addEventListener('click', handleClick);
    });
    resetbtn.addEventListener('click', function(){
        xWinsDisplay.textContent=0;
        oWinsDisplay.textContent=0;
        drawsDisplay.textContent=0;
        reset();
    })
}

function handleClick(e){

    let target = e.target;
    if(target.classList.contains('fill')) return;
    else{
        target.classList.add('fill');
        if(currentPlayer == 'playerX'){
            target.classList.add('player1');
            currentPlayer = 'playerO';
            player1.push(target.id);
            turn.textContent='o'

            let win = checkWin(player1);
            if(win){
                result = 'player1'
                winner(result)
                xWins++;
                xWinsDisplay.textContent = xWins;
            }
            else if(player1.length+player2.length === 9){
                draws++;
                drawsDisplay.textContent=draws
                let result='draws'
                winner(result)
            } 
        }
        else if(currentPlayer=='playerO'){
            target.classList.add('player2');
            currentPlayer = 'playerX';
            player2.push(target.id);
            let win = checkWin(player2);
            turn.textContent='x'

            if(win){
                result = 'player2'
                winner(result)
                oWins++;
                oWinsDisplay.textContent=oWins;
            }
        } 
    }
}

function winner(win){
    let winner = document.createElement('winner')
    winner.setAttribute('id','winner')

    document.body.appendChild(winner)

    let text = document.createElement('txt')
    let btns = document.createElement('div')
    btns.setAttribute('class','btns')

    let quit = document.createElement('div');
    quit.setAttribute('id','quit')
    quit.textContent='QUIT'
    btns.appendChild(quit)

    let nxt = document.createElement('div');
    nxt.setAttribute('id','nxt')
    nxt.textContent='NEXT ROUND'
    btns.appendChild(nxt)
    winner.appendChild(text)
    winner.appendChild(btns)

    document.getElementById('bg').style.display='block'

    if(win==='player1'){
        winner.classList.add('player1')
        text.textContent='YOU WON!'
    }
    else if(win==='player2'){
        winner.classList.add('player2')
        text.textContent='PLAYER 2 WON!'
    }
    if(win==='draws'){
        winner.classList.add('drawText')
        text.textContent='IT\'S A DRAW!'
    }

    nxt.addEventListener('click', function(){
        document.getElementById('winner').remove()
        reset()
          })
    
    quit.addEventListener('click', function(){
        document.getElementById('winner').remove()
        xWinsDisplay.textContent=0;
        oWinsDisplay.textContent=0;
        drawsDisplay.textContent=0;
        reset()
    })
}

function checkWin(player){
    let playerClass = (currentPlayer == 'playerX') ? 'winning-cell-o' : 'winning-cell-x';
    return winnerCombination.some(combo => {
        let win = combo.every(index => {
            return player.includes(index)
        });
        if(win){
            combo.forEach(index => {
                console.log(playerClass)
                document.getElementById(index).classList.add(playerClass);
            });
        }
        return win;
    });
}


function reset(){
    Array.from(box).forEach((elem) => {
        elem.classList.remove('fill', 'player1', 'player2','winning-cell-x','winning-cell-o');
    });
    currentPlayer = 'playerX';
    player1 = [];
    player2 = [];
    document.getElementById('bg').style.display='none';
    turn.textContent='x';
}

