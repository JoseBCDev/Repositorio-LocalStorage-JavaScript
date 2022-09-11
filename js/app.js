//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListener();

//EVENTOS

function eventListener()
{
    formulario.addEventListener('submit',agregarTweet);
}


//FUNCIONES

function agregarTweet(e)
{
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === '')
    {
        mostrarError('Un mensaje no puede ir vacio');
        return; //RETURN EN UN IF, CANCELA TODA OPERACION DETENIENDOLA, FUNCIONA CUANDO ESTA DENTRO DE UNA FUNCION
    }

    console.log(tweet);
}

function mostrarError(mensaje)
{
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //EL MENSAJE SE BORRE EN 3 SEGUNDOS
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}