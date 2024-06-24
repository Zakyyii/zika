exports.run = {
   usage: ['addlist'],
   hidden: ['+p'], 
   use: 'name | description',
   category: 'store',
   async: async (m, {
      client,
      text,
      isPrefix,
      groupSet, 
      command,
      Func,
      Scraper
   }) => {
      try {
         let groupSet = global.db.groups.find(v => v.jid == m.chat)
         groupSet.shop = groupSet.shop ? groupSet.shop : []
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'name | description'), m)
         let [name, description] = text.split`|`
         if (!name || !description) return client.reply(m.chat, Func.example(isPrefix, command, 'name | description'), m)
         const exists = groupSet.shop.some(v => v._id === name.toLowerCase())
         if (exists) return client.reply(m.chat, Func.texted('bold', `🍔 Nama Produk Sudah Tersedia.`), m)
         var cover = ''
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (/image\/(jpe?g|png)/.test(mime)) {
            let img = await q.download()
            if (!img) return client.reply(m.chat, global.status.wrong, m)
            let upload = await Scraper.uploadImage(img)
            var cover = upload.data.url
         }
         groupSet.shop.push({
            _id: name.toLowerCase().trim(),
            cover: cover ? cover : false,
            description: description.trim(),
            created_at: new Date * 1
         })
         client.reply(m.chat, Func.texted('bold', `🍔 Sukses Menambahkan List Ke Daftar Produk.`), m)
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   admin: true, 
   cache: true,
   location: __filename
}
