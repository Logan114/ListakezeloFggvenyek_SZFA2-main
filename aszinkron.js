export function getAdat(vegpont,callback){
    fetch(vegpont,({method:"GET"})).then((response)=>response.json()).
    then((data)=>{callback(data)})
    .catch((error)=>console.log(error))
}
export function postAdat(vegpont,adat,callback){
    fetch(vegpont,
        {method:"POST",
        body: JSON.stringify(adat)

    })
    .then((response)=>response.json())
    .then((data)=>{callback(data)})
    .catch((error)=>console.log(error))
    
}
export function deleteAdat(vegpont,id,adat){
    fetch(vegpont,
        {method:"delete",
        body: JSON.stringify(adat)

    })
    .then((response)=>response.json())
    .then((data)=>{callback(data)})
    .catch((error)=>console.log(error))
}