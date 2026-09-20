//programacion de transicion de ambos formularios

const signUpButton=document.getElementById("signUp");
const signInButton=document.getElementById("signIn");
const container=document.getElementById("container");
const boost=document.getElementById("boost");

//evento click para mostrar form registro

signUpButton.addEventListener("click",()=>{
    container.classList.add("right-panel-active");
    boost.style.visibility="hidden"; //esconder boton
});

//evento click para mostrar form registro y mostrar por ingreso

signInButton.addEventListener("click",()=>{
    container.classList.remove("right-panel-active");
    boost.style.visibility="visible"; //esconder boton
});

//mostrar contraseña en el input

function mostrarSeña()
{
var tipo=document.getElementById("seña");
if(tipo.type=="password")
{
    tipo.type="text";
}else{
    tipo.type="password";
}
}