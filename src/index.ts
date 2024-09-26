// src/index.ts
console.log('Script cargado')

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

        if (!nombre || nombre.trim() === '') {
            mensajeError.textContent = 'Error: Debes ingresar un nombre o texto';
            mensajeError.style.display = 'block';
            return;
        }

        const card = document.createElement('ion-card');

        const cardContent = document.createElement('ion-card-content');
        cardContent.textContent = nombre;

        card.appendChild(cardContent);

        cardContainer?.appendChild(card);
        nombreInput.value = '';
        
    });

});