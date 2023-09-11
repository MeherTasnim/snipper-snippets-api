const express = require('express');
const router = express.Router();
const seedData = require('../seedData.json');

router.post('/', async (req, res, next) => {
    try {
        const newSnippet = await req.body;
        seedData.push(newSnippet);
        res.status(201).json(newSnippet);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        await res.json(seedData);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const snippet = await seedData.find((item) => item.id === id);
        if (snippet) {
            res.json(snippet);
        } else {
            res.status(404).json({ message: 'Snippet not found' });
        }
    } catch (error) {
        next(error);
    } 
});

//bonus: Users can make a GET request to e.g. /snippet?lang=python to retrieve all the Python snippets

// router.get('/:lang', async (req, res, next) => {
//     try {
//         const lang = req.params.lang;
//         if (lang) {
//             const snippets = await seedData.filter((item) => 
//                 item.language.toLowerCase() === lang.toLowerCase());
//             if (snippets.length > 0) { 
//                 res.json(snippets);
//             } else {
//                 res.status(404).json({ message: 'Snippet not found' });
//             }
//         }
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;