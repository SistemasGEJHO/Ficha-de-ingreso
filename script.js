document.addEventListener('DOMContentLoaded', (event) => {
    const fechaHoyInput = document.getElementById('fechaHoy');
    const today = new Date().toISOString().split('T')[0];
    fechaHoyInput.value = today;
});

function generatePDF() {
    console.log('Generando PDF...');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    // URL del logo y nombre del instituto
    const logoUrl = './img/Logo.png';
    const institutoName = 'Colegio Jesús en el Huerto de los Olivos';
    
    // Añadir el logo y el nombre del instituto
    const logo = new Image();
    logo.src = logoUrl;
    logo.onload = function() {
        // Calcular el tamaño del logo para que se ajuste al PDF manteniendo la proporción
        const maxWidth = 30; // Ancho máximo en mm
        const maxHeight = 20; // Alto máximo en mm
        let width = logo.width * maxWidth / logo.height;
        let height = maxWidth;

        if (width > maxWidth) {
            width = maxWidth;
            height = logo.height * maxWidth / logo.width;
        }
        
        if (height > maxHeight) {
            height = maxHeight;
            width = logo.width * maxHeight / logo.height;
        }

        // Añadir el logo
        const logoX = 10; // Posición X del logo
        const logoY = 20; // Posición Y del logo (ajustar para alineación vertical)
        pdf.addImage(logo, 'PNG', logoX, logoY, width, height);

        // Añadir el nombre del instituto centrado
        pdf.setFontSize(16);
        const titleWidth = pdf.getTextWidth(institutoName); // Medir el ancho del texto del título
        const pdfWidth = pdf.internal.pageSize.width;
        const titleX = (pdfWidth - titleWidth) / 2; // Centrar el título horizontalmente

        // Posicionar el texto del título a la derecha del logo y alineado verticalmente
        pdf.text(institutoName, logoX + width + 10, logoY + height / 2 + 5); 

        let y = logoY + height + 20; // Espacio inicial para el contenido después del logo y nombre

        // Configura el estilo del PDF
        pdf.setFontSize(14); // Tamaño de fuente más grande

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
        const lineHeight = 4.6; // Altura de línea para el texto
        const marginBottom = 20; // Margen inferior para las páginas
        const contentMargin = 10; // Margen lateral del contenido

        pdf.setTextColor(0, 0, 0); // Color negro para el texto

        for (const [question, answer] of Object.entries(data)) {
            // Ajustar texto largo
            const questionText = `${question}:`;
            const answerText = answer;
            const contentWidth = pdf.internal.pageSize.width - contentMargin * 2;
            
            // Ajustar pregunta
            const questionLines = pdf.splitTextToSize(questionText, contentWidth);
            pdf.setFontSize(14);
            pdf.setTextColor(100, 100, 100); // Gris oscuro para las preguntas
            for (const line of questionLines) {
                if (y + lineHeight * 2 > pdf.internal.pageSize.height - marginBottom) {
                    pdf.addPage();
                    y = 20; // Reiniciar el espacio vertical
                    pdf.setFontSize(14); // Reajustar el tamaño de fuente en la nueva página
                    pdf.setTextColor(100, 100, 100); // Gris oscuro para las preguntas
                }
                
                pdf.text(line, contentMargin, y);
                y += lineHeight;
            }
            
            // Ajustar respuesta
            const answerLines = pdf.splitTextToSize(answerText, contentWidth);
            pdf.setFontSize(12); // Tamaño de fuente para las respuestas
            pdf.setTextColor(0, 0, 0); // Negro para las respuestas
            for (const line of answerLines) {
                if (y + lineHeight > pdf.internal.pageSize.height - marginBottom) {
                    pdf.addPage();
                    y = 20; // Reiniciar el espacio vertical
                    pdf.setFontSize(12); // Reajustar el tamaño de fuente en la nueva página
                    pdf.setTextColor(0, 0, 0); // Negro para las respuestas
                }
                
                pdf.text(line, contentMargin, y);
                y += lineHeight;
            }
            
            y += lineHeight * 2; // Espacio extra después de cada pregunta y respuesta
        }

        // Guardar el PDF
        pdf.save('respuestas_formulario.pdf');
    };
}
