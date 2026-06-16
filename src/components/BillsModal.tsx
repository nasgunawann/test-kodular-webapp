import { useState } from 'react';
import { X, Check, CreditCard, DollarSign, Download, AlertTriangle, Calendar, Activity } from 'lucide-react';
import { Bill } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bills: Bill[];
  onPayBill: (billId: string) => void;
  idPelanggan: string;
}

export default function BillsModal({
  isOpen,
  onClose,
  bills,
  onPayBill,
  idPelanggan
}: BillsModalProps) {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const unpaidBills = bills.filter(b => !b.isPaid);
  const paidBills = bills.filter(b => b.isPaid);

  const startPayment = (bill: Bill) => {
    setSelectedBill(bill);
    setPaymentMethod('gopay');
    setPaymentSuccess(false);
  };

  const executePayment = () => {
    if (!selectedBill) return;
    setIsPaying(true);
    setTimeout(() => {
      onPayBill(selectedBill.id);
      setIsPaying(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 mx-auto max-w-md bg-black/50 backdrop-blur-xs flex items-end justify-center">
        {/* Backdrop clickable if not actively in checkout loader */}
        {!isPaying && <div className="absolute inset-0" onClick={onClose} />}

        <motion.div
          id="bills-modal-panel"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 210 }}
          className="relative w-full max-h-[90vh] bg-slate-50 rounded-t-2xl shadow-xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </span>
              <h2 className="text-base font-bold text-slate-800">Tagihan Saya</h2>
            </div>
            
            <button
              id="btn-close-bills"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 no-scrollbar space-y-6">
            
            {/* Usage Progress Chart Card */}
            <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 bg-primary rounded-full" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Grafik Penggunaan Air</h3>
              </div>

              {/* Progress bars representing m³ consumption */}
              <div className="flex justify-between items-end h-32 pt-4 pb-2 border-b border-dashed border-slate-200">
                {bills.slice().reverse().map((bill, idx) => {
                  const maxUsage = 30; // for scaling
                  const pct = Math.min((bill.usage / maxUsage) * 100, 100);
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 group">
                      <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                        {bill.usage} m³
                      </span>
                      <div className="w-7 bg-slate-100 rounded-t-lg overflow-hidden h-20 flex items-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${pct}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.8 }}
                          className={`w-full rounded-t-md transition-all ${
                            bill.isPaid 
                              ? 'bg-gradient-to-t from-primary/80 to-primary-container' 
                              : 'bg-gradient-to-t from-red-400 to-red-500'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 mt-2 select-none">
                        {bill.month.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 mt-3 text-[10px] font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                  <span>Lunas (Paid)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                  <span>Belum Dibayar (Unpaid)</span>
                </div>
              </div>
            </div>

            {/* Outstanding Bills */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                Belum Dibayarkan
              </h3>
              {unpaidBills.length === 0 ? (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 text-white rounded-full">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800">Semua Tagihan Lunas</h4>
                    <p className="text-xs text-emerald-700/80 mt-0.5">Terima kasih atas kedisiplinan pembayaran Anda.</p>
                  </div>
                </div>
              ) : (
                unpaidBills.map((bill) => (
                  <div key={bill.id} className="bg-white rounded-xl border border-red-100 hover:border-red-200 transition-colors shadow-xs p-4 flex flex-col space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{bill.month}</span>
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                            TIDAK LUNAS
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">ID: {bill.id} • Penggunaan: {bill.usage} m³</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-extrabold text-red-600">Rp {(bill.amount).toLocaleString('id-ID')}</p>
                      </div>
                    </div>

                    <button
                      id={`btn-pay-${bill.id}`}
                      onClick={() => startPayment(bill)}
                      className="w-full bg-primary hover:bg-primary-container text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      Bayar Sekarang
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Paid Statement History */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                Riwayat Pembayaran
              </h3>
              <div className="space-y-2.5">
                {paidBills.map(bill => (
                  <div key={bill.id} className="bg-white rounded-xl border border-slate-100 p-4 shadow-3xs flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{bill.month}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded-full">
                          LUNAS
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Penggunaan: {bill.usage} m³ • Dibayar pada {bill.paymentDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-slate-800">Rp {bill.amount.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Outer simulated payment screen drawer layer */}
        <AnimatePresence>
          {selectedBill && (
            <motion.div
              id="payment-checkout-drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              className="absolute inset-0 bg-white z-50 flex flex-col"
            >
              {paymentSuccess ? (
                // Success screen
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-10 h-10 animate-scale-up" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Pembayaran Berhasil!</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">
                    Tagihan PDAM Tirtanadi bulan {selectedBill.month} sebesar Rp {selectedBill.amount.toLocaleString('id-ID')} telah lunas.
                  </p>

                  <div className="w-full bg-slate-50 rounded-xl p-4 my-6 text-left border border-slate-100 text-xs text-slate-600 space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">ID Pelanggan:</span><span className="font-semibold text-slate-800">{idPelanggan}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">No. Transaksi:</span><span className="font-mono font-semibold text-slate-800">TRX-{Math.floor(10000000 + Math.random() * 90000000)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Metode Pembayaran:</span><span className="font-semibold text-slate-800 uppercase">{paymentMethod}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Total Dibayar:</span><span className="font-bold text-primary">Rp {selectedBill.amount.toLocaleString('id-ID')}</span></div>
                  </div>

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => {
                        setSelectedBill(null);
                        setPaymentSuccess(false);
                      }}
                      className="flex-1 bg-slate-100 text-slate-800 text-xs font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Selesai
                    </button>
                    <button
                      onClick={() => alert('Simulator: Resi digital diunduh ke bentuk PDF')}
                      className="flex-1 bg-primary text-white text-xs font-bold py-3 rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Simpan Resi
                    </button>
                  </div>
                </div>
              ) : (
                // Checkout Panel
                <div className="flex-1 flex flex-col">
                  {/* Checkout Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-primary" />
                      Konfirmasi Pembayaran
                    </h3>
                    <button 
                      onClick={() => setSelectedBill(null)} 
                      disabled={isPaying} 
                      className="p-1 hover:bg-slate-100 rounded-full"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  {/* Checkout Body */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-5">
                    {/* Bill detail card */}
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Jumlah Tagihan</p>
                      <h4 className="text-xl font-extrabold text-primary mt-1">Rp {selectedBill.amount.toLocaleString('id-ID')}</h4>
                      <div className="mt-3 text-xs text-slate-600 flex justify-between border-t border-primary/10 pt-2">
                        <span>Tagihan {selectedBill.month}</span>
                        <span className="font-medium text-slate-800">{selectedBill.usage} m³ ({idPelanggan})</span>
                      </div>
                    </div>

                    {/* Method Selector */}
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-0.5">
                        Pilih Metode Pembayaran
                      </h4>
                      <div className="space-y-2">
                        {[
                          { id: 'gopay', name: 'GoPay / QRIS Spark', desc: 'Bayar instan divalidasi langsung' },
                          { id: 'bca', name: 'BCA Virtual Account', desc: 'Transfer via m-BCA / KlikBCA' },
                          { id: 'mandiri', name: 'Mandiri Virtual Account', desc: 'Transfer via Livin\' by Mandiri' },
                          { id: 'ovo', name: 'OVO Wallet', desc: 'Bayar dengan saldo OVO' }
                        ].map(m => (
                          <label 
                            key={m.id}
                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              paymentMethod === m.id 
                                ? 'bg-primary/5 border-primary shadow-3xs' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input 
                                type="radio" 
                                name="payment_method" 
                                value={m.id}
                                checked={paymentMethod === m.id}
                                onChange={() => setPaymentMethod(m.id)}
                                className="mt-1 text-primary focus:ring-primary focus:ring-offset-0"
                              />
                              <div>
                                <span className="text-xs font-bold text-slate-800 block capitalize">{m.name}</span>
                                <span className="text-[11px] text-slate-500 mt-0.5 block">{m.desc}</span>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex gap-2.5 text-[11px] text-amber-700 leading-relaxed">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <span>Pembayaran ini disimulasikan secara aman tanpa membebankan kartu kredit riil atau e-wallet Anda.</span>
                    </div>
                  </div>

                  {/* Checkout Footer Action */}
                  <div className="p-5 border-t border-slate-100 bg-slate-50">
                    <button
                      id="btn-process-payment"
                      onClick={executePayment}
                      disabled={isPaying}
                      className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-slate-300"
                    >
                      {isPaying ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Memproses Transaksi...
                        </>
                      ) : (
                        `Bayar Rp ${selectedBill.amount.toLocaleString('id-ID')}`
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
