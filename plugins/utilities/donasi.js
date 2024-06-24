exports.run = {
   usage: ['donasi'],
   category: 'utilities',
   async: async (m, { client, args, command, Func, env }) => {
      let user = global.db.users.find(v => v.jid == m.sender);

      if (command == 'donasi') {
         await client.sendMessageModify(m.chat, generateDonationMessage(), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/5f7d530c36c856a502f66.jpg')
         });
      }
   },
   error: false,
   location: __filename
}

const generateDonationMessage = () => {
   return `𝐃 𝐎 𝐍 𝐀 𝐓 𝐔 𝐑
   
Berapapun Donasi Kamu Sangat Berharga Untuk *${env.bot_name}*, Agar Bisa Untuk Membantu Kelancaran Server

╭╼
╎∘ Dana : ${global.dana}
╎∘ Gopay : ${global.gopay}
╎∘ Ovo : ${global.ovo}
╎∘ Qris : ${global.qris}
╎∘ Bank : ${global.bank}
╰─━─━─━─━─━─━─━─╼`
}
