exports.run = {
   usage: ['pushkontak-gambar'],
   hidden: ['pushimg'],
   use: 'jeda',
   category: 'owner',
   async: async (m, {
      client,
      args,
      text,
      Func, 
      isPrefix,
      command, 
      participants
   }) => {
      try {
         let jeda = args[0]
         if (!jeda) return client.reply(m.chat, Func.example(isPrefix, command, '5'), m)
         let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         const id = participants.map(v => v.id) 
         client.sendReact(m.chat, '🕒', m.key)
         /*if (mess) {
            for (let jid of id) {
               await Func.delay(jeda * 1000)
               // let msg = text || 'Save!'
               client.reply(jid, mess, null)
            }
            m.reply(Func.texted('bold', `✅ Successfully sent messages to ${id.length} numbers.`))
         } else*/ if (/video|image\/(jpe?g|png)/.test(mime)) {
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
   group: true,
   cache: true,
   location: __filename
           } 
