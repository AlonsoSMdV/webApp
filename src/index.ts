import { Observable } from "rxjs";

document.addEventListener('DOMContentLoaded', () => {
    const generarBoton = document.getElementById('generateButton') as HTMLButtonElement;
    const nombreInput = document.getElementById('nameInput') as HTMLInputElement;
    const cardContainer = document.getElementById('cardContainer');

    const mensajeError = document.createElement('p');
    mensajeError.style.color = 'red';
    mensajeError.style.display = 'none'
    cardContainer?.parentElement?.insertBefore(mensajeError, cardContainer);

    generarBoton.addEventListener('click', () => {
        const nombre = nombreInput.value as string;

        mensajeError.style.display = 'none';
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (nombre.length < 3 || nombre.length === 0) {
                    reject('El nombre debe de tener al menos tres caracteres');
                } else {
                    resolve(nombre);
                }
            }, 1500);
        }).then((resolvedNombre) => {
            const card = document.createElement('ion-card');
            const cardContent = document.createElement('ion-card-content');
            cardContent.textContent = nombre; // Asegúrate de usar el nombre resuelto aquí
            card.appendChild(cardContent);
            cardContainer?.appendChild(card);
            nombreInput.value = '';
        })
        .catch((error) => {
            mensajeError.textContent = `Error: ${error}`;
            mensajeError.style.display = 'block'; 
        });
    });

    const generarImg = document.getElementById('generateImage') as HTMLButtonElement;
    const imgContainer = document.getElementById('imgContainer');

    const generarImg$ = new Observable<void>((subscriber) => {
        const click = () => {
            subscriber.next();
        };

        generarImg.addEventListener('click', click);
    });

    const subscription = generarImg$.subscribe(() => {
        fetch('https://picsum.photos/200/300')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.url; // Obtener la URL de la imagen
            })
            .then(imgUrl => {
                const card2 = document.createElement('ion-card');
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = 'Imagen aleatoria';
                img.style.display = 'block';
                img.style.marginTop = '10px';
                card2.appendChild(img);
                imgContainer?.appendChild(card2);
            });
    });

    // Consider adding a way to unsubscribe if necessary
});