const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}

const deposit = () => {
    while(true){
       const deposit_amount = prompt("Enter a Deposit Amount : ");
        const deposit_amount_number = parseFloat(deposit_amount);

        if(isNaN(deposit_amount_number) || deposit_amount_number <= 0){
            console.log('Invalid deposit Amount ! please try again');
        } else {
            return deposit_amount_number;
        }
    }
};

const getNumberoflines = () =>{
    while(true){
        const line = parseFloat(prompt("Enter a number of lines you want to bet on (1-3) : "));
        if(isNaN(line) || line <= 0 || line >= 4 ){
            console.log('ERROR : Invalid Input. ! Please Try again');
        } else {
            return line;
        }
    }
};


const getbet = (balance,line) => {
    while(true){
        const bet = parseFloat(prompt("Enter bet Amount per line : "));

        if(isNaN(bet) || bet <= 0){
            console.log("ERROR : Invalid Input ! please try again.");
        } else if(bet > (balance / line)){
            console.log("ERROR : You don't have suficient balance for bet ");
        } else{
            return bet;
        } 
    }
};


const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count ; i++){
            symbols.push(symbol)
        }
    }
     const reels = [];
     for (let i = 0 ; i < COLS; i++){
        reels.push([]);
        const reelSymol = [...symbols];
        for (let j = 0; j < ROWS ; j++){
            const randomindex = Math.floor(Math.random() * reelSymol.length)
            const selectedSymbol = reelSymol[randomindex]
            reels[i].push(selectedSymbol);
            reelSymol.splice(randomindex,1);
        }
     }
     return reels;
};

const transpose = (reels) =>{
    const rows = [];
    for(let i = 0 ; i < ROWS ; i++){
        rows.push([]);

        for(let j = 0 ; j < COLS ; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};


const printRows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol] of row.entries()){
            rowString += symbol
            if(i != row.length - 1 ){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getwining = (rows,bet,line) => {
    let wining = 0;

    for(let row = 0 ; row < line ; row++){
        const symbols = rows[row];
        let allsame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allsame = false;
                break;
            }
        }

        if(allsame){
            wining += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }
    return wining
};


const game = () => {
    let balance = deposit();
    while(true){
        console.log(`You have a Balance of Rs.${balance}`)
        const numberoflines = getNumberoflines();
        const bet = getbet(balance,numberoflines);
        balance -= bet * numberoflines;
        const reels = spin();
        const rows = transpose(reels)
        printRows(rows)
        const wining = getwining(rows,bet,numberoflines)
        balance += wining;
        console.log(`You won , Rs.${wining} `);

        if(balance <= 0){
            console.log("You run out of Money..");
            break;
        }

        const playagain = prompt("Do You want to play again (y/n)? : ");
        if (playagain != "y") break;
    }
};

game();
