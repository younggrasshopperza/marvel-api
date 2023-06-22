const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Marvel API credentials
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

app.get('/characters', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const url = `http://gateway.marvel.com/v1/public/characters?limit=100&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/characters/:name', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const name = req.params.name;

    const url = `http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified name.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/character/:id', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const characterId = req.params.id;

    const url = `http://gateway.marvel.com/v1/public/characters/${characterId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified ID.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/comics', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const characterName = "Ant-Man (Eric O'Grady)";

    if (!characterName || characterName.trim() === '') {
        res.status(400).send('Character name cannot be blank.');
        return;
    }

    // Create the URL
    const url = `http://gateway.marvel.com/v1/public/characters?name=${characterName}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            // Check if results are empty
            console.log(response.data);
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified character.');
                return;
            }

            // Get the Spider-Man character ID
            const spiderManId = response.data.data.results[0].id;

            // Now use this ID to get a list of comics featuring Spider-Man
            const comicsUrl = `http://gateway.marvel.com/v1/public/characters/${spiderManId}/comics?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

            return axios.get(comicsUrl);
        })
        .then(response => {
            if (response) {
                // Return the data about the comics
                res.json(response.data.data.results);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/comics/:title', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const title = req.params.title;

    const url = `http://gateway.marvel.com/v1/public/comics?title=${title}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified title.');
                return;
            }
            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/comic/:id', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const comicId = req.params.id;

    const url = `http://gateway.marvel.com/v1/public/comics/${comicId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified ID.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/stories', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const url = `http://gateway.marvel.com/v1/public/stories?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/stories/:name', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const name = req.params.name;

    const url = `http://gateway.marvel.com/v1/public/stories?name=${name}&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified name.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});

app.get('/story/:id', (req, res) => {
    const timeStamp = Date.now().toString();
    const preHash = timeStamp + privateKey + publicKey;
    const hash = crypto.createHash('md5').update(preHash).digest('hex');

    const storyId = req.params.id;

    const url = `http://gateway.marvel.com/v1/public/stories/${storyId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    axios.get(url)
        .then(response => {
            if (!response.data.data.results.length) {
                res.status(404).send('No results found for the specified ID.');
                return;
            }

            res.json(response.data.data.results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data from the Marvel API.');
        });
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));