let btnLista, content;

function crearTabla(res){
    let table = document.createElement("table");
    table.id="customers";
    table.innerHTML="<tr><th>ID</th> <th>HOTEL</th> <th>PLANTA</th> <th>HABITACION</th> <th>¿SABANAS Y TOALLAS?</th></tr>";
        
        let columna, fila, elem;
        for (let i = 0; i < res.length; i++) {
            columna = document.createElement("tr");
             table.appendChild(columna);
        
            for (let j = 0; j < Object.keys(res[i]).length; j++) {
                elem = res[i];
                fila = document.createElement("td");
                columna.appendChild(fila);

                switch(j){
                    case 0:
                        fila.appendChild(document.createTextNode(`${elem.id}`));
                        break;
                    case 1:
                        fila.appendChild(document.createTextNode(`${elem.hotel}`));
                        break;
                    case 2:
                        fila.appendChild(document.createTextNode(`${elem.planta}`));
                        break;
                    case 3:
                        fila.appendChild(document.createTextNode(`${elem.habitacion}`));
                        break;
                    case 4:
                        fila.appendChild(document.createTextNode(`${elem.sabanasytoallas}`));
                        break;
                }
                
            }
        }

    content.appendChild(table);
}

function get(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((pars) => {
            return pars.json();
        })
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            error = "ERROR: 404";
            reject(error);
        });
    });
}

function eventoBoton(e){
    get('./bbdd/reservas.json')
    .then((res) => {
        crearTabla(res);
    })
    .catch((error) => {
        content.innerHTML = `<h1>${error}</h1>`;
    });
}

function main(){
    btnLista = document.querySelector('#btnLista');
    content = document.querySelector('#content');
    btnLista.addEventListener('click', (e) => {eventoBoton(e)});
}

window.addEventListener('load', main);