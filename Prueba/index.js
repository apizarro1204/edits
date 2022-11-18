import {paddockManagers, paddocks, paddockType}  from "./database.js"

// 0 Arreglo con los ids de los responsables de cada cuartel
function listPaddockManagerIds() {
    return paddockManagers.map((paddockManager) => paddockManager.id);
};

console.log(listPaddockManagerIds());

// 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
function listPaddockManagersByName() {
    return paddockManagers.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        } else if (a.name < b.name) {
            return -1;
        } else {
            return 0;
        }
    }).map((rut) => rut.taxNumber)
};

console.log(listPaddockManagersByName());

// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.
function sortPaddockTypeByTotalArea() {
    // tipo de cultivo proviene del padockType
    //cada padockType contiene una totalidad de area.
    // Se deben sumar todas de cada padock y ordenarlos de mayor a menor
    // Identifiquemos primero los padocks /ok
    // Sumas el area de cada paddockTypeId
    // Object.keys(paddocks).map(key =>{
    //     const value = paddocks[key]
    //     console.log(key, value)
    // })

    //Debería devolver farmid 1 55708, farmid 2 87366, farmid 3 41417
    // return paddocks.sort((a, b) => {
    //     if (a.farmId > b.farmId) {
    //         return 1;
    //     } else if (a.farmId < b.farmId) {
    //         return -1;
    //     } else {
    //         return 0;
    //     }
    // })

    for(let propiedades in paddocks){
       console.log(propiedades + persona[propiedades])
    }
    
};



console.log(sortPaddockTypeByTotalArea())

