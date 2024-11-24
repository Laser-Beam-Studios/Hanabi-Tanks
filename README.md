# **GDD Hanabi Tanks** *Versión 1.1*
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
Interfaces del juego:  
**Main Menu:**  
![MainMenu][image1]  
**Options:**  
![OptionsMenu][image2]  
**Gameplay:**  
![Gameplay][image3]  
**Pause:**  
![PauseMenu][image4]  
**WinScreen:**  
![WinScreen][image5]  
**Credits:**  
![Credits][image6]  
### [**Estados**](#índice)  
![States][image7]

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
- **Nivel 1:**  
![Nivel_1][image8]  
- **Nivel 2:**  
![Nivel_2][image9]  
- **Nivel 3:**  
![Nivel_3][image10]  
- **Nivel 4:**  
![Nivel_4][image11]  
- **Nivel 5:**  
![Nivel_5][image12]  
- **Nivel 6:**  
![Nivel 6][image13]
- **Power ups**  
![Power Ups][image14]

### [**Logros**](#índice)  
	  
No se tiene pensado añadir sistema de logros.

### [**Audio**](#índice)

- **Efectos de sonido**:   

  Debido a la temática visual del juego, estos estarán relacionados con sonidos de cartones, maderas, papeles y corchos.
    
  Sonidos de gameplay  
- **Bala al rebotar con una pared de madera:** Suena un corcho contra una mesa de madera, este tiene dos versiones que se reproducen cuando se debe reproducir de manera aleatoria para eleguir cual.
  [WallBounce][audio1]
- **Bala al impactar sobre un tanque:** Suena un corcho sobre una mesa de madera pero más fuerte.
  [WallBounce2][audio2]
- **Bala al destruirse en una pared de madera:** Suena un corcho sobre una mesa de madera pero de manera distinta es más fuerte y seco.
  [DestroyBullet][audio3]
- **Tanque al disparar:** Suena una “p” muy cortada hecha con la voz.
  [Shoot][audio4]
- **Bala al romper una pared de papel:** Suena un papel atravesado y rasgado con un punzón.
  [PaperDestroy][audio5]
  
  Sonidos de interfaz
- **Pasar el cursor por encima de un botón (entrar):** Suena un re con la ocarina, tocando con un staccato.
  [PointerEnter][audio6]
- **Pasar el cursor por encima de un botón (salir):** Suena un sol con la ocarina, tocando con un staccato.
  [PointerExit][audio7]
- **Sonido de abrir un menú o cambiar del mismo:** Suena una frase descendente con la ocarina con sonido suave y sutil.
  [ChangeMenu][audio8]  
- **Sonido de comienzo de nivel:** Suena una melodía muy simple con la ocarina, usando el re y el do graves.
  [StartLevel][audio9]

- **Música**:  
  Tiene una canción de fondo durante toda su ejecución, está compuesta por 5 partes, de misma duración y progresión armónica, siendo esta I IV V, en la escala de C major (Do mayor). Estás partes se pueden conectar todas con todas y en el juego siguen un orden aleatorizado de ejecución de las mismas.
Su compás es 4/4 y tiene un ritmo y melodías alegres, está interpretado sobre un piano eléctrico con sonido de vibráfono y hardischop.

- Part A [ParteA][song1-A]
- Part B [ParteB][song1-B]
- Part C [ParteC][song1-C]
- Part D [ParteD][song1-D]
- Part E [ParteE][song1-E]

### [**Arte**](#índice)  
- Tanques: Los tanques cambian dependiendo del último Power Up que haya escogido el jugador.
![TanksSpriteSheet][image15]

- Balas: Las balas cambian dependiendo del tanque que esté controlando el jugador. 
![Bullets][image16]

- Tiles PowerUps.
![PowerUpsSpriteSheet][image17]

- Botones: Los botones que se han metido en el juego.
![Back][image18]
![Credits][image19]
![MainMenu][image20]
![Options][image21]
![Play][image22]
![VolumeSlider][image23]

- Tiles de juego: 
![TilesSpriteSheet][image24]




Modelos de paredes de papel y cartón.  
### [**Herramientas utilizadas**](#índice)

Software de dibujo: Clip Studio Paint  
Software de Diagramas: Draw.io  
Software de edición de código: Visual Studio Code, Sublime Text, Visual Studio  
Software de gestión de versiones: GitHub desktop, Git Bash  
Software organizativo: Trello  
Frameworks: Phaser 3  
Software de presentaciones: Canva

[audio1]: assets/Audio/SFX/Bullets/WallBounce.mp3
[audio2]: assets/Audio/SFX/Bullets/WallBounce2.mp3
[audio3]: assets/Audio/SFX/Bullets/DestroyBullet.mp3
[audio4]: assets/Audio/SFX/Bullets/Shoot.mp3
[audio5]: assets/Audio/SFX/Bullets/PaperDestroy.mp3

[audio6]: assets/Audio/SFX/UI/EnterOverButton.mp3
[audio7]: assets/Audio/SFX/UI/ExitOverButton.mp3
[audio8]: assets/Audio/SFX/UI/ChangeMenu.mp3
[audio9]: assets/Audio/SFX/Others/VictorySound.mp3

[song1-A]: assets/Audio/Music/TanksParty_PART_A.mp3
[song1-B]: assets/Audio/Music/TanksParty_PART_B.mp3
[song1-C]: assets/Audio/Music/TanksParty_PART_C.mp3
[song1-D]: assets/Audio/Music/TanksParty_PART_D.mp3
[song1-E]: assets/Audio/Music/TanksParty_PART_E.mp3

[image1]: ImagenesJER/MainMenu.png  
[image2]: ImagenesJER/Options.png  
[image3]: ImagenesJER/Gameplay.png  
[image4]: ImagenesJER/Pause.png  
[image5]: ImagenesJER/WinScreen.png  
[image6]: ImagenesJER/Credits.png  

[image7]: ImagenesJER/Navegacion_Hanabi_Tanks.png  

[image8]: ImagenesJER/Level1.png  
[image9]: ImagenesJER/Level2.png  
[image10]: ImagenesJER/Level3.png  
[image11]: ImagenesJER/Level4.png  
[image12]: ImagenesJER/Level5.png  
[image13]: ImagenesJER/Level6.png  
[image14]: ImagenesJER/PowerUp.png  

[image15]: ImagenesJER/TanksSpriteSheet.png  
[image16]: ImagenesJER/BulletsSpriteSheet.png  
[image17]: ImagenesJER/PowerUpsSpriteSheet.png

[image18]: assets/UI/Buttons/back.png
[image19]: assets/UI/Buttons/credits.png
[image20]: assets/UI/Buttons/mainMenu.png
[image21]: assets/UI/Buttons/options.png
[image22]: assets/UI/Buttons/play.png
[image23]: assets/UI/Buttons/volume.png
[image24]: assets/TilesSpriteSheet.png



