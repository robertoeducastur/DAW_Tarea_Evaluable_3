/**
 * Programa que crea una baraja y el juego del tute
 * @autor Roberto Morán Noriega
 * @Date 09/02/2023
 * @Version 1.0 Para examen DWEC
 */


//instanciamiento de los controles del documento
let tablaD_Doc = document.getElementById("tablaDibujo");
let tablaC_Doc = document.getElementById("tablaColores");
let tablaJ_Doc = document.getElementById("tablaJuego");
let tablaJ_div = document.getElementById("tablaJuegoDIV");
let selectFiguras = document.getElementById("figuras");
let btnJugar = document.getElementById("btnJugar");
let btnFinalizar = document.getElementById("btnFinalizar");
//borramos el contenido del control
selectFiguras.value = "";
//hacemos invisble el control
tablaJ_Doc.style.visibility = "hidden";
//desabilitamos el control
btnFinalizar.disabled = true;
//creamos la variables
let imagenMiniatura;
let contador = 0;

//creamos los arrays
let colores = new Array("black", "red", "green", "blue", "yellow", "white");
let controles = new Array();
let nombreControles = new Array();
let imagenes = ["ave", "cara", "chica", "ciervo", "corazon", "flor", "futbol", "noel", "pajaro"];
let figuras = [];
let matrices = [];

//llamamos a las funciones
generarTablaColores();
generarTablaDibujo();
//ponemos el texto con el control
document.getElementById("info").innerText = "Pincel desactivado";

//-------------------------------------------------Eventos------------------------------------

/**
 * Controlador del evento change sobre el select de figuras
 */
selectFiguras.addEventListener('change',
    function()
    {
        //apunte del array a modo de información sobre las figuras
        //figuras = [ave, cara, chica, ciervo, corazon, flor, futbol, noel, pajaro];

        //recogemos el valor seleccionado en la variable selectedOption
        var selectedOption = this.options[selectFiguras.selectedIndex];
        //si ese valor seleccionado es igual a ave
        if (selectedOption.value == "ave")
        {
            //llamamos a la función formatear figura
            //enviamos por parámetro la figura de la posición 0 del array de figuras
            //recibimos la figura formateada
            let figuraFor = formatearFigura(figuras[0]);
            //llamamos a la función dibujar figura 
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a cara
        else if (selectedOption.value == "cara")
        {
            let figuraFor = formatearFigura(figuras[1]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a chica
        else if (selectedOption.value == "chica")
        {
            let figuraFor = formatearFigura(figuras[2]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a ciervo
        else if (selectedOption.value == "ciervo")
        {
            let figuraFor = formatearFigura(figuras[3]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a corazon
        else if (selectedOption.value == "corazon")
        {
            let figuraFor = formatearFigura(figuras[4]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a flor
        else if (selectedOption.value == "flor")
        {
            let figuraFor = formatearFigura(figuras[5]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a futbol
        else if (selectedOption.value == "futbol")
        {
            let figuraFor = formatearFigura(figuras[6]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a noel
        else if (selectedOption.value == "noel")
        {
            let figuraFor = formatearFigura(figuras[7]);
            dibujarFigura(figuraFor);
        }
        //si ese valor seleccionado es igual a pajaro
        else if (selectedOption.value == "pajaro")
        {
            let figuraFor = formatearFigura(figuras[8]);
            dibujarFigura(figuraFor);
        }
    }
);

/**
 * Función que se encarga de controlar los eventos click sobre las cuadrículas de la tabla
 */
function escucha() 
{
    //creamos la variable sin contenido
    let colorSeleccionado;
    //recogemos en el array todos los controles de la tabla colores que sean tr
    var trs = document.getElementById('tablaColores').getElementsByTagName('tr');
    //recorremos el array de controles tr
    for (var i = 0; i < trs.length; i++) 
    {
        //recogemos en el array todos los controles que sean td que estén en los tr anteriores
        var tds = trs[i].getElementsByTagName('td');
        //recorremos el array de controles td
        for (var j = 0; j < tds.length; j++) 
        {
            /**
             * Función que controla el evento click sobre cada uno de los controles td
             */
            tds[j].addEventListener('click', function()
            {
                //llama a la función seleccionar color enviando el id del control sobre el que se hizo click
                seleccionarColor(this.id);
                //almacena el color en la variable
                colorSeleccionado = this.id;
            }, false);
        }
    }
    //recogemos en el array todos los controles de la tabla Dibujo que sean tr
    var trs = document.getElementById('tablaDibujo').getElementsByTagName('tr');
    //recorremos el array de controles tr
    for (var i = 0; i < trs.length; i++) 
    {
        //recogemos en el array todos los controles que sean td que estén en los tr anteriores
        var tds= trs[i].getElementsByTagName('td');
        //recorremos el array de controles td
        for (var j = 0; j < tds.length; j++) 
        {
            /**
             * Función que controla el evento click sobre cada uno de los controles td
             */
            tds[j].addEventListener('click', function()
            {
                //si la variable solor seleccionado está vacía
                if (colorSeleccionado == "")
                {
                    //saca un alert con el texto
                    window.alert("Antes de pintar un cuadrado tiene que selecionar un color");
                }
                //si tiene algún color selecionado
                else
                {
                    //llama a la función pintar celda pasando el id de la celda y el color seleccionado
                    pintarCelda(this.id, colorSeleccionado);
                }
            }, false);
        }
    }
}
    
/**
 * Función que se inicia con la carga de la página
 */
window.onload = function() 
{
    //llama a la función escucha
    escucha()
};

//---------------------------Funciones----------------------------------------

/**
 * Función que genera la tabla de colores
 */
function generarTablaColores()
{
    //creamos el elemento tabla en el DOM y le damos el atributo id
    let tablaC = "<table id='tablaColores'>";
    //creamos un caption para la tabla y le añadimos el texto
    tablaC += "<caption>SELECCIONA UN COLOR PARA PINTAR</caption>";

    //hacemos un bucle para 2 iteraciones
    for (i = 0; i < 2; i++) 
    {
        //por cada iteración creamos una fila tr
        tablaC += "<tr>";
        //hacemos otro bucle con otras 6 iteraciones
        for (j = 0; j < 6; j++) 
        {
            //si la iteración i es la 0
            if (i == 0)
            {
                //creamos el td con el atributo id y le ponemos de fondo el color del array colores
                tablaC += "<td id='" + colores[j] + "' style='background-color: " + colores[j] + "'>"
            }
            //si la i es 1 y la j 0
            else if ((i == 1) && (j == 0))
            {
                //creamos el td con el atributo id y combinamos las 6 celdas
                tablaC += "<td id='info' colspan='6'>";
            }
            //si la i es distinta de 1
            else if (i != 1)
            {
                //creamos el td
                tablaC += "<td>";
            }
            //cerramos el td
            tablaC += "</td>";
        }
        //cerramos el tr
        tablaC += "</tr>";
    }
    //cerramos la tabla
    tablaC += "</table>";
    //añadimos la tabla al documento
    tablaC_Doc.innerHTML = tablaC;
}

/**
 * Función que crea la tabla para dibujar
 */
function generarTablaDibujo()
{
    //creamos el elemento tabla en el DOM y le damos el atributo id
    let tablaD = "<table id='tablaDibujo'>";

    //hacemos un bucle para 9 iteraciones
    for (i = 0; i < 9; i++) 
    {
        //por cada iteración creamos una fila tr
        tablaD += "<tr>";
        //hacemos otro bucle con otras 9 iteraciones
        for (j = 0; j < 9; j++) 
        {
            //llamamos a seleccionar letra botón y recibimos el resultado
            let nombre = seleccionLetraBoton(i);
            //almacenamos en la variable nombre la concatenación de la letra con el número de iteración
            nombre = nombre + j;
            //lo guardamos en el array
            nombreControles[contador] = nombre;
            //vamos crando las colunas en cada fila, serían las casillas 
            tablaD += "<td id='" + nombre + "'>";
            //lo lmacenamos en el aray
            controles[contador] = nombre;
            //ceramos los td
            tablaD += "</td>";
            //aumentamos en uno el contador
            contador++;
        }
        //cerramos los tr
        tablaD += "</tr>";
    }
    //cerramos la tabla
    tablaD += "</table>";
    //añadimos la tabla al documento
    tablaD_Doc.innerHTML = tablaD;
    //llamamos a la función instalaciar controles y le pasamos el aray controles por parámetro
    instanciarControles(controles);
}

/**
 * Función que seleciona el color del pincel
 * @param {*} color recibe el color por parámetro
 */
function seleccionarColor(color)
{
    //bucle que recorre los colores
    for (let i = 0; i < colores.length; i++) 
    {
        //coloca el borde blanco a los controles
        document.getElementById(colores[i]).style.borderColor = "white";
    }
    //bucle que recore nuevamente el array de colores
    for (let i = 0; i < colores.length; i++) 
    {
        //si el color coincide con el color del array
        if (color === colores[i])
        {
            //pinta de verde el borde del control
            document.getElementById(color).style.borderColor = "chartreuse";
            //escribe en el control el nombre del color seleccionado
            document.getElementById("info").innerText = "Ha selecionado el color " + traducirColor(color);
        }
    }
}

/**
 * Función que pone el fondo en el color seleccionado
 * @param {*} celda recibe el id de la celda por parámetro
 * @param {*} colorSeleccionado recibe el color seleccionado para parámetro
 */
function pintarCelda(celda, colorSeleccionado)
{
    //bucle que recorre los controles de la tabla
    for (let i = 0; i < nombreControles.length; i++) 
    {
        //si el control coincide con la celda seleccionada
        if (celda === nombreControles[i])
        {
            //pinta el fondo con el color seleccionado
            document.getElementById(celda).style.backgroundColor = colorSeleccionado;
        }
    }
}

/**
 * Función que se encarga de instanciar los controles de la tabla
 * @param {*} controles recibe por parámetro el array de controles
 */
function instanciarControles(controles) 
{
    //bucle que recorre los controles
    for (let i = 0; i < controles.length; i++) 
    {
        //instanciamiento del control en el array controles
        controles[i] = document.getElementById(controles[i]);
    }
}

/**
 * Función que seleciona la letra para el botón
 * @param {*} i recibe por parámetro el número de la columna donde se sitúa
 * @returns retorna la letra correspondiente
 */
function seleccionLetraBoton(i)
{
    //creamos la variable vacía
    let nombre = "";
    //comparamos el parámetro recibido
    switch (i) 
    {
        //si es cero
        case 0:
            //guardamos en la variable la letra A
            nombre = "A";
            break;
        //si es uno
        case 1:
            //guardamos en la variable la letra B
            nombre = "B";
            break;
        //si es dos
        case 2:
            //guardamos en la variable la letra C
            nombre = "C";
            break;
        //si es tres
        case 3:
            //guardamos en la variable la letra D
            nombre = "D";
            break;
        //si es cuatro
        case 4:
            //guardamos en la variable la letra E
            nombre = "E";
            break;
        //si es cinco
        case 5:
            //guardamos en la variable la letra F
            nombre = "F";
            break;
            //si es seis
        case 6:
            //guardamos en la variable la letra G
            nombre = "G";
            break;
        //si es siete
        case 7:
            //guardamos en la variable la letra H
            nombre = "H";
            break;
        //si es ocho
        case 8:
            //guardamos en la variable la letra I
            nombre = "I";
            break;
        default:
            break;
    }
    //retorna la letra
    return nombre;
}

/**
 * Función que se encarga de traducir el nombre del color en inglés al español
 * @param {*} color recibe el color por parámetro
 * @returns retorna el color en español
 */
function traducirColor(color) 
{
    //comparamos el color en inglés
    switch (color) 
    {
        //si es negro
        case "black":
            color = "negro";
            break;
        //si es rojo
        case "red":
            color = "rojo";
            break;
        //si es verde
        case "green":
            color = "verde";
            break;
        //si es azul
        case "blue":
            color = "azul";
            break;
        //si es amarillo
        case "yellow":
            color = "amarillo";
            break;
        //si es blanco
        case "white":
            color = "blanco";
            break;
        default:
            break;
    }
    //retorna el color en español
    return color;
}

/**
 * Función que se encarga de limpiar los colores de la tabla y resetear el pincel
 */
function limpiar() 
{
    //bucle que recorre el array de colores
    for (i = 0; i < colores.length; i++) 
    {
        //quitamos el borde del color seleccionado en blanco
        document.getElementById(colores[i]).style.borderColor = "white";
    }
    //bucle que recorre el array de controles
    for (i = 0; i < nombreControles.length; i++) 
    {
        //pintamos en negro las cuadrículas de la tabla
        document.getElementById(nombreControles[i]).style.backgroundColor = "black";
    }
    //escribimos en el control que el pincel se ha deseleccionado
    document.getElementById("info").innerText = "Pincel desactivado";
}

/**
 * Función que despliega la parte de la derecha correspondiente al juego
 */
function botonJuego() 
{
    //hacemos visible la tabla del juego
    tablaJ_Doc.style.visibility = "visible";
    //deshabilitamos el botón jugar, pues ya estamos jugando
    btnJugar.disabled = true;
    //habilitamos el botón finalizar
    btnFinalizar.disabled = false;
    //llamamos a la función limpiar
    limpiar();
    //llamamos a la función iniciar juego
    iniciarJuego();
}

/**
 * Función que finaliza el juego
 */
function finJuego() 
{
    //hacemos invisible la zona de la derecha correspondiente a la tabla juego
    tablaJ_Doc.style.visibility = "hidden";
    //habilitamos el botón jugar
    btnJugar.disabled = false;
    //desabilitamos el botón finalizar
    btnFinalizar.disabled = true;
    //llamamos a la función limpiar
    limpiar();
}

/**
 * Función que inicia el juego de pintar las figuras
 */
function iniciarJuego() 
{
    //creamos los patrones que corresonden a cada figura
    //se crean por filas, y se almacena la inicial del color corresondiente salvo la Z que asociamos al azul
    const ave = "NRRRRRRRN-RBBBRBBBR-RBZBRBZBR-RBBBRBBBR-RRRRRRRRR-NRRRRRRRN-NRRAAARRN-NRRAAARRN-NNNRARNNN";
    const cara = "BNNNNNNNB-BNNNNNNNB-NNNNNNNNN-NNNNNNNNN-BAAAAAAAB-BAZAAAZAB-BAAAAAAAB-BAARRRAAB-BBAAAAABB";
    const chica = "ZZNNNNNZZ-ZNNNNNNNZ-NNAAAAANN-NAAAAAAAN-NAZAAAZAN-NAAAAAAAN-NAARRRAAN-NNAAAAANN-NNNAAANNN";
    const ciervo = "NVNNNNNVN-VVVNNNVVV-NVAAAAAVN-NAZAAAZAN-NAAAAAAAN-NVARRRAVN-NNAAAAANN-NNNVAVNNN-NNNNANNNN";
    const corazon = "NNNNNNNNN-NRRNNNRRN-RRRRNRRRR-RRRRRRRRR-NRRRRRRRN-NRRRRRRRN-NNRRRRRNN-NNNRRRNNN-NNNNRNNNN";
    const flor = "NNNRRRNNN-NNRAAARNN-NARANARAN-NNRAAARNN-NNNRRRNNN-NNNNVNNNN-NNNVVNNNN-NNVVNNNNN-NNVNNNNNN";
    const futbol = "VAAVVVVVV-VAAVVVVVV-ZZZZAAVVV-AZZVVVVVV-AZZVVVVNB-VBBAAAVBN-VAVVVVVVV-VAVVVVVVV-VAVVVVVVV";
    const noel = "NNRRRRRNN-NRBBBBRRN-NBAAAABRR-BAZAAZABR-BAAAAAABN-BBARRABBN-NBBBBBBNN-NNBBBBNNN-NNNNNNNNN";
    const pajaro = "RRRRRRRRR-RBBBRBBBR-RBNBRBNBR-RBBBRBBBR-RRRRRRRRZ-RRRAAAAZZ-RRRAAZZZZ-RRRRZZZZZ-RRZZZZZZZ";

    //metemos en el array el nombre de las figuras
    figuras = [ave, cara, chica, ciervo, corazon, flor, futbol, noel, pajaro];

    //bucle que recorre el array de figuras
    for (let i = 0; i < figuras.length; i++) 
    {
        //limpiamos el guión del patrón de cada figura
        let patron = figuras[i].replace(/-/g, "");
        //creamos un array de caracteres del patrón anterior
        let arrayPatron = Array.from(patron);
        
        //bule que recorre el patrón
        for (let j = 0; j < arrayPatron.length; j++) 
        {
            //cogemos el carácter corresondiente al color del array de caracteres del patrón
            switch (arrayPatron[j]) 
            {
                //Si es una n
                case "N":
                    //almacenamos el color negro
                    arrayPatron[j] = "black";                    
                    break;
                //si es una b
                case "B":
                    //almacenamos el color blanco
                    arrayPatron[j] = "white";
                    break;
                //si es una z
                case "Z":
                    //almacenamos el color azul
                    arrayPatron[j] = "blue";
                    break;
                //si es una a
                case "A":
                    //almacenamos el color amarillo
                    arrayPatron[j] = "yellow";
                    break;
                //si es una r
                case "R":
                    //almacenamos el color rojo
                    arrayPatron[j] = "red";
                    break;
                //si es una v
                case "V":
                    //almacenamos el color verde
                    arrayPatron[j] = "green";
                    break;
                default:
                    break;
            }
        }
    }
    //llama a la función mostrar dibujo
    mostrarDibujo();
}

/**
 * Función que se encarga de dar nombre los colores de la figura según la letra inicial
 * @param {*} figura recibe por la parámetro la figura
 * @returns retorna el array de colores formateados
 */
function formatearFigura(figura) 
{
    //eliminamos el guión del patrón que forma la figura
    let patronF = figura.replace(/-/g, "");
    //creamos un array de caracteres con cada letra del patrón de colores
    let arrayFigura = Array.from(patronF);
    //array que recorre los caracteres de cada color de la figura
    for (let j = 0; j < arrayFigura.length; j++) 
    {
        //cogemos el carácter corresondiente al color del array de caracteres
        switch (arrayFigura[j]) 
        {
            //si es una ene mayúscula
            case "N":
                //guardamos la palabra que corresponde al color negro
                arrayFigura[j] = "black";                    
                break;
            //si es b mayúscula
            case "B":
                //guardamos la palabra que corresponde al color blanco
                arrayFigura[j] = "white";
                break;
            //si es zeta mayúsucla
            case "Z":
                //guardamos la palabra que corresponde al color azul
                arrayFigura[j] = "blue";
                break;
            //si es a mayúscula
            case "A":
                //guardamos la palabra que corresponde al color amarillo
                arrayFigura[j] = "yellow";
                break;
            //si es erre mayúscula
            case "R":
                //guardamos la palabra que corresponde al color rojo
                arrayFigura[j] = "red";
                break;
            //si es uve mayúscula
            case "V":
                //guardamos la palabra que corresponde al color verde
                arrayFigura[j] = "green";
                break;
            default:
                break
        }
    }
    //retornamos el array con los colores en letra
    return arrayFigura;
}

/**
 * Función que dibuja la figura en el tablero del juego
 * @param {*} figura recibe la figura por parámetro
 */
function dibujarFigura(figura) 
{
    //bucle que recorre los controles
    for (let i = 0; i < controles.length; i++) 
    {
        //en cada control, ponemos el fondo que coresponde según la figura elegida
        controles[i].style.backgroundColor = figura[i];
    }
}

/**
 * Función que muestra el dibujo en la mini cuadrícula
 */
function mostrarDibujo() 
{
    //creamos las variables y le damos el valor
    let max = 9;
    let min = 1;
    //obtenemos un número aleatorio comprendido entre los valores de las variables
    let aleatorio = Math.floor(Math.random() * (max - min) + min);
    //obtenemos una figura del array según el número aleatorio obtenido
    imagenMiniatura = imagenes[aleatorio - 1];
    //pegamos la imagen en el control 
    let imagenDibujo = "<img src='./img/" + imagenMiniatura + ".png' />";
    //creamos una nueva variable ocn el instanciamiento del cotrol con el nombre anterior
    let cntrl = document.getElementById("imagenDIV");
    //al control le agregamos la imagen
    cntrl.innerHTML = imagenDibujo;
}

/**
 * Función que se encarga de llamar a otro función
 */
function recargarImagen() 
{
    //llama a la función mostrar dibujo
    mostrarDibujo();
}

/**
 * Función que se encarga de llamar a otra función
 */
function jugadaActual() 
{
    //llama a la función comprobar imagen dibujada
    //envía la imagen cargada por parámetro
    comprobarImagenDibujada(imagenMiniatura);
}

/**
 * Función que se encarga de comprobar la imagen dibujada
 * @param {*} dibujo recibe el código del dibujo por parámetro 
 */
function comprobarImagenDibujada(dibujo)
{
    //creamos los arrays
    let coloresDibujo = [];
    let figuraMiniatura = [];
    //ponemos la variable a true
    let correcto = true;

    //recorremos el array figuras por medio del bucle
    for (let j = 0; j < figuras.length; j++) 
    {
        //si la imagen contenida en el array es igual a la del dibujo
        if (imagenes[j] == dibujo) 
        {
            //almacenamos el dubujo en la variable
            figuraMiniatura = figuras[j];
        }
    }
    //llamamos a la función formatear figurar enviando el dibjo por parámetro
    //obtenemos el dibujo formateado
    let figuraFor = formatearFigura(figuraMiniatura);

    //bucle que recorre el array de controles del dibujo
    for (let i = 0; i < controles.length; i++) 
    {
        //obtenemos el color de fondo de cada control
        coloresDibujo[i] = controles[i].style.backgroundColor;
        //si el color de fondo no conincide con el color del dibujo
        if (coloresDibujo[i] != figuraFor[i])
        {
            //ponemos la variable a false
            correcto = false;
        }
    }
    //si el dibujo es correcto
    if (correcto)
    {
        //sacamos con un alert con el texto
        window.alert("¡¡¡ Muy bien !!! \n El dibujo es correcto");
    }
    //si no es correcto
    else
    {
        //sacamos con un alert con el texto
        window.alert("¡¡¡ Ohhh, lo siento !!! \n pero alguna parte de tu dibujo \n no coincide con el patrón");
    }
}