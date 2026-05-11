// console.log("hi  ibrahim i am login button");
  const signInBtn=document.getElementById("signIn-btn");
  signInBtn.addEventListener("click",function(){
    // console.log("hi how are you, i am signin btn tome kemon acho");

    const inputUserName=document.getElementById("input-userName");
    const userName=inputUserName.value;
    // console.log("user name: ",userName);
    const inputPassword=document.getElementById("input-password");
    const password=inputPassword.value;
    console.log("password: ",password);

    if(userName=='admin'&& password=='admin123')
    {
        alert("sing is Successful");
        window.location.assign("/homePage.html");
    }
    else
    {
         alert("Please Enter your correct UserName and Password");
         return;
    }
});