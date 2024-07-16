import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'

const token = process.env.BOT_TOKEN

const bot = new Telegraf(token)

const duckFacts = [
  'Ducks have been domesticated as pets and farm animals for more than 500 years.',
  'A duck’s quack doesn’t echo, and no one knows why.',
  'Ducks are omnivores: they eat plants, insects, small fish, and algae.',
]

console.log(`Bot is starting...`)
bot.start((ctx) =>
  ctx.reply(
    'Welcome to the DuckBuck Bot! Use /help to see available commands.',
  ),
)

bot.help((ctx) =>
  ctx.reply(
    '/info - Learn about DuckBuck.\n /air - Get an airdrop. \n /fact - Get a random fact. \n /quit - Leave the chat',
  ),
)

bot.command('info', (ctx) =>
  ctx.reply(
    `Welcome to DUCKBUCK, the quackiest meme coin in the crypto pond! Inspired by the irreverent and money-loving Howard the Duck, DUCKBUCK is here to bring a splash of fun and a wave of wealth to the crypto community. Our mission? To create a financial revolution that’s as entertaining as a Saturday morning cartoon and as lucrative as a golden egg-laying duck!`,
  ),
)

bot.command('air', (ctx) =>
  ctx.reply('Do you want an airdrop? I will help you in getting the airdrop'),
)

bot.command('fact', (ctx) => {
  const fact = duckFacts[Math.floor(Math.random() * duckFacts.length)]
  ctx.reply(fact)
})

bot.command('quit', async (ctx) => {
  await ctx.reply('Have a ducky day!')
})

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.on(message.sticker, (ctx) => ctx.reply('Sticker received'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
