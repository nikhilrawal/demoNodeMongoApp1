const express = require('express')
const router = express.Router()
const menu = require('./../models/menu')

router.post('/', async (req, res) => {
    try {
        data = req.body
        newperson = new person(data)
        result = await newperson.save()
        return res.status(201).json({ message: 'Person saved successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving person', error: error.message });
    }

})
router.get('/', async (req, res) => {
    try {
        const data = await menu.find()
        console.log('menu fetch successful')
        return res.status(200).json({ data })

    } catch (error) {
        console.log('menu fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})
router.get('/:taste', async (req, res) => {
    try {
        tastegiven = req.params.taste
        const data = await menu.find({ taste: tastegiven })
        console.log('menu fetch successful')
        return res.status(200).json({ data })

    } catch (error) {
        console.log('menu fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})
router.put('/:id', async (req, res) => {
    try {
        data = req.body
        givenid = req.params.id
        responsemsg = await menu.findByIdAndUpdate(givenid, data, {
            newvalidator: true,
            new: true
        })
        if (!responsemsg) {
            return res.status(201).json('Person not found')
        }
        else {
            return res.status(201).json({ responsemsg });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error saving person', error: error.message });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        givenid = req.params.id
        responsemsg = await menu.findByIdAndDelete(givenid)
        if (!responsemsg) {
            return res.status(201).json('Person not found')
        }
        else {
            return res.status(201).json('Person deleted successfully');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error saving person', error: error.message });
    }
})
module.exports = router