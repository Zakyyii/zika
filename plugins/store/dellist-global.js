exports.run = {
   usage: ['dellist-global'],
   use: 'name',
   category: 'store',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      setting,
      Func,
      Scraper
   }) => {
      try {
         setting.shop = setting.shop ? setting.shop : []
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nama produk'), m)
         const exists = setting.shop.find(v => v._id === text.toLowerCase())
         if (!exists) return client.reply(m.chat, Func.texted('bold', `🍔 List Produk Tidak Tersedia.`), m)
         Func.removeItem(setting.shop, exists)
         client.reply(m.chat, Func.texted('bold', `🍔 Berhasil Menghapus List Dari Produk.`), m)
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true,
   cache: true,
   location: __filename
}