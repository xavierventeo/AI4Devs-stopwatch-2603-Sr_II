# Código generado con ChatGPT Thinking

## Prompt 1: Creación de la página principal con enlaces a secciones stopwatch y countdown con un HTML vacío

### Rol
Actúa como un desarrollador frontend senior especializado en HTML, CSS y JavaScript.

Mantén el código simple, mantenible y alineado con principios Clean Code.

Prioriza claridad, separación de responsabilidades y una buena experiencia de usuario.

### Contexto del proyecto
- Debes apoyarte en los archivos seed existentes: `index.html` y `script.js` que te proporciono dentro de la carpeta template del repositorio GitHub https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/tree/main/template
- No inventes una estructura nueva.
- Trabaja sobre esa base respetando nombres de archivos y organización.
- Define una gama de colores basada en la imagen https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/blob/main/res/stopwatch.png
- Utiliza una pila de fuentes nativas del sistema, sin cargar fuentes externas, que tenga una estética clara y funcional similar a la de la página https://www.online-stopwatch.com/
- Crea una versión limpia y minimalista

### Objetivo
Crea una aplicación de tiempo en una sola página con 3 vistas lógicas horizontales:
- Countdown
- Selección de modo
- Stopwatch

La aplicación debe comportarse como un carrusel horizontal de vistas. No hay navegación entre documentos HTML independientes.

### Estructura funcional de la página

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

### Header persistente
Debe permanecer siempre visible en la parte superior e incluir:
- el título `Online Stopwatch`

El header:
- no cambia entre vistas
- no se desplaza horizontalmente
- permanece visible mientras cambia el contenido central

### Footer persistente
Debe permanecer siempre visible en la parte inferior.

El footer:
- no cambia entre vistas
- no se desplaza horizontalmente
- permanece visible mientras cambia el contenido central

### Requisitos de navegación entre vistas en la zona central dinámica
- La vista inicial visible al cargar la aplicación debe ser la selección de modo
- Solo debe haber una única vista visible en la zona central dinámica
- La transición entre vistas debe hacerse dentro de la misma zona central dinámica
- La navegación debe hacerse con un desplazamiento horizontal fluido, similar al comportamiento de https://www.online-stopwatch.com/, y la vista anterior debe quedar oculta al completarse la transición

- Regla simple:
  - si vas a una vista situada a la izquierda, la transición se mueve hacia la izquierda
  - si vas a una vista situada a la derecha, la transición se mueve hacia la derecha
  - Equivalencias:
    - Countdown está a la izquierda
    - Selección está en el centro
    - Stopwatch está a la derecha

- No debe haber saltos bruscos, ni cambios instantáneos, ni fade como único efecto, ni zoom.

### Requisitos funcionales de la vista selección de modo:
- La vista de selección de modo debe estar dividida en dos mitades verticales del mismo tamaño que denominaremos cards:
  - Tarjeta izquierda: opción Stopwatch
  - Tarjeta derecha: opción Countdown
- Cada mitad funciona como una tarjeta grande clickable
- Cada tarjeta contendrá:
  - Tarjeta Stopwatch
    - Copy: Stopwatch y, en un segundo nivel, una breve descripción. No añadas ningún copy adicional
    - Una imagen de una flecha verde hacia arriba. La imagen que encuentres deberá formar parte del proyecto
  - Tarjeta Countdown
    - Copy: Countdown y, en un segundo nivel, una breve descripción. No añadas ningún copy adicional
    - Una imagen de una flecha roja hacia abajo.
- Al pasar el ratón por encima de una tarjeta se resaltará el background con un color diferente al color de fondo original y alineado con el resto del diseño. Para esta funcionalidad, el color de fondo será el mismo para las dos tarjetas.
- Al pasar el ratón por encima de la tarjeta, no debe haber ningún efecto de movimiento, desplazamiento, escalado ni animación que altere la posición o tamaño de la tarjeta.
- Al salir el ratón de la zona de una tarjeta, se devolverá el color de background original
- Al hacer click sobre la tarjeta `Stopwatch` navega a la vista `Stopwatch`
- Al hacer click sobre la tarjeta `Countdown` a la vista `Countdown`
- Diseño responsive
- Diseño centrado y visual

### Requisitos de las vistas Stopwatch y Countdown
- Las vistas Stopwatch y Countdown serán una versión inicial sin funcionalidad
- Deben tener el mismo estilo, gama de colores y tipografía de la vista de selección de modo
- Añade un copy Stopwatch WIP y Countdown WIP respectivamente
- Debe contar con un botón Back que debe aparecer en el footer para volver a la vista de selección de modo

### Requisitos UX/UI
- Tipografía clara
- Alta jerarquía visual
- Los elementos de cada tarjeta deben aparecer centrados verticalmente
- Estética de cronómetro digital
- Los estilos generales en un fichero CSS separado, no incrustados en el HTML

### Stack tecnológico
- HTML
- CSS reutilizable
- JS simple
- Sin frameworks

### Entregables:
- Resumen breve
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- No incluyas archivos de referencia sobre los que te hayas basado para el diseño

## Prompt 2 — Funcionalidad de Stopwatch

Implementa un temporizador/cronómetro progresivo sobre la vista Stopwatch

### Contexto de la funcionalidad
- Utiliza los estilos y fuentes del proyecto ya existentes.
- La vista Stopwatch debe respetar el diseño y la estructura que te proporciona la imagen https://github.com/xavierventeo/AI4Devs-stopwatch-2603-Sr_II/blob/main/res/stopwatch.png

### Requisitos funcionales de la sección stopwatch:
- Sobre la estructura de página existente debes desarrollar un cronómetro en la vista Stopwatch ya existente dentro de la **zona central dinámica**
- La estructura de la pantalla debe ser:
  - Un display principal
    - En formato HH:MM:SS con tipo de letra grande, con valor inicial "00:00:00"
    - Un indicador secundario de milisegundos debajo, con tipo de letra más pequeño y alineado a la derecha, con valor inicial "000"
  - Genera dos botones de acción centrados debajo del display:
    - Un botón de acción principal a la izquierda
    - Un botón de limpieza a la derecha
- El botón de acción principal puede variar de estado:
    - Start
      - Estado inicial
      - Color background primario
      - Inicia el cronómetro que se visualiza en el display principal
    - Pause
      - Pause se activa una vez se pulsa Start
      - Color background secundario
      - Para el cronómetro
    - Continue
      - Continue se activa una vez se pulsa Pause
      - Mismo color background que Start
      - Continúa el cronómetro
- El botón de limpieza debe cumplir:
  - Copy Clear
  - Color background de stop
  - Para el cronómetro si estaba corriendo
  - Pone el display del cronómetro a 0
    - El tiempo a 00:00:00
    - La fracción a 000
  - Cambia el botón de acción principal a estado Start

### Restricciones
- No modifiques ni el header ni el footer
- No modifiques nada que no tenga que ver con la sección Stopwatch
- Modifica solo el contenido de la sección Stopwatch y añade solo estilos y JavaScript para la apariencia y lógica de esa sección

### Requisitos UX/UI
- Estética de cronómetro digital
- El cronómetro debe actualizarse de forma fluida y precisa.
- El estado visual debe reflejar si está corriendo o pausado.

### Entregables:
- Explica los cambios aplicados en el código
- Muestra los cambios de la mejora que has aplicado
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- Genera solo los ficheros que hayan tenido cambios y deben contener el código original y los cambios de la mejora que has aplicado

## Prompt 3 — Funcionalidad de Countdown

Implementa un temporizador regresivo sobre la vista Countdown

### Contexto de la funcionalidad
- Utiliza los estilos, fuentes y estructura del proyecto ya existentes.
- La vista Countdown debe respetar el diseño y composición visual del modo Countdown de https://www.online-stopwatch.com/, tal y como se aprecia en la captura proporcionada.
- Reutiliza la base de lógica temporal, formateo, renderizado y actualización del contador que ya implementaste en la vista Stopwatch, adaptándola a una lógica regresiva.
- No crees una nueva arquitectura ni una nueva pantalla fuera de la vista Countdown ya existente dentro de la aplicación.

### Requisitos funcionales de la página Countdown:
- Sobre la estructura de página existente debes desarrollar un contador regresivo en la vista Countdown ya existente dentro de la **zona central dinámica**
- La estructura de la pantalla debe ser:
  - Un display principal
    - Reutiliza el componente visual ya existente en la sección Stopwatch
  - Una botonera numérica debajo del display para introducir el tiempo del countdown
    - Dos filas
    - Primera fila: `0`, `1`, `2`, `3`, `4` y botón `Set`
    - Segunda fila: `5`, `6`, `7`, `8`, `9` y botón `Clear`
    - Los botones numéricos deben tener el mismo peso visual entre sí
    - Los botones `Set` y `Clear` deben ocupar más ancho que un botón numérico estándar
    - Los botones numéricos estándar y el botón `Set` deben tener el mismo color background
    - El color background del botón `Clear` de la sección Countdown debe ser de stop. Utiliza el mismo color background del botón `Clear` de la sección Stopwatch

### Comportamiento de introducción del tiempo
- El usuario debe poder construir el tiempo objetivo pulsando los botones numéricos
- La entrada debe funcionar como una inserción secuencial de 6 dígitos sobre el formato `HHMMSS`
- Cada pulsación desplaza a la izquierda los dígitos anteriores y añade el nuevo dígito al final
- Ejemplo:
  - estado inicial `00:00:00`
  - si el usuario pulsa `1` → `00:00:01`
  - si después pulsa `2` → `00:00:12`
  - si después pulsa `3` → `00:01:23`
  - si después pulsa `4` → `00:12:34`
- El sistema debe limitar la entrada a 6 dígitos efectivos
- Si se supera ese límite, debe mantenerse una lógica consistente de desplazamiento, conservando siempre los últimos 6 dígitos
- El campo de milisegundos no se introduce manualmente: siempre empieza en `000`

### Comportamiento del botón Set
  - Si hay un tiempo válido mayor que cero, muestra sin transición la sección `Stopwatch` con el tiempo indicado
  - Si marca 0, muestra sin transición la sección `Stopwatch` con el tiempo por defecto de 10 segundos.

### Comportamiento de la cuenta atrás
- Siempre que se llegue a la sección `Countdown` desde la sección `Selección de modo`, el tiempo en el display será 0: `00:00:00` y `000`
- Siempre que se llegue a la sección `Countdown` desde la sección `Stopwatch`, el contador no arrancará hasta que se pulse el botón de acción principal en estado Start
- La cuenta debe descender desde el tiempo configurado hasta `00:00:00.000`
- El contador debe actualizarse de forma fluida y precisa
- Debe utilizar una lógica robusta basada en tiempo real transcurrido y no en decrementos ingenuos fijos, para evitar deriva
- Al llegar a cero:
  - el contador debe detenerse automáticamente
  - no debe mostrar valores negativos
  - el display debe quedar exactamente en `00:00:00` y `000`
  - Debe activarse un estado de fin de cuenta atrás claramente perceptible, con impacto visual en el display y sonoro inmediato similar a una alarma
  - El botón de acción principal de la sección Stopwatch (Start, Pause, Continue) se debe ocultar y el botón Clear estar alineado a la derecha con el display. Tras esta situación:
    - Si se pulsa el botón Clear, se vuelve a mostrar el botón de acción principal y el display debe comportarse como un reset y mostrar el tiempo inicial indicado en la sección `Countdown`

### Comportamiento del botón Clear
  - Pone el display del cronómetro a 0
    - El tiempo a 00:00:00
    - La fracción a 000

### Refactor de la sección Stopwatch
- Debes adaptar la lógica de la sección `Stopwatch` para que:
  - Si se muestra desde la sección **Selección de modo** siga comportándose como un temporizador progresivo, tal y como está implementada
  - Si se muestra desde la sección **Countdown** se comporte como un temporizador regresivo.

### Requisitos UX/UI
- Mantén la estética visual del proyecto
- El cronómetro debe actualizarse de forma fluida y precisa.
- Asegúrate de que no haya conflictos en la aplicación de estilos y que el aspecto visual cumpla con los requisitos que te especifico.

### Restricciones
- No modifiques ni el header ni el footer

### Entregables:
- Explica los cambios aplicados en el código
- Muestra los cambios de la mejora que has aplicado
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- Genera solo los ficheros que hayan tenido cambios y deben contener el código original y los cambios de la mejora que has aplicado

## Prompt 4 — Corrección: la cuenta atrás continúa en segundo plano

### Problema detectado
Si el usuario inicia una cuenta atrás y pulsa **Back** antes de que termine, la cuenta atrás sigue ejecutándose en segundo plano y, al llegar a cero, suena la alarma.

Eso no debe ocurrir.

### Objetivo
Al pulsar **Back** y salir de la pantalla de countdown:
- la cuenta atrás debe pararse
- debe cancelarse cualquier timer o intervalo activo
- no debe sonar ninguna alarma
- no debe mantenerse la ejecución en background

### Requisitos
- Implementa la lógica necesaria para que el botón **Back** también cancele la cuenta atrás activa
- Si el usuario abandona la pantalla, la cuenta atrás debe considerarse cancelada, no pausada
- Si vuelve más tarde a countdown, no debe arrastrarse el estado anterior

### Restricciones
- No cambies el diseño general de la aplicación
- No modifiques el header ni el footer
- Haz solo los cambios necesarios para corregir este comportamiento

### Criterios de aceptación
- Inicio una cuenta atrás
- Pulso **Back** antes de que termine
- La cuenta atrás se detiene por completo
- No suena ninguna alarma después
- Si vuelvo a entrar, no queda estado anterior activo

### Entregables:
- Explica los cambios aplicados en el código
- Muestra los cambios de la mejora que has aplicado
- Archivos con el código completo listo para copiar bajo una carpeta stopwatch-XVB
- Genera solo los ficheros que hayan tenido cambios y deben contener el código original y los cambios de la mejora que has aplicado
