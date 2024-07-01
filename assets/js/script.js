const listaDeTareas = document.querySelector("#tareas");
const tareaInput = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#agregarTarea");
const cuentaTareasTotal = document.querySelector("#cuenta-tareas-total");
const cuentaTareasRealizadas = document.querySelector("#cuenta-tareas-realizadas");
let proximoId = 1;
const tareas = [
    { id: obtenerFechaComoId(), descripcion: "Completar informe semanal", realizada: false },
    { id: obtenerFechaComoId(), descripcion: "Reunión con el equipo de proyecto", realizada: true },
    { id: obtenerFechaComoId(), descripcion: "Preparar presentación para cliente", realizada: false }
];
function obtenerFechaComoId() {const fecha = new Date(); const id = fecha.getTime(); return id;}
function actualizarListaTareas() {
    let html = "";
    let realizadas = 0;
    tareas.forEach(tarea => {        
        const idVisible = String(tarea.id).slice(-3);// solo ver 3 numeros
        const tareaRealizada = tarea.realizada ? 'checked' : '';
        html += `<table>
                        <tr>
                            <th><span>ID: ${idVisible}</span></th>
                            <th><input type="checkbox" id="tarea${tarea.id}" ${tareaRealizada}></th>
                            <th><label for="tarea${tarea.id}" ${tarea.realizada ? 'style="text-decoration: line-through;"' : ''}>${tarea.descripcion}</label></th>
                            <th><i class="fas fa-trash-alt eliminar" data-id="${tarea.id}"></i></th>
                        </tr>
                  </table>      `;

        if (tarea.realizada) {
            realizadas++;
        }
    });
listaDeTareas.innerHTML = html;    
cuentaTareasTotal.textContent = `Total: ${tareas.length}`;
cuentaTareasRealizadas.textContent = `Realizadas: ${realizadas}`;
const checkboxes = document.querySelectorAll("input[type='checkbox']");//check
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const id = parseInt(checkbox.id.replace("tarea", ""));
            const tarea = tareas.find(t => t.id === id);
            tarea.realizada = checkbox.checked;
            actualizarListaTareas();
        });
    });    
const iconosEliminar = document.querySelectorAll(".eliminar");//ícono de basurero para eliminar
    iconosEliminar.forEach(icono => {
        icono.addEventListener("click", () => {
            const id = parseInt(icono.getAttribute("data-id"));
            const indice = tareas.findIndex(t => t.id === id);
            tareas.splice(indice, 1);
            actualizarListaTareas();
        });
    });
}
btnAgregar.addEventListener("click", () => {agregarTarea();}); //botón de agregar tarea
tareaInput.addEventListener("keypress", (e) => {if (e.key === "Enter"){agregarTarea();}});//el enter

function agregarTarea() {//agregar una nueva tarea
    const descripcionTarea = tareaInput.value.trim();
    if (descripcionTarea === "") {
        alert("Por favor, ingresa una tarea válida");
        return;
    }
    
    const tareaExistente = tareas.find(t => t.descripcion.toLowerCase() === descripcionTarea.toLowerCase());//misma descripción
    if (tareaExistente) {
        alert("¡Tarea ya agendada!");
        return;
    }    
    tareas.push({// Agregar la tarea
        id: obtenerFechaComoId(), descripcion: descripcionTarea, realizada: false
    });
    tareaInput.value = "";
    actualizarListaTareas();}
actualizarListaTareas();
