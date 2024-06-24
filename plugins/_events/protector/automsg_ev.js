exports.run = {
   async: async (m, {
      client,
      body,
      groupSet,
      Func
   }) => {
      try {
         if (groupSet.automsg && body) {
            if (body.match(/(chat.whatsapp.com)/gi) && !body.includes(await client.groupInviteCode(m.chat)) || body.match(/(wa.me)/gi)) {
            let delay = 10 // 10 detik
            Func.delay(delay * 1000)
            client.reply(m.chat, `*⚜️LIST PROMO HARGA VPS BY Zaxskyy⚜️*
- RAM 2GB CORE 2 : ~30K~ *20K (SOLD)❌*
- RAM 4GB CORE 2 : ~50K~ *40K✅*
- RAM 8GB CORE 4 : ~65K~ *50K✅*

*🍁KEUNTUNGAN VPS🍁*
- GARANSI 15 HARI 
- MASA AKTIF 1 BULAN
- PROVIDER : DIGITAL OCEAN PAYPAL
- FREE REQ DOMAIN
- FREE INSTALL PANEL
- FREE INSTALL WINGS
- BEBAS REQ OS,VERSI,REGION
- NEGO = NO GARANSI

*☔OPEN JUGA JASA☔*
> Jasa Install Panel Pterodactyl
> Jasa Install Tema
> Jasa Install Nodes
> Jasa Install Egg

*🌊OPEN JASA UNBAN SPAM🌊*
◇PRICE ONLY 10K FOR SLOT TERBATAS ✅

*MINAT? CHAT*
wa.me/6285183123144

*💠TESTIMONI ZAXSKYY💠*
https://whatsapp.com/channel/0029VaZvgc0GZNCnn3VPXs2G

*📢INFO GRUP📢*
*INFO PANEL ZAXSKYY¹*
https://chat.whatsapp.com/GpxnOdrzEmR78P1mS4afwe

*DIGITAL MARKETPLACE² BEBAS SHARE LINK*
https://chat.whatsapp.com/HWLvEd15wFdGPBbeUpIdKh

*DIGITAL MARKETPLACE³ BEBAS SHARE LINK*
https://chat.whatsapp.com/GkfAHos6F1n8fUx4X9976Y
*© Zaxskyy HOSTING*`, null)
            }
         }
      } catch (e) {
         // return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}