//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

eventListener();

//EVENTOS

function eventListener()
{
    //SE EJECUTA CADA VEZ Q LE DAMOS CLICK AL BOTON DEL FORMULARIO
    formulario.addEventListener('submit',agregarTweet);

    //AL CARGAR EL ARCHIVO, MUESTRA EL CONTENIDO DEL LOCALSTORAGE
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweet')) || []; //SELECCIONAMOS LA MISMA VARIABLE GLOBAL Y GUARDAMOS AHI LO DEL LOCAL STORAGE,
        //SINO NO HAY NADA EN EL LOCALSTORAGE, AGREGAMOS EL ARREGLO VACIO
        crearHTML();
    });
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

            //CREAMOS EL BOTON ELIMINAR
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X';
            btnEliminar.classList.add('borrar-tweet');

            //FUNCION AL BOTON CUANDO LE DAN CLICK
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            };
            //AGREGAMOS EL BOTON AL HTML
            li.appendChild(btnEliminar);
            //INSERTAMOS LAS LISTAS COMO HIJOS EN ->listaTweets
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
function borrarTweet(id)
{
    //CUANDO EL FILTER ES DE UN PARAMETRO Y LA CONDICION ES SIMPLE, SE RECOMIENDA NO USAR {} NI ()
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    crearHTML();
}

function sincronizarStorage()
{
    localStorage.setItem('tweet',JSON.stringify(tweets)); //AGREGAMOS AL LOCALSTORAGE Y LO CONVERTIMOS EN STRING
}
//LIMPIAMOS EL HTML CADA VEZ Q SE AGREGUE UNA LISTA
function limpiarHTML() {
    while(listaTweets.firstChild)
    {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}