exports.run = {
   async: async (m, {
      client,
      body,
      setting,
      Func
   }) => {
      try {
         if (body && typeof body === 'string') {
            setting.shop = setting.shop ? setting.shop : []
            const product = setting.shop.find(v => v._id === body.toLowerCase())
            if (!product) return
            product.cover ? client.sendFile(m.chat, product.cover, 'image.jpg', product.description, m) : m.reply(product.description)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}
