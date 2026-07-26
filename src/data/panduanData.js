export const TAHAP_UMROH = [
  {
    id: 1,
    title: 'Miqat & Niat Ihram',
    subtitle: 'Niat dari garis batas miqat',
    icon: '🕋',
    summary: 'Mandi sunnah, mengenakan pakaian ihram, dan mengucap niat umroh dari miqat.',
    miqatLocations: [
      { origin: 'Terbang via Madinah', name: 'Bir Ali (Zul Hulaifah)', dist: '450 km dari Makkah', note: 'Paling umum untuk jamaah gelombang 1' },
      { origin: 'Terbang Langsung ke Makkah', name: 'Yalamlam / di atas Pesawat', dist: '100 km dari Makkah', note: 'Berniat di pesawat saat sejajar Yalamlam' },
      { origin: 'Dari Makkah (Umroh Ke-2)', name: 'Masjid Aisha (Tan\'im) / Ji\'ranah', dist: '5-20 km dari Makkah', note: 'Gunakan taksi lokal ke Ji\'ranah/Tan\'im' },
    ],
    mandiSunnah: [
      'Memotong kuku dan merapikan rambut/kumis sebelum mandi',
      'Mandi wajib/sunnah ihram dengan berniat penyucian',
      'Memakai wangi-wangian HANYA pada badan (bukan pada pakaian ihram) sebelum mengucap niat',
    ],
    tataCaraPakaian: {
      pria: [
        'Gunakan 2 helai kain putih tak berjahit (1 kain sarung/izar, 1 kain bahu/rida\')',
        'Bahu kanan dibuka saat tawaf (Idhtiba\'), ditutup saat sholat',
        'Sandal harus memperlihatkan mata kaki dan jemari kaki',
        'Dilarang memakai celana dalam, peci, topi, atau kaos kaki',
      ],
      wanita: [
        'Memakai pakaian muslimah menutup seluruh aurat (kecuali wajah & telapak tangan)',
        'Bebas warna (putih/hitam/gelap yang tidak mencolok)',
        'Dilarang memakai sarung tangan (kaos tangan) dan niqab/cadar rapat yang menyentuh kulit',
      ]
    },
    niatArabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
    niatLatin: 'Labbaykallāhumma \'umratan.',
    niatTranslation: 'Aku sambut panggilan-Mu ya Allah untuk berumroh.',
    laranganIhram: [
      { label: 'Memotong rambut/kuku', icon: '✂️' },
      { label: 'Memakai wewangian di pakaian/setelah berniat', icon: '🧴' },
      { label: 'Menutup kepala (Pria) / Menutup wajah dengan cadar rapat (Wanita)', icon: '🧢' },
      { label: 'Memakai pakaian berjahit pembentuk tubuh (Pria)', icon: '👔' },
      { label: 'Membunuh hewan buruan / mencabut tanaman Tanah Haram', icon: '🌿' },
      { label: 'Menikah, menikahkan, atau melamar (Nikah/Rujuk)', icon: '💍' },
      { label: 'Bercumbu atau berhubungan suami istri (Rafats)', icon: '🚫' },
    ],
    tips: '💡 Tips Nyaman: Kenakan pakaian ihram dari hotel di Madinah/Asal sebelum naik bus ke Miqat Bir Ali agar tidak perlu berganti pakaian di kamar mandi umum.'
  },
  {
    id: 2,
    title: 'Tawaf 7 Putaran',
    subtitle: 'Mengelilingi Ka\'bah 7 kali',
    icon: '🔄',
    summary: 'Mengelilingi Ka\'bah sebanyak 7 putaran berlawanan arah jarum jam dari Hajar Aswad.',
    penjelasan: 'Tawaf adalah ibadah mengelilingi Ka\'bah sebanyak 7 kali putaran. Posisi Ka\'bah selalu berada di sebelah kiri badan kita.',
    caraMemulai: [
      'Masuk ke area Mataf dalam keadaan berwudhu',
      'Pria membuka bahu kanan (Idhtiba\')',
      'Cari garis coklat/lampu hijau di dinding sebagai tanda sejajar Hajar Aswad',
      'Lambaikan tangan kanan ke arah Hajar Aswad dan ucapkan: Bismillāhi wallāhu akbar (Istilam)',
    ],
    counterTotal: 7,
    tipsWaktu: '💡 Tips Waktu Tawaf: 1-2 jam setelah Sholat Subuh atau pukul 23:00 malam adalah waktu paling sejuk dan tidak terlalu padat.',
    tipsKursiRoda: '♿ Tips Kursi Roda: Tawaf dengan kursi roda dilakukan di Lantai 1 atau Lantai 2 (Mezzanine). Akses lift tersedia di Gate King Abdulaziz.'
  },
  {
    id: 3,
    title: 'Sholat 2 Rakaat di Makam Ibrahim',
    subtitle: 'Sholat sunnah setelah Tawaf',
    icon: '🕌',
    summary: 'Sholat sunnah tawaf 2 rakaat di belakang Makam Ibrahim atau di mana saja di Masjidil Haram.',
    lokasi: 'Makam Ibrahim adalah batu tempat berpijak Nabi Ibrahim AS saat membangun Ka\'bah. Terletak persis di depan pintu Ka\'bah.',
    tataCara: [
      'Tutup kembali kedua bahu pria (akhiri idhtiba\')',
      'Cari posisi di belakang Makam Ibrahim (jika terlalu padat, boleh di mana saja dalam area Masjidil Haram)',
      'Niat sholat sunnah Tawaf 2 rakaat',
      'Rakaat 1: Setelah Al-Fatihah membaca Surat Al-Kafirun',
      'Rakaat 2: Setelah Al-Fatihah membaca Surat Al-Ikhlas',
    ],
    doaSetiapRakaat: 'Setelah salam, dianjurkan membaca doa memohon ketetapan iman dan kelapangan rezeki.'
  },
  {
    id: 4,
    title: 'Doa Multazam & Minum Zamzam',
    subtitle: 'Berdoa dan meneguk air suci',
    icon: '🥛',
    summary: 'Berdoa di Multazam dan meminum air Zamzam hingga kenyang sambil menghadap Qiblat.',
    multazamGuide: 'Multazam adalah dinding Ka\'bah antara Hajar Aswad dan pintu Ka\'bah. Jika memungkinkan menempelkan badan/tangan, tempat ini adalah tempat dikabulkannya doa.',
    zamzamGuide: [
      'Ambil air Zamzam dari dispenser bertuliskan Cold / Not Cold',
      'Niatkan sebelum minum (misal: kesembuhan, ilmu bermanfaat, hajad keluarga)',
      'Minum sambil berdiri menghadap Ka\'bah dengan tangan kanan dalam 3 tegukan',
      'Baca doa minum air Zamzam',
    ],
    tips: '💡 Bawa botol refill kosong kecil di dalam tas selempang untuk diisi Zamzam sebagai bekal saat Sa\'i.'
  },
  {
    id: 5,
    title: 'Sa\'i (7 Kali Shafa & Marwa)',
    subtitle: 'Berjalan antara bukit Shafa dan Marwa',
    icon: '🏃',
    summary: 'Berjalan 7 kali perjalanan dimulai dari bukit Shafa dan berakhir di bukit Marwa.',
    penjelasan: 'Mengenang perjuangan Siti Hajar mencari air untuk Nabi Ismail AS.',
    ruleCounter: 'Hitungan perjalanan: Shafa → Marwa (1), Marwa → Shafa (2), Shafa → Marwa (3), ... berakhir di Marwa pada hitungan ke-7.',
    greenLightZone: '🟢 Di antara dua lampu hijau (Milain Akhdharain), jamaah pria disunnahkan berlari-lari kecil (Ramal), wanita berjalan biasa.',
    tipsLansia: '♿ Sa\'i jalur kursi roda elektrik tersedia di lantai atas. Bisa sewa kendaraan skuter elektrik resmi Nusuk.'
  },
  {
    id: 6,
    title: 'Tahallul',
    subtitle: 'Mencukur rambut & keluar dari ihram',
    icon: '✂️',
    summary: 'Mencukur sekurang-kurangnya 3 helai rambut untuk wanita, atau mencukur habis (gundul) bagi pria.',
    penjelasan: 'Dengan tahallul, selesai sudah seluruh rangkaian ibadah Umroh dan semua larangan ihram kembali diperbolehkan.',
    tataCara: [
      'Pria: Memotong pendek seluruh rambut atau gundul licin (gundul lebih afdhal dan didoakan Nabi 3 kali)',
      'Wanita: Mengumpulkan ujung rambut dan memotong sepanjang satu ruas jari (min. 3 helai rambut)',
      'Membaca doa tahallul',
    ],
    bolehSetelahTahallul: 'Boleh memakai pakaian biasa, wewangian, dan menggunakan produk perawatan tubuh kembali.'
  }
];

export const ZIARAH_MADINAH = [
  {
    id: 'masjid-nabawi',
    title: 'Masjid Nabawi',
    icon: '🕌',
    desc: 'Masjid utama Rasulullah ﷺ dengan ganjaran 1.000 kali lipat dibanding masjid lain.',
    doaMasuk: 'Bismillāhi was-ṣalātu was-salāmu \'alā Rasūlillāh...',
    tips: 'Datanglah 1 jam sebelum adzan untuk mendapatkan shaf di dalam bangunan utama masjid.'
  },
  {
    id: 'raudhah',
    title: 'Raudhah (Taman Surga)',
    icon: '🌿',
    desc: 'Area antara mimbar dan makam Rasulullah ﷺ. Tempat dikabulkannya doa.',
    bookingNusuk: 'Wajib melakukan booking tasrih lewat aplikasi Nusuk Saudi resmi 2-3 hari sebelumnya.',
    tips: 'Pakai pakaian rapi, jaga ketenangan, dan sholat sunnah 2 rakaat saat masuk.'
  },
  {
    id: 'makam-rasulullah',
    title: 'Makam Rasulullah ﷺ & Sahabat',
    icon: '💚',
    desc: 'Makam Nabi Muhammad ﷺ, Abu Bakar Ash-Shiddiq RA, dan Umar bin Khattab RA.',
    adab: 'Mengucapkan salam dengan suara perlahan, tidak menempelkan badan ke pagar besi.'
  },
  {
    id: 'masjid-quba',
    title: 'Masjid Quba',
    icon: '🏛️',
    desc: 'Masjid pertama yang dibangun Rasulullah ﷺ. Sholat 2 rakaat di sini pahalanya setara 1 kali Umroh!',
    tips: 'Berwudhulah dari hotel sebelum berangkat ke Masjid Quba.'
  },
  {
    id: 'jabal-uhud',
    title: 'Jabal Uhud & Makam Syuhada',
    icon: '⛰️',
    desc: 'Gunung yang dicintai Rasulullah ﷺ dan mencintai beliau. Tempat perang Uhud dan makam Hamzah RA.',
    tips: 'Ziarahi pemakaman 70 syuhada Uhud dan panjatkan doa keselamatan.'
  },
  {
    id: 'kebun-kurma',
    title: 'Kebun Kurma Madinah',
    icon: '🌴',
    desc: 'Tempat membeli kurma Ajwa (Kurma Nabi) asli segar langsung dari petani.',
    tips: 'Kurma Ajwa berkualitas tinggi bertekstur lembut dan bergaris putih halus.'
  }
];
