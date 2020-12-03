async function GetText(word) {
    let str = word;
    let counter =0;
    console.log('collecting data...')
    let a = await fetch('http://localhost:5500/textss')
        .then(response => response.json())
        .then(text => text.forEach(el => {
          counter += el.text.toLowerCase().split(`${str}`).length-1 ;
        }));
    return console.log(counter)
}
//in order to get access for GET requests from your local server. Use Moesif Origin & CORS
//https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related?hl=ru
GetText(prompt("Enter a word",).toLowerCase())
// let str = "A man is as good as his word";
// alert(str.split('A').length-1);