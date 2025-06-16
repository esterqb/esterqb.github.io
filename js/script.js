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

function descargarPDF() {
    const link = document.createElement('a');
    link.href = '../../downloads/1-introduccion_a_la_programacion.pdf';
    link.download = '1-introduccion_a_la_programacion.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}