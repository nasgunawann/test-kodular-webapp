export type SubmissionStatus = 'SEDANG DIPROSES' | 'SURVEY LOKASI' | 'SELESAI' | 'DIBATALKAN';

export interface TimelineStep {
  title: string;
  subtitle: string;
  time?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Submission {
  id: string; // registration number, e.g. REG-20231025-0042
  type: string; // "Pasang Baru" | "Pasang Meter" | "Perubahan Golongan" | "Laporan Kebocoran"
  subType: string; // e.g. "Medan Kota" or "Rumah Tangga"
  name: string;
  nik: string;
  phone: string;
  description: string;
  status: SubmissionStatus;
  updateTime: string;
  createdAt: string;
  currentStep: number; // 0-indexed step from 0 to 3
  steps: TimelineStep[];
}

export interface UserProfile {
  idPelanggan: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string; // image path or dataURL
}

export interface Bill {
  id: string;
  month: string;
  usage: number; // in m³
  amount: number; // in Rp
  isPaid: boolean;
  paymentDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}
