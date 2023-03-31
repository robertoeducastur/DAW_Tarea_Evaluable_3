# Tarea Evaluable 3 - Docker
### Alumno: Roberto Morán Noriega
#### Módulo: Despliegue de Aplicaciones Web

------------------------------------------------------------------------

## Contenidos:

2. ([Ejercicio 2 - Trabajo Redes y Almacenamiento](#Ejercicio-2---Trabajo-Redes-y-Almacenamiento))
3. ([Parte 7 - Webgrafía](#parte-4---webgrafía))

-------------------------------------------------------------------------
-------------------------------------------------------------------------


    
## Ejercicio 2 - Trabajo Redes y Almacenamiento

Creamos la red bridget con la dirección de red 192.168.100.0 y máscara de red 255.255.255.0. establecemos la dirección para el router en 192.168.100.1 y nombramos la red como bdnet

    docker network create -d bridge \
    --subnet 192.168.100.0/24 \
    --gateway 192.168.100.1 bdnet
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/crea_red.png)
    
Mostramos todas las redes que tenemos en éste momento

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/redes.png)

Obtenemos la información de la red creada con
 
    docker inspect bdnet
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/inspect_de_la_red.png)

Creamos el contenedor de mariadb

    docker run -d --name serverMaria -p 3306:3306 \
    -v "/datosMaria/:/var/lib/mysql" \
    -e "MARIADB_DATABASE=baseMaria" \
    -e "MARIADB_USER=daw" \
    -e "MARIADB_PASSWORD=laboral1" \
    -e "MARIADB_ROOT_PASSWORD=root" \
    --network bdnet \
    mariadb
    
Al crear el contenedor lo nombramos con **servidorMaria**, mapeamos el puerto **3306**, vinculamos el volumen **/datosMaria/** que se creará, con la carpeta del contenedor **/var/lib/mysql** y establecemos las siguientes variables de entorno:
-   contraseña para el usuario root = "root"
-   nombre de la base de datos que se crea = "baseMaria"
-   nombre del usuario = "daw"
-   contraseña para el usuario **daw** = "laboral1"
lo añadimos a la red **bdnet** y finalmente se cita la imagen que se usará de base para el contenedor

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/contenedor_maria.png)

Después de varios intentos, porque no tengo pelos, sino me hubiera tirado de ellos, consigo instalar el contendor con adminer. Para ello elijo la imagen de **dehy/adminer**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/dehy_adminer.png)

Utilizamos la instrucción

    docker run --name adminer \ 
    --link=mysql:mysql -d -p 8080:80 \
    --network bdnet dehy/adminer
    
Nombramos al contenedor como adminer, establecemos el vínculo del directorio **mysql** local con **mysql** del contenedor. Mapeamos el puerto **8080** externo al **80** local, lo añadimos a la red **bdnet** y estabelcemos la imagen dehy/adminer como base

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/creamos_contenedor_adminer.png)

En la imagen anterior, usando la instrucción **docker ps -a -s** vemos que los dos contenedores **servidorMaria** y **adminer** están funcionando.

Accedemos ahora por mediación del navegador, usando Adminer, al servidor de la Base de datos por el puerto **8080**. Nótese que utilizo la ip dinámica del servidor Ubuntu y el mapeo de puertos en el router **58080**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/conectamos_adminer_8080.png)

Utilizando las credenciales del servidor de Bases de Datos del usuario de la base **daw** con contraseña **laboral1**, accedemos a la base de datos **baseMaria**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/conectado_mariadb.png)

Creamos la nueva base de datos **despliegue**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/creada_base_despliegue.png)

Mostramos el contenido del contendor **serverMaria**. Los hacemos por medio de la consola, ya que al estar en un servidor de ubuntu no disponemos de modo gráfico

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/carpetas_contenedor.png)

Mostramos ahora el contenido del contenedor adminer

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/carpetas_servidor.png)

Lo borramos todo

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio3/eliminarlo_todo.png)


--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------
    


## Parte 7 - Webgrafía

Entre las páginas visitadas buscando algo de información están las siguientes

[Informática Dantesca](http://informaticadantesca.blogspot.com/2018/03/docker-12.html)

[Youtube](https://www.youtube.com/watch?v=hsUw9Grdruk)

[Lindevs](https://lindevs.com/install-adminer-inside-docker-container-in-linux)

--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------














