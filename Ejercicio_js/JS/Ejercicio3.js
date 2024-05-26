// 3. Basado en la solución del punto 2, transforme esta solución utilizando
// async/await
// a. muestre los repositorios públicos de cada aprendiz en consola.
// b. Una todos los resultados en un solo arreglo
// c. Filtre la consulta con solo los aprendices que tengan el rol de
// aprendiz, esta solución se deba dar antes de realizar la solicitud al
// api.

async function usuario() {
    let todo = []
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true)
    usuarios.forEach(async element => {
        let github = await fetch(`https://api.github.com/users/${element.user}/repos`);
        let usergit = await github.json();
        todo.push(element.name)
        usergit.forEach(element => {
            todo.push(element.name)
        });
        console.table(todo)
        todo = []
    });


}

usuario()
