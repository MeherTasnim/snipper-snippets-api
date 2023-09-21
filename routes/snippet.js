const express = require('express');
const router = express.Router();
const { encrypt, decrypt } = require('../utils/encrypt');

const snippets = require('../seedData.json');

snippets.map((snippet, index) => {
    snippets[index] = { ...snippet, code: encrypt(snippet.code) }
})

let id = snippets.length + 1;

router.post('/', (req, res) => {
    const { language, code } = req.body

    if (!language || !code) {
        return res.status(400).json({ error: 'Language and code are required fields' })
    }

    const snippet = {
        id: id++,
        language,
        code
    }

    snippets.push({ ...snippet, code: encrypt(code) })
    res.status(201).json(snippet)
});

router.get('/', (req, res) => {
    const { lang } = req.query;

    const decodedSnippets = snippets.map((snippet) => ({
        ...snippet,
        code: decrypt(snippet.code)
    }))

    if (lang) {
        const filteredSnippets = decodedSnippets.filter((snippet) =>
            snippet.language.toLowerCase() === lang.toLowerCase());
        return res.json(filteredSnippets)
    }

    res.json(decodedSnippets)
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let snippet = snippets.find((snippet) => snippet.id === id);
    if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found!' })
    }

    snippet = { ...snippet, code: decrypt(snippet.code) }
    res.json(snippet)
});

module.exports = router;
