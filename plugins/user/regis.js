module.exports = {
  name: 'register',
  desc: 'Daftar sebagai pengguna',
  category: 'user',
  async run(ctx, { db }) {
    const data = db.list();
    const id = ctx.senderId;

    if (data.user[id] && data.user[id].register) {
      return ctx.reply(`૮₍｡•́︿•̀｡₎ა Kamu sudah terdaftar sebelumnya, sayang~`);
    }

    data.user[id] = {
      name: ctx.username,
      limit: 100,
      register: true,
      premium: { status: false, expired: 0 },
      banned: { status: false, expired: 0 }
    };

    await db.save();
    return ctx.reply(`꒰ঌ( ˶ᵕ ᵕ˶ )໒꒱ Yeay! Registrasi berhasil~\nHalo ${ctx.username}, selamat datang!`);
  }
};