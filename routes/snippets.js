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
    console.log(req.query.lang)
    if (req.query.lang) {
        const lang = req.query.lang;
        const snippets = await seedData.filter((item) => 
        item.language.toLowerCase() === lang.toLowerCase());
        if (snippets.length > 0) { 
            res.json(snippets);
        } else {
            res.status(404).json({ message: 'Snippet not found' });
        }
    } else {
        try {
            await res.json(seedData);
        } catch (error) {
            next(error);
        }
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

module.exports = router;