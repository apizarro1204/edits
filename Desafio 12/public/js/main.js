const socket = io();

// Conectamos el cliente y escuchamos el evento messages
socket.on("messages", (data) => {
    render(data);
});

// Conectamos el cliente y escuchamos el evento producList
socket.on("productList", (data) => {
    renderItem(data);
})

// Funciones mensajes
function render(data) {
    const html = data.map((elemento) => {
        // Obtiene el valor del objeto donde se asigna el autor y el texto
        return `<div>
        <span><strong style='color:blue'>${elemento.author}</strong></span>
        <span style='color:brown'>${elemento.date}</span>
        <span style='font-style: italic; color:green'>
        <em>${elemento.text}</em></span>
        </div>`;
    })
        .join(" "); // Acá separa por espacios el chat

    document.getElementById("mensajes").innerHTML = html; // Obtenemos el objeto mensajes

}
// El objeto message en server.js se encuentra vacío, pero esta función le agrega los parámetros al objeto y crea tanto el author como el text.
function addMessage(e) {
    const mensaje = { author: document.getElementById("email").value, text: document.getElementById("texto").value, };
    document.getElementsByClassName("form-control")[0].value = "";
    document.getElementsByClassName("form-control")[1].value = "";

    socket.emit("new-message", mensaje);

    return false;

}

// Productos

function renderItem(data) {
    const html = data.map((elemento) => {
        let modelo = `<tr class="table-dark">
                        <td>${elemento.id}</td>
                        <td>${elemento.title}</td>
                        <td>${elemento.price}</td>
                        <td><img width=50 src='${elemento.thumbnail}' alt="imgProducto"></td>
                        </tr>`
        return modelo
    }).join("\n")
    document.getElementById("idTbody").innerHTML = html
}
function addItem() {
    const producto = {
        title: document.getElementsById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }

    socket.emit("newProduct", producto)
}