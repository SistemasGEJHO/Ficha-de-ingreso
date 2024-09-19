document.addEventListener('DOMContentLoaded', (event) => {
    const fechaHoyInput = document.getElementById('fechaHoy');
    const today = new Date().toISOString().split('T')[0];
    fechaHoyInput.value = today;
});

function generatePDF() {
    console.log('Generando PDF...');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    // Configura el estilo del PDF
    pdf.setFontSize(14); // Tamaño de fuente más grande
    let y = 20; // Espacio inicial en la página

    // Título del documento
    pdf.text('Respuestas del Formulario', 10, y);
    y += 20;

    // Datos del formulario
    const data = {
        'Fecha actual': document.getElementById('fechaHoy').value,
        'Sala/curso al que desea ingresar': document.getElementById('cursoSala').value,
        'Apellido y nombre': document.getElementById('name').value,
        'Fecha de Nacimiento': document.getElementById('nacimiento').value,
        'Nacionalidad': document.getElementById('nacionalidad').value,
        'Nombre del colegio del cual proviene': document.getElementById('colegioProveniente').value,
        'Colegios anteriores al actual': document.getElementById('colegiosAnteriores').value,
        'Apellido y nombre de la madre': document.getElementById('madre').value,
        'Celular de la madre': document.getElementById('celularMadre').value,
        'Mail de la madre': document.getElementById('mailMadre').value,
        'Fecha de Nacimiento de la madre': document.getElementById('nacimientoMadre').value,
        'Nacionalidad de la madre': document.getElementById('nacionalidadMadre').value,
        'Profesión/ocupación de la madre': document.getElementById('ocupacionMadre').value,
        'Apellido y nombre del padre': document.getElementById('padre').value,
        'Celular del padre': document.getElementById('celularPadre').value,
        'Mail del padre': document.getElementById('mailPadre').value,
        'Fecha de Nacimiento del padre': document.getElementById('nacimientoPadre').value,
        'Nacionalidad del padre': document.getElementById('nacionalidadPadre').value,
        'Profesión/ocupación del padre': document.getElementById('ocupacionPadre').value,
        '¿Cómo está conformada la familia?': document.getElementById('conformacionFamilia').value,
        '¿Hay alguna situación de salud que crea conveniente comentar?': document.getElementById('situacionSalud').value,
        '¿Proyecto de integración?': document.getElementById('proyectoIntegracion').value,
        '¿Por qué razones elige nuestro colegio? (Al menos 3)': document.getElementById('razonesElegir').value,
        '¿Hay algún miembro ex alumno en la familia?': document.getElementById('exAlumno').value,
        'Hermano/s en el JHO': document.getElementById('hermanosJHO').value,
        '¿Considera importante agregar alguna información más?': document.getElementById('informacionAdicional').value,
    };

    // Añadir contenido al PDF
    const lineHeight = 10; // Altura de línea para el texto
    const marginBottom = 20; // Margen inferior para las páginas

    for (const [question, answer] of Object.entries(data)) {
        // Asegurarse de que haya suficiente espacio en la página para el nuevo texto
        if (y + lineHeight * 3 > pdf.internal.pageSize.height - marginBottom) {
            pdf.addPage();
            y = 20; // Reiniciar el espacio vertical
            pdf.setFontSize(14); // Reajustar el tamaño de fuente en la nueva página
        }
        
        pdf.setFontSize(14);
        pdf.text(`${question}:`, 10, y);
        y += lineHeight;
        pdf.setFontSize(12); // Tamaño de fuente para las respuestas
        pdf.text(answer, 10, y);
        y += lineHeight * (answer.split('\n').length + 1); // Ajustar según el número de líneas de la respuesta
        y += lineHeight; // Espacio extra después de cada pregunta
    }

    // Guardar el PDF
    pdf.save('respuestas_formulario.pdf');
}
