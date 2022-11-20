import { paddockManagers, paddocks, paddockType, farms } from './database.js';

// 0 Arreglo con los ids de los responsables de cada cuartel
function listPaddockManagerIds() {
  return paddockManagers.map(paddockManager => paddockManager.id);
}

console.log(listPaddockManagerIds());

// 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
function listPaddockManagersByName() {
  return paddockManagers
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    })
    .map(rut => rut.taxNumber);
}

console.log(listPaddockManagersByName());

// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.

function sortPaddockTypeByTotalArea() {

  const res = Object.values(paddocks.reduce((acc, item)=>{
    if(!acc[item.farmId]){
      acc[item.farmId] = item;
  }
  else{
      acc[item.farmId].area += item.area;
  }
  return acc
  }, {})).entries(
  //.map(item => item.area)


  console.log(res)


  // Asignar el nombre por el id
  const paddockTypeNam = paddockType.map(paddockType => paddockType.name);
  console.log(paddockTypeNam);

}
// farmId 1 debe dar como resultado 55708 area

console.log(sortPaddockTypeByTotalArea());
