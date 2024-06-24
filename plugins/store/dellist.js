exports.run = {
   usage: ['dellist'],
   hidden:['-p'],
   use: 'name',
   category: 'store',
   async: async (m, {
      client,
      text,
      groupSet, 
      isPrefix,
      command,
      Func,
      Scraper
   }) => {
      try {
         let groupSet = global.db.groups.find(v => v.jid == m.chat)
         groupSet.shop = groupSet.shop ? groupSet.shop : []
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nama produk'), m)
         const exists = groupSet.shop.find(v => v._id === text.toLowerCase())
         if (!exists) return client.reply(m.chat, Func.texted('bold', `🍔 List Produk Tidak Tersedia.`), m)
         Func.removeItem(groupSet.shop, exists)
         client.reply(m.chat, Func.texted('bold', `🍔 Berhasil Menghapus List Dari Produk.`), m)
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   admin: true,
   cache: true,
   location: __filename
}