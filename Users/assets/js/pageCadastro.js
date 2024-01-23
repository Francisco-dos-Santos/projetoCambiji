import { eyestoggle } from "./togglesEyes.js";
import { setError,setSucess,isLetters,iscount,ismail,isnumber } from "./funtctionValidatyForm.js";
fetch("../users.json")
.then((response)=>{
  return response.json();
})
.then((data)=>{
  localStorage.setItem("BD_Users",JSON.stringify(data));
});
const userName=document.querySelector("#name");
const userEmail=document.querySelector("#email")
const userPasse=document.querySelector("#passe1");
const userPasseTwo=document.querySelector("#passe2");
const btnAccess=document.querySelector("#btn-access");
const loader=document.querySelector(".loader");

function SetUsers(userName,email,password){
  this.userName=userName,
  this.email=email,
  this.password=password
}

const users={
    List: JSON.parse(localStorage.getItem("BD_Users"))||[],
    contains:function(newEmail){
      let RetValue=this.List.some(user => user.email === newEmail);
        return RetValue;
      },

    add:function(name,email,passe){
      if(!this.contains(email))
			{
				this.List.push(new SetUsers(name,email,passe));
				this.saveStorage();
        clearField();
			}else{
        alert("já existe uma conta com esse email digite outro");
      }
    },

    saveStorage:function(){
      localStorage.setItem("BD_Users",JSON.stringify(this.List))
    }
}
function clearField(){
  userName.value="";
  userEmail.value="";
  userPasse.value="";
  userPasseTwo.value="";
}

function checkedfilds(){
  let userNameValue=userName.value.trim();
  let userEmailValue=userEmail.value.trim();
  let userPasseValue=userPasse.value.trim();
  let userPasseTwoValue=userPasseTwo.value.trim();
  if(userNameValue===""){
    setError(userName,"Error o nome deve ser preenchido")
    return false
  }else{
    setSucess(userName)
  }

  if(userEmailValue===""){
    setError(userEmail,"Error o email deve ser preenchido")
    return
  }else if(!ismail(userEmailValue)){
    setError(userEmail,"Error email é invalido")
    return
  }else{
    setSucess(userEmail)
  }

  if(userPasseValue===""){
    setError(userPasse,"Error a senha deve ser preenchido")
    return
  }else if(!isLetters(userPasseValue) || !iscount(userPasseValue)){
    setError(userPasse,"Error a senha deve conter letras e no maximo 7 caracters!")
    return
  }else if(!isnumber(userPasseValue)){
    setError(userPasse,"a senha deve conter nambers");
    return
  }else{
    setSucess(userPasse)
  }

  if(userPasseTwoValue===""){
    setError(userPasseTwo,"Error a senha deve preenchida")
    return
  }else if(userPasseTwoValue!==userPasseValue){
    setError(userPasseTwo,"Erro a senha deve ser igual a primeira");
    return 
  }
  else{
    setSucess(userPasseTwo)
  }


  return true
}

function toggleEyes(){
  const eyes=document.getElementsByClassName('eye');
  for(let eye of eyes){
    eye.onclick=function(event){
      let eyesTarget=event.target;
      let input=eyesTarget.previousElementSibling;
      eyestoggle(eyesTarget,input);
    }
  }
}
toggleEyes();

btnAccess.addEventListener("click",()=>{
  if(checkedfilds()){
    let userNameValue=userName.value;
    let userEmailValue=userEmail.value;
    let userPasseValue=userPasse.value;
    let userPasseTwoValue=userPasseTwo.value;
    setTimeout(()=>{
    loader.classList.remove("show");
    users.add(userNameValue,userEmailValue,userPasseTwoValue);
    },4000)
    console.log("loading...");
    loader.classList.add("show");
  }else{
    console.log("não foi enviado");
  }
});


console.log("bag");

