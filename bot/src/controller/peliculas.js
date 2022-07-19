async function sendpeliculas(ctx) {
  // const quote = await fetchQuotes('amistad')
  // ctx.reply(quote)
  let index = Math.floor(Math.random() * 10);
  const movie = await fetchMovies();
  ctx.reply(movie[index].original_title);
}

module.exports = {
  sendpeliculas,
};
