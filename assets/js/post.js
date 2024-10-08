document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let postFile = urlParams.get('file');

    if (postFile) {
        try {
            postFile = postFile.split('/').pop();

            const responseJson = await fetch('blog/json/posts.json');
            if (!responseJson.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const postsData = await responseJson.json();
            const postDetails = postsData.posts.find(post => post.blog_code === postFile);

            if (postDetails) {
                // Modificar el título en el head dinámicamente
                document.title = `${postDetails.title} - Pontevedra Activa`;

                // Modificar la meta descripción
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', postDetails.intro);
                }

                // Actualizar metadatos Open Graph
                const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                ogTitle.setAttribute('content', postDetails.title);
                document.head.appendChild(ogTitle);

                const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
                ogDescription.setAttribute('property', 'og:description');
                ogDescription.setAttribute('content', postDetails.intro);
                document.head.appendChild(ogDescription);

                const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
                ogImage.setAttribute('property', 'og:image');
                ogImage.setAttribute('content', `https://slpontevedra.github.io/blog/img/${postDetails.img}`);
                document.head.appendChild(ogImage);

                const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
                ogUrl.setAttribute('property', 'og:url');
                ogUrl.setAttribute('content', window.location.href);
                document.head.appendChild(ogUrl);

                const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
                ogType.setAttribute('property', 'og:type');
                ogType.setAttribute('content', 'article');
                document.head.appendChild(ogType);

                // Actualizar metadatos Twitter Cards
                const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
                twitterCard.setAttribute('name', 'twitter:card');
                twitterCard.setAttribute('content', 'summary_large_image');
                document.head.appendChild(twitterCard);

                const twitterTitle = document.querySelector('meta[name="twitter:title"]') || document.createElement('meta');
                twitterTitle.setAttribute('name', 'twitter:title');
                twitterTitle.setAttribute('content', postDetails.title);
                document.head.appendChild(twitterTitle);

                const twitterDescription = document.querySelector('meta[name="twitter:description"]') || document.createElement('meta');
                twitterDescription.setAttribute('name', 'twitter:description');
                twitterDescription.setAttribute('content', postDetails.intro);
                document.head.appendChild(twitterDescription);

                const twitterImage = document.querySelector('meta[name="twitter:image"]') || document.createElement('meta');
                twitterImage.setAttribute('name', 'twitter:image');
                twitterImage.setAttribute('content', `https://slpontevedra.github.io/blog/img/${postDetails.img}`);
                document.head.appendChild(twitterImage);

                // Cargar el título en el cuerpo del documento
                document.getElementById('post-title').textContent = postDetails.title;

                // Cargar el contenido del post (markdown)
                const responseMd = await fetch(`blog/posts/${postFile}`);
                if (!responseMd.ok) {
                    throw new Error(`Error al cargar el archivo ${postFile}`);
                }
                const mdContent = await responseMd.text();
                const postContent = marked.parse(mdContent);
                document.getElementById('post-content').innerHTML = postContent;

                // Cargar la imagen del post y aplicar la clase CSS para el estilo
                const postImage = document.createElement('img');
                postImage.src = `blog/img/${postDetails.img}`;
                postImage.alt = postDetails.title;
                postImage.classList.add('responsive-post-image');  // Añadir clase para estilos
                postImage.onerror = () => {
                    postImage.src = 'blog/img/default.jpg';
                };
                document.getElementById('post-content').insertAdjacentElement('afterbegin', postImage);

                generateContentIndex();
            } else {
                document.getElementById('post-title').textContent = 'Post no encontrado';
                document.getElementById('post-content').textContent = 'El contenido no está disponible.';
            }
        } catch (error) {
            document.getElementById('post-title').textContent = 'Error al cargar el post';
            document.getElementById('post-content').textContent = 'No se pudo cargar el contenido del post.';
        }
    } else {
        document.getElementById('post-title').textContent = 'Archivo no especificado';
        document.getElementById('post-content').textContent = 'No se ha proporcionado un archivo para mostrar.';
    }

    function generateContentIndex() {
        const contentElement = document.getElementById('post-content');
        const headings = contentElement.querySelectorAll('h2');
        const indexList = document.getElementById('index-list');
        indexList.innerHTML = '';

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            indexList.appendChild(listItem);
        });
    }
});
