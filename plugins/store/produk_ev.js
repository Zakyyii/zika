exports.run = {
   async: async (m, {
      client,
      body,
      groupSet, 
      Func
   }) => {
      try {
         if (body && typeof body === 'string') {
            groupSet.shop = groupSet.shop ? groupSet.shop : []
            const product = groupSet.shop.find(v => v._id === body.toLowerCase())
            if (!product) return
            product.cover ? client.sendFile(m.chat, product.cover, 'image.jpg', product.description, m) : m.reply(product.description)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true, 
   cache: true,
   location: __filename
}
