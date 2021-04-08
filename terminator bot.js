// made by eyeball-kun
const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')
if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node terminator.js <host> <port> [<name>] [<password>]')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : 'terminator',
  password: process.argv[5]
})



bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.on('physicTick', () => {
  const filter = e => e.type === 'player' && e.position.distanceTo(bot.entity.position) < 10000 &&
                    e.mobType !== 'Player' // this took way too long to figure out

  const entity = bot.nearestEntity(filter)
  if (entity) {
    bot.pvp.attack(entity)
  }
})

bot.on('playerCollect', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
  }, 150)
})

bot.on('playerCollect', (collector, itemDrop) => {
  if (collector !== bot.entity) return

  setTimeout(() => {
    const shield = bot.inventory.items().find(item => item.name.includes('shield'))
    if (shield) bot.equip(shield, 'off-hand')
  }, 250)
})

process.setMaxListeners(0)


