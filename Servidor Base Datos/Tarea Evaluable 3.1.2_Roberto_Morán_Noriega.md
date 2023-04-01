# Tarea Evaluable 3 - Docker
### Alumno: Roberto Morán Noriega
#### Módulo: Despliegue de Aplicaciones Web

------------------------------------------------------------------------

## Contenidos:

1. ([Ejericio 1 - Trabajo con Imágenes](#Ejercicio-1---trabajo-con-Imágenes))
    2. ([Servidor de Base de Datos](#Servidor-de-Base-de-Datos))
2. ([Parte 2 - Webgrafía](#parte-2---webgrafía))

-------------------------------------------------------------------------
-------------------------------------------------------------------------

## Ejercicio 1 - Trabajo con Imágenes

### 2. Servidor-de-Base-de-Datos
    
Accedemos a DockerHub para buscar la imagen que nos interesa de MariaDB

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/mariadb.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/mariadb2.png)

Creamos el contendor para la base de datos con la imagen de mariadb y agregamos los datos que se piden en el enunciado

    docker run -d --name bbdd -p 3306:3306 -v "/path/on/host/:/var/lib/mysql" \
    -e "MARIADB_ROOT_PASSWORD=root" \
    -e "MARIADB_DATABASE=base1" \
    -e "MARIADB_USER=daw" \
    -e "MARIADB_PASSWORD=laboral1" \
    mariadb

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/iniciocontenedorconvariables.png)

Abrimos el puerto 3306 que utilizaremos para conectar al contenedor en firewall

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/puertos.png)
    
Al crear el contenedor lo nombramos con **bbdd**, mapeamos el puerto **3306**, vinculamos el columen **/path/on/host/** que se creará, con la carpeta del contenedor **/var/lib/mysql** y establecemos las siguientes variables de entorno:
-   contraseña para el usuario root = "root"
-   nombre de la base de datos que se crea = "base1"
-   nombre del usuario = "daw"
-   contraseña para el usuario **daw** = "laboral1"
y finalmente se cita la imagen que se usará de base para el contenedor

Un vez creado el contenedor:

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/contenedorrulando.png)
    
Accedemos a la consola del contenedor de la base de datos 

    docker exec -it bbdd bash
    
Iniciamos sesión el usuario **root**

    mysql -u root -p
    
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/accesomariaroot.png)
    
Creamos la tabla    

    CREATE TABLE tabla1 (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20) UNIQUE,
    name VARCHAR(150),
    created_at TIMESTAMP NULL,
    uldated_at TIMESTAMP NULL
    );

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/creaciontabla.png)

Instalamos la aplicación **dbeaver-ce** y conectamos con el servidor de base de datos con el usuario **daw**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/base1.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/base12.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/tablabase1.png)

Intentamos eliminar la imagen de mariadb

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/erroreliminarimagenmaria.png)

Eliminamos contenedores

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejer2/eliminadocontenedormaria.png)

No los elimino todos por estar haciendo pruebas con el tercer ejercicio, que es el contenedor que tengo arrancado

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/xcont.png)



--------------------------------------------------------------------------
([Volver](#Trabajo-con-Imágenes))
--------------------------------------------------------------------------

## Parte 7 - Webgrafía

No se han necesitado ayudas externas a parte del material del campus

--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------














