const axios = require('axios')



//  Llamada a la api creada por nosotros

async function fetchQuotes(type) {
    const res = await axios.get(`http://localhost:3000/quotes/` + type)
    return res.data.quote
  }
  
  //  Llamada a la api TMDB
  
  async function fetchMovies() {
    let token = process.env.TMDB_TOKEN
    const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${token}&page`)
    return res.data.results
  }
  

  module.exports = {
    fetchMovies,
    fetchQuotes
  }