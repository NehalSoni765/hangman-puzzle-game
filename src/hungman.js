class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('');//[c,a,t]
        this.remainingGuesses = remainingGuesses;//2
        this.guessedLetter = [];//[c,a]
        this.status= "playing";
    }
    calculateStatus(){
        //word=cat ges=cqat
        const wordLetter =  this.word.filter(letter=>this.guessedLetter.includes(letter) || letter === " ");
        console.log("word ",wordLetter.length);
        console.log("this word ",this.word.length);
        if(wordLetter.length===this.word.length){
            this.status='finished'
        }else if(this.remainingGuesses==0){
            this.status="failed";
        }else{
            this.status="playing";
        }
    }
    get statusMessage(){
        if(this.status === "playing"){
            return "Guesses left:"+this.remainingGuesses
        }else if(this.status == "failed"){
            return `Nice try! The word was "${this.word.join('')}".`
        }else{
            return "Great work! You guessed the word."
        }
    }
    get puzzle(){
        let puzzle = '';
        this.word.forEach(element => {
            if(this.guessedLetter.includes(element)||element===" "){
                puzzle+=element;
            }else{
                puzzle+="*";
            }
        });
        return puzzle;
    }
    makePuzzle(guess){
        console.log("this.guessedLetter ",this.guessedLetter);
        const isUnique = !this.guessedLetter.includes(guess);
        const isBadGuess = !this.word.includes(guess);
        if(isUnique){
            this.guessedLetter.push(guess);
        }
        if(isUnique&&isBadGuess){
            this.remainingGuesses--;
        }
    }
}


export default Hangman