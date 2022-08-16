class LocalStorage {
    constructor(name) {
        this.variable_local_storage = name;
    }

    saveToLocalStorage(task /* es un objeto */ ) {
        let getTareas = this.getFromLocalStorage();

        if (getTareas === null) {
            let tareas = [];
            tareas.push(task);
            localStorage.setItem(this.variable_local_storage, JSON.stringify(tareas));
        } else {
            getTareas.push(task);
            localStorage.setItem(
                this.variable_local_storage,
                JSON.stringify(getTareas)
            );
        }
    }

    getFromLocalStorage() {
        const tareasDelLocalStorage = localStorage.getItem(
            this.variable_local_storage
        ); // o no trae nada : null  o "[{ tarea }]" como string
        if (tareasDelLocalStorage !== null) {
            return JSON.parse(tareasDelLocalStorage);
        }
        return tareasDelLocalStorage;
    }

    saveArrayToLs(array) {
        localStorage.setItem(this.variable_local_storage, JSON.stringify(array));
    }

    editTasktoLs(task, action) {
        const tasks = this.getFromLocalStorage();
        if (tasks !== null) {
            let mis_tareas_mapeadas = [];
            if (action === "finished") {
                mis_tareas_mapeadas = tasks.map(
                    (mi_tarea_individual_del_localstorage) => {
                        if (task.id === mi_tarea_individual_del_localstorage.id) {
                            let nuevo_texto = mi_tarea_individual_del_localstorage.texto;
                            var local = new Date();
                            if (!nuevo_texto.includes("➜ FINISHED:")) {
                                nuevo_texto =
                                    nuevo_texto += ` ➜ FINISHED: ${local.getDay()}/${local.getMonth()}/${local.getFullYear()}`;
                            }
                            return {
                                id: task.id,
                                texto: nuevo_texto,
                                estado: "finalizado",
                            };
                        }
                        return mi_tarea_individual_del_localstorage;
                    }
                );
            }
            if (action === "edit") {
                mis_tareas_mapeadas = tasks.map(
                    (mi_tarea_individual_del_localstorage) => {
                        if (task.id === mi_tarea_individual_del_localstorage.id) {
                            return {
                                id: task.id,
                                texto: task.texto,
                                estado: mi_tarea_individual_del_localstorage.estado,
                            };
                        }
                        return mi_tarea_individual_del_localstorage;
                    }
                );
            }
            this.saveArrayToLs(mis_tareas_mapeadas);
        }
    }

    deleteItemFromLs(id) {
        let tareasFromLs = this.getFromLocalStorage();
        if (tareasFromLs !== null) {
            let newArray = [...tareasFromLs].filter(
                (valor, indice, array) => valor.id !== id
            );
            localStorage.setItem(
                this.variable_local_storage,
                JSON.stringify(newArray)
            );
        }
    }

    deleteAllTasksFromLs(nombre) {
        localStorage.removeItem(nombre);
    }
}