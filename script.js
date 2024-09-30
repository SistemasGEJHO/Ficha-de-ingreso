document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ format: 'a4' });

    // Cargar la imagen del logo
    const logoURL = './img/Logo.png'; // Asegúrate de que el archivo esté en la ruta correcta

    // Obtener la fecha actual del formulario
    const fechaHoy = document.getElementById('fechaHoy').value;

    // Obtener los datos del formulario
    const data = {
        'Fecha actual': fechaHoy,
        'Sala/curso al que desea ingresar': document.getElementById('cursoSala').value,
        'Apellido y nombre del aspirante': document.getElementById('name').value,
        'Fecha de Nacimiento': document.getElementById('nacimiento').value,
        'Nacionalidad': document.getElementById('nacionalidad').value,
        'Nombre del colegio del cual proviene': document.getElementById('colegioProveniente').value,
        'Colegios anteriores': document.getElementById('colegiosAnteriores').value,
        'Bautismo': document.getElementById('bautismo').checked ? 'Sí' : 'No',
        'Primera Comunión': document.getElementById('primera_comunion').checked ? 'Sí' : 'No',
        'Confirmación': document.getElementById('confirmacion').checked ? 'Sí' : 'No',
        'Idiomas': obtenerIdiomas(),
        'Apellido y nombre de la madre': document.getElementById('madre').value,
        'Celular de la madre': document.getElementById('celularMadre').value,
        'Mail de la madre': document.getElementById('mailMadre').value,
        'Fecha de nacimiento de la madre': document.getElementById('nacimientoMadre').value,
        'Nacionalidad de la madre': document.getElementById('nacionalidadMadre').value,
        'Profesión/ocupación de la madre': document.getElementById('ocupacionMadre').value,
        'Apellido y nombre del padre': document.getElementById('padre').value,
        'Celular del padre': document.getElementById('celularPadre').value,
        'Mail del padre': document.getElementById('mailPadre').value,
        'Fecha de nacimiento del padre': document.getElementById('nacimientoPadre').value,
        'Nacionalidad del padre': document.getElementById('nacionalidadPadre').value,
        'Profesión/ocupación del padre': document.getElementById('ocupacionPadre').value,
        'Conformación de la familia': document.getElementById('conformacionFamilia').value,
        'Situación de salud': document.getElementById('situacionSalud').value,
        'Proyecto de integración': document.getElementById('proyectoIntegracion').value,
        'Razones para elegir el colegio': document.getElementById('razonesElegir').value,
        'Ex alumno en la familia': document.getElementById('exAlumno').value,
        'Hermano/s en el JHO': document.getElementById('hermanosJHO').value,
        'Información adicional': document.getElementById('informacionAdicional').value
    };

   // Cargar la imagen en el PDF con proporciones adecuadas
const anchoOriginal = 30; // Ancho deseado
const altoOriginal = 36; // Ajusta este valor según la proporción real de la imagen

// Ajustar el alto manteniendo las proporciones originales
doc.addImage(logoURL, 'PNG', 10, 10, anchoOriginal, altoOriginal);


    // Título del documento
    doc.setFontSize(16);
    doc.text('Formulario de Inscripción', 70, 20);
    doc.text('Colegio Jesús en el Huerto de los Olivos', 70, 30);

// Ajustar fuente y tamaño para el contenido
doc.setFontSize(12);
let y = 50;
const lineHeight = 10;
const pageHeight = doc.internal.pageSize.height;
const marginBottom = 30;
const dataStartX = 10; // Posición inicial en X para los datos
const maxLineWidth = 180; // Máximo ancho para el texto

// Agregar los datos al PDF con el ajuste para que las respuestas estén en una nueva línea
for (let key in data) {
    if (data[key]) {
        if (y > pageHeight - marginBottom) {
            doc.addPage();
            y = 20;
        }

        // Espacio entre la pregunta y la respuesta
        const extraSpaceBetweenQuestionAndAnswer = 1; // Espacio adicional entre pregunta y respuesta
        const extraSpaceBetweenAnswerAndNextQuestion = 8; // Espacio adicional entre respuesta y la próxima pregunta

        // Campo en gris (la pregunta)
        doc.setTextColor(100);
        doc.text(`${key}:`, dataStartX, y);
        
        y += lineHeight + extraSpaceBetweenQuestionAndAnswer; // Espacio antes de la respuesta

        // Respuesta en negrita y color negro
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0);

        // Dividir el texto en múltiples líneas si es necesario
        const textLines = doc.splitTextToSize(data[key], maxLineWidth);
        doc.text(textLines, dataStartX, y);
        doc.setFont('helvetica', 'normal');

        // Aumentar el espacio dependiendo del número de líneas de la respuesta
        y += (textLines.length * 7) + extraSpaceBetweenAnswerAndNextQuestion; // Ajuste para el espacio entre las respuestas y la próxima pregunta
    }
}


    // Footer del PDF
    if (y > pageHeight - marginBottom) {
        doc.addPage();
        y = 20;
    }

    doc.setFontSize(10);
    doc.text('Colegio Jesús en el Huerto de los Olivos - Ricardo Gutierrez 1199 - TEL: 4790-5772 / 47998990', 10, pageHeight - 20);
    doc.text('La presente solicitud de ingreso no implica vacante.', 10, pageHeight - 10);

    // Guardar el PDF
    doc.save('formulario_inscripcion.pdf');
});

function obtenerIdiomas() {
    let idiomas = [];
    if (document.getElementById('ingles').checked) idiomas.push('Inglés');
    if (document.getElementById('frances').checked) idiomas.push('Francés');
    const otroIdioma = document.getElementById('otroIdioma').value;
    if (otroIdioma) idiomas.push(otroIdioma);
    return idiomas.join(', ');
}

function poblarListaPaises() {
    const paises = [
        "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", 
        "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", 
        "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", 
        "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", 
        "Chipre", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", 
        "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", 
        "Eslovenia", "España", "Estados Unidos", "Estonia", "Esuatini", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", 
        "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", 
        "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Israel", 
        "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", 
        "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", 
        "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", 
        "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", 
        "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", 
        "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República del Congo", 
        "República Democrática del Congo", "República Dominicana", "Ruanda", "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves", 
        "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", 
        "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", 
        "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", 
        "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Vaticano", "Venezuela", 
        "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
    ];

    const nacionalidadAspirante = document.getElementById('nacionalidad');
    const nacionalidadMadre = document.getElementById('nacionalidadMadre');
    const nacionalidadPadre = document.getElementById('nacionalidadPadre');

    // Llenar el desplegable de nacionalidad del aspirante
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        if (pais === "Argentina") {
            option.selected = true;
        }
        nacionalidadAspirante.appendChild(option);
    });

    // Llenar el desplegable de nacionalidad de la madre
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        if (pais === "Argentina") {
            option.selected = true;
        }
        nacionalidadMadre.appendChild(option);
    });

    // Llenar el desplegable de nacionalidad del padre
    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        if (pais === "Argentina") {
            option.selected = true;
        }
        nacionalidadPadre.appendChild(option);
    });
}


window.onload = function () {
    // Autocompletar la fecha actual
    const fechaActualInput = document.getElementById('fechaHoy');
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const año = fechaActual.getFullYear();
    const fechaHoy = `${dia}-${mes}-${año}`;

    fechaActualInput.value = fechaHoy;

    // Poblar la lista de países
    poblarListaPaises();
};
