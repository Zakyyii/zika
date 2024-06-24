exports.run = {
   usage: ['pushkontakid'],
   hidden: ['pushid'],
   use: 'id|jeda|teks',
   category: 'owner',
   async: async (m, {
      client,
      text, 
      Func, 
      command, 
      isPrefix
   }) => {
      try {
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         let [jid, jeda, msg] = text.split`|`
         if (!jid || !jeda || !msg) return client.reply(m.chat, Func.example(isPrefix, command, '120xxxxxxxxx@g.us|5|Save Brillian Store'), m)
         const id = await (await client.groupMetadata(jid.trim())).participants.map(v => v.id)
         client.sendReact(m.chat, '🕒', m.key)
         if (msg) {
            for (let jid of id) {
               await Func.delay(jeda * 1000)
               // let msgs = msg || 'Save!'
               client.reply(jid, msg, null)
            }
            m.reply(Func.texted('bold', `✅ Successfully sent messages to ${id.length} numbers.`))
         } /*else if (/video|image\/(jpe?g|png)/.test(mime)) {
            for (let jid of id) {
               await Func.delay(jeda * 1000)
               let media = await q.download()
               client.sendFile(jid, media, '', q.text ? q.text : '', null)
            }
            m.reply(Func.texted('bold', `✅ Successfully sent messages to ${id.length} numbers.`))
         }*/
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   cache: true,
   location: __filename
            }
