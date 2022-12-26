const Tarea = require('./tarea')

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]; 
            listado.push( tarea );
        } )

        return listado;
    }

    constructor(){
        this._listado = {}
    }

    cargarTareasFromArray( tareas = []) {
        tareas.forEach(t => this._listado[t.id] = t );
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();

        const listado = this.listadoArr;

        const listadoCompleto = listado.forEach((t, i) => {
            const idx = `${i + 1}`.green;
            console.log(`${idx}.` + ` ${t.desc} :` + ` ${ t.completadoEn != null ? 'Completada'.green : 'Pendiente'.red }`);
        })

        return listadoCompleto;
    }

    listarPendientesCompletadas ( completadas = true ) {
        console.log();

        const listado = this.listadoArr;
        let count = 1;

        const listadoCompleto = listado.forEach((t) => {

            const { desc, completadoEn } = t;
            const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas) {
                if( completadoEn ) {
                    console.log(`${count}.`.green + ` ${desc} :` + ` ${completadoEn}`.green);
                    count++;
                }
            } else {
                if( !completadoEn ) {
                    console.log(`${count}.`.green + ` ${desc} :` + ` ${estado}`);
                    count++;
                }
            }
            
        })

        return listadoCompleto;
    }

    borrarTarea(id = ''){
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(t => {
            if(!ids.includes(t.id)) {
                this._listado[t.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;