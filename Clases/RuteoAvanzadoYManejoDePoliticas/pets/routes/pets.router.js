import express from 'express'

const router = express.router()

const pets = []

const validatePetName = (req, res, next) => {
    const petName = req.params.pet;
    if (!/^[a-zA-Z\s]+$/.test(petName)) {
        return res.status(400).json({ error: 'El nombre de la mascota solo puede contener letras y estacios.' })
    }
    next()
}

router.param('pet', (req, res, next, petName) => {
    const pet = pets.find(pet => pet.name === petName)
    if (!pet) {
        return res.status(404).json({ error: 'Mascota no encontrada' })
    }
    req.pet = pet
    next()
})


router.post('/', (req, res) => {
    const { name, specie } = req.body;
    if (!name || !specie) {
        return res.status(400).json({ error: 'Se requieren el nombre y la especie de la mascota' })
    }
    const newPet = { name, specie }
    pets.push(newPet)
    res.status(201).json(newPet)
})


router.get('/:pet', validatePetName, (req, res) => {
    res.json(req.pet)
})

router.put('/:pet', validatePetName, (req, res) => {
    req.pet.adopted = true;
    res.json(req.pet)
})

router.get('/', (req, res) => {
    res.json(pets);
})

export default router