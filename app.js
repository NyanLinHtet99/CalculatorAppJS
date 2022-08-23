const input = document.querySelectorAll('.inputs > .number,.inputs>.operator');
const display = document.querySelector('.display');
const allIn = document.querySelectorAll(".inputs > div");
const backspace = document.querySelector('#Backspace');
const clear = document.querySelector('#Escape');
let signs = ['/','*','-','+'];

function Argument(number,index){     
     this.number = number;
     this.index = index;
}
isError = false;


input.forEach((input)=> {
    
    if(input.id == 'Equal'){
        input.addEventListener("click",()=>{
            start();
            input.classList.add("clicked");
        });
        return;
    }
    input.addEventListener("click",()=>{
        if(isError)return;
        display.textContent += input.textContent;
        input.classList.add("clicked");
    })
});
window.addEventListener('keydown',(e)=>{
    const keyIn = document.querySelector(`#${e.code}`);
    if(!keyIn) return;
    keyIn.classList.add("clicked");
    if(keyIn.id == 'Equal'){
        start();
        return;
    }
    typing(keyIn);
})
function typing(input){
    if(isError)return;
    display.textContent += input.textContent;
}
backspace.addEventListener("click",()=>{
    backspace.classList.add("clicked");
    if(isError){
        display.textContent = "";
        isError = false;
    }
    display.textContent = display.textContent.substring(0,display.textContent.length -1);
})
clear.addEventListener("click",()=>{
    clear.classList.add("clicked");
    display.textContent = "";
    isError = false;
})
allIn.forEach((x)=>{
    x.addEventListener("transitionend",(e)=>{
        if(e.propertyName =="transform"){
            x.classList.remove("clicked");
        }
    })
})

function start(){
    if(isError)return;
    let numArray = display.textContent.split("");

    let i = 0;
    let firstArray = numArray.map((x)=>{
        let number = new Argument(x,i);
        i++;
        return number;
    })
    let newArray = firstArray.map((x)=>{
        let index = x.index;
        if(signs.includes(x.number) && !(index == 0)) {
            if(index+1>=firstArray.length){
                err();
                return null;
            }
            return x;
        }
        else if(index+1>=firstArray.length){
            return x;
        }
        else if(signs.includes(firstArray[index+1].number)) {
            if(signs.includes(x.number)){
                err();
                return null;
            }
            return x;
        }
        else {
            firstArray[index+1].number = x.number+firstArray[index+1].number;
            return null;
        }
    })
    let filtered = newArray.filter(x=>!(x == null));
    let k = 0;
    numArray = filtered.map(x=>{
        x.index = k;
        k++;
        if(!signs.includes(x.number)){
            x.number = parseFloat(x.number);
        }
        return x;
    })
    if(isError != true)calculate(numArray);
}


function calculate(numArray){
    if(numArray.length < 3){
        return;
    }
    numArray.forEach(x=>{
        let i = 1;
        if(x == null)return;
        if(x.number == '/'){
            if(x.index+1 >= numArray.length || x.index-1 < 0) err();
            if(numArray[x.index+1] == null) err(); 
            while(numArray[x.index-i] == null){
                i++;
            }
            numArray[x.index-i].number = numArray[x.index-i].number / numArray[x.index+1].number; 
            numArray[x.index+1]= null;
            numArray[x.index] = null;
        }
        return;
    })
    numArray.forEach(x=>{
        let i = 1;
        if(x == null)return;
        if(x.number == '*'){
            if(x.index+1 >= numArray.length || x.index-1 < 0) err();
            if(numArray[x.index+1] == null) err(); 
            while(numArray[x.index-i] == null){
                i++;
            }
            numArray[x.index-i].number = numArray[x.index-i].number * numArray[x.index+1].number; 
            numArray[x.index+1]= null;
            numArray[x.index] = null;
        }
        return;
    })
    numArray.forEach(x=>{
        let i = 1;
        if(x == null)return;
        if(x.number == '-'){
            if(x.index+1 >= numArray.length || x.index-1 < 0) err();
            if(numArray[x.index+1] == null) err(); 
            while(numArray[x.index-i] == null){
                i++;
            }
            numArray[x.index-i].number = numArray[x.index-i].number - numArray[x.index+1].number; 
            numArray[x.index+1]= null;
            numArray[x.index] = null;
        }
        return;
    })
    numArray.forEach(x=>{
        let i = 1;
        if(x == null)return;
        if(x.number == '+'){
            if(x.index+1 >= numArray.length || x.index-1 < 0) err();
            if(numArray[x.index+1] == null) err(); 
            while(numArray[x.index-i] == null){
                i++;
            }
            numArray[x.index-i].number = numArray[x.index-i].number + numArray[x.index+1].number; 
            numArray[x.index+1]= null;
            numArray[x.index] = null;
        }
        return;
    })
    let filtered = numArray.filter(x=>!(x==null));
    if(filtered.length>1) err();
    if(!isError)display.textContent = filtered[0].number;
}
function err(){
    display.textContent = "Error";
    isError = true;
}