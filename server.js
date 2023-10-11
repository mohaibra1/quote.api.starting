const express = require('express')
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random',(req, res, next) => {
    //random index
    const quote = getRandomElement(quotes)
    res.json({quote})
})

app.get('/api/quotes', (req, res, next) => {
    const query = req.query.person
    const quotesHolder = quotes
    
    if(query){
        const quotes = []
        quotesHolder.map(q => {
        if(q.person === query){
             quotes.push(q)
        }
      })
      res.json({quotes})
    }else {
        res.send({quotes})
    }
})

app.post('/api/quotes', (req, res, next) => {
    const quoteBody = req.body.quote
    const person = req.body.person
 
    if(!quoteBody  && !person){
        res.status(400).send()
    }

    const quote = {quote: quoteBody, person: person}
        quotes.push(quote)
        res.json({quote})
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

