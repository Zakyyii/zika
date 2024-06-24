const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');

exports.run = {
   usage: ['groups'],
   category: 'miscs',
   async: async (m, { client, isPrefix, Func }) => {
      try {
         const groupList = await client.groupFetchAllParticipating();
         const groups = Object.values(groupList);

         let caption = `乂  *G R O U P - L I S T*\n\n`;
         caption += `*“Bot has joined into ${groups.length} groups, send _${isPrefix}gc_ or _${isPrefix}gcopt_ to show all setup options.”*\n\n`;

         groups.forEach((group, index) => {
            const v = global.db.groups.find(v => v.jid == group.id);
            if (v) {
               caption += `›  *${index + 1}.* ${group.subject}\n`;
               caption += `   *💳* : ${group.id.split`@`[0]}\n`;
               caption += `${v.stay ? '   FOREVER' : (v.expired == 0 ? '   NOT SET' : '   ' + Func.timeReverse(v.expired - new Date() * 1))} | ${group.participants.length} | ${(v.mute ? 'OFF' : 'ON')} | ${moment(v.activity).format('DD/MM/YY HH:mm:ss')}\n\n`;
            } else {
               global.db.groups.push({
               jid: group.id,
               activity: new Date * 1,
               antibot: false,
               antidelete: true,
               antilink: true,
               antiporn: false,
               antivirtex: true,
               filter: true,
               captcha: false,
               game: true,
               left: true,
               localonly: false,
               mute: false,
               member: {},
               text_left: '',
               text_welcome: '',
               welcome: true,
               expired: 0,
               stay: false
               });
            }
         });

         caption += `${global.footer}`;
         m.reply(caption);
      } catch (e) {
         console.error(e);
         m.reply('🚩 Terjadi kesalahan saat mengambil daftar grup.');
      }
   },
   cache: true,
   location: __filename,
};
