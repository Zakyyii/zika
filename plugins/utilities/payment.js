exports.run = {
   usage: ['payment'],
   hidden: ['pembayaran'], 
   category: 'utilities',
   async: async (m, {
      client,
      Func, 
      args,
      command
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (command == 'payment') {
         await client.sendMessageModify(m.chat, nebang1(), m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/9402c06bf9166c0508223.jpg')
         });
      }
   },
   error: false,
   location: __filename
}

const nebang1 = () => {
   return `𝐏 𝐀 𝐘 𝐌 𝐄 𝐍 𝐓
   
╭╼
╎∘ Dana : ${global.dana}
╎∘ Gopay : ${global.gopay}
╎∘ Ovo : ${global.ovo}
╎∘ Qris : ${global.qris}
╎∘ Bank : ${global.bank}
╎∘ Pulsa : ${global.pulsa}
╰─━─━─━─━─━─━─━─╼`
}
