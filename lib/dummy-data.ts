/**
 * lib/dummy-data.ts
 * Realistic Indonesian dummy data for UI rendering without Supabase.
 * All data uses Indonesian language and realistic village context.
 * v2: Extended with new feature types (Community Actions, SOS, Projects, Jobs, Training, Health Score, AI Predictions)
 */

export type Report = {
  id: string;
  user_id: string;
  author_name: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed';
  lat: number;
  lng: number;
  image_url: string;
  upvotes: number;
  comments_count: number;
  created_at: string;
};

export type Product = {
  id: string;
  user_id: string;
  seller_name: string;
  name: string;
  description: string;
  price: number;
  phone_number: string;
  whatsapp?: string;
  image_url: string;
  category: string;
  featured?: boolean;
  sales_count?: number;
  rating?: number;
  reviews_count?: number;
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  author: string;
  category: string;
  created_at: string;
};

export type Comment = {
  id: string;
  report_id: string;
  author_name: string;
  content: string;
  created_at: string;
};

// ---- DUMMY REPORTS ----
export const dummyReports: Report[] = [
  {
    id: '1',
    user_id: 'user-1',
    author_name: 'Budi Santoso',
    title: 'Jalan Rusak di RT 02 Dekat Balai Desa',
    description: 'Jalan utama menuju balai desa mengalami kerusakan parah dengan banyak lubang besar yang berbahaya bagi pengendara sepeda motor dan menyebabkan kecelakaan. Sudah beberapa bulan tidak diperbaiki.',
    category: 'Infrastruktur',
    status: 'in_progress',
    lat: -5.3412,
    lng: 105.7921,
    image_url: 'https://picsum.photos/seed/road1/800/500',
    upvotes: 47,
    comments_count: 12,
    created_at: '2026-03-15T08:30:00Z',
  },
  {
    id: '2',
    user_id: 'user-2',
    author_name: 'Siti Rahayu',
    title: 'Tumpukan Sampah Tidak Diangkut di RW 05',
    description: 'Sampah menumpuk sudah 2 minggu di depan gang masuk RW 05. Petugas kebersihan tidak datang mengangkut. Bau menyengat dan mengganggu warga sekitar serta berpotensi menjadi sarang penyakit.',
    category: 'Sampah',
    status: 'pending',
    lat: -5.3389,
    lng: 105.7952,
    image_url: 'https://picsum.photos/seed/trash1/800/500',
    upvotes: 32,
    comments_count: 8,
    created_at: '2026-03-17T14:15:00Z',
  },
  {
    id: '3',
    user_id: 'user-3',
    author_name: 'Ahmad Fauzi',
    title: 'Saluran Air Tersumbat Menyebabkan Banjir',
    description: 'Saluran drainase di Jalan Melati tersumbat oleh sampah dan sedimentasi. Setiap hujan, air meluap ke jalan dan masuk ke rumah warga. Butuh segera dibersihkan.',
    category: 'Infrastruktur',
    status: 'pending',
    lat: -5.3448,
    lng: 105.7908,
    image_url: 'https://picsum.photos/seed/drain1/800/500',
    upvotes: 28,
    comments_count: 5,
    created_at: '2026-03-18T09:00:00Z',
  },
  {
    id: '4',
    user_id: 'user-4',
    author_name: 'Dewi Lestari',
    title: 'Lampu PJU Mati di Jalan Utama RT 07',
    description: 'Tiga titik lampu penerangan jalan umum di jalan utama RT 07 sudah mati selama 3 minggu. Kondisi sangat gelap di malam hari dan membahayakan keamanan warga.',
    category: 'Keamanan',
    status: 'completed',
    lat: -5.3398,
    lng: 105.7938,
    image_url: 'https://picsum.photos/seed/lamp1/800/500',
    upvotes: 56,
    comments_count: 15,
    created_at: '2026-03-10T11:00:00Z',
  },
  {
    id: '5',
    user_id: 'user-5',
    author_name: 'Rudi Hermawan',
    title: 'Pembangunan Posyandu Baru Perlu Dipercepat',
    description: 'Posyandu di RT 03 sudah tidak memadai untuk melayani warga yang semakin bertambah. Anak-anak dan lansia harus antri sangat lama. Mohon diprioritaskan pembangunan posyandu baru.',
    category: 'Kesehatan',
    status: 'in_progress',
    lat: -5.3367,
    lng: 105.7963,
    image_url: 'https://picsum.photos/seed/health1/800/500',
    upvotes: 41,
    comments_count: 9,
    created_at: '2026-03-12T16:30:00Z',
  },
  {
    id: '6',
    user_id: 'user-6',
    author_name: 'Nur Cahaya',
    title: 'Pohon Tumbang Menutup Jalan Lingkungan',
    description: 'Pohon besar di depan SDN 01 tumbang akibat angin kencang kemarin malam dan menutup setengah badan jalan. Berbahaya bagi pengguna jalan, terutama anak-anak sekolah.',
    category: 'Lingkungan',
    status: 'completed',
    lat: -5.3435,
    lng: 105.7899,
    image_url: 'https://picsum.photos/seed/tree1/800/500',
    upvotes: 19,
    comments_count: 4,
    created_at: '2026-03-19T07:45:00Z',
  },
];


// ---- DUMMY PRODUCTS (UMKM) with featured + sales_count ----
export const dummyProducts: Product[] = [
  { id: 'p1', user_id: 'user-7', seller_name: 'Ibu Warni', name: 'Keripik Singkong Pedas Original', description: 'Keripik singkong homemade, renyah, pedas gurih. Tanpa pengawet, cocok untuk camilan sehari-hari.', price: 15000, phone_number: '6281234567890', image_url: 'https://picsum.photos/seed/snack1/400/300', category: 'Makanan', featured: false, sales_count: 234 },
  { id: 'p2', user_id: 'user-8', seller_name: 'Pak Supri', name: 'Batik Tulis Motif Parang Premium', description: 'Batik tulis tangan asli motif parang, bahan katun premium. Cocok untuk acara formal dan kasual.', price: 280000, phone_number: '6282345678901', image_url: 'https://picsum.photos/seed/batik1/400/300', category: 'Kerajinan', featured: true, sales_count: 89 },
  { id: 'p3', user_id: 'user-9', seller_name: 'Mbak Ayu', name: 'Madu Hutan Murni 500ml', description: 'Madu hutan murni tanpa campuran, dipanen langsung dari lebah hutan. Kaya manfaat untuk kesehatan.', price: 120000, phone_number: '6283456789012', image_url: 'https://picsum.photos/seed/honey1/400/300', category: 'Kesehatan', featured: false, sales_count: 156 },
  { id: 'p4', user_id: 'user-10', seller_name: 'Pak Joko', name: 'Kopi Robusta Gunung Single Origin', description: 'Kopi robusta pilihan dari kebun sendiri, proses natural sun-dried. Aroma kuat, cocok untuk americano atau espresso.', price: 85000, phone_number: '6284567890123', image_url: 'https://picsum.photos/seed/coffee1/400/300', category: 'Minuman', featured: true, sales_count: 312 },
  { id: 'p5', user_id: 'user-11', seller_name: 'Ibu Sari', name: 'Tempe Mendoan Khas Banyumas', description: 'Tempe mendoan segar, siap goreng. Dibuat dari kedelai pilihan dengan bumbu rahasia turun-temurun.', price: 10000, phone_number: '6285678901234', image_url: 'https://picsum.photos/seed/tempe1/400/300', category: 'Makanan', featured: false, sales_count: 445 },
  { id: 'p6', user_id: 'user-12', seller_name: 'Mas Dani', name: 'Tas Anyaman Bambu Handmade', description: 'Tas anyaman bambu buatan tangan, kuat dan ramah lingkungan. Tersedia berbagai ukuran dan warna.', price: 150000, phone_number: '6286789012345', image_url: 'https://picsum.photos/seed/bag1/400/300', category: 'Kerajinan', featured: true, sales_count: 67 },
  { id: 'p7', user_id: 'user-13', seller_name: 'Pak Rono', name: 'Telur Organik Kampung (1 Lusin)', description: 'Telur ayam kampung organik, bebas pestisida. Ayam diternakkan di alam terbuka dengan pakan alami.', price: 35000, phone_number: '6287890123456', image_url: 'https://picsum.photos/seed/egg1/400/300', category: 'Pertanian', featured: false, sales_count: 203 },
  { id: 'p8', user_id: 'user-14', seller_name: 'Ibu Lastri', name: 'Jamu Kunyit Asam Tradisional', description: 'Jamu tradisional kunyit asam, baik untuk pencernaan dan daya tahan tubuh. Diproses higienis tanpa bahan kimia.', price: 20000, phone_number: '6288901234567', image_url: 'https://picsum.photos/seed/jamu1/400/300', category: 'Kesehatan', featured: false, sales_count: 178 },
];

// ---- DUMMY ARTICLES ----
export const dummyArticles: Article[] = [
  { id: 'a1', title: 'Cara Mengurus Surat Keterangan Domisili di Kantor Desa', excerpt: 'Panduan lengkap prosedur dan persyaratan pembuatan surat keterangan domisili untuk warga desa.', image_url: 'https://picsum.photos/seed/article1/600/400', author: 'Tim Pemerintah Desa', category: 'Administrasi', created_at: '2026-03-10T09:00:00Z' },
  { id: 'a2', title: 'Program Bantuan UMKM Desa: Siapa Saja yang Berhak?', excerpt: 'Informasi lengkap tentang kriteria penerima bantuan modal usaha UMKM dari pemerintah desa tahun 2026.', image_url: 'https://picsum.photos/seed/article2/600/400', author: 'Kepala Bidang Ekonomi', category: 'Ekonomi', created_at: '2026-03-12T10:30:00Z' },
  { id: 'a3', title: 'Tips Menjaga Kebersihan Lingkungan untuk Cegah DBD', excerpt: 'Musim hujan tiba, waspada demam berdarah. Ini langkah mudah yang bisa dilakukan setiap keluarga.', image_url: 'https://picsum.photos/seed/article3/600/400', author: 'Puskesmas Desa', category: 'Kesehatan', created_at: '2026-03-14T08:00:00Z' },
  { id: 'a4', title: 'Jadwal Posyandu dan Imunisasi Balita Bulan Maret 2026', excerpt: 'Jadwal lengkap kegiatan posyandu dan imunisasi untuk balita di seluruh RW desa bulan Maret 2026.', image_url: 'https://picsum.photos/seed/article4/600/400', author: 'Kader Posyandu', category: 'Kesehatan', created_at: '2026-03-01T07:00:00Z' },
  { id: 'a5', title: 'Pelatihan Digital Marketing untuk Pelaku UMKM Desa', excerpt: 'Dinas Koperasi mengadakan pelatihan gratis digital marketing untuk UMKM desa. Daftarkan diri Anda sekarang!', image_url: 'https://picsum.photos/seed/article5/600/400', author: 'Dinas Koperasi & UMKM', category: 'Pelatihan', created_at: '2026-03-16T11:00:00Z' },
  { id: 'a6', title: 'Musyawarah Desa: Rencana Pembangunan Irigasi 2026', excerpt: 'Hasil musyawarah desa tentang rencana pembangunan saluran irigasi baru untuk lahan pertanian warga.', image_url: 'https://picsum.photos/seed/article6/600/400', author: 'Sekretariat Desa', category: 'Pemerintahan', created_at: '2026-03-18T13:00:00Z' },
];

// ---- DUMMY DASHBOARD STATS ----
export const dummyStats = {
  totalReports: 148,
  pendingReports: 42,
  inProgressReports: 35,
  completedReports: 71,
  resolutionRate: 48,
  activeUMKM: 67,
  totalCitizens: 1240,
};

// ---- DUMMY CHART DATA ----
export const dummyCategoryData = [
  { category: 'Infrastruktur', count: 52 },
  { category: 'Sampah', count: 38 },
  { category: 'Kesehatan', count: 24 },
  { category: 'Keamanan', count: 18 },
  { category: 'Lingkungan', count: 10 },
  { category: 'Lainnya', count: 6 },
];

export const dummyTrendData = [
  { month: 'Okt', laporan: 18, selesai: 10 },
  { month: 'Nov', laporan: 22, selesai: 14 },
  { month: 'Des', laporan: 15, selesai: 12 },
  { month: 'Jan', laporan: 28, selesai: 18 },
  { month: 'Feb', laporan: 32, selesai: 20 },
  { month: 'Mar', laporan: 35, selesai: 22 },
];

// ---- DUMMY COMMENTS ----
export const dummyComments: Comment[] = [
  { id: 'c1', report_id: '1', author_name: 'Pak RT 02', content: 'Sudah saya laporkan ke kepala desa. Katanya minggu ini akan disurvei dulu.', created_at: '2026-03-16T10:00:00Z' },
  { id: 'c2', report_id: '1', author_name: 'Warga RT 02', content: 'Semoga cepat diperbaiki, kasihan yang lewat terutama saat malam hari.', created_at: '2026-03-17T08:30:00Z' },
  { id: 'c3', report_id: '1', author_name: 'Ahmad Fauzi', content: 'Saya sudah kena lubang itu kemarin. Motor saya jadi rusak pelek-nya.', created_at: '2026-03-18T14:00:00Z' },
];

// ============================================================
// DesaMind v2 — NEW FEATURE TYPES & DUMMY DATA
// ============================================================

// ---- COMMUNITY ACTION (GOTONG ROYONG) ----
export type CommunityAction = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  max_participants: number;
  current_participants: number;
  organizer: string;
  image_url: string;
  status: 'open' | 'full' | 'done';
  report_id?: string;
  created_at: string;
};

export const dummyActions: CommunityAction[] = [
  {
    id: 'act1', title: 'Kerja Bakti Bersih Jalan RT 02', description: 'Mari bersama-sama membersihkan jalan utama RT 02 yang selama ini masih terdapat tumpukan sampah dan rumput liar. Kegiatan ini juga akan diisi dengan pengecatan ulang marka jalan.',
    category: 'Kebersihan', location: 'Jalan Utama RT 02, RW 01', date: '2026-03-29', time: '07:00',
    max_participants: 50, current_participants: 32, organizer: 'Pak RT Suharto',
    image_url: 'https://picsum.photos/seed/action1/800/400', status: 'open', report_id: '1', created_at: '2026-03-20T09:00:00Z',
  },
  {
    id: 'act2', title: 'Pembersihan Saluran Drainase RW 03', description: 'Gotong royong membersihkan saluran drainase yang tersumbat di sepanjang RW 03 untuk mencegah banjir musim hujan. Alat-alat akan disediakan oleh pemerintah desa.',
    category: 'Infrastruktur', location: 'RW 03, Sepanjang Jalan Melati', date: '2026-04-05', time: '06:30',
    max_participants: 40, current_participants: 18, organizer: 'Ahmad Fauzi',
    image_url: 'https://picsum.photos/seed/action2/800/400', status: 'open', report_id: '3', created_at: '2026-03-21T11:00:00Z',
  },
  {
    id: 'act3', title: 'Penanaman 100 Pohon di Pinggir Desa', description: 'Bersama Kelompok Tani dan warga, kita akan menanam 100 bibit pohon trembesi di area pinggiran desa untuk penghijauan dan mencegah erosi tanah.',
    category: 'Lingkungan', location: 'Pinggiran Desa (Titik Berkumpul: Balai Desa)', date: '2026-04-12', time: '07:30',
    max_participants: 60, current_participants: 45, organizer: 'Kelompok Tani Subur',
    image_url: 'https://picsum.photos/seed/action3/800/400', status: 'open', created_at: '2026-03-18T14:00:00Z',
  },
  {
    id: 'act4', title: 'Posyandu Lanjut Usia RT 04-07', description: 'Pemeriksaan kesehatan gratis untuk lansia warga RT 04 hingga RT 07. Meliputi cek tekanan darah, gula darah, dan konsultasi dokter.',
    category: 'Kesehatan', location: 'Balai Pertemuan RW 04', date: '2026-04-03', time: '08:00',
    max_participants: 80, current_participants: 80, organizer: 'Kader Posyandu Mawar',
    image_url: 'https://picsum.photos/seed/action4/800/400', status: 'full', created_at: '2026-03-15T08:00:00Z',
  },
];

// ---- EMERGENCY ALERTS (SOS) ----
export type EmergencyAlert = {
  id: string;
  type: 'flood' | 'fire' | 'accident' | 'medical' | 'crime';
  description: string;
  location: string;
  lat: number;
  lng: number;
  status: 'active' | 'handled' | 'resolved';
  reporter_name: string;
  created_at: string;
};

export const dummyAlerts: EmergencyAlert[] = [
  { id: 'sos1', type: 'flood', description: 'Banjir setinggi 60cm di gang masuk RW 05. Beberapa rumah sudah terendam. Butuh perahu karet dan evakuasi.', location: 'Gang RW 05, dekat sungai kecil', lat: -6.2089, lng: 106.8471, status: 'active', reporter_name: 'Siti Rahayu', created_at: '2026-03-21T22:00:00Z' },
  { id: 'sos2', type: 'accident', description: 'Kecelakaan motor di Jalan Utama RT 02, korban 2 orang. Salah satu korban pingsan. Butuh ambulan segera.', location: 'Jalan Utama RT 02', lat: -6.2115, lng: 106.8452, status: 'handled', reporter_name: 'Budi Santoso', created_at: '2026-03-20T14:30:00Z' },
  { id: 'sos3', type: 'fire', description: 'Kebakaran kecil di dapur rumah Pak Hasan RT 03. Api sudah dipadamkan oleh warga, tapi butuh pengecekan lanjut.', location: 'RT 03 No. 12', lat: -6.2067, lng: 106.8489, status: 'resolved', reporter_name: 'Rudi Hermawan', created_at: '2026-03-19T18:45:00Z' },
];

// ---- GOVERNMENT PROJECTS ----
export type Project = {
  id: string;
  title: string;
  description: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'planning' | 'ongoing' | 'completed' | 'paused';
  category: string;
  image_url: string;
  start_date: string;
  end_date: string;
  contractor: string;
};

export const dummyProjects: Project[] = [
  { id: 'proj1', title: 'Pelebaran Jalan Utama Desa Segmen A', description: 'Pelebaran jalan utama dari 4m menjadi 6m sepanjang 800m untuk meningkatkan kelancaran lalu lintas dan keselamatan warga.', budget: 450000000, spent: 280000000, progress: 62, status: 'ongoing', category: 'Infrastruktur', image_url: 'https://picsum.photos/seed/proj1/800/400', start_date: '2026-01-15', end_date: '2026-06-30', contractor: 'CV Maju Bersama' },
  { id: 'proj2', title: 'Pembangunan Posyandu Terpadu RT 03', description: 'Pembangunan gedung posyandu baru 2 lantai lengkap dengan ruang pemeriksaan dan apotek kecil untuk melayani 400 balita dan 200 lansia.', budget: 320000000, spent: 320000000, progress: 100, status: 'completed', category: 'Kesehatan', image_url: 'https://picsum.photos/seed/proj2/800/400', start_date: '2025-09-01', end_date: '2026-02-28', contractor: 'PT Karya Sehat' },
  { id: 'proj3', title: 'Instalasi PJU Tenaga Surya', description: 'Pemasangan 45 unit lampu PJU tenaga surya di seluruh gang dan jalan lingkungan desa untuk keamanan dan efisiensi energi.', budget: 180000000, spent: 45000000, progress: 25, status: 'ongoing', category: 'Keamanan', image_url: 'https://picsum.photos/seed/proj3/800/400', start_date: '2026-03-01', end_date: '2026-05-31', contractor: 'UD Surya Terang' },
  { id: 'proj4', title: 'Renovasi Balai Desa dan Aula Pertemuan', description: 'Renovasi total balai desa meliputi pengecatan, penggantian atap, pemasangan AC, projector, dan sound system.', budget: 275000000, spent: 0, progress: 0, status: 'planning', category: 'Infrastruktur', image_url: 'https://picsum.photos/seed/proj4/800/400', start_date: '2026-05-01', end_date: '2026-08-31', contractor: 'Belum Ditentukan' },
  { id: 'proj5', title: 'Pembangunan TPS Terpadu', description: 'Pembangunan TPS terpadu dengan fasilitas pemilahan sampah organik/anorganik dan mesin pencacah kompos.', budget: 150000000, spent: 90000000, progress: 60, status: 'ongoing', category: 'Lingkungan', image_url: 'https://picsum.photos/seed/proj5/800/400', start_date: '2026-02-01', end_date: '2026-04-30', contractor: 'CV Hijau Lestari' },
];

// ---- LOCAL JOBS ----
export type Job = {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'full_time' | 'part_time' | 'freelance' | 'volunteer';
  salary_range?: string;
  requirements: string[];
  phone_number: string;
  deadline: string;
  created_at: string;
  category: string;
};

export const dummyJobs: Job[] = [
  { id: 'job1', title: 'Operator Mesin CNC Kayu', description: 'Dicari operator mesin CNC pengolah kayu untuk industri furniture rumahan. Shift pagi dan siang tersedia.', company: 'UD Karya Kayu Nusantara', location: 'RW 04, Desa', type: 'full_time', salary_range: 'Rp 2.500.000 – Rp 3.500.000', requirements: ['Minimal SMP/Sederajat', 'Teliti dan tekun', 'Diutamakan berpengalaman', 'Domisili desa setempat'], phone_number: '6281234567890', deadline: '2026-04-15', created_at: '2026-03-18T09:00:00Z', category: 'Industri' },
  { id: 'job2', title: 'Petugas Kebersihan Desa (Kontrak)', description: 'Pemerintah desa membuka lowongan petugas kebersihan jalan dan fasilitas umum. Bekerja 5 hari seminggu dengan asuransi kesehatan.', company: 'Pemerintah Desa', location: 'Seluruh Wilayah Desa', type: 'full_time', salary_range: 'Rp 1.800.000 – Rp 2.200.000', requirements: ['Minimal SD/Sederajat', 'Sehat jasmani dan rohani', 'Warga desa setempat'], phone_number: '6282345678901', deadline: '2026-04-10', created_at: '2026-03-20T10:00:00Z', category: 'Pemerintah' },
  { id: 'job3', title: 'Admin Media Sosial UMKM Lokal', description: 'Dibutuhkan admin media sosial (Instagram, TikTok, WhatsApp Business) untuk mengelola konten promosi produk UMKM desa. Bisa kerja remote.', company: 'Koperasi UMKM Desa Maju', location: 'Remote / Desa', type: 'part_time', salary_range: 'Rp 800.000 – Rp 1.500.000/bulan', requirements: ['Minimal SMA/Sederajat', 'Mahir media sosial', 'Kreatif'], phone_number: '6283456789012', deadline: '2026-04-20', created_at: '2026-03-21T14:00:00Z', category: 'Digital' },
  { id: 'job4', title: 'Petani Mitra (Sistem Bagi Hasil)', description: 'Kelompok tani membuka kemitraan pertanian padi organik sistem bagi hasil 60:40. Lahan tersedia 2 hektar, bibit dan pupuk disediakan.', company: 'Kelompok Tani Subur Makmur', location: 'Lahan Pertanian Desa Blok B', type: 'freelance', salary_range: 'Bagi hasil panen', requirements: ['Berpengalaman bertani', 'Bersedia kerja keras'], phone_number: '6284567890123', deadline: '2026-04-01', created_at: '2026-03-15T08:00:00Z', category: 'Pertanian' },
  { id: 'job5', title: 'Guru TPA / Pengajar Al-Quran Anak', description: 'Dicari pengajar TPA untuk kelas anak usia 5-12 tahun. Mengajar 3x seminggu sore hari. Ada tunjangan transport.', company: 'Masjid Al-Hidayah RT 05', location: 'Masjid Al-Hidayah, RT 05', type: 'volunteer', salary_range: 'Infaq & Tunjangan Transport', requirements: ['Bisa baca Al-Quran', 'Sabar dan suka anak-anak'], phone_number: '6285678901234', deadline: '2026-04-30', created_at: '2026-03-19T16:00:00Z', category: 'Pendidikan' },
];

// ---- EDUCATION & TRAINING MODULES ----
export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  duration_minutes: number;
  image_url: string;
  instructor: string;
  lessons: { title: string; duration: number }[];
  enrolled: number;
  rating: number;
  created_at: string;
};

export const dummyModules: TrainingModule[] = [
  { id: 'mod1', title: 'Digital Marketing untuk UMKM Desa', description: 'Pelajari cara memasarkan produk UMKM Anda secara online menggunakan Instagram, Facebook, dan WhatsApp Business. Dari nol hingga mahir.', category: 'Bisnis & Marketing', level: 'Pemula', duration_minutes: 240, image_url: 'https://picsum.photos/seed/mod1/600/400', instructor: 'Mas Rizky (Digital Marketer)', lessons: [{ title: 'Mengenal Platform Digital Marketing', duration: 30 }, { title: 'Membuat Konten Menarik dengan HP', duration: 45 }, { title: 'Strategi Copywriting untuk Jualan', duration: 40 }, { title: 'Menjalankan WhatsApp Business', duration: 35 }, { title: 'Analisis & Evaluasi Performa', duration: 50 }], enrolled: 147, rating: 4.8, created_at: '2026-03-01T09:00:00Z' },
  { id: 'mod2', title: 'Budidaya Sayuran Organik di Pekarangan', description: 'Panduan lengkap menanam sayuran organik di lahan pekarangan rumah. Cocok untuk ibu rumah tangga yang ingin berhemat dan hidup sehat.', category: 'Pertanian', level: 'Pemula', duration_minutes: 180, image_url: 'https://picsum.photos/seed/mod2/600/400', instructor: 'Pak Wahyu (Penyuluh Pertanian)', lessons: [{ title: 'Persiapan Lahan dan Media Tanam', duration: 30 }, { title: 'Pemilihan Bibit Berkualitas', duration: 25 }, { title: 'Teknik Penyiraman dan Pupuk Organik', duration: 40 }, { title: 'Pengendalian Hama Alami', duration: 35 }, { title: 'Panen dan Pasca Panen', duration: 30 }], enrolled: 89, rating: 4.6, created_at: '2026-03-05T10:00:00Z' },
  { id: 'mod3', title: 'Pengolahan Sampah Menjadi Pupuk Kompos', description: 'Teknik mengolah sampah dapur dan kebun menjadi pupuk kompos berkualitas. Hemat pengeluaran dan bisa jadi peluang usaha.', category: 'Lingkungan', level: 'Pemula', duration_minutes: 150, image_url: 'https://picsum.photos/seed/mod3/600/400', instructor: 'Ibu Sari (Aktivis Lingkungan)', lessons: [{ title: 'Mengenal Jenis Sampah Organik', duration: 20 }, { title: 'Membuat Komposter Sederhana', duration: 35 }, { title: 'Proses Fermentasi Sampah', duration: 40 }, { title: 'Menggunakan Kompos untuk Tanaman', duration: 30 }, { title: 'Peluang Usaha Kompos', duration: 25 }], enrolled: 63, rating: 4.5, created_at: '2026-03-08T11:00:00Z' },
  { id: 'mod4', title: 'Keuangan Keluarga: Menabung & Investasi Dasar', description: 'Kelola keuangan keluarga dengan bijak. Pelajari cara membuat anggaran bulanan, strategi menabung, dan pengenalan investasi sederhana.', category: 'Keuangan', level: 'Menengah', duration_minutes: 210, image_url: 'https://picsum.photos/seed/mod4/600/400', instructor: 'Bapak Hendra (Konsultan Keuangan)', lessons: [{ title: 'Audit Keuangan Keluarga', duration: 35 }, { title: 'Membuat Anggaran 50/30/20', duration: 40 }, { title: 'Strategi Menabung Rutin', duration: 30 }, { title: 'Mengenal Koperasi dan Arisan', duration: 35 }, { title: 'Investasi Emas dan Reksa Dana', duration: 40 }, { title: 'Asuransi Mikro untuk Keluarga', duration: 30 }], enrolled: 112, rating: 4.9, created_at: '2026-03-10T09:00:00Z' },
  { id: 'mod5', title: 'Pertolongan Pertama & Tanggap Darurat', description: 'Pelajari teknik P3K, CPR, dan cara evakuasi saat bencana. Ilmu yang bisa menyelamatkan nyawa.', category: 'Kesehatan & Keselamatan', level: 'Menengah', duration_minutes: 195, image_url: 'https://picsum.photos/seed/mod5/600/400', instructor: 'dr. Andi (Dokter Puskesmas)', lessons: [{ title: 'Prinsip Dasar P3K', duration: 30 }, { title: 'Teknik CPR dan AED', duration: 45 }, { title: 'Penanganan Luka dan Patah Tulang', duration: 40 }, { title: 'Pertolongan Saat Bencana', duration: 35 }, { title: 'Evakuasi dan Titik Kumpul', duration: 25 }, { title: 'Kotak P3K Rumah Tangga', duration: 20 }], enrolled: 78, rating: 4.9, created_at: '2026-03-12T10:00:00Z' },
  { id: 'mod6', title: 'Kerajinan Tangan dari Bahan Daur Ulang', description: 'Ubah sampah plastik dan kertas bekas menjadi produk kerajinan bernilai jual tinggi. Cocok untuk ibu-ibu PKK.', category: 'Kerajinan & Seni', level: 'Pemula', duration_minutes: 165, image_url: 'https://picsum.photos/seed/mod6/600/400', instructor: 'Ibu Kartini (Pengrajin Senior)', lessons: [{ title: 'Teknik Mengolah Plastik Bekas', duration: 35 }, { title: 'Membuat Vas Bunga dari Botol', duration: 30 }, { title: 'Kerajinan Kertas dan Kardus', duration: 40 }, { title: 'Finishing dan Packaging', duration: 30 }, { title: 'Menjual Kerajinan Online', duration: 30 }], enrolled: 54, rating: 4.4, created_at: '2026-03-14T11:00:00Z' },
];

// ---- VILLAGE HEALTH SCORE ----
export type HealthScore = {
  overall: number;
  grade: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Perhatian' | 'Kritis';
  metrics: { cleanliness: number; infrastructure: number; safety: number; health: number; economy: number; community: number; };
  trend: 'naik' | 'turun' | 'stabil';
  ai_narrative: string;
  last_updated: string;
};

export const dummyHealthScore: HealthScore = {
  overall: 72,
  grade: 'Baik',
  metrics: { cleanliness: 65, infrastructure: 70, safety: 78, health: 80, economy: 68, community: 85 },
  trend: 'naik',
  ai_narrative: 'Desa menunjukkan perkembangan positif secara keseluruhan. Aspek komunitas dan kesehatan menjadi kekuatan utama dengan skor di atas rata-rata. Namun kebersihan lingkungan dan infrastruktur masih memerlukan perhatian khusus — terutama penanganan sampah di RW 05 dan perbaikan drainase yang belum tuntas. Rekomendasi prioritas: percepat program pengolahan sampah terpadu dan jadwalkan perbaikan jalan di RT 02.',
  last_updated: '2026-03-22T00:00:00Z',
};

// ---- AI PREDICTIONS ----
export type AIPrediction = {
  id: string;
  category: string;
  risk_level: 'Tinggi' | 'Sedang' | 'Rendah';
  confidence: number;
  title: string;
  description: string;
  recommendation: string;
  icon: string;
};

export const dummyPredictions: AIPrediction[] = [
  { id: 'pred1', category: 'Infrastruktur', risk_level: 'Tinggi', confidence: 87, title: 'Potensi Kerusakan Jalan Meningkat', description: 'Berdasarkan laporan 6 bulan terakhir, tren kerusakan jalan di RT 01-03 meningkat 40% setiap musim hujan. Perkiraan 5-8 titik kerusakan baru dalam 30 hari ke depan.', recommendation: 'Lakukan survey dan patching preventif di RT 01-03 sebelum puncak musim hujan. Alokasikan anggaran darurat Rp 85 juta.', icon: '🏗️' },
  { id: 'pred2', category: 'Sampah', risk_level: 'Tinggi', confidence: 79, title: 'Risiko Penumpukan Sampah RW 05', description: 'Pola laporan sampah di RW 05 menunjukkan siklus penumpukan 14-21 hari. TPS sementara sudah over-kapasitas 120%. Risiko sanitasi meningkat.', recommendation: 'Jadwalkan pengangkutan sampah tambahan 2x seminggu di RW 05. Aktifkan program pemilahan sampah.', icon: '🗑️' },
  { id: 'pred3', category: 'Bencana', risk_level: 'Sedang', confidence: 65, title: 'Potensi Genangan Banjir Lokal', description: 'Saluran drainase RW 03 dan RW 05 yang tersumbat berpotensi menyebabkan genangan 30-60cm jika curah hujan melebihi 50mm/hari.', recommendation: 'Prioritaskan pembersihan drainase sebelum hujan lebat. Siapkan tim pompa air.', icon: '🌊' },
  { id: 'pred4', category: 'Kesehatan', risk_level: 'Sedang', confidence: 72, title: 'Risiko Peningkatan Kasus DBD', description: 'Kombinasi musim hujan dan laporan sampah tertunda menciptakan kondisi ideal berkembangnya nyamuk Aedes. Prediksi peningkatan kasus DBD 30% bulan April.', recommendation: 'Lakukan fogging dan kampanye 3M masif di seluruh RW mulai minggu ini.', icon: '🏥' },
  { id: 'pred5', category: 'Ekonomi', risk_level: 'Rendah', confidence: 58, title: 'Peluang Pertumbuhan UMKM', description: 'Data aktivitas marketplace menunjukkan peningkatan permintaan produk makanan lokal 25% dalam 2 bulan terakhir. Musim lebaran menjadi katalis.', recommendation: 'Adakan pelatihan packaging dan marketing untuk UMKM makanan. Buka program modal kerja koperasi.', icon: '📈' },
];

// ---- REPORT STATUS HISTORY ----
export type ReportHistory = {
  id: string;
  report_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  note: string;
  changed_by: string;
  created_at: string;
};

export const dummyReportHistory: ReportHistory[] = [
  { id: 'rh1', report_id: '1', status: 'pending', note: 'Laporan baru diterima oleh sistem. Menunggu verifikasi admin.', changed_by: 'Sistem', created_at: '2026-03-15T08:30:00Z' },
  { id: 'rh2', report_id: '1', status: 'in_progress', note: 'Laporan terverifikasi. Tim teknis dijadwalkan survei lapangan pada 18 Maret 2026.', changed_by: 'Admin Desa', created_at: '2026-03-16T09:00:00Z' },
];

// ---- DIGITAL NOTICE BOARD (PENGUMUMAN) ----
export type Announcement = {
  id: string;
  title: string;
  category: 'Kesehatan' | 'Pemerintahan' | 'Umum' | 'Sosial';
  content: string;
  date: string;
  is_important: boolean;
};

export const dummyAnnouncements: Announcement[] = [
  { id: 'ann1', title: 'Jadwal Vaksinasi Polio Serentak', category: 'Kesehatan', content: 'Diwajibkan bagi seluruh warga yang memiliki balita usia 0-5 tahun untuk hadir di Balai Desa pada hari Sabtu, 28 Maret 2026 mulai pukul 08:00 WIB untuk mendapatkan vaksinasi polio gratis.', date: '2026-03-25T08:00:00Z', is_important: true },
  { id: 'ann2', title: 'Rapat Musyawarah Perencanaan Pembangunan (Musrenbang) Desa', category: 'Pemerintahan', content: 'Mengundang seluruh Ketua RT, Ketua RW, dan Tokoh Masyarakat untuk hadir dalam Musrenbang Desa penetapan RKPDesa Tahun 2027 pada hari Selasa, 31 Maret 2026.', date: '2026-03-24T10:00:00Z', is_important: true },
  { id: 'ann3', title: 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Bulan Maret', category: 'Sosial', content: 'Penyaluran BLT Dana Desa tahap 3 akan dilaksanakan hari Kamis, 26 Maret 2026. Kepada nama-nama yang terdaftar harap membawa fotokopi KTP dan KK terbaru.', date: '2026-03-22T09:30:00Z', is_important: false },
  { id: 'ann4', title: 'Kerja Bakti Massal Menyambut Bulan Suci Ramadhan', category: 'Umum', content: 'Dihimbau kepada seluruh warga untuk melaksanakan kerja bakti serentak membersihkan lingkungan, masjid, dan mushola di wilayah RT masing-masing hari Minggu pagi.', date: '2026-03-20T14:00:00Z', is_important: false },
  { id: 'ann5', title: 'Layanan Pembuatan KTP Keliling dari Disdukcapil', category: 'Pemerintahan', content: 'Mobil layanan keliling Disdukcapil Kabupaten akan standby di lapangan desa pada hari Jumat, 27 Maret 2026. Melayani perekaman KTP elektronik baru dan perbaikan data KK.', date: '2026-03-19T11:00:00Z', is_important: false },
];

// ---- GALLERY (GALERI KEGIATAN DESA) ----
export type GalleryItem = {
  id: string;
  title: string;
  category: 'PKK' | 'Karang Taruna' | 'Posyandu' | 'Kerja Bakti' | 'Lainnya';
  date: string;
  image_url: string;
};

export const dummyGallery: GalleryItem[] = [
  { id: 'gal1', title: 'Lomba Tumpeng Ibu-ibu PKK', category: 'PKK', date: '2026-02-15', image_url: 'https://picsum.photos/seed/gal1/800/600' },
  { id: 'gal2', title: 'Turnamen Futsal Antar RW', category: 'Karang Taruna', date: '2026-02-28', image_url: 'https://picsum.photos/seed/gal2/800/600' },
  { id: 'gal3', title: 'Penimbangan Balita Ceria', category: 'Posyandu', date: '2026-03-05', image_url: 'https://picsum.photos/seed/gal3/800/600' },
  { id: 'gal4', title: 'Kerja Bakti Bersihkan Sungai', category: 'Kerja Bakti', date: '2026-03-12', image_url: 'https://picsum.photos/seed/gal4/800/600' },
  { id: 'gal5', title: 'Pelatihan Membuat Kerajinan Daur Ulang', category: 'PKK', date: '2026-03-18', image_url: 'https://picsum.photos/seed/gal5/800/600' },
  { id: 'gal6', title: 'Peringatan Hari Kemerdekaan', category: 'Lainnya', date: '2025-08-17', image_url: 'https://picsum.photos/seed/gal6/800/600' },
  { id: 'gal7', title: 'Pemilihan Ketua Pemuda', category: 'Karang Taruna', date: '2026-01-20', image_url: 'https://picsum.photos/seed/gal7/800/600' },
  { id: 'gal8', title: 'Penyuluhan Gizi Ibu Hamil', category: 'Posyandu', date: '2026-03-01', image_url: 'https://picsum.photos/seed/gal8/800/600' },
];

// ---- APBDesa (TRANSPARANSI ANGGARAN VISUAL) ----
export type APBDesProgram = {
  name: string;
  category: string;
  budget: number;
  status: 'Selesai' | 'Berjalan' | 'Direncanakan';
};

export type APBDesa = {
  year: number;
  total_budget: number;
  realized: number;
  allocations: { category: string; amount: number; color: string }[];
  programs: APBDesProgram[];
};

export const dummyAPBDesa: APBDesa = {
  year: 2026,
  total_budget: 1250000000, // 1.25M
  realized: 450000000,      // 450 Jt
  allocations: [
    { category: 'Penyelenggaraan Pemerintahan', amount: 350000000, color: 'bg-blue-500' },
    { category: 'Pembangunan Desa (Infrastruktur)', amount: 500000000, color: 'bg-orange-500' },
    { category: 'Pembinaan Kemasyarakatan', amount: 150000000, color: 'bg-green-500' },
    { category: 'Pemberdayaan Masyarakat', amount: 200000000, color: 'bg-purple-500' },
    { category: 'Penanggulangan Bencana', amount: 50000000, color: 'bg-red-500' },
  ],
  programs: [
    { name: 'Pelebaran Jalan Utama Desa', category: 'Pembangunan Desa', budget: 150000000, status: 'Berjalan' },
    { name: 'Pembangunan Posyandu Terpadu RT 03', category: 'Pembangunan Desa', budget: 85000000, status: 'Selesai' },
    { name: 'Insentif RT/RW dan Kader Posyandu', category: 'Penyelenggaraan Pemerintahan', budget: 120000000, status: 'Berjalan' },
    { name: 'Bantuan Langsung Tunai (BLT) Dana Desa', category: 'Pembinaan Kemasyarakatan', budget: 75000000, status: 'Berjalan' },
    { name: 'Pelatihan Kewirausahaan UMKM', category: 'Pemberdayaan Masyarakat', budget: 45000000, status: 'Selesai' },
    { name: 'Pengadaan Bibit Tanaman Obat Desa', category: 'Pemberdayaan Masyarakat', budget: 25000000, status: 'Direncanakan' },
    { name: 'Pembangunan Saluran Irigasi Tersier', category: 'Pembangunan Desa', budget: 165000000, status: 'Direncanakan' },
  ],
};
