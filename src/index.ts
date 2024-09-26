// src/index.ts

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

});