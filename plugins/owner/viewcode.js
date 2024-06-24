exports.run = {
   usage: ['viewcode'],
   hidden: ['vc'],
   use: 'category',
   category: 'owner',
   async: async (m, { client, text, Func }) => {
       try {
           if (!text) return client.reply(m.chat, '⚠️ Please provide a file path.', m)

           let path = text.trim(); // Menghilangkan spasi tambahan dari path

           // Cek apakah file yang akan dilihat ada atau tidak
           if (!require('fs').existsSync(path)) {
               return client.reply(m.chat, `⚠️ File '${path}' not found. Please make sure the file exists.`, m)
           }

           // Baca isi file
           let fileContent = require('fs').readFileSync(path, 'utf8');

           // Kirim isi file sebagai pesan
           client.reply(m.chat, fileContent, m)
       } catch (e) {
           client.reply(m.chat, Func.jsonFormat(e), m)
       }
   },
   owner: true,
   cache: true,
   location: __filename
}