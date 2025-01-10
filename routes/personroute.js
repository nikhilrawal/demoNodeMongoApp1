const express = require('express')
const router = express.Router()
const person = require('./../models/person')
const { jwtAuthMiddleware, jwtgeneratetoken } = require('./../jwt')
router.post('/signup', async (req, res) => {
    try {
        data = req.body
        newperson = new person(data)

        result = await newperson.save()
        payload = {
            id: result.id,
            username: result.username
        }
        jwttoken = jwtgeneratetoken(payload)
        return res.status(201).json({ message: 'Person saved successfully', data: result, token: jwttoken });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving person', error: error.message });
    }

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        prsn = await person.findOne({ username: username })
        if (!prsn) {
            return res.status(401).json({ message: 'Invalid username', error: error.message });
        }
        pass = await prsn.comparePassword(password)
        if (pass) {
            payload = {
                id: prsn.id,
                username: prsn.username
            }
            jwttoken = jwtgeneratetoken(payload)
            return res.status(201).json({ token: jwttoken });
        }
        else {
            return res.status(401).json({ message: 'Invalid password', error: error.message });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }

})


router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await person.find()
        console.log('person fetch successful')
        return res.status(200).json({ data })

    } catch (error) {
        console.log('person fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        userdata = req.user
        const data = await person.findById(userdata.id)
        console.log('person fetch successful')
        return res.status(200).json(data)

    } catch (error) {
        console.log('person fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})
router.get('/:name', async (req, res) => {
    try {
        namegiven = req.params.name
        const data = await person.find({ name: namegiven })
        console.log('person fetch successful')
        return res.status(200).json({ data })

    } catch (error) {
        console.log('person fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})
router.put('/:id', async (req, res) => {
    try {
        data = req.body
        givenid = req.params.id
        responsemsg = await person.findByIdAndUpdate(givenid, data, {
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
        responsemsg = await person.findByIdAndDelete(givenid)
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