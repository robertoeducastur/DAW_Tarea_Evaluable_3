# Tarea Evaluable 3 - Docker
### Alumno: Roberto Morán Noriega
#### Módulo: Despliegue de Aplicaciones Web

------------------------------------------------------------------------

## Contenidos:

3. ([Ejercicio 3 - Imagen con Dockerfile](#Ejercicio-3---Imagen-con-Dockerfile))
7. ([Parte 7 - Webgrafía](#parte-4---webgrafía))

-------------------------------------------------------------------------
-------------------------------------------------------------------------

## Ejercicio 3 - Imagen con Dockerfile
    
Creamos la cuenta en dockerhub **robertoxorrascar**

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/robertoxorrascar.png)

Creamos el fichero dockerfile

    FROM httpd:latest
    
    LABEL maintainer="Roberto Morán Noriega roberto@xorrascar.org"
    LABEL version="0.1"
    LABEL description="Juego básico para colorear y pintar dibujos a demanda"
    WORKDIR /juego-dibujos
    COPY . ./
    COPY ./html /usr/local/apache2/htdocs
    Expose 80
    RUN echo "Gracias por entretenerte con nuestro juego de Dibujos"
    
La primera instrucción llama a la imagen más reciente de httpd. Luego se muestran tres **label** con información (programador, versión y una pequeña descripción). Luego especifica el directorio de trabajo. Copia todo el contenido de la carpeta actual al directorio de trabajo. Copia la carpeta html contenida en el directorio actual a la carpeta del contenedor **/usr/local/apache2/htdocs**. Establece el puerto 80 como puerto de comunicación con la aplicación y luego envía un mensaje de agradecimiento por el uso.

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/dockerfile.png)

Creamos la imagen

    docker build -t robertoxorrascar/juego-dibujos:v1

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/build.png)

Creamos el contenedor

    docker run --name juego-dibujos -d -p 8088:80 robertoxorrascar/juego-dibujos:v1

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/run.png)

hacemos el push después de identificarnos

    docker login
    docker push robertoxorrascar/juego-dibujos:v1

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/push.png)

Podemos observar como se ha subido la imagen a nuestro repositorio

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/dockerhub.png)

Conectamos al contendor en el puerto **8084** y vemos como podemos visualizar la web

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/juegodibujos.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/juegodibujos2.png)

Subimos una segunda aplicación con un juego de pareja de cartas

![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/juegocartas.png)
![C:/Users/eltra/OneDrive/Escritorio/IMG DAW 2/ejer1/](file:///C:/Users/eltra/OneDrive/Escritorio/IMG%20DAW%202/ejercicio4/juegocartas2.png)

--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------


## Parte 7 - Webgrafía

[Recetas Docker](https://recetas-docker.readthedocs.io/es/latest/capitulo_2.html)

[Aula software libre](https://aulasoftwarelibre.github.io/taller-de-docker/dockerfile/)

[Diario informe](https://diarioinforme.com/como-funcionan-las-etiquetas-docker/)

[Git-scm](https://git-scm.com/book/es/v2/Ap%C3%A9ndice-C%3A-Comandos-de-Git-Compartir-y-Actualizar-Proyectos)

[Linux pasión](https://linuxpasion.com/como-crear-imagenes-de-docker-con-un-dockerfile-en-ubuntu-18-04-lts)

[IES celia](https://iescelia.org/ciberseguridad/serie-docker-como-publicar-mi-imagen-en-docker-hub/)

[Docs Github](https://docs.github.com/es/authentication/troubleshooting-ssh/error-permission-denied-publickey?platform=linux)

--------------------------------------------------------------------------
--------------------------------------------------------------------------
([Volver](#contenidos))
--------------------------------------------------------------------------
--------------------------------------------------------------------------














