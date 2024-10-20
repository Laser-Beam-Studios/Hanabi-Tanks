# **GDD Hanabi Tanks** *Versión 1.0*
## Por Laser Beam Studios

### Descripción

Grupo de desarrolladores universitarios con la intención de crear juegos simples y divertidos para jugar con tus amigos, estén donde estén.

 **Equipo**:   
* Álvaro Jiménez Lozano: Desarrollador de software.   
* Iván García García: Artista de Sonido, Desarrollador de Software.  
* Álvaro Martín Hita: Desarrollador de Software.  
* José Alejandro Sánchez Orozco: Artista Gráfico, Desarrollador de software.  

**Correos y nicknames de GitHub**  
* Álvaro Jiménez Lozano: [a.jimenezlo.2022@alumnos.urjc.es](mailto:a.jimenezlo.2022@alumnos.urjc.es) / alvarjim21  
* Iván García García: [i.garciaga.2021@alumnos.urjc.es](mailto:i.garciaga.2021@alumnos.urjc.es) / hotdogwithdog  
* Álvaro Martín Hita: [a.martinhi.2020@alumnos.urjc.es](mailto:a.martinhi.2020@alumnos.urjc.es) / MakarovHitita  
* José Alejandro Sánchez Orozco: [ja.sanchezo.2021@alumnos.urjc.es](mailto:ja.sanchezo.2021@alumnos.urjc.es) / Pepiur

## **Hanabi Tanks**

### **Índice:**

- [Información General](#información-general)
- [Guion](#guion)  
- [Gameplay](#gameplay)  
- [Interfaces](#interfaces)  
- [Estados](#estados)  
- [Niveles](#niveles)  
- [Logros](#logros)  
- [Audio](#audio)  
- [Arte](#arte)  
- [Herramientas utilizadas](#herramientas-utilizadas)  

### [Información General](#índice)

- **Resumen**: Un juego arcade de tanques en donde 2 jugadores deben batirse en duelo. El primer jugador que gane 3 rondas gana la partida. Entre rondas, los jugadores podrán elegir distintas mejoras aleatorias para su tanque. El escenario cambiará entre rondas para que la acción no sea tan monótona.

- **Género**: Arcade, shooter, VS, PVP

- **Plataformas**: Navegador Web (PC)

- **Público Objetivo**: Jugadores de todas las edades que busquen tanto compartir un buen rato con sus amigos como el desafío de enfrentarse en una competición contra jugadores desconocidos.

- **Competencia**: diep.io, World of Tanks, Wii play (tanks)

- **Inspiración**: diep.io, Wii play (tanks)

### [**Guion**](#índice)  
Todo lo que se ve en el juego es la imaginación de un niño, el cual ha creado él mismo una maquetas de tanques y escenarios a base de cortar y pintar cartones. El niño juega en su cuarto ilusionado, y lo que se ve en el juego es la visión e imaginación del niño cuando juega.

### [**Gameplay**](#índice)

- **Cámara cenital**: La cámara se mantiene en una vista superior para que los jugadores puedan ver en todo momento el terreno y la locación tanto de su tanque como el del jugador rival.

- **Mecánicas del tanque**:   
  - Mover: el jugador puede mover el tanque hacia arriba, hacia abajo, hacia la izquierda y hacia la derecha.  
  - Disparar: el jugador puede disparar con el tanque para golpear al rival o a las estructuras, el disparo será hacia el frontal del tanque (estático).  
  - Vida: los tanques dispondrán de una cantidad de vida predeterminada que a través de mejoras podrán aumentar o incluso disminuir por un bien mayor. La cantidad de vida predeterminada será de 3 puntos.  
      
- **Mecánicas de las balas:**  
  - Rebotes: Las balas rebotaran sobre las estructuras que lo permitan, de manera simétrica respecto de la normal de esa superficie.  
  - Daño: las balas podrán infligir una cantidad de daño diferente, que variará según el tipo de bala e incluso los rebotes que le queden.  
      
- **Mecánicas de las paredes:**  
  - Rompibles: Son paredes que servirán de cobertura un número limitado de golpes, absorbiendo el impacto, es decir la bala no rebotara incluso si a esta le quedan rebotes.  
  - No rompibles: Son las que jamás se van a destruir y hacen rebotar a las balas si a estas les quedan rebotes.

- **Controles**: El jugador podrá mover el tanque con las teclas ‘W’, ‘S’, ‘A’ y ‘D’, podrá disparar con la tecla “Espacio” o la tecla “C” cuando se trate de juego en línea. En caso de multijugador, el jugador 1  podrá mover el tanque con las teclas ‘W’, ‘S’, ‘A’ y ‘D’, podrá disparar con la tecla ‘C’ y el jugador 2 podrá mover el tanque con las teclas ‘I’, ‘K’, ‘J’ y ‘L’, podrá disparar con la tecla ‘P’.

- **Mejoras del tanque**: Durante el juego, los jugadores podrán escoger entre varias mejoras para su tanque. Los jugadores pueden escoger entre estas mejoras:  
  - Cartón del bueno: Aumenta la vida del tanque en 1 punto.  
  - Balas de corcho elástico: Las balas rebotan una vez más, pero tienen menos cadencia.  
  - Balas de corcho duro: Las balas infringen 1 punto de daño extra, pero no se pueden juntar con balas de corcho elástico. (Rompen las paredes de papel de un golpe)  
  - Balas de corcho de sidra: Las balas son mucho más rápidas, pero tienen menos cadencia. (Atraviesan las paredes de papel)  
  - Sacacorchos: Aumenta la cadencia de disparo, pero no se puede combinar con balas de corcho de sidra.

- **¿Cómo funciona el juego?**: Los jugadores comienzan una partida al mejor de 5 rondas con un tanque predefinido. Cuando una ronda acaba, los jugadores reciben mejoras para su tanque antes de empezar la siguiente ronda. El jugador que gana la ronda recibe una desventaja en su terreno para hacer el juego más divertido y equilibrado. En caso de que los jugadores se encuentren 2-2 en el marcador, no existirán desventajas para ninguno de los jugadores. El juego acaba cuando uno de los jugadores consigue acabar con el tanque enemigo 3 veces, es decir, cuando gana 3 rondas.

### [**Interfaces**](#índice)  
Prototipos de las posibles interfaces:  
**Main Menu:**  
![](image1)  
**Options:**  
![](image2)  
**Gameplay:**  
![](image3)  
**Pause:**  
![](image4)  
**WinScreen:**  
![](image5)  
**Credits:**  
![](image6)  
### [**Estados**](#índice)  
![](image7)

Es importante destacar que el menú de opciones solo tiene un botón de back, y este sirve tanto para ir al menú principal como al menu de pausa, esto dependerá del estado del juego, si accediste al menú de opciones a través del menú de pausa, devuelve al menu de pausa y si accediste desde el menú principal devuelve al menu principal.

### [**Niveles**](#índice)

Los niveles dispondrán de paredes de madera (no rompibles) y paredes de papel (rompibles). Están diseñados para que cruzar del lado en el que aparece el otro jugador sea complicado al ser una zona abierta, y esto es importante ya que no serán simétricos ni por tanto sus lados tendrán las mismas coberturas.

En cuanto a estos se tiene pensado crear 5 niveles, que van a funcionar de la siguiente forma y ser jugados en orden:

- Nivel 1: Es un nivel que no ofrece ninguna desventaja o ventaja a los jugadores.  
- Nivel 2: Es un nivel que ofrece una pequeña desventaja a un jugador.  
- Nivel 3: Es un nivel que ofrece una desventaja a ambos jugadores por lo tanto están en igualdad de condiciones.  
- Nivel 4: Es un nivel que ofrece una desventaja a un jugador.  
- Nivel 5: Es un nivel que ofrece una desventaja masiva a ambos jugadores, se tiene pensado hacer que sea con cierto grado de aleatoriedad en las coberturas centrales para que sea caótico.

#### **Ejemplos de niveles**  
**Main Menu:**  
![](image8)  
**Options:**  
![](image9)  
**Gameplay:**  
![](image10)  
**Pause:**  
![](image11)  
**WinScreen:**  
![](image12)  

### [**Logros**](#índice)  
	  
	No se tiene pensado añadir sistema de logros.

### [**Audio**](#índice)

- **Efectos de sonido**:   
  	Debido a la temática visual del juego, estos estarán relacionados con sonidos de cartones, maderas, papeles y corchos.  
    
  Sonidos de gameplay  
- **Bala al rebotar con una pared de madera:** sonará como un corcho al rebotar en madera.  
- **Bala al impactar sobre un tanque:** sonará un golpe de un corcho sobre cartón, mientras se escucha un sonido de explosión junto a una onomatopeya de explosión de fondo. Esto último debido a que el juego pasa en la mente de un niño, así que se escuchara el sonido real y lo que escucharía el niño en su imaginación, así como el sonido que hace el niño mientras juega.  
- **Bala al destruirse en una pared de madera:** sonará como un corcho al caer al suelo.  
- **Tanque al disparar:** sonará como un corcho al ser abierta una botella, y de fondo la onomatopeya del niño al recrear el disparo de un tanque.  
- **Tanque al moverse:** sonará como se arrastra un cartón sobre madera, y la onomatopeya del sonido mecánico que producen los tanques.  
- **Tanque al chocar con una pared de madera:** sonará como un cartón al golpear la madera.  
- **Bala al romper una pared de papel:** sonará como un papel resquebrajándose.


	Sonidos de interfaz

- **Pasar el cursor por encima de un botón:** sonará una onomatopeya de un niño jugando a elegir opciones.  
- **Pulsar un botón:** sonará como cuando chocan dos cartones.  
- **Sonido de abrir un menú o cambiar del mismo:** sonará como un cartón deslizándose sobre la madera.  
- **Sonido de victoria:** sonará como la onomatopeya de victoria que hace un niño al ganar un bando cuando juega a los soldados, el típico ta ta taran, pero no será la onomatopeya la que sonará sino que lo harán instrumentos.

- **Música**:  
  Debido a la estética será una canción sencilla compuesta principalmente por instrumentos “sencillos” como la flauta dulce y el xilófono.  
    
  De esta manera se logrará tener una música inmersiva al mundo ficticio del juego, mientras es una música suave, sin mucha relevancia. Un ejemplo de todo lo auditivo, ya que está inspirado en ello, sería el modo de tanques del Wii party.

### [**Arte**](#índice)  
Al tratarse de juguetes creados por el niño, las referencias visuales que usamos son aquellos materiales que pueden tener a su alcance, siendo el cartón y el papel los principales:  
Paredes madera  
Paredes rompibles papel.  
Balas corcho.  
Tanques: Cartón.

* La saga Paper Mario.  
* The Plucky Squire.  
* NIntendo Switch Labo.

Concepts arts:  
![](image13)  
Primeras iteraciones de los tanques de juguete.  
![](image14)  
Iteración teniendo en cuenta elementos de papelería.  
![](image15)  
Sprites preliminares, de los tanques.  
![](image16)  
Modelos de paredes de papel y cartón.  
### [**Herramientas utilizadas**](#índice)

Software de dibujo: Clip Studio Paint  
Software de Diagramas: Draw.io  
Software de edición de código: Visual Studio Code, Sublime Text, Visual Studio  
Software de gestión de versiones: GitHub desktop, Git Bash  
Software organizativo: Trello  
Frameworks: Phaser 3  
Software de presentaciones: Canva

[image1]: ImagenesJER/mainmenu.png "Main Menu Image"

[image2]: ImagenesJER/options.png "Options Menu Image"

[image3]: ImagenesJER/gameplay.png "Gameplay Image"

[image4]: ImagenesJER/pause.png "Pause Menu Image"

[image5]: ImagenesJER/win.png "Win Screen Image"

[image6]: ImagenesJER/credits.png "Credits Screen Image"

[image7]: ImagenesJER/Navegacion_Hanabi_Tanks.png "States Navigation Image"

[image8]: ImagenesJER/lv1.png "Level 1 Image"

[image9]: ImagenesJER/lv2.png "Level 2 Image"

[image10]: ImagenesJER/lv3.png "Level 3 Image"

[image11]: ImagenesJER/lv4.png "Level 4 Image"

[image12]: ImagenesJER/lv5.png "Level 5 Image"

[image13]: ImagenesJER/BocetoTanques.png "Skecth of the tanks 1 Image"

[image14]: ImagenesJER/BocetoTanques2.png "Skecth of the tanks 2 Image"

[image15]: ImagenesJER/TanquesDeCarton.png "Skecth of the carton tanks Image"

[image16]: ImagenesJER/Paredes.png "Skecth of the walls Image"
