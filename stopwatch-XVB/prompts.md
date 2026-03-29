# Codigo generado con ChatGPT Thinking

# Prompt 1: Creación de la página principal con enlaces a páginas con stopwatch.html y countdown.html con un html vacío

## Rol
Actúa como un desarrollador frontend senior especializado en HTML, CSS y JavaScript. 

Mantén el código simple, mantenible y alineado con principios Clean Code. 

Prioriza claridad, separación de responsabilidades y una buena experiencia de usuario.

## Contexto del proyecto
- Debes apoyarte en los archivos seed existentes: `index.html` y `script.js` que te proporciono dentro de la carpeta template del repositorio GitHub https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/tree/main/template
- No inventes una estructura nueva.
- Trabaja sobre esa base respetando nombres de archivos y organización.
- Define una gama de colores basada en la imagen https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/blob/main/res/stopwatch.png
- Utiliza una pila de fuentes nativas del sistema, sin cargar fuentes externas, que tenga una estética clara y funcional similar a la de la página https://www.online-stopwatch.com/
- Crea una versión limpia y minimalista

## Objetivo
Crea una aplicación de tiempo en una sola página con 3 vistas lógicas horizontales:
- Countdown
- Selección de modo
- Stopwatch

La aplicación debe comportarse como un carrusel horizontal de vistas. No hay navegación entre documentos HTML independientes.

## Estructura funcional de la página

La aplicación debe tener:
- Un **header persistente**
- Una **zona central dinámica**
- Un **footer persistente**

El `header` y el `footer` deben permanecer siempre visibles y no deben participar en las transiciones. Solo debe cambiar la zona central.

La zona central tendrá 3 vistas dentro de la misma página:
- `Countdown`
- `Selección de modo`
- `Stopwatch`

El orden lógico debe ser:

`Countdown <-> Selección <-> Stopwatch`

La vista inicial al cargar debe ser **Selección de modo**.

## Header persistente
Debe permanecer siempre visible en la parte superior e incluir:
- el título `Online Stopwatch`

El header:
- no cambia entre vistas
- no se desplaza horizontalmente
- permanece visible mientras cambia el contenido central

## Footer persistente
Debe permanecer siempre visible en la parte inferior.

El footer:
- no cambia entre vistas
- no se desplaza horizontalmente
- permanece visible mientras cambia el contenido central


## Requisitos de navegación entre vistas en la zona central dinámica
- La vista inicial visible al cargar la aplicación debe ser la selección de modo
- Sólo debe haber una única vista visible en la zona central dinámica
- La transición entre vistas debe hacerse dentro de la misma zona central dinámica
- La navegación debe hacerse con un desplazamiento horizontal fluido, similar al comportamiento de https://www.online-stopwatch.com/ y la vista anterior debe quedar oculta al completarse la transición

- Regla simple:
  - si vas a una vista situada a la izquierda, la transición se mueve hacia la izquierda
  - si vas a una vista situada a la derecha, la transición se mueve hacia la derecha
  - Equivalencias:
    - Countdown está a la izquierda
    - Selección está en el centro
    - Stopwatch está a la derecha

- No debe haber saltos bruscos, ni cambios instantáneos, ni fade como único efecto, ni zoom.

## Requisito funcionales de la vista selección de modo:
- La vista selección de modo debe estar dividida en dos mitades verticales del mismo tamaño que denominaremos cards:
  - Tarjeta izquierda: opción Stopwatch
  - Tarjeta derecha: opción Countdown
- Cada mitad funciona como una tarjeta grande clickable
- Cada tarjeta contendrá:
  - Tarjeta Stopwatch
    - Copy: Stopwatch y en un segundo nivel una breve descripción. No añadas ningún copy adicional
    - Una imagen de una flecha verde hacia arriba. La imagen que encuentres deberá formar parte del proyecto
  - Tarjeta Countdown
    - Copy: Countdown y en un segundo nivel una breve descripción. No añadas ningún copy adicional
    - Una imagen de una flecha roja hacia abajo. 
- Al pasar el ratón por encima de una tarjeta se resaltará el background con un color diferente al color de fondo original y alineado con el resto del diseño. Para esta funcionalidad, el color de fondo será el mismo para las dos tarjetas. 
- Al pasar el ratón por encima de la tarjeta, no debe haber ningún efecto de movimiento, desplazamiento, escalado ni animación que altere la posición o tamaño de la tarjeta. 
- Al salir el ratón de la zona de una Tarjeta, se devolverá el color de background original 
- Al hacer click sobre la tarjeta `Stopwatch` navega a la vista `Stopwatch` 
- Al hacer click sobre la tarjeta `Countdown` a la vista `Countdown`                                            
- Diseño responsive
- Diseño centrado y visual

## Requisitos vistas Stopwatch y Countdown
- Las vistas Stopwatch y Countdown serán una versión inicial sin funcionalidad
- Deben tener em mismo estilo, gama de coleres y tipografia de la vista selección de modo
- Añade un copy Stopwatch WIP y Countdown WIP respectivamente
- Debe contar con un botón Back que debe aparecer en el footer para volver a la vista selección de modo

## Requisitos UX/UI
- Tipografía clara
- Alta jerarquía visual
- Los elementos de cada tarjeta deben aparecer centrados verticalmente
- Estética de cronómetro digital
- Los estilos generalos en un fichero css separado, no incrustados en el html

## Stack tecnológico
- HTML
- CSS reutilizable
- JS simple
- Sin frameworks

## Entregables:
- Resumen breve
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- No incluyas archivos de referencia sobre los que te hayas basado para el diseño



# Prompt 2 — Funcionalidad de Stopwatch

Implementa un temporizador/cronómetro progresivo sobre la vista Stopwatch

## Contexto de la funcionalidad
- Utiliza los estilos y fuentes del proyecto ya existentes.
- La vista stopwatch debe respetar el diseño y estructura que te proporciona la imagen https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/blob/main/res/stopwatch.png

## Requisito funcionales página stopwatch.html:
- Sobre la estructura de página existente debes desarrollar un cronómetro en vista Stopwatch ya existente dentro de la **zona central dinámica** 
- La estructura de la pantalla debe ser:
  - Un display principal
    - En formato HH:MM:SS con tipo de letra grande con valor inicial "00:00:00"
    - Un indicador secundario de milisegundos debajo con tipo de letra más pequeño y alineados a la derecha con valor inicial "000"
  - Gnera dos botones de acción centrados debajo del display:  
    - Un botón de acción principal a la izquierda
    - Un botón de limpieza a la derecha
- El botón de acción principal puede variar de estado:
    - Start
      - Estado inicial
      - Color background primario
      - Inicia el cronómetro que se visualiza en el display principal
    - Pause
      - Pause se activa una vez se pulsa a Start
      - Color background secundario
      - Para el cronómetro
    - Continue
      - Continue se activa una ves se pulsa a Pause
      - Mismo color background que Start
      - Continua el cronómetro
- El botón de limpieza debe cumplir:
  - Copy Clear
  - Color background de stop
  - Para el cronómetro si estaba corriendo
  - Pone el display del cronómetro a 0
    - El tiempo a 00:00:00
    - La fracción a 000
  - Cambia el btoón de acción principal a estado Start

## Restricciones
- No modifiuqes ni el header ni el footer
- No modifiques nada que no tenga que ver con la sección Stopwatchs
- Modifica sólo el contenido de la sección StopWatch y añade sólo estilos y javascript para la apariencia y lógica de esa sección

## Requisitos UX/UI
- Estética de cronómetro digital
- El cronómetro debe actualizarse de forma fluida y precisa.
- El estado visual debe reflejar si está corriendo o pausado.


## Entregables:
- Explica los cambios aplicados en el código
- Muestra los cambios de la mejora que has aplicado
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- Genera sólo los ficheros que hayan tenido cambios y deben contener el código original y los cambios de la mejora que has aplicado
