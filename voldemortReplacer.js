var elems = document.querySelectorAll("div, section, article, td, p, span, a, li, h1, h2, h3, em, b, caption");

//case insensitive searchWords
var searchWords = [
    'Lord Voldemort',
    'Voldemort'
];

//replaceWords case won't match original, so we capitalize as best as possible.
var replaceWords = [
    'You-Know-Who', 
    'He-Who-Must-Not-Be-Named', 
    'the Dark Lord'
];

//function that does the work.
function voldemortReplacer(){
    var value = newValue = "";
    var replaceRegExp;
    
    var pluralSearchWords = searchWords.slice(0); //clone array
    for(var i in searchWords){
        searchWords[i] = '\\b'+searchWords[i]+'\\b';
    }
    for(var i in pluralSearchWords){
        pluralSearchWords[i] = '\\b'+pluralSearchWords[i]+"(\'s)?\\b";
    }
    
    var randNum = 0;
    for(var i=0; i < elems.length; i++){
        //loop through each child node
        for(var childNum = 0; childNum < elems[i].childNodes.length; childNum++){
            value = elems[i].childNodes[childNum].nodeValue;
            //skip blank nodes
            if(!value){
                continue;
            }
            //replace with a random selection
            randNum = Math.floor(Math.random() * replaceWords.length);

            if (new RegExp(searchWords.join("|"), 'ig').test(value) || 
                new RegExp(pluralSearchWords.join("|"), 'ig').test(value)) {
                
                newValue = replaceWords[randNum];
                replaceRegExp = new RegExp(pluralSearchWords.join("|")+"|"+searchWords.join("|"), 'ig');
                elems[i].childNodes[childNum].nodeValue = value.replace(replaceRegExp, newValue);
            }
        }
    }
}

//call the function
voldemortReplacer();

window.onload= function () {
    if(window.addEventListener) {
        document.body.addEventListener('change', voldemortReplacer, false);
    } else if (window.attachEvent){
        document.body.attachEvent("onchange", voldemortReplacer);
    }
}
