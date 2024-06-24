exports.run = {
   usage: ['deletefile'],
   hidden: ['df'],
   use: 'category',
   category: 'owner',
   async: async (m, { client, text, isPrefix, command, Func }) => {
       try {
           if (!text) return client.reply(m.chat, `where is the path?\n\nexample:\n${isPrefix + command} plugins/menu.js`, m)

           let path = text.trim(); // Menghilangkan spasi tambahan dari path

           // Cek apakah file yang akan dihapus ada atau tidak
           if (!require('fs').existsSync(path)) {
               return client.reply(m.chat, `⚠️ File '${path}' not found. Please make sure the file exists.`, m)
           }

           // Hapus file yang ada
           require('fs').unlinkSync(path)

           m.reply(`Successfully deleted ${path}!`)
       } catch (e) {
           client.reply(m.chat, Func.jsonFormat(e), m)
       }
   },
   owner: true,
   cache: true,
   location: __filename
}