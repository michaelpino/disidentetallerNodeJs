const socket = io.connect();

socket.on("carga_inventario", (data)=>{
    render_productos(data);
})

socket.on("carga_chat", (data)=>{
    render_chat(data);
})

function render_productos(data){
    const html = data.map((producto)=>{
        return `
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${producto.title}
                </th>
                <td class="py-4 px-6">
                    ${producto.price}
                </td>
                <td class="py-4 px-6">
                    <img width="30" src=${producto.thumbnail}>
                </td>
            </tr>
        `;
    })
    .join(" ");
    document.getElementById("listado_productos").innerHTML = html;
}

function render_chat(data){
    const html = data.map((mensaje)=>{
        return `
            <div class="inline-flex">
                <p class="px-3 text-blue-600 font-bold"> ${mensaje.mail} </p>
                <p class=" text-yellow-800"> [ ${mensaje.date} ] : </p>
                <p class="px-3 text-green-600 italic"> ${mensaje.message} </p>
            </div>
            
        `;
    })
    .join(" <br> ");
    document.getElementById("chat").innerHTML = html;
}

function agregaProducto(datos){
    const nuevoProducto = {title: document.getElementById("title_input").value,
                            price: document.getElementById("price_input").value,
                            thumbnail: document.getElementById("thumbnail_input").value};
    socket.emit("nuevo_producto", nuevoProducto);
    return false;
}

function agregaMensaje(datos){
    const nuevoMensaje = {mail: document.getElementById("chat-email_input").value,
                            date: new Date().toLocaleString("es-CL"),
                            message: document.getElementById("chat-mensaje_input").value};
    socket.emit("nuevo_mensaje", nuevoMensaje);
    return false;
}