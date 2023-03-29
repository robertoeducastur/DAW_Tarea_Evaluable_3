<?php

echo "<br>Cabecera diseñada por Roberto Morán Noriega para DAW<br><br><br>";

echo "Dirección IP usuario: {$_SERVER['REMOTE_ADDR']}<br>";
echo "Dirección IP Servidor: {$_SERVER['SERVER_ADDR']}<br>";
echo "Servidor: {$_SERVER['SERVER_NAME']}<br>";
echo "Conectado a Puerto: {$_SERVER['REMOTE_PORT']}<br>";
echo "Usuario: {$_SERVER['HTTP_USER_AGENT']}<br>";
echo "URL: {$_SERVER['REQUEST_URI']}<br>";
echo "Cabecera: {$_SERVER['HTTP_USER_AGENT']}<br>";
echo "Directorio actual servidor: {$_SERVER['DOCUMENT_ROOT']}<br>";
echo "Ruta absoluta: {$_SERVER['SCRIPT_FILENAME']}<br>";
echo "Fecha petición: {$_SERVER['REQUEST_TIME']}<br>";
echo "Cadena de consulta: {$_SERVER['QUERY_STRING']}<br>";
echo "Cabecera Accept: {$_SERVER['HTTP_ACCEPT_CHARSET']}<br>";
echo "Idioma: {$_SERVER['HTTP_ACCEPT_LANGUAGE']}<br>";
echo "Cabecera Host: {$_SERVER['HTTP_HOST']}<br>";
echo "Versión Servidor y nombre Host: {$_SERVER['SERVER_SIGNATURE']}<br>";

?>
