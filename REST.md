# **API REST de Hanabi Tanks** *Versión 1.0*
## Por Laser Beam Studios

## La API desarrollada incluye los siguientes metodos HTTP:

- GET con ruta => ip:puerto/   
En esta petición se devuelve un String que contiene la ruta donde se encuentra situado Main.html que es el html de la página principal   
- GET con ruta => ip:puerto/api/chat   
En esta petición se devuelven los mensajes del chat tiene dos RequestParam, since (id del mensaje desde el que se quieren obtener) y username (nombre de usuario del que ejecuta la petición "esa es la intención", esto con el objetivo de llevar el control de usuarios conectados   
- POST con ruta => ip:puerto/api/chat   
En esta petición se sube un mensaje al chat tiene dos RequestParam, message (el mensaje en sí) y username (para saber quien lo envia)   
- POST con ruta => ip:puerto/api/users
En esta petición se registra un usuario tiene un RequestBody de tipo User (parseado con Jackson desde Json) en el que se especifica nombre de usuario (username), contraseña (password), numero de victorias (numberOfVictories) y ultima vez visto (lastSeen), desde nuestro cliente de la API Hanabi Tanks al registrar un usuario se inicializan lastSeen y numberOfVictories a 0   
