document.querySelectorAll('.load-content-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    console.log("Botón clicado:", btn);
    const page = btn.getAttribute('data-page');
    const targetId = btn.getAttribute('data-bs-target')?.replace('#', '');
    const container = document.getElementById(targetId);

    // Solo carga si container está vacío para evitar recargas
    if (page && container && container.innerHTML.trim() === "") {
      try {
        const response = await fetch(page);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        container.innerHTML = html;
      } catch (error) {
        console.error("Error cargando página:", error);
        container.innerHTML = "<p class='text-danger'>Error al cargar el contenido.</p>";
      }
    }
  });
});
