import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'

const token = process.env.BOT_TOKEN

const bot = new Telegraf(token)

console.log(`Bot is starting...`)
bot.start((ctx) => ctx.reply('Welcome'))

bot.command('hello', (ctx) =>
  ctx.reply('Hey there, I am the new bot here to make your life easier'),
)

bot.command('air', (ctx) => ctx.reply('Do you want an airdrop? I will help you in getting the airdrop'))

bot.command('quit', async (ctx) => {
  await ctx.reply('Bye!')
  await ctx.leaveChat()
})

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.on(message.sticker, (ctx) => ctx.reply('Sticker received'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
