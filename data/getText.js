async function GetText(word) {
  let str = word;
  let counter = 0;
  console.log("collecting data...");
  alert("this operation may take several minutes. Please wait for loading ...");
  let a = await fetch("http://localhost:1000/api/news/getnews")
    .then((response) => response.json())
    .then((text) =>
      text.forEach((el) => {
        counter += el.text.toLowerCase().split(`${str}`).length - 1;
      })
    );
  return console.log(counter);
}
GetText(prompt("Enter a word").toLowerCase());
// let str = "A man is as good as his word";
// alert(str.split('A').length-1);
