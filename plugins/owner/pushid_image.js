exports.run = {
   usage: ['pushkontakid-gambar'],
   hidden: ['pushidimg'],
   use: 'id|jeda',
   category: 'owner',
   async: async (m, {
      client,
      text, 
      Func
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         let [jid, jeda] = text.split`|`
         if (!jid || !jeda) return client.reply(m.chat, Func.example(isPrefix, command, '120xxxxxxxxx@g.us|5'), m)
         if (/video|image\/(jpe?g|png)/.test(mime)) {
            const id = await (await client.groupMetadata(jid.trim())).participants.map(v => v.id)
            client.sendReact(m.chat, '🕘', m.key)
            for (let jid of id) {
               await Func.delay(jeda * 1000)
               let media = await q.download()
               client.sendFile(jid, media, '', q.text ? q.text : '', null)
            }
            m.reply(Func.texted('bold', `✅ Successfully sent messages to ${id.length} numbers.`))
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
} 
