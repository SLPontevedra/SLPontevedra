document.addEventListener("DOMContentLoaded", function() {
    const noHeader = document.body.classList.contains('no-header');

    if (!noHeader) {
        const headerTemplate = `
            <header>
                <div class="logo-container">
                    <img src="/assets/images/Logo-SL-Pontevedra-Activa.png" alt="Logo SL Pontevedra Activa" class="logo">
                </div>
                <h1>SL Pontevedra Activa</h1>
                <nav>
                    <div class="menu-icon" id="menu-icon">&#9776;</div> <!-- Ícono hamburguesa -->
                    <ul id="menu-list">
                        <li><a href="/index.html">Inicio</a></li>
                        <li><a href="/blog.html">Blog</a></li>
                        <li><a href="/site-map.html">Guía Rápida</a></li>
                    </ul>
                </nav>
            </header>
        `;

        // Inserta el header en el body
        const bodyElement = document.body;
        bodyElement.insertAdjacentHTML('afterbegin', headerTemplate);

        // Lógica para el menú hamburguesa
        const menuIcon = document.getElementById("menu-icon");
        const menuList = document.getElementById("menu-list");

        // Alternar el menú al hacer clic en el ícono hamburguesa
        menuIcon.addEventListener("click", function() {
            menuList.classList.toggle("show");
        });
    }
});