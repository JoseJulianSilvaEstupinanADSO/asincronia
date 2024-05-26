// 1. Basados en las imágenes solucionar los siguientes puntos:
// a. Describa el paso a paso del ejercicio (comente cada línea de
// código).
// b. Solucione el mismo ejercicio, utilizando solo promesas no
// async/await.
// c. Describa el paso a paso del ejercicio (comente cada línea de código)

const filtrar = x =>  x.name === "JavaScript_Ejercicios";

(async () => {
  let response = await fetch("../json/user.json"); 
  // Se utiliza fetch para obtener datos desde una URL, en este caso "../json/user.json".
  // 'await' hace que la ejecución espere hasta que la promesa de fetch se resuelva.
  // El resultado se almacena en la variable 'response'.

  let user = await response.json(); 
  // 'response.json()' convierte la respuesta en un objeto JSON.
  // 'await' espera a que esta conversión termine.
  // El objeto JSON resultante se almacena en la variable 'user'.

  let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`); 
  // Se utiliza fetch para obtener datos de la API de GitHub, específicamente los repositorios del usuario.
  // La URL es una template string que incluye 'user.name', obtenido del objeto JSON anterior.
  // 'await' espera a que la promesa de fetch se resuelva.
  // El resultado se almacena en la variable 'respuestaGithub'.

  let usuariogithub = await respuestaGithub.json(); 
  // 'respuestaGithub.json()' convierte la respuesta en un objeto JSON.
  // 'await' espera a que esta conversión termine.
  // El objeto JSON resultante se almacena en la variable 'usuariogithub'.

  usuariogithub.forEach(element => {
      // Se utiliza forEach para iterar sobre cada elemento del array 'usuariogithub'.
      if(element.name === "JavaScript_Ejercicios"){      
          // Se verifica si el nombre del repositorio es "JavaScript_Ejercicios".
          console.log(element);
          // Si la condición se cumple, se imprime el elemento (el repositorio).
      }
  });
})();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// SOLUCION CON SOLO PROMESAS


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


try {
  new Promise(function(resolve) { 
      // Creamos una nueva promesa y pasamos una función que recibe un argumento 'resolve'.
      let response;
      setTimeout(() => resolve(response = fetch("../json/user.json")), 1000);  
      // Utilizamos setTimeout para esperar 1 segundo antes de ejecutar fetch para obtener los datos del archivo "user.json".
      // Asignamos el resultado de fetch a la variable 'response' y llamamos a 'resolve' para cumplir la promesa con este valor.
  }).then(function(result) {     
      // Encadenamos un then para manejar la promesa resuelta anterior.
      return new Promise((resolve) => { 
          setTimeout(() => resolve(result.json()), 1000); 
          // Instanciamos otra promesa que espera 1 segundo antes de convertir 'result' a JSON usando result.json().
          // 'result' es el valor resuelto de la promesa anterior (la respuesta del fetch).
      });
  }).then(function(result) { 
      // Encadenamos otro then para manejar la promesa resuelta anterior.
      console.log(result)
      // Imprimimos el resultado del JSON obtenido (el contenido del archivo "user.json").
      return new Promise((resolve) => {
          setTimeout(() => resolve(fetch(`https://api.github.com/users/${result.name}/repos`)), 1000); 
          // Creamos otra promesa que espera 1 segundo antes de hacer un fetch a la URL de la API de GitHub.
          // 'result' es el JSON obtenido del archivo "user.json", y utilizamos 'result.name' para obtener el nombre de usuario de GitHub.
      });
  }).then(function(result){
      // Encadenamos otro then para manejar la promesa resuelta anterior.
      return new Promise((resolve) => {
          setTimeout(() => resolve(result.json()), 1000);
          // Esperamos 1 segundo y luego convertimos el resultado del fetch anterior a JSON usando result.json().
      });
  }).then(function(result) {
      // Encadenamos otro then para manejar la promesa resuelta anterior.
      result.forEach(element => {             
          // Iteramos sobre cada elemento del array de repositorios obtenido de la API de GitHub.
          if(element.name === "JavaScript_Ejercicios"){   
              // Verificamos si el nombre del repositorio es "JavaScript_Ejercicios".
              console.log(element)
              // Imprimimos el repositorio si cumple la condición.
              console.log(element.owner.avatar_url)  
              // Imprimimos la URL del avatar del propietario del repositorio.
          }
      }); 
  });
} catch (Error) {
  console.log(Error)
  // Si ocurre algún error en cualquiera de las promesas, lo capturamos y lo imprimimos en la consola.
}










