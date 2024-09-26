// src/index.ts
import {Observable, Subscriber} from 'rxjs';
document.addEventListener('DOMContentLoaded', () => {
    const generarBoton = document.getElementById('generateButton') as HTMLButtonElement;
    const nombreInput = document.getElementById('nameInput') as HTMLInputElement;
    const cardContainer = document.getElementById('cardContainer');

    const mensajeError = document.createElement('p');
    mensajeError.style.color = 'red';
    mensajeError.style.display = 'none'
    cardContainer?.parentElement?.insertBefore(mensajeError, cardContainer);

    generarBoton.addEventListener('click', () =>{
        const nombre  = nombreInput.value as string;

        mensajeError.style.display='none';
        new Promise((resolve, reject) =>{
            setTimeout(() =>{
                if (nombre.length < 3 || nombre.length == 0) {
                    reject('El nombre debe de tener al menos tres caracteres')
                }else{
                    resolve(nombre);
                }
        }, 1500);
        }).then((resolvedNombre) => {
            const card = document.createElement('ion-card');

            const cardContent = document.createElement('ion-card-content');
            cardContent.textContent = nombre;

            card.appendChild(cardContent);

            cardContainer?.appendChild(card);
            nombreInput.value = '';
        })
        .catch((error) => {
            mensajeError.textContent = `Error ${error}`;
            mensajeError.style.display = 'block'; 
        });
    });

    const imageButton = document.getElementById('generateImage') as HTMLButtonElement;
    const imgContainer = document.getElementById('imgContainer')!;

    const mostrarImagen$ = new Observable((subscriber) => {
        const click = () => {
            subscriber.next();
        };

        imageButton.addEventListener('click', click);

        return () => {
            imageButton.removeEventListener('click', click);
        };
    });

    mostrarImagen$.subscribe(() => {
        fetch('https://api.thecatapi.com/v1/images/search') // Usar fetch para obtener la imagen
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json(); // Parsear la respuesta a JSON
            })
            .then(data => {
                const imgUrl = data[0].url; // Asumimos que la respuesta es un array

                const img = document.createElement('img');
                img.src = imgUrl; // Usar la URL de la imagen obtenida
                img.alt = 'Imagen de ejemplo';
                img.style.display = 'block';
                img.style.marginTop = '10px';

                // Añadir la nueva imagen al contenedor
                imgContainer.appendChild(img);
            })
            .catch(error => {
                console.error('Error al obtener la imagen:', error);
                const errorImg = document.createElement('p');
                errorImg.textContent = 'Error al cargar la imagen';
                errorImg.style.color = 'red';
                imgContainer.appendChild(errorImg);
            });
    });
});