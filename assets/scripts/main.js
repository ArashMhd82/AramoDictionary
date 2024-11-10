const serachBtn = document.getElementById('DWordSearch')
const closeBtn = document.getElementById('closeBtn')
var sound = document.getElementById('sound')
let inpWord = document.getElementById('InputWord')

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"


serachBtn.addEventListener('click', () => {
    let DWord = ''
    DWord =(inpWord.value)
    inpWord.value = ''
    fetch(url + DWord)
    .then((data) => data.json())
    .then((item) => {
        ChangeData(item)
    })
    .catch( () =>{
        NotFound()
    })


})

closeBtn.addEventListener('click', () => {
    inpWord.value = ''
})

function NotFound(){
    let outcome = document.getElementById('DictData')
    outcome.innerHTML = `<h3 style="text-align: center"> The Word Not Found! </h3>`
}


function ChangeData(arr){

    let outcome = document.getElementById('DictData')
    outcome.innerHTML = `
    
    <div id="DictHeader">
    <div id="DWordHead">
    <h1 id="DWord">
    ${arr[0].word}
    </h1>
    <h4 id="DWordPhonetic">
    ${`${arr[0].meanings[0].partOfSpeech}  ${arr[0].phonetic}`}
    </h4>
    </div>
    <div id="DWSoundCont">
    <span onclick="playSound()" class="material-symbols-rounded">
    volume_up
    </span>
    </div>
    </div>
    <div id="DictBody">
    <p id="DWordDefenition">
    ${arr[0].meanings[0].definitions[0].definition}
    </p>
    
    <p id="DWordExample">
    ${arr[0].meanings[0].definitions[0].example || ""}
    </p>
    </div>
    `
    sound.setAttribute('src', `${arr[0].phonetics[0].audio}`)
    playSound()
    
    
}

function playSound(){
    sound.play().catch(error => {  
        console.error('Playback failed:', error);  
    }); 
}