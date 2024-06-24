exports.run = {
   usage: ['savefile'],
   hidden: ['sf'],
   use: 'category',
   category: 'owner',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
       try {
if (!text) return client.reply(m.chat, `where is the path?\n\nexample:\n${isPrefix + command} plugins/menu.js`, m)
    if (!m.quoted) return client.reply(m.chat, '🚩 *Reply codes*', m)
    let path = text
    await require('fs').writeFileSync(path, m.quoted.text)
    m.reply(`Succesfully Saved ${path} to file!`) 
       } catch (e) {
           client.reply(m.chat, Func.jsonFormat(e), m)
           }
       },
   owner: true,
   cache: true,
   location: __filename
}