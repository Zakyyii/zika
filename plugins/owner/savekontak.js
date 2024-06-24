// Aplikasi penyimpan hasil kontak (vcf) : https://play.google.com/store/apps/details?id=com.shradhika.contactbackup.vcfimport.dp

// Fungsi untuk mengonversi nomor ke format VCF
function numberToVCF(number, index) {
    return `BEGIN:VCARD
VERSION:2.1
N:;kontak ${index};;;
FN:kontak ${index}
TEL;CELL:+${number}
END:VCARD\n`;
}

exports.run = {
   usage: ['savekontak'],
   category: 'owner',
   async: async (m, { client, text, participants, Func }) => {
      try {
         let numbers = participants.map(v => v.id.replace('@s.whatsapp.net', ''));

         if (numbers.length === 0) {
             return client.reply(m.chat, 'Tidak ada nomor yang ditemukan', m);
         }

         let vcfText = numbers.map(numberToVCF).join('');

         let fileName = 'kontak.vcf';
         if (text && text.trim() !== '') {
             fileName = `${text.trim()}.vcf`;
         }

         client.sendFile(m.chat, Buffer.from(vcfText), fileName, 'Berikut adalah file VCF dari nomor-nomor dalam grup', m);
      } catch (e) {
         console.log(e);
         return client.reply(m.chat, Func.jsonFormat(e), m);
      }
   },
   owner: true,
   group: true
}

