const fetch = require('node-fetch');

exports.run = {
   usage: ['gcopt', 'gc'],
   category: 'owner',
   async: async (m, { client, args, isPrefix, text, command, Func }) => {
      try {
         if (m.quoted && (m.quoted.text).match(/gcopt/g) && m.quoted.sender == client.decodeJid(client.user.id)) {
            if (!args || !args[0]) return m.reply(Func.texted('bold', `🚩 Give the group number argument in order.`))
            if (isNaN(args[0])) return m.reply(Func.texted('bold', `🚩 This argument must be a number.`))
            const jids = (m.quoted.text).split('💳* :').length
            if (args[0] > (jids - 1) || args[0] < 1) return m.reply(Func.texted('bold', `🚩 An error occurred, please check the group data list again.`))
            const select = (args[0]).trim()
            const jid = ((m.quoted.text).split('💳* :')[select].split`\n` [0] + '@g.us').trim()
            const group = global.db.groups.find(v => v.jid == jid)
            if (!group) return m.reply(Func.texted('bold', `🚩 Data group does not exist in the database.`))
            const groupMetadata = await client.groupMetadata(jid)
            const groupName = groupMetadata.subject
            const adminList = await client.groupAdmin(jid)
            const admin = adminList.includes((client.user.id.split`:` [0]) + '@s.whatsapp.net')
            const useOpt = (args && args[1]) ? true : false
            const option = useOpt ? (args[1]).toLowerCase() : false
            const time = group.stay ? 'FOREVER' : (group.expired == 0 ? 'NOT SET' : Func.timeReverse(group.expired - new Date() * 1))
            const member = groupMetadata.participants.map(u => u.id).length
            try {
               pic = await client.profilePictureUrl(jid, 'image')
            } catch {
               pic = await Func.fetchBuffer('./media/image/default.jpg')
            }
            let data = {
               name: groupName,
               member,
               time,
               group,
               admin
            }
            if (useOpt && option == 'text') {
               if (!args[2]) return m.reply(Func.texted('bold', `🚩 Please provide a text message to send to the group.`))
               const message = args.slice(2).join(' ')
               client.reply(jid, message, null)
               client.reply(m.chat, Func.texted('bold', `🚩 Successfully sent a message to ${groupName} group.`), m)
            } else {
               if (!useOpt) return client.sendMessageModify(m.chat, steal(Func, data) + '\n\n' + global.footer, m, {
                  largeThumb: true,
                  thumbnail: pic
               })
               if (option == 'open') {
                  if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Can't open ${groupName} group link because the bot is not an admin.`), m)
                  client.groupSettingUpdate(jid, 'not_announcement').then(() => {
                     client.reply(jid, Func.texted('bold', `🚩 Group has been opened.`)).then(() => {
                        client.reply(m.chat, Func.texted('bold', `🚩 Successfully open ${groupName} group.`), m)
                     })
                  })
               } else if (option == 'close') {
                  if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Can't close ${groupName} group link because the bot is not an admin.`), m)
                  client.groupSettingUpdate(jid, 'announcement').then(() => {
                     client.reply(jid, Func.texted('bold', `🚩 Group has been closed.`)).then(() => {
                        client.reply(m.chat, Func.texted('bold', `🚩 Successfully close ${groupName} group.`), m)
                     })
                  })
               } else if (option == 'mute') {
                  group.mute = true
                  client.reply(m.chat, Func.texted('bold', `🚩 Bot successfully muted in ${groupName} group.`), m)
               } else if (option == 'unmute') {
                  group.mute = false
                  client.reply(m.chat, Func.texted('bold', `🚩 Bot successfully unmuted in ${groupName} group.`), m)
               } else if (option == 'link') {
                  if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Can't get ${groupName} group link because the bot is not an admin.`), m)
                  client.reply(m.chat, 'https://chat.whatsapp.com/' + (await client.groupInviteCode(jid)), m)
               } else if (option == 'leave') {
                  client.reply(jid, `🚩 Good Bye! (${global.db.setting.link})`, null, {
                     mentions: groupMetadata.participants.map(v => v.id)
                  }).then(() => {
                     client.groupLeave(jid).then(() => {
                        global.db.groups.find(v => v.jid == jid).expired = 0
                        global.db.groups.find(v => v.jid == jid).stay = false
                        return client.reply(m.chat, Func.texted('bold', `🚩 Successfully leave from ${groupName} group.`), m)
                     })
                  })
               } else if (option == 'reset') {
                  global.db.groups.find(v => v.jid == jid).expired = 0
                  global.db.groups.find(v => v.jid == jid).stay = false
                  client.reply(m.chat, Func.texted('bold', `🚩 Configuration of bot in the ${groupName} group has been successfully reseted to default.`), m)
               } else if (option == 'forever') {
                  group.expired = 0
                  group.stay = true
                  client.reply(m.chat, Func.texted('bold', `🚩 Successfully set bot to stay forever in ${groupName} group.`), m)
               } else if (['1d', '3d', '7d', '30d'].includes(option) || /(d)/gi.test(option)) {
                  let now = new Date() * 1
                  let day = 86400000 * parseInt(option.replace('d', ''))
                  group.expired += (group.expired == 0) ? (now + day) : day
                  group.stay = false
                  client.reply(m.chat, (group.expired == 0) ? Func.texted('bold', `🚩 Bot duration is successfully set to stay for ${option.replace('d', ' day')} in ${groupName} group.`) : Func.texted('bold', `🚩 Successfully add ${option.replace('d', ' day')} in ${groupName} group.`), m)
               } else return m.reply(explain(isPrefix, command))
            }
         } else return m.reply(explain(isPrefix, command))
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   owner: true, 
   location: __filename
}

const steal = (Func, data) => {
   return `乂  *S T E A L E R*

	◦  *Name* : ${data.name}
	◦  *Member* : ${data.member}
	◦  *Expired* : ${data.time}
	◦  *Status* : ${Func.switcher(data.group.mute, 'OFF', 'ON')}
	◦  *Bot Admin* : ${Func.switcher(data.admin, '√', '×')}`
}

const explain = (isPrefix, cmd) => {
   return `乂  *M O D E R A T I O N*

*1.* ${isPrefix + cmd} <no>
- to steal / get group info

*2.* ${isPrefix + cmd} <no> open
- to open the group allow all members to send messages

*3.* ${isPrefix + cmd} <no> close
- to close the group only admins can send messages

*4.* ${isPrefix + cmd} <no> mute
- to mute / turn off in the group

*5.* ${isPrefix + cmd} <no> unmute
- to unmute / turn on in the group

*6.* ${isPrefix + cmd} <no> link
- to get the group invite link, make sure the bot is an admin

*7.* ${isPrefix + cmd} <no> leave
- to leave the group

*8.* ${isPrefix + cmd} <no> reset
- to reset group configuration to default

*9.* ${isPrefix + cmd} <no> forever
- to make bots stay forever in the group

*10.* ${isPrefix + cmd} <no> 1d/3d/7d/30d
- to set the duration of the bot in the group
Example : ${isPrefix + cmd} 2 1d

*11.* ${isPrefix + cmd} <no> text
- Send a message to a group
Example : ${isPrefix + cmd} 2 Hello World!

*NB* : Make sure you reply to messages containing group list to use this moderation options, send _${isPrefix}groups_ to show all group list.`
}
