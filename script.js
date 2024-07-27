const baseURL= 
// " https://open.er-api.com/v6/latest/USD";
// "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/pair";
// "https://currencyconv.p.rapidapi.com/currency_conversion ";
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select ");
const btn=document.querySelector(".btnFrm");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// for (code in countryList){
//     console.log(code);
// }

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected=selected;
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected=selected;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
};
const updateflag=(element)=>{
    let currCode=element.value;
    let counrtyCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${counrtyCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    console.log(response);
    let data=await response.json();
    // console.log(data)
    let rate =data[toCurr.value.toLowerCase()];
    console.log(rate);
    // console.log(amount);
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(response);
});