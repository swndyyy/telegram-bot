const { Telegraf } = require('telegraf');
const { TOKEN } = require('./bot.config');
const serialize = require('./core/serialize');
const logger = require('./core/logger');
const Database = require('./core/database');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const bot = new Telegraf(TOKEN);
const commands = new Map();
const db = new Database('database.json');

db.init().then(() => logger.info('Database siap!'));

bot.use(async (ctx, next) => {
  ctx = await serialize(ctx, bot);
  ctx.commands = commands;
  ctx.db = db;

  const time = chalk.hex('#ffb6c1')(moment().format('HH:mm:ss'));
  const sender = chalk.hex('#87ceeb')(ctx.senderId || 'unknown-chat');
  const chat = chalk.hex('#dda0dd')(ctx.chatName || 'unknown-user');
  const body = ctx.body || 'non-text update';
  const kawaiiLog = `
｡ﾟ•┈୨♡୧┈•ﾟ｡
[${time}] ૮₍｡• ᵕ •｡₎ა ${chalk.bold('Message from')} ${sender} in ${chat}
› ${chalk.hex('#f08080')(body)}
｡ﾟ•┈୨♡୧┈•ﾟ｡
`;
  console.log(kawaiiLog);
  await next();
});

const walkPlugins = (dir) => {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkPlugins(filepath);
    } else if (file.endsWith('.js')) {
      try {
        const plugin = require(path.resolve(filepath));
        if (!plugin.name || typeof plugin.run !== 'function') return;
        commands.set(plugin.name, plugin);
        bot.command(plugin.name, (ctx) => plugin.run(ctx, { db }));
        logger.success(`Loaded plugin: ${plugin.name} (${plugin.category || 'uncategorized'})`);
      } catch (e) {
        logger.error(`Gagal memuat plugin ${file}: ${e.message}`);
      }
    }
  }
};

walkPlugins(path.join(__dirname, 'plugins'));

bot.command(['help', 'menu'], async (ctx) => {
  let grouped = {};
  for (let [name, plugin] of commands.entries()) {
    const cat = plugin.category || 'uncategorized';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({ name, desc: plugin.desc || '-' });
  }

  let text = '୨୧・˳✧༚ ʚɞ 𝐌𝐞𝐧𝐮 𝐅𝐢𝐭𝐮𝐫 𝐁𝐨𝐭 ɞɞ ✧˳・୨୧\n\n';
  for (let [cat, items] of Object.entries(grouped)) {
    text += `• ${cat.toUpperCase()} •\n`;
    for (let item of items) {
      text += `  /${item.name} — ${item.desc}\n`;
    }
    text += '\n';
  }

  await ctx.reply(text.trim(), {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Chat Admin ✉️', url: 'https://t.me/sennachwannn' }],
        [{ text: 'Gabung ke Grup', url: 'https://t.me/+m8uqMY01IqZiNDE1' }]
      ]
    }
  });
});

bot.start(async (ctx) => {
  const user = ctx.from.first_name || 'there';
  const text = `안녕하세요 ${user}~!\n` +
               `Aku adalah *SennaNetBot*, asisten pintar dari Senna Network.\n` +
               `Ketik /menu untuk lihat semua fitur ya~\n\n` +
               `*기술과 정성으로!* (Dengan teknologi & ketulusan)`;

  ctx.replyWithMarkdown(text);
});

bot.launch().then(() => logger.info('Bot aktif!'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));