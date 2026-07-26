export const PANDUAN_PRAKTIS = {
  transportasi: [
    {
      id: 'bus-sholawat',
      title: '🚌 Bus Sholawat Makkah',
      desc: 'Layanan bus gratis 24 jam khusus jamaah Indonesia yang menghubungkan hotel ke Masjidil Haram.',
      details: [
        'Kartu Bus: Tempelkan kartu Bus Sholawat pada mesin validator pintu bus (GRATIS, tidak bayar tunai).',
        'Terminal Utama: Terminal Syib Amir, Kudai, dan Ajyad.',
        'Kode Rute: Perhatikan nomor rute pada bagian depan kaca bus yang sesuai dengan sektor hotelmu.',
        'Jam Sibuk: 1 jam sebelum & sesudah waktu sholat fardhu. Disunnahkan jalan lebih awal.'
      ]
    },
    {
      id: 'taksi-uber',
      title: '𝚻 Taksi & Uber / Careem',
      desc: 'Transportasi privat di Makkah & Madinah.',
      details: [
        'Aplikasi Resmi: Gunakan Uber atau Careem untuk harga pasti tanpa nego berlebihan.',
        'Taksi Konvensional: Sepakati harga SEBELUM naik (Contoh: Makkah ke Tan\'im sekitar 30-50 SAR).',
        'Safety: Pastikan taksi memiliki stiker resmi taksi Arab Saudi (warna putih/hijau).'
      ]
    },
    {
      id: 'kereta-haramain',
      title: '🚅 Kereta Cepat Haramain (HHR)',
      desc: 'Kereta cepat Makkah ↔ Madinah (Kecepatan 300 km/jam, waktu tempuh hanya 2 jam 15 menit!).',
      details: [
        'Pembelian Tiket: Beli via aplikasi/website resmi "Haramain High Speed Railway" jauh hari.',
        'Bagasi: Maksimal 1 koper (max 25 kg) + 1 tas jinjing per penumpang.',
        'Stasiun: Stasiun Makkah Rusaifah & Stasiun Madinah Al-Haramain.'
      ]
    }
  ],
  darurat: [
    {
      id: 'klinik-kesehatan',
      title: '🏥 Klinik & Pos Kesehatan Indonesia',
      desc: 'KKHI (Klinik Kesehatan Haji Indonesia) & Posko Kesehatan Masjidil Haram.',
      details: [
        'Makkah: Posko Sektor Khusus Masjidil Haram di area Tawaf & Terminal Syib Amir.',
        'Madinah: Pos Kesehatan KKHI Madinah di dekat Masjid Nabawi pintu 21.',
        'Layanan: Gratis untuk warga/jamaah Indonesia yang mengalami pusing, dehidrasi, atau kaki melepuh.'
      ]
    },
    {
      id: 'nomor-darurat',
      title: '📞 Nomor Telepon Darurat Penting',
      desc: 'Simpan nomor ini di HP sebelum berangkat!',
      contacts: [
        { label: 'KJRI Jeddah (Konsulat RI)', phone: '+966-12-671-1271' },
        { label: 'Polisi & Darurat Arab Saudi', phone: '911' },
        { label: 'Ambulans Arab Saudi', phone: '997' },
        { label: 'Call Center Kementerian Agama RI (Haji/Umroh)', phone: '+62-811-1234-567' }
      ]
    },
    {
      id: 'tips-tersesat',
      title: '🗺️ Tips Jika Tersesat di Masjidil Haram / Nabawi',
      desc: 'Jangan panik! Ikuti prosedur keselamatan standar ini:',
      details: [
        'Titik Kumpul (Meeting Point): Sepakati satu nomor pintu gerbang utama sebelum masuk (misal: Gate 79 King Fahd di Makkah, atau Gate 25 di Nabawi).',
        'Tunjukkan Kartu Hotel: Selalu kalungkan ID card jamaah atau tunjukkan foto kartu nama hotel kepada petugas berhijau/seragam.',
        'Cari Petugas Indonesia: Cari rombongan berjaket batik Indonesia atau petugas berpita Merah-Putih.'
      ]
    }
  ],
  cuaca: {
    monthlyTemp: [
      { month: 'Jan', temp: '25°C', condition: 'Sejuk' },
      { month: 'Mar', temp: '31°C', condition: 'Hangat' },
      { month: 'Mei', temp: '39°C', condition: 'Panas' },
      { month: 'Jul', temp: '44°C', condition: 'Sangat Panas' },
      { month: 'Sep', temp: '41°C', condition: 'Panas' },
      { month: 'Nov', temp: '32°C', condition: 'Hangat' },
    ],
    tipsDehidrasi: [
      'Minum minimal 500ml air Zamzam sebelum memulai Tawaf dan Sa\'i.',
      'Gunakan lip balm / pelembab bibir dan sunscreen SPF 50+ untuk kulit.',
      'Bawa semprotan air (water spray face mister) untuk menyegarkan muka saat panas terik.'
    ],
    heatstrokeWarning: '⚠️ Tanda Heatstroke: Pusing hebat, kulit sangat kering tidak berkeringat, mual. Segera berteduh, minum Zamzam dingin, dan basahi kepala dengan kain basah.'
  },
  belanja: [
    {
      id: 'oleh-oleh',
      title: '🛍️ Daftar Oleh-Oleh Wajib & Estimasi Harga',
      items: [
        { item: 'Kurma Ajwa (Kurma Nabi)', est: '40 - 70 SAR / kg (~Rp 170.000)' },
        { item: 'Air Zamzam Galon 5L', est: '12.5 SAR (~Rp 52.000 di Bandara)' },
        { item: 'Cokelat Kerikil & Kacang Pistachio', est: '25 - 40 SAR / kg' },
        { item: 'Sajadah & Parfum Oud Madinah', est: '20 - 100 SAR / pcs' },
        { item: 'Abaya & Gamis Makkah', est: '50 - 150 SAR / pcs' },
      ]
    },
    {
      id: 'kuliner-hemat',
      title: '🍽️ Rekomendasi Kuliner & Makan Hemat',
      items: [
        { name: 'Albaik Chicken', desc: 'Ayam goreng khas Saudi yang sangat populer, lezat, dan murah (~18 SAR dapat paket lengkap).' },
        { name: 'Nasi Mandi / Kabsa', desc: 'Porsi besar bisa dimakan berdua / bertiga dengan lauk ayam/kambing empuk.' },
        { name: 'Resto Indonesia', desc: 'Banyak tersebar di area Hotel Syisya & Chafeyah Makkah serta sekitar Nabawi Gate 21.' }
      ]
    }
  ],
  teknologi: [
    {
      id: 'sim-card',
      title: '📱 Rekomendasi Kartu SIM Lokal',
      options: [
        { provider: 'STC (Saudi Telecom)', note: 'Cakupan sinyal paling kuat di Makkah, Madinah, & Haramain Railway.' },
        { provider: 'Mobily / Zain', note: 'Harga paket data hemat untuk 10GB - 30GB.' }
      ]
    },
    {
      id: 'offline-maps',
      title: '🗺️ Cara Download Peta Offline Google Maps',
      steps: [
        'Buka Google Maps di HP saat terhubung Wi-Fi hotel.',
        'Ketik "Mecca" atau "Madinah" di pencarian.',
        'Klik profil kanan atas -> "Peta Offline" (Offline Maps) -> "Pilih Peta Sendiri".',
        'Atur area Makkah & Madinah lalu klik "Download".'
      ]
    }
  ]
};
