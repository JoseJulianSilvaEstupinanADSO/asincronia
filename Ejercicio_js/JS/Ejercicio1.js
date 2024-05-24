// 1. Basados en las imágenes solucionar los siguientes puntos:
// a. Describa el paso a paso del ejercicio (comente cada línea de
// código).
// b. Solucione el mismo ejercicio, utilizando solo promesas no
// async/await.
// c. Describa el paso a paso del ejercicio (comente cada línea de código)

const filtrar = x =>  x.name === "JavaScript_Ejercicios";

(async () => {
    let response = await fetch("../json/user.json"); //se utiliza el fecth para buscar datos por medio de una url 
    let user = await response.json(); // el await hace que tenga un tiempo de espera hasta que la variable response termine de leer el archivo y luego lo convierte en json

    let respuestaGithub = await fetch(`https://api.github.com/users/${user.name}/repos`); //luego nuevamente el await espera a que termine el proceso y luego ejecuta el fetch el cual tiene como url la api de github
                                                                                        //la url es un template string en el cual esta la api y el user.name que es extraido de nuestra variable user la cual ya contiene los datos del json

    let usuariogithub = await respuestaGithub.json(); // nuevamente se convierten los datos encontrados por medio de la api de github a json y quedan almacenados en la variable usuariogithub
    usuariogithub.forEach(element => {
        if(element.name === "JavaScript_Ejercicios"){      
            //fianlmente se recorre con un foreach el json que contiene los datos extraidos anterior mente de la api de github
            console.log(element)
        }
        console.log(element)
    });
})();



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// try {
//     new Promise(function(resolve) { /// bueno el ejercicio lo resolvi utilizando Devolviendo promesas(callbacks) 

//         let response;
//         setTimeout(() => resolve( response = fetch("../json/user.json")), 1000);  // en esta primera promesa se aplica un setTimeout con un segundo de espera, para asignarle a la variable response los datos obtenidos con el fetch de la url
      
//       }).then(function(result) {     
    
//         return new Promise((resolve) => { 
//           setTimeout(() => resolve(result.json()), 1000); // instanciamos otra promesa con la cual tomamos el result con el .then y el resultado anterior los pasamos a json con el metodo.json
//         });
      
//       }).then(function(result) { 
//         console.log(result)
//         return new Promise((resolve) => {
//           setTimeout(() => resolve(fetch(`https://api.github.com/users/${result.name}/repos`)), 1000); // se toma el resultado anterior y se asigna a una variable user, luego se hace otro fetch para buscar en una nueva url                                                                                               // la cual es la api de github y le pasamos el user.name para que me filtre el dato del anterior json
//         });
      
//       })
      
//       .then(function(result){
//         return new Promise((resolve) => {
//             setTimeout(() => resolve(result.json()), 1000);//al final tomamos el resultado del fecht y lo pasamos a .json
//         })
//       })
//       .then(function(result) {
//         console.log(result)
//         result.forEach(element => {              
//             if(element.name === "JavaScript_Ejercicios"){   //el foreach recorre todos los elementos del json y imprime los que cumplan la condicion
//                 console.log(element)
//             }
//         }); 
      
//       });
// } catch (Error) {
//     console.log(Error)
// }










