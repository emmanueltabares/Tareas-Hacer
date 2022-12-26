require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

// console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) { 
        tareas.cargarTareasFromArray(tareasDB); 
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc ); 
                break;
            case '2': 
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if(id != 0) {
                    const ok = await confirmar('¿Está seguro que desea eliminar la tarea?')
                    if(ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea eliminada'.green)
                    } 
                }
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while(opt !== '0');
}

main();