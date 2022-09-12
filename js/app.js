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
    
    //CREAMOS UN OBJETO PARA AGREGAR  LOS DATOS DEL TWEET
    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    //VERIFICA SI EL ARREGLO ESTA VACIO
    if(tweet === '')
    {
        mostrarError('Un mensaje no puede ir vacio');
        return; //RETURN EN UN IF, CANCELA TODA OPERACION DETENIENDOLA, FUNCIONA CUANDO ESTA DENTRO DE UNA FUNCION
    }

    tweets = [...tweets,tweetObj];

    //ESTA FUNCION PERMITIRA MOSTRAR LA LISTA DE TWEETS
    crearHTML();

    //REINICIAMOS EL FORMULARIO
    formulario.reset();
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

function crearHTML() {
    
    limpiarHTML();

    if(tweets.length>0)
    {
        tweets.forEach(tweet=>{
            //CREAMOS UNA LISTA
            const li = document.createElement('li');
            //AÑADIMOS TEXTO
            li.innerText = tweet.tweet;

            //INSERTAMOS LAS LISTAS COMO HIJOS EN ->listaTweets
            listaTweets.appendChild(li);
        });
    }
}

function limpiarHTML() {
    while(listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}