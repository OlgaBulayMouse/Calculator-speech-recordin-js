class Calculator {
    constructor() {
        this.statement = '';
        this.result = '';
        this.voiceStart = false;
    }

    update(val) {
        this.statement += val;
        document.getElementById('statement').innerHTML = this.statement;
    }

    answer() {
        document.getElementById('result').innerHTML = eval(this.statement);
        if (this.voiceStart) this.speak();
    }

    remove() {
        this.statement = this.statement.slice(0, this.statement.length - 1);
        document.getElementById('statement').innerHTML = this.statement;
    }

    voice(val) {
        this.voiceStart = val;
    }

    speak() {
        let speech = new SpeechSynthesisUtterance();
        speech.text = `Your ansver is ${eval(this.statement)}`
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.SpeechSynthesis.speak(speech);
    }
}

let calc = new Calculator();
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

function onLoad() {
    let btnMarkUp = [];
    ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '+', '0', 'DEL', '='].forEach(
        val => {
            btnMarkUp.push(`<button>${val}</button>`);
        })
    document.getElementById('btns').innerHTML = btnMarkUp.join('');
}

onLoad();

document.addEventListener('click', function(val){
    let target;
    target = val['target']['tagName'].toLowerCase();
    if(target === 'button') {
        if(val['target']['innerHTML'] === '=')
        calc.answer();
        else if(val['target']['innerHTML'] === 'DEL')
        calc.remove();
        else
        calc.update(val['target']['innerHTML']);
    }
})

recognition.continuous = true;
recognition.onresult = function(e) {
    const transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
    if(e.results[0].isFinal) {
        splitVoice(transcript)
        if(transcript.includes('equal')) {
            calc.answer();
        }
    }
};

function toogle() {
    console.log(document.getElementById('checkbox').checked);
    if (document.getElementById('checkbox').checked) {
        recognition.start();
        calc.voice(true);
    } else {
        recognition.stop();
        speechstart = false;
        calc.voice(false);
    }
};

function splitVoice(val) {
    let actualVal = val.replace('multi', '*')
    .replace('div', '/')
    .replace('add', '+')
    .replace('min', '-')
    .replace('x', '*')
    .replace(/ /g, '')
    .match(/\d|\+|\-|\*|\./g).join('')
    calc.update(actualVal);
};