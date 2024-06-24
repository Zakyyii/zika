exports.run = {
   usage: ['updatefile'],
   hidden: ['uf'],
   use: 'category',
   category: 'owner',
   async: async (m, { client, text, isPrefix, command, Func }) => {
       try {
           if (!m.quoted) return client.reply(m.chat, '⚠️ Please reply to a message containing the new code \n• Example : updatefile plugins/games/dungeon.js.', m)

           let path = text

           // Hapus file
           require('fs').unlinkSync(path)

           // Ambil kode dari pesan yang di-reply
           let newCode = m.quoted.text

           // Perbarui file dengan menyimpan kode baru
           await require('fs').writeFileSync(path, newCode)

           m.reply(`Successfully updated ${path} with new code!`)
       } catch (e) {
           client.reply(m.chat, Func.jsonFormat(e), m)
       }
   },
   owner: true,
   cache: true,
   location: __filename
}
