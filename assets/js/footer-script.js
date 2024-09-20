document.addEventListener("DOMContentLoaded", function() {
    // Crear el pie de página dinámico
    const footer = document.createElement("footer");

    // Contenido HTML del pie de página
    footer.innerHTML = `
        <p>Proyecto de Código Abierto GIT: 
            <a href="https://github.com/SLPontevedra/SLPontevedra.github.io" target="_blank">SLPontevedra</a>
        </p>
        <p>&copy; <span id="footer-year"></span> | Correo Electrónico: 
            <a href="mailto:SLpontevedra@gmail.com">SLpontevedra@gmail.com</a>
        </p>
    `;

    // Insertar el pie de página en el cuerpo del documento
    document.body.appendChild(footer);

    // Obtener el año actual dinámicamente
    const yearSpan = document.getElementById("footer-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});
