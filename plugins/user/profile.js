module.exports = {
  name: 'profile',
  desc: 'Lihat profil kamu',
  category: 'user',
  async run(ctx, { db }) {
    const data = db.list();
    const user = data.user[ctx.senderId];

    if (!user || !user.register) {
      return ctx.reply(`(｡•́︿•̀｡) Kamu belum terdaftar!\nKetik /register dulu ya~`);
    }

    const teks = `
୨୧・˳✧༚ ʚɞ 𝐏𝐫𝐨𝐟𝐢𝐥 𝐊𝐚𝐦𝐮 ɞɞ ✧˳・୨୧

• Nama: ${user.name}
• Limit: ${user.limit}
• Premium: ${user.premium.status ? '✓ Aktif' : '✗ Tidak'}
• Banned: ${user.banned.status ? '✓ Ya' : '✗ Tidak'}
• Terdaftar: ✓

꒰ঌ Thank you for being here! ໒꒱
    `.trim();

    await ctx.reply(teks);
  }
};