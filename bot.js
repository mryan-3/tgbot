import { Telegraf } from 'telegraf'
import { HttpAgent, Actor} from '@dfinity/agent'
import { Principal} from '@dfinity/principal'
import { message } from 'telegraf/filters'
import { idlFactory } from './idl.js'
import 'dotenv/config'

const token = process.env.BOT_TOKEN
const canisterId = process.env.CANISTER_ID

const bot = new Telegraf(token)

const agent = new HttpAgent({ host: 'https://ic0.app' })
const canisterActor = Actor.createActor(idlFactory, {
    agent: agent,
    canisterId: canisterId,
})


console.log(`Bot is starting...`)
bot.start((ctx) =>
  ctx.reply(
    'Welcome to the DuckBuck Bot! Please send your principal address to receive an airdrop.',
  ),
)


bot.command('tokenname', async (ctx) => {
  try {
    const tokenName = await canisterActor.icrc1_name();
    ctx.reply(`The token name is: ${tokenName}`);
  } catch (error) {
    console.error('Error getting token name:', error);
    ctx.reply('An error occurred while retrieving the token name. Please try again.');
  }
});

bot.on(message('text'), async (ctx) => {
    const userAddress = ctx.message.text

    try {
        const account = Principal.fromText(userAddress)

        const transferArgs = {
            to: {
                owner: account,
                subaccount: []
            },
            fee: [],
            memo: [],
            from_subaccount: [],
            created_at_time: [],
            amount: 10
        }

        const transferResult = await canisterActor.icrc1_transfer(transferArgs)
        console.log(transferResult)

        if ('OK' in transferResult) {
            ctx.reply('Your airdrop has been sent successfully!')
        } else {
            ctx.reply(`An error occurred while sending the airdrop. ${JSON.stringify(transferResult.Err)}`)
        }
    } catch (error) {
        console.log(`Error while sending airdrop: ${error}`)
        ctx.reply(`An error occurred while sending the airdrop.`)
    }
})

bot.help((ctx) =>
  ctx.reply(
    '/air- Let the bot send an airdrop. \n /tokenname - Get the token name. \n /quit - Leave the chat',
  ),
)

bot.command('air', (ctx) =>
  ctx.reply('Do you want an airdrop? I will help you in getting the airdrop. Please send your principal address to receive an airdrop.'),
)


bot.command('quit', async (ctx) => {
  await ctx.reply('Have a ducky day!')
})

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.on(message.sticker, (ctx) => ctx.reply('Sticker received'))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
