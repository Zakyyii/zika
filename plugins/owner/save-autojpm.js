const fs = require('fs');
const moment = require('moment-timezone');

exports.run = {
   usage: ['save-autojpm'],
   category: 'owner',
   async: async (m, { client, Func }) => {
      try {
         const groupList = await client.groupFetchAllParticipating();
         const groupIds = Object.values(groupList).map(group => group.id);

         const existingGroupList = JSON.parse(fs.readFileSync('./groupList.json', 'utf8') || '{}');
         let lastTime = moment.tz('Asia/Jakarta');
         if (Object.keys(existingGroupList).length > 0) {
            const lastGroup = Object.keys(existingGroupList).sort().pop();
            lastTime = moment(existingGroupList[lastGroup].time, 'HH:mm').tz('Asia/Jakarta');
         }

         groupIds.forEach(groupId => {
            if (!existingGroupList[groupId]) {
               lastTime.add(1, 'minute');
               existingGroupList[groupId] = { time: lastTime.format('HH:mm') };
            }
         });

         fs.writeFileSync('./groupList.json', JSON.stringify(existingGroupList, null, 2), 'utf8');

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