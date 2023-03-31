# Tarea Evaluable 3 - Docker
### Alumno: Roberto Morán Noriega
#### Módulo: Despliegue de Aplicaciones Web

------------------------------------------------------------------------

## Contenidos:

1. ([Ejericio 1 - Trabajo con Imágenes](#ejercicio-1---trabajo-con-imágenes))
    1. ([Servidor Web](#servidor-web))
2. ([Parte 2 - Webgrafía](#parte-2---webgrafía))

-------------------------------------------------------------------------
-------------------------------------------------------------------------

## Ejercicio 1 - Trabajo con Imágenes

### Servidor Web

Partimos de la siguiente situación:
- Tenemos servidor propio montado con sistema Ubuntu Server 22.04.
- Tenemos ip dinámica para ese servidor (cemtarme.dynamic-dns.net)
- Durante toda la tarea, usaremos el servidor con la ip pública mapeando los puertos en el router de la siguiente manera:
   - puerto externo 55084   - puerto interno 8084   - ip interna 192.168.55.52
   - puerto externo 55088   - puerto interno 8088   - ip interna 192.168.55.52
   - puerto externo 55080   - puerto interno 80     - ip interna 192.168.55.52
   - puerto externo 1234    - puerto interno 1234   - ip interna 192.168.55.52
   
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/mapeo.png)
   
Resultaría poco práctico por mi parte, disponer de un servidor y virtualizar sistemas cuando los puedo realizar en modo real.
Hay que tener en cuenta que en lugar de utilizar un cliente ubuntu, se utiliza un servidor ubuntu

Para acceder al sistema nos autentificamos como:

    ssh cotomusel@cemtarme.dynamic-dns.net
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ssh.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/pass.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ubuntu.png)

Arrancamos el contenedor que ejecuta la instancia de la imagen php:7.2-apache. Nos vemos obligados a instalar esa versión, y no la 7.4 que se pide en el enunciado, porque después de intentar conectar con el contenedor en varias ocasiones no se consigue.

    docker run -d --name servidor -p 1234:80 php:7.4-apache
    
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/1.png)


Finalmente probamos con la 7.2 y Bingo !!!, todo funciona con normalidad

Para crear el contenedor, como el enunciado no especifica que tengamos que usar algún método en concreto y después de varias pruebas y por comodidad, decidimos hacerlo creando un fichero **docker-compose.yaml**, complementado con un fichero **dockerfile**, y así vamos experimentando otras opciones. 

Fichero docker-compose.yaml:

    version: "3.8"
    services:
       php:
          build:
             context: ./
             dockerfile: dockerfile
          container-name: servidor
          restart: always
          ports:
             - 1234:80
          volumes:
             - ./html:/var/www/html
             - ./config:/usr/local/etc/php
    volumes:
       html:
       config:
       
Esta configuración lo que hace es instalar el servicio php, que parte del directorio actual abriendo el fichero **dockerfile** para realizar los pasos que marca, luego nombra al contenedor como **servidor**, dice al sistema que si por cualquier problema se reinicie, luego mapea al puerto 1234 externo con el 80 interno, luego sincroniza los directorios locales **html** y **config** del servidor ubuntu (anfitrión), con los directorios **/var/www/html** y **/usr/local/etc/php/** del contenedor. Finalmente confirma los volúmenes.


![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/2.png)


Para iniciar el fichero **docker-compose.yaml** utilizamos la instrucción

    docker-compose up -d --build
    
Fichero **dockerfile**

    FROM php:7.2-apache
    
    MAINTAINER Roberto Morán Noriega robertomn23@educastur.es
    
    #carpeta de trabajo
    WORKDIR /home/cotomusel/contenedores/DAW/DAW_Tarea_Evaluable_3
    
    #copiamos el index de la web a la carpeta de inicio del servidor php
    COPY ./html/index.html servidor:/var/www/html
    COPY ./html/info.php servidor:/var/www/html
    COPY ./html/cabeceras.php servidor:/var/www/html
    
Este fichero lo que hace es llamar a la imagen **php:7.2-apache** para crear el contenedor, nos informa por pantalla quien es el programador y su correo electrónico, luego nos sitúa en el directorio de trabajo y finalmente copia los ficheros de la carpeta local **html** a la carpeta del contenedor **/var/www/html** 


![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/3.png)


A continuación comprobamos que el contenedor se ha iniciado y está funcionando y a la vez comprobamos lo que nos ocupa en el disco con la instrucción
  
    docker ps -a -s
    
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/4.png)


Luego hacemos un inspect para informarnos de las propiedades del contenedor


![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect1.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect2.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect3.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect4.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect5.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/inspect6.png)


Y obtenemos los siguientes resultados al conectar desde el navegador web introduciendo la dirección de nuestro servidor personal ubuntu y el puerto demandado en el enunciado

***cemtarme.dynamic-dns.net:1234***
    
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/conexion_web.png)
    
    
***cemtarme.dynamic-dns.net:1234/info.php***
    
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/conexion_php.png)
    
    
***cemtarme.dynamic-dns.net:1234/cabeceras.php***
    
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer1/cabeceras.php.png)


--------------------------------------------------------------------------
([Volver](#Trabajo-con-Imágenes))
--------------------------------------------------------------------------

## Parte 2 - Webgrafía

[Colaboratorio.net](https://colaboratorio.net/davidochobits/sysadmin/2018/crear-imagenes-medida-docker-dockerfile/)

[Carlos-compains.medium.com](https://carlos-compains.medium.com/creando-un-entorno-de-desarrollo-con-docker-a56790af6271)

--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------