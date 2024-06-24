exports.run = {
   usage: ['produk', 'listproduk'],
   category: 'store',
   async: async (m, {
      client,
      Func, 
      groupSet
   }) => {
      try {
         groupSet.shop = groupSet.shop ? groupSet.shop : []
         if (groupSet.shop.length < 1) return client.reply(m.chat, Func.texted('bold', `🚩 Belum Ada List Produk Yang Tersedia.`), m)
         let text = `乂 *L I S T - P R O D U K*\n\n`
         text += groupSet.shop.sort((a, b) => a._id.localeCompare(b._id)).map((v, i) => {
            if (i == 0) {
               return `┌  ➻  ${v._id}`
            } else if (i == groupSet.shop.sort((a, b) => a._id.localeCompare(b._id)).length - 1) {
               return `└  ➻  ${v._id}`
            } else {
               return `│  ➻  ${v._id}`
            }
         }).join('\n')
         text += '\n\n' + global.footer
         client.sendMessageModify(m.chat, text, m, {
            ads: false,
            largeThumb: true,
            thumbnail: 'https://telegra.ph/file/d5b0b5467f123d188b84d.jpg'
         })
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}