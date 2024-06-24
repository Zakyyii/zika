exports.run = {
   usage: ['clonegc-id'],
   use: 'id group | name',
   category: 'owner',
   async: async (m, { client, text, Func, isPrefix, command }) => {
      try {
         const [groupId, groupName] = text.split('|');

         if (!groupId || !groupName) {
            return client.reply(m.chat, `• Example :
${isPrefix + command} 120363213428674904@g.us|My Cloned Group`, m);
         }

         const groupInfo = await client.groupMetadata(groupId);

         if (!groupInfo) {
            return client.reply(m.chat, '❌ Group not found!', m);
         }

         const memberList = groupInfo.participants.map(v => v.id);
         const newGroup = await client.groupCreate(groupName, memberList);

         console.log("created group with id: " + newGroup.gid);
         await client.sendMessage(newGroup.id, { text: 'Hello there!' });

         return client.reply(m.chat, `✅ *Successfully cloned group: ${groupName}*`, m);
      } catch (e) {
         console.error(e);
         return client.reply(m.chat, `🚩 ${e}`, m);
      }
   },
   error: false,
   owner: true
};
