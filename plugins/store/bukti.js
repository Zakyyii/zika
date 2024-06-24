const env = require('../../config.json')

exports.run = {
   usage: ['bukti'],
   hidden: ['buktitf'],
   use: 'reply foto & teks',
   category: 'store',
   async: async (m, { client, Func, Scraper, args, isPrefix, command }) => {
      let setting = global.db.setting
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!/image/.test(mime) || !args || !args.join(' ')) return client.reply(m.chat, Func.texted('bold', `Kirim Foto Hasil Transfer & Berikan Caption (opsional)`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let img = await q.download()
         if (!img) return client.reply(m.chat, global.status.wrong, m)
         let link = await Scraper.uploadImage(img)
         if (!link.status) return m.reply(Func.jsonFormat(link))
         let url = link.data.url
         
         // Mengirim URL gambar sebagai file ke owner dengan caption yang dihasilkan dari Func.ttFixed(args.join(' '))
         client.sendFile(env.owner + '@c.us', url, 'bukti.jpg', Func.ttFixed(args.join(' ')), m)
         await Func.delay(3000)
         client.sendReact(m.chat, '✅', m.key)
         await Func.delay(1000)
         client.reply(m.chat, 'Bukti Chat Sudah Di Kirimkan Ke Owner', m) 
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   cache: true,
   location: __filename
}

