exports.run = {
   async: async (m, {
      client,
      body,
      groupSet,
      isAdmin,
      users,
      Func
   }) => {
      try {
         if (groupSet.antilink2 && !isAdmin && body) {
            if ((body.match(/(chat.whatsapp.com)/gi) && !body.includes(await client.groupInviteCode(m.chat))) || body.match(/(wa.me)/gi)) {
               users.limit_antilink += 1;
               if (users.limit_antilink <= 2) {
                  client.reply(m.chat, `🚩 Batas pengiriman link ${Func.formatNumber(users.limit_antilink)}/2`, m)
               } else {
                  return client.sendMessage(m.chat, {
                     delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.sender
                     }
                  })
               }
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   botAdmin: true,
   cache: true,
   location: __filename
}
