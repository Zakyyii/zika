const fs = require('fs');

exports.run = {
   usage: ['jpmgc'],
   category: 'owner',
   async: async (m, { client, text, Func, isPrefix, command }) => {
      try {
         const [delay, message] = text.split('|');
         if (!delay || !message) return client.reply(m.chat, Func.example(isPrefix, command, '5|Hello World!'), m);
         if (isNaN(delay) || delay < 1) return m.reply(Func.texted('bold', '🚩 Please provide a valid delay in seconds.'));

         const groupIds = JSON.parse(fs.readFileSync('./group_jpm.json', 'utf8'));

         if (!groupIds || groupIds.length === 0) return m.reply(Func.texted('bold', '🚩 Group ID list is empty or not found.'));

         if (!message) return m.reply(Func.texted('bold', '🚩 Please provide a message to send.'));

         let successCount = 0;

         for (const groupId of groupIds) {
            await client.reply(groupId, message, null);
            await Func.delay(delay * 1000);
            successCount++;
         }

         client.reply(m.chat, Func.texted('bold', `🚩 Successfully sent messages to ${successCount} groups with a delay of ${delay} seconds.`), m);
      } catch (e) {
         console.error(e);
         m.reply(Func.jsonFormat(e), m);
      }
   },
   error: false,
   owner: true,
   location: __filename
};
