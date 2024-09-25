// src/index.ts
function tarjeta(){
  const botonMostrar = document.getElementById('mostrar');
  const tarjeta = document.getElementById('tarjeta');
  const textoTarjeta = document.getElementById('textoTarjeta');
  
  if (botonMostrar && tarjeta && textoTarjeta) {
      botonMostrar.addEventListener('click', () => {
          const textoInput = (document.getElementById('nombre') as HTMLInputElement).value;
  
          if (textoInput) {
              textoTarjeta.textContent = textoInput;
              tarjeta.style.display = 'block';
          } else {
              alert('Por favor, introduce un texto.');
          }
      });
  } else {
      console.error('No se encontraron algunos elementos del DOM.');
  }
}
