import { UserProfile, Submission, Bill, Notification } from '../types';

const INITIAL_PROFILE: UserProfile = {
  idPelanggan: '0012983445',
  name: 'Ahmad Ridwan',
  email: 'ahmad.ridwan@email.com',
  phone: '+62 812 3456 7890',
  address: 'Jl. Sisingamangaraja No. 1, Medan, Sumatera Utara',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJuy5kX4-itDOupc_fyEBR_JLuyVCKxhbpvcwY7Q94MMm0O-5E3l18j3EM4L1YYE--DEAdCEMQZoSF4nxALhD8HOT1TPbrJXTkyflCBCFLTFCrpc2H1sAgxeAGeIyYawO9-JM1qPJXYtAVHYAs9-OV53jDjsURq3xUMxEZXFy57ugSkjLjamvdjiwvjtJEmawZ4lQYnbaOX0m34IGBStLuD3_rNK5_2CzyJhnRyWGugA2yNzsbQVXsUZiPNVOUytqynGZq2cpoWFJ-'
};

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'REG-20231025-0042',
    type: 'Pasang Baru',
    subType: 'Medan Kota',
    name: 'Ahmad Ridwan',
    nik: '1203045607730005',
    phone: '+62 812 3456 7890',
    description: 'Pemasangan sambungan meteran air baru untuk ruko atau hunian komersial baru di daerah Medan Kota.',
    status: 'SURVEY LOKASI',
    updateTime: '2 jam yang lalu',
    createdAt: '25 Okt 2023',
    currentStep: 2,
    steps: [
      {
        title: 'Pendaftaran Berhasil',
        subtitle: 'Dokumen persyaratan telah diterima sistem.',
        time: '25 Okt 2023, 09:15 WIB',
        status: 'completed'
      },
      {
        title: 'Verifikasi Dokumen',
        subtitle: 'Dokumen administrasi dinyatakan valid.',
        time: '26 Okt 2023, 14:30 WIB',
        status: 'completed'
      },
      {
        title: 'Survey Lokasi',
        subtitle: 'Sedang Berjalan. Petugas survey dijadwalkan berkunjung ke lokasi pada tanggal 28 Okt 2023 estimasi pukul 10:00 WIB.',
        status: 'current'
      },
      {
        title: 'Pemasangan Meteran',
        subtitle: 'Menunggu survey selesai',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'REG-20230512-0012',
    type: 'Sambung Baru',
    subType: 'Rumah Tangga',
    name: 'Ahmad Ridwan',
    nik: '1203045607730005',
    phone: '+62 812 3456 7890',
    description: 'Pemasangan sambungan baru saluran air bersih bersih kategori rumah tangga standar.',
    status: 'SELESAI',
    updateTime: '12 Mei 2023',
    createdAt: '12 Mei 2023',
    currentStep: 3,
    steps: [
      { title: 'Pendaftaran Berhasil', subtitle: 'Pendaftaran terverifikasi.', time: '10 Mei 2023', status: 'completed' },
      { title: 'Verifikasi Dokumen', subtitle: 'Verifikasi sukses.', time: '11 Mei 2023', status: 'completed' },
      { title: 'Survey Lokasi', subtitle: 'Survey lapangan selesai.', time: '11 Mei 2023', status: 'completed' },
      { title: 'Pemasangan Meteran', subtitle: 'Selesai dipasang dan dialiri air.', time: '12 Mei 2023', status: 'completed' }
    ]
  },
  {
    id: 'REG-20221102-0881',
    type: 'Perubahan Golongan',
    subType: 'Urusan Bisnis',
    name: 'Ahmad Ridwan',
    nik: '1203045607730005',
    phone: '+62 812 3456 7890',
    description: 'Permohonan berpindah golongan tarif dari rumah tangga ke ruko bisnis.',
    status: 'DIBATALKAN',
    updateTime: '02 Nov 2022',
    createdAt: '01 Nov 2022',
    currentStep: 1,
    steps: [
      { title: 'Pendaftaran Berhasil', subtitle: 'Pendaftaran diterima.', time: '01 Nov 2022', status: 'completed' },
      { title: 'Verifikasi Dokumen', subtitle: 'Dibatalkan oleh pemohon.', time: '02 Nov 2022', status: 'completed' },
      { title: 'Survey Lokasi', subtitle: 'Pembatalan permohonan.', status: 'upcoming' },
      { title: 'Pemasangan Meteran', subtitle: 'Proses dibatalkan.', status: 'upcoming' }
    ]
  },
  {
    id: 'REG-20220814-0421',
    type: 'Laporan Kebocoran Meteran',
    subType: 'Pipa Utama',
    name: 'Ahmad Ridwan',
    nik: '1203045607730005',
    phone: '+62 812 3456 7890',
    description: 'Terjadi kebocoran pipa utama depan pagar rumah sehingga air meluap terus-menerus.',
    status: 'SELESAI',
    updateTime: '14 Agt 2022',
    createdAt: '12 Agt 2022',
    currentStep: 3,
    steps: [
      { title: 'Pendaftaran Berhasil', subtitle: 'Laporan kebocoran luar.', time: '12 Agt 2022', status: 'completed' },
      { title: 'Verifikasi Dokumen', subtitle: 'Laporan divalidasi.', time: '13 Agt 2022', status: 'completed' },
      { title: 'Survey Lokasi', subtitle: 'Pengecekan teknisi.', time: '13 Agt 2022', status: 'completed' },
      { title: 'Pemasangan Meteran', subtitle: 'Pipa bocor selesai diperbaiki.', time: '14 Agt 2022', status: 'completed' }
    ]
  }
];

const INITIAL_BILLS: Bill[] = [
  {
    id: 'BILL-202606-001',
    month: 'Juni 2026',
    usage: 24, // m³
    amount: 144000, // Rp 144.000
    isPaid: false
  },
  {
    id: 'BILL-202605-001',
    month: 'Mei 2026',
    usage: 18,
    amount: 108000,
    isPaid: true,
    paymentDate: '04 Mei 2026'
  },
  {
    id: 'BILL-202604-001',
    month: 'April 2026',
    usage: 26,
    amount: 156000,
    isPaid: true,
    paymentDate: '03 Apr 2026'
  },
  {
    id: 'BILL-202603-001',
    month: 'Maret 2026',
    usage: 20,
    amount: 120000,
    isPaid: true,
    paymentDate: '05 Mar 2026'
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'NOTIF-001',
    title: 'Tagihan Air Terbit',
    message: 'Tagihan air bulan Juni 2026 sebesar Rp 144.000 telah terbit. Harap lakukan pembayaran sebelum jatuh tempo.',
    time: 'Hari ini, 08:00 WIB',
    isRead: false
  },
  {
    id: 'NOTIF-002',
    title: 'Jadwal Survey Lokasi',
    message: 'Halo Ahmad Ridwan, jadwal survey lokasi untuk registrasi REG-20231025-0042 dikonfirmasi pada 28 Oktober 2023 pukul 10:00 WIB.',
    time: 'Kemarin, 14:15 WIB',
    isRead: false
  },
  {
    id: 'NOTIF-003',
    title: 'Pendaftaran Berhasil',
    message: 'Akun Anda berhasil divalidasi. Selamat bergabung di aplikasi PDAM Tirtanadi Digital!',
    time: '2 minggu lalu',
    isRead: true
  }
];

const KEYS = {
  PROFILE: 'tirtanadi_profile',
  SUBMISSIONS: 'tirtanadi_submissions',
  BILLS: 'tirtanadi_bills',
  NOTIFICATIONS: 'tirtanadi_notifications',
  IS_LOGGED_IN: 'tirtanadi_logged_in'
};

export function getProfile(): UserProfile {
  const data = localStorage.getItem(KEYS.PROFILE);
  if (!data) {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
    return INITIAL_PROFILE;
  }
  return JSON.parse(data);
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function getSubmissions(): Submission[] {
  const data = localStorage.getItem(KEYS.SUBMISSIONS);
  if (!data) {
    localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    return INITIAL_SUBMISSIONS;
  }
  return JSON.parse(data);
}

export function saveSubmissions(submissions: Submission[]): void {
  localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions));
}

export function getBills(): Bill[] {
  const data = localStorage.getItem(KEYS.BILLS);
  if (!data) {
    localStorage.setItem(KEYS.BILLS, JSON.stringify(INITIAL_BILLS));
    return INITIAL_BILLS;
  }
  return JSON.parse(data);
}

export function saveBills(bills: Bill[]): void {
  localStorage.setItem(KEYS.BILLS, JSON.stringify(bills));
}

export function payBill(billId: string): Bill[] {
  const bills = getBills();
  const updated = bills.map(bill => {
    if (bill.id === billId) {
      const today = new Date();
      const formattedDate = `${today.getDate()} ${today.toLocaleString('id-ID', { month: 'short' })} ${today.getFullYear()}`;
      return {
        ...bill,
        isPaid: true,
        paymentDate: formattedDate
      };
    }
    return bill;
  });
  saveBills(updated);
  return updated;
}

export function getNotifications(): Notification[] {
  const data = localStorage.getItem(KEYS.NOTIFICATIONS);
  if (!data) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }
  return JSON.parse(data);
}

export function saveNotifications(notifications: Notification[]): void {
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
}

export function markNotificationAsRead(id: string): Notification[] {
  const notifs = getNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, isRead: true } : n);
  saveNotifications(updated);
  return updated;
}

export function markAllNotificationsAsRead(): Notification[] {
  const notifs = getNotifications();
  const updated = notifs.map(n => ({ ...n, isRead: true }));
  saveNotifications(updated);
  return updated;
}

export function getIsLoggedIn(): boolean {
  const data = localStorage.getItem(KEYS.IS_LOGGED_IN);
  // Default to logged in as Ahmad Ridwan so the user lands straight into the main app dashboard!
  // but can easily test log out.
  if (data === null) {
    localStorage.setItem(KEYS.IS_LOGGED_IN, 'false');
    return false;
  }
  return data === 'true';
}

export function setIsLoggedIn(state: boolean): void {
  localStorage.setItem(KEYS.IS_LOGGED_IN, String(state));
}

export function resetLocalStorage(): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(INITIAL_PROFILE));
  localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
  localStorage.setItem(KEYS.BILLS, JSON.stringify(INITIAL_BILLS));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  localStorage.setItem(KEYS.IS_LOGGED_IN, 'false');
}

export function initializeEmptyAccount(): void {
  const newProfile: UserProfile = {
    idPelanggan: '1234',
    name: 'Cindy Anggriani',
    email: 'cindyagrn04@email.com',
    phone: '',
    address: '',
    avatar: ''
  };
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(newProfile));
  localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify([]));
  localStorage.setItem(KEYS.BILLS, JSON.stringify([]));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify([
    {
      id: 'NOTIF-WELCOME',
      title: 'Selamat Datang!',
      message: 'Selamat bergabung di aplikasi PDAM Tirtanadi Digital. Silakan isi form pengajuan untuk memasang sambungan baru.',
      time: 'Baru saja',
      isRead: false
    }
  ]));
  localStorage.setItem(KEYS.IS_LOGGED_IN, 'true');
}
