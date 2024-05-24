// 4. Basados en la solución del punto 3 daremos solución a los siguientes
// puntos:
// a. Muestre solo los resultados que tengan menos de 5 repositorios
// públicos en una tabla por consola.
// b. Muestre solo los resultados de los repositorios que contengan la
// palabra JavaScript en su name
// c. Ordene de menor a mayor según el nombre del repositorio
// d. Muestre solo los repositorios que tengan mas de cinco letras en su
// nombre

async function usuario() {
    const todo = []
    let response = await fetch("../json/users.json"); 
    let user = await response.json(); 
    let usuarios = user.users.filter(aprendiz => aprendiz.aprendiz === true)
    console.log(usuarios)
    usuarios.forEach(async element => {
        let github = await fetch(`https://api.github.com/users/${element.name}/repos`);
        let usergit = await github.json();
        todo.push(element.name)
        let cont ;
        usergit.forEach(element => {
            cont += 1;
        });
        if (cont < 5) {
            todo.push(cont)
        }

    });
    console.log(todo)

}

usuario()
