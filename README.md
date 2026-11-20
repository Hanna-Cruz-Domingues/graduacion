# 🎓 Invitación Web Interactiva | Graduación de Kínder - Hanna

Plantilla alegre, interactiva y 100% responsiva diseñada para la **Graduación de Preescolar / Kínder**. Lista para abrirse en cualquier navegador móvil o de escritorio, y compartirse a través de WhatsApp.

---

## 🎨 Elementos Gráficos y Responsivos Incluidos

1. **Guirnalda de Banderines de Fiesta (SVG Responsivo)**:
   - Encabezado vectorial que se estira y escala con nitidez en cualquier resolución de pantalla (móviles, tablets y pantallas panorámicas).
2. **Stickers e Ilustraciones Flotantes con Animación Suave**:
   - Birretes 🎓, estrellas parpadeantes ✨, diplomas 📜 y crayones 🖍️ que flotan de fondo en la sección principal sin interferir con la lectura.
3. **Sobre / Bienvenida Interactiva con Globos**:
   - Globos animados y sello de birrete. Al presionar **"¡Abrir Invitación!"**, se desvanece suavemente, suena la música infantil y se dispara confeti festivo.
4. **Galería de Recuerdos Estilo Polaroid con Cinta Adhesiva (*Washi Tape*)**:
   - Marcos de fotos ligeramente inclinados con cintas de colores pastel decorativas para destacar el primer día de clases, festivales y amigos.
5. **Cuenta Regresiva con Tarjetas de Colores**:
   - Tarjetas coloridas (coral, amarillo, azul y menta) con efecto rebote al interactuar.
6. **Módulo de Ubicaciones en 2 Fases**:
   - **Fase 1: Acto de Graduación** (Auditorio escolar, diplomas, entrega de birretes).
   - **Fase 2: Fiesta y Juegos** (Salón jardín, inflables, comida y pastel).
   - Accesos directos a **Google Maps** y **Waze**.
7. **Itinerario Infantil**:
   - Línea de tiempo visual con colores y emojis para cada actividad.
8. **Formulario RSVP Adaptado a Familias**:
   - Permite indicar cuántos **Adultos 👨‍👩‍👧** y cuántos **Niños 👧👦** asistirán.
   - Envía el mensaje con formato listo para WhatsApp.

---

## 📁 Estructura del Proyecto

```text
d:\HANNA\
│
├── index.html              # Estructura de la invitación y secciones infantiles
├── css/
│   └── style.css           # Paleta festiva, animaciones y elementos gráficos responsivos
├── js/
│   └── app.js              # Lógica de cuenta regresiva, WhatsApp con adultos/niños y confeti
├── assets/
│   ├── audio/              # Música de fondo alegre (.mp3)
│   └── img/                # Fotografías para los marcos polaroid
└── README.md
```

---

## ⚙️ Cómo Personalizar

### 1. Datos de la Graduada y WhatsApp (`js/app.js`)
En [js/app.js](file:///d:/HANNA/js/app.js#L7-L23):
- Cambia la fecha en `eventDate`.
- Coloca tu número de WhatsApp en `whatsappNumber` (con código de país, sin espacios ni signos `+`).
- Ajusta el nombre de la escuela y salón en `eventLocation`.

### 2. Fotos de la Galería (`index.html`)
En [index.html](file:///d:/HANNA/index.html#L240-L280), sustituye los contenedores `.photo-placeholder` por tus fotos:
```html
<div class="polaroid-img-wrapper">
  <img src="assets/img/primer_dia.jpg" alt="Primer día de clases" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```
