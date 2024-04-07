let toys = []

export default {
    getAllToys: ()=>toys,
    createToy: (newToy)=>{
        toys.push(newToy)
    }
}