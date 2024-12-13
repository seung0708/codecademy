//Dad jokes
const ws = ['What', 'Where', 'Why']

const verbs = ['should', 'did', 'do', 'are', 'didn\'t','has']

const subjects = ['you call a sheep who can sing and dance', 'can\'t dinosaurs clap their hands', 'rainbows go when they\'ve been bad', 'you never take sides in an argument at the dinner table', 'Christmas trees bad at knitting' ]

const answers = ['Lady Ba Ba', 'Because they\'re exinct', 'To prism, so they have time to reflect on what they\'ve done', 'Trick question. It\'s perfect time to take sides because no one\'s paying attention. Bring Tupperware', 'They always drop their needles']

const randomElement = (array) => {
    return Math.floor(Math.random() * array.length);
}

const mixedMessagesFactory = (question, verbs, subjects, answers) => {
    return {
        question,
        verbs,
        subjects,
        answers, 
        message() {
            let qIdx = randomElement(this.question)
            let vIdx = randomElement(this.verbs)
            let sIdx = randomElement(this.subjects);
            

            return `${this.question[qIdx]} ${this.verbs[vIdx]} ${this.subjects[sIdx]}?`
        },
        answer() {
            let aIdx = randomElement(this.answers); 
            return this.answers[aIdx]
        }
        
    }
}

const dadJoke = mixedMessagesFactory(ws, verbs, subjects, answers)
console.log(dadJoke.message())
setTimeout(() => console.log(dadJoke.answer()), 3000)