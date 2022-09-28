const socket = io.connect();

socket.io("carga_inventario", (data)=>{
    console.log(data);
    render(data);
})

function render(data){
    const html = data.map((producto)=>{
        return `
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${producto.title}
            </th>
            <td class="py-4 px-6">
                ${producto.price}
            </td>
            <td class="py-4 px-6">
                <img width="30" src=${producto.thumbnail}>
            </td>
        `;
    });
    document.getElementById("listado_productos").innerHTML = html;
}