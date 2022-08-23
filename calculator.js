function onLoad() {
    let btns = [];
    ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '+', '0', 'DEL', '='].map(
        val => { btns.push(`<button>${val}</button>`) }
    )
    document.getElementById('btns').innerHTML = btns.join('');
    console.log(btns);
}

onLoad();