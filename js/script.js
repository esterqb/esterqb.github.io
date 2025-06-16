document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar contenido dinámico
    function loadContent(button) {
        const page = button.getAttribute('data-page');
        const targetSelector = button.getAttribute('data-bs-target');
        const targetDiv = document.querySelector(targetSelector);
        
        if (!targetDiv.innerHTML.trim()) {
            fetch(page)
                .then(response => {
                    if (!response.ok) throw new Error("Error al cargar contenido");
                    return response.text();
                })
                .then(html => {
                    targetDiv.innerHTML = html;
                })
                .catch(error => {
                    console.error(error);
                    targetDiv.innerHTML = `
                        <div class="alert alert-danger">
                            Error al cargar el contenido: ${error.message}
                        </div>`;
                });
        }
    }

    // Inicializar eventos para botones de carga de contenido
    function initContentButtons() {
        document.querySelectorAll('.load-content-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                loadContent(this);
            });
        });
    }

    // Inicializar cuando se carga la sección de programación
    function initProgramacionSection() {
        const introSection = document.querySelector('.container.text-center.my-5');
        if (introSection) introSection.remove();
        
        initContentButtons();
    }

    // Manejar clic en el navbar
    document.querySelector('.load-section').addEventListener('click', function(e) {
        e.preventDefault();
        const targetDiv = document.getElementById('apartado-programacion');
        targetDiv.innerHTML = '';
        
        fetch(this.getAttribute('data-page'))
            .then(response => response.text())
            .then(html => {
                targetDiv.innerHTML = html;
                initProgramacionSection();
            });
        
        history.pushState(null, "", this.getAttribute('href'));
    });

    // Carga inicial
    if (window.location.hash === "#programacion") {
        const targetDiv = document.getElementById('apartado-programacion');
        fetch("pages/programacion/index.html")
            .then(response => response.text())
            .then(html => {
                targetDiv.innerHTML = html;
                initProgramacionSection();
            });
    }
});

async function descargarPDF() {
  // URL RAW directa al archivo en GitHub (¡usa este formato!)
  const url = 'https://raw.githubusercontent.com/esterqb/esterqb.github.io/main/downloads/1-introduccion_a_la_programacion.pdf';
  
  try {
    // 1. Descargar el archivo como blob
    const response = await fetch(url);
    const blob = await response.blob();
    
    // 2. Crear enlace temporal
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Introducción a la Programación.pdf'; // Nombre personalizado
    
    // 3. Simular click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 4. Limpiar memoria
    setTimeout(() => window.URL.revokeObjectURL(link.href), 100);
    
  } catch (error) {
    // Fallback: Abrir en nueva pestaña si hay error
    window.open('https://esterqb.github.io/downloads/1-introduccion_a_la_programacion.pdf', '_blank');
  }
}