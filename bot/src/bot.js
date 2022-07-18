require('dotenv').config()

const {Telegraf} = require('telegraf')

const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)


// Comando de ayuda para cuando el bot esta saturado de comandos iniciales

 
bot.help(ctx => {
    const helpMessage = `
    **Comandos del Bot**
    /start - Inicia bot
    `

    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
      parse_mode: "Markdown"
    })
})

// Con el comando /start se invoca a la funcion sendStartMessage

bot.command('start', ctx => {
sendStartMessage(ctx)

})


// Esta funcion renderea en el chat un menu que nos ayuda a utilizar las diversas
// funciones que implementamos 
// Aqui podemos encontrar : el req a la api creada por nosotros
//                          el req a la api TMDB
//                          el enlace a mi Github
//                          el enlace a mi linkedin
//                          y por ultimo un comentario sobre el proyecto 

function sendStartMessage(ctx) {
  const startMessage = "Bienvenid@, este bot tiene diferente funcionalidades, quieres conocerlas?"

  bot.telegram.sendMessage(ctx.chat.id, startMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {text: "Quiero una frase", callback_data: "quotes"}
        ],
        [
          {text: "Quiero una pelicula", callback_data: "peliculas"}
        ],
        [
          {text: "Mi Git", url: "https://github.com/soriagorgoroso"}
        ],
        [
          {text: "Mi In", url: "https://linkedin.com/in/soriagorgoroso"}
        ],
        [
          {text: "Creditos", callback_data: "credits"}
        ],
      
      ]
    }
  }
    )

}

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


bot.hears("Peliculas", async (ctx) => {
  // const quote = await fetchQuotes('amistad')
  // ctx.reply(quote)
  let index = Math.floor(Math.random() * 10)
  const movie = await fetchMovies()
  ctx.reply(movie[index].original_title)
})

// Menu con llamado a la api de node http://localhost:3000/


bot.action('quotes', ctx => {
  ctx.answerCbQuery()

  const menuMessage = "Que tipo de frase ?"
  bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
    reply_markup: {
      keyboard: [
        [
          {text: "Amistad"},
          {text: "Chistes cortos"},
          {text: "Chistes informaticos"}
        ],
        [
          {text: "Salir", }        ]
      ],
      resize_keyboard: true,
      one_time_jeyboard: true
    }
  })
})


// Mennu con llamado a THEMOVIEDB


bot.action('peliculas', ctx => {
  ctx.answerCbQuery()

  const menuMessage = "Peliculas? Dejamelo a mi"
  bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
    reply_markup: {
      keyboard: [
        [
          {text: "Peliculas en cartelera"},
        ],
        [
          {text: "Salir", }        ]
      ],
      resize_keyboard: true,
      one_time_jeyboard: true
    }
  })
})

// Escucha Menu DMDB

bot.hears("Peliculas en cartelera", async (ctx) => {
  let index = Math.floor(Math.random() * 10)
  const movie = await fetchMovies()
  ctx.reply(movie[index].original_title)

})



// Escuchas Menu quotes


bot.hears("Amistad", async (ctx) => {
  const quote = await fetchQuotes('amistad')
  ctx.reply(quote)

})

bot.hears("Chistes cortos", async (ctx) => {
  const quote = await fetchQuotes('graciosas')
  ctx.reply(quote)
})

bot.hears("Chistes informaticos", async (ctx) => {
  const quote = await fetchQuotes('informaticos')
  ctx.reply(quote)
})

bot.hears("Salir", ctx => {
  bot.telegram.sendMessage(ctx.chat.id, "Adios", {
    reply_markup: {
      remove_keyboard: true
    }
  })

})



// Menu creditos
bot.action('credits', ctx => {
  ctx.answerCbQuery()
  const credit = 
  `
  # Gracias por usarlo!

  Hola! Soy Sebastian, soy Web Developer actualmente manejo JavaScript, utilizo React para el frontend y Node.Js para el backend.
  
         if(!tired()) {
      keepCoding();
    } else {
      drinkCoffe();
        };
  
  
  
  ## Sobre este chatBot
  
  En este chatBot utilice 
  
  - Node.Js junto con express para levantar un servidor y poder implementar la funcionalidad de devolver frases, estas frases las toma de un archivo JSON..
    > Para la funcionalidad de peliculas utilice una API llamada TMDB (The Movie Data Base). Ambas request fueron realizadas con axios.
    
  - Telegraf para poder .
    > **NPM** https://www.npmjs.com/package/telegraf
         **WEBSITE** https://telegraf.js.org/
    
  `
  bot.telegram.sendMessage(ctx.from.id, credit, {
    parse_mode: "Markdown"
  })})

// Bienvenida al iniciar BOT
bot.hears('hola bot', ctx => {
  ctx.reply('Hola! Bienvenido !')
})

// Respuesta recibida con el comando hola
bot.command("hola", (ctx)=> {
  ctx.reply('Hola ' + ctx.from.first_name +'!'+ 'desde el bot')
})

bot.launch() 