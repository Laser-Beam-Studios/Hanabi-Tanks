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
- PUT con ruta => ip:puerto/api/users
En esta petición se logea un usuario tiene dos RequestParam, nombre de usuario (username) y contraseña (password) simplemente autentifica que la constraseña y el nombre de usuario se corresponden en esta versión de la API todavia no hay encriptado de ningún tipo
- DELETE con ruta => ip:puerto/api/users/{username}
En esta petición se elimina el usuario a traves de su nombre de usuario que es en esta ocasión un PathVariable
- GET con ruta => ip:puerto/api/users/{username}
En esta petición se obtiene un objeto de tipo UserDTO con toda la información pública del usuario, este se obtiene mediante el formateo a Json de la libreria Jackson
- PUT con ruta => ip:puerto/api/users/{username}
En esta petición se incrementa en uno el número de victorias de un usuario dado su nombre como PathVariable
- GET con ruta => ip:puerto/api/users/connected
En esta petición se obtiene el número de usuarios conectados al momento de llegada al servidor de la petición, no tiene parametros y el valor lo devuelve como un entero (int)


## Menciones sobre la API

Cabe mencionar que para la realización de esta API se ha utilizado en todo momento el sistema de candados que tiene java con objetos de tipo ReentrantReadWriteLock y se han gestionado las posibles excepciones aunque son solo por motivos de debug ya que lo único que hacen es devolver un estado de HTTP acorde al fallo más común e imprimir por la consola del servidor la traza del error.
