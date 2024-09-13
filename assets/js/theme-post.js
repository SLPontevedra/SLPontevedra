document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('file');
    
    if (postFile) {
        const [theme, postCode] = postFile.split('/');
        try {
            // Cargar datos del tema
            const responseJson = await fetch(`${theme}/json/posts.json`);
            if (!responseJson.ok) throw new Error('Error al cargar los datos del tema');
            const postsData = await responseJson.json();
            const postDetails = postsData.posts.find(post => post.theme_code === postCode);
            
            if (postDetails) {
                // Actualizar el título del post
                document.getElementById('post-title').textContent = postDetails.title;
                document.getElementById('back-to-theme').href = `theme.html?theme=${theme.split('theme0')[1]}`;
                
                // Cargar el contenido del post (archivo markdown)
                const requestUrl = `${theme}/posts/${postCode}`;
                try {
                    const responseMd = await fetch(requestUrl);
                    if (!responseMd.ok) throw new Error(`Error al cargar el archivo del post: ${responseMd.statusText}`);
                    const mdContent = await responseMd.text();
                    document.getElementById('post-content').innerHTML = marked.parse(mdContent);
                    
                    // Generar índice de contenido
                    generateContentIndex();
                } catch (error) {
                    console.error('Error al procesar el contenido del post:', error);
                    document.getElementById('post-content').innerHTML = '<p>Error al cargar el contenido del post.</p>';
                }
            } else {
                document.getElementById('post-title').textContent = 'Post no encontrado';
                document.getElementById('post-content').textContent = 'El contenido no está disponible.';
            }
        } catch (error) {
            console.error('Error al cargar el post:', error);
            document.getElementById('post-title').textContent = 'Error al cargar el post';
            document.getElementById('post-content').textContent = 'No se pudo cargar el contenido del post.';
        }
    } else {
        document.getElementById('post-title').textContent = 'Archivo no especificado';
        document.getElementById('post-content').textContent = 'No se ha proporcionado un archivo para mostrar.';
    }

    // Función para generar el índice de contenido
    function generateContentIndex() {
        const contentElement = document.getElementById('post-content');
        const headings = contentElement.querySelectorAll('h2, h3'); // Añadir más si es necesario
        const indexList = document.getElementById('index-list');
        indexList.innerHTML = '';

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;  // Asignar un ID a cada encabezado
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            indexList.appendChild(listItem);
        });
    }
});
