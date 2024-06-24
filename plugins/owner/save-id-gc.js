const fs = require('fs');

exports.run = {
   usage: ['save-id-gc'],
   category: 'owner',
   async: async (m, { client, Func }) => {
      try {
         const groupList = await client.groupFetchAllParticipating();
         const groupIds = Object.values(groupList).map(group => group.id);

         const existingGroupIds = JSON.parse(fs.readFileSync('./group_jpm.json', 'utf8'));

         const newGroupIds = [...new Set([...existingGroupIds, ...groupIds])];

         fs.writeFileSync('./group_jpm.json', JSON.stringify(newGroupIds, null, 2), 'utf8');

         client.reply(m.chat, `✅ Successfully saved ${groupIds.length} group IDs.`, m);
      } catch (e) {
         console.error(e);
         m.reply(Func.jsonFormat(e), m);
      }
   },
   error: false,
   owner: true,
   location: __filename
};