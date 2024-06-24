exports.run = {
   usage: ['clonegc'],
   use: 'name', 
   category: 'owner',
   async: async (m, { client, text, participants, Func, isPrefix, command }) => {
      try {
         if (!text) {
            return client.reply(m.chat, `• Example :
*${isPrefix + command}clonegc My Group*`, m);
         }

         const groupInfo = await client.groupCreate(text, participants.map(v => v.id));

         console.log("created group with id: " + groupInfo.gid);
         await client.sendMessage(groupInfo.id, { text: 'Hello there!' });
         
         await client.reply(m.chat, `✅ *Successfully cloned group: ${text}*`, m);
      } catch (e) {
         console.error(e);
         return client.reply(m.chat, `🚩 ${e}`, m);
      }
   },
   owner: true,
   group: true
};