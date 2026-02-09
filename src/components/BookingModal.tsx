
'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, Users, Minus, Plus } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import 'react-day-picker/dist/style.css';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealTitle: string;
  price?: number;
  image?: string;
}

const timeSlots = [
  "10:00", "11:00", "12:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

export function BookingModal({ isOpen, onClose, dealTitle, price = 0, image = '' }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [tickets, setTickets] = useState({ adult: 1, child: 0, senior: 0 });
  const router = useRouter();
  const t = useTranslations('Booking');

  const updateTicket = (type: keyof typeof tickets, delta: number) => {
    setTickets(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const isWeekend = useMemo(() => {
    if (!selectedDate) return false;
    const day = selectedDate.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  }, [selectedDate]);

  const currentPrice = useMemo(() => {
    return isWeekend ? price * 1.15 : price;
  }, [isWeekend, price]);

  const totalPrice = useMemo(() => {
    // Basic pricing logic: Child 50%, Senior 80% of base price
    return (tickets.adult * currentPrice) + 
           (tickets.child * currentPrice * 0.5) + 
           (tickets.senior * currentPrice * 0.8);
  }, [tickets, currentPrice]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime && (tickets.adult + tickets.child + tickets.senior > 0)) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const ticketQuery = `adult=${tickets.adult}&child=${tickets.child}&senior=${tickets.senior}`;
      const imageQuery = image ? `&image=${encodeURIComponent(image)}` : '';
      router.push(`/checkout?deal=${encodeURIComponent(dealTitle)}&date=${dateStr}&time=${selectedTime}&${ticketQuery}&total=${totalPrice.toFixed(2)}${imageQuery}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto flex flex-col md:flex-row">
              {/* Left Side: Calendar */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <CalendarIcon className="text-tripper-pink w-5 h-5" />
                    {t('selectDate')}
                  </h3>
                </div>
                <div className="flex justify-center">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{ before: new Date() }}
                    modifiersClassNames={{
                      selected: 'bg-tripper-pink text-white hover:bg-tripper-pink-hover',
                      today: 'text-tripper-pink font-bold'
                    }}
                    styles={{
                        head_cell: { width: '40px', color: '#6b7280' },
                        cell: { width: '40px' },
                        day: { width: '40px', height: '40px', borderRadius: '8px' }
                    }}
                  />
                </div>
              </div>

              {/* Middle: Time & Tickets */}
              <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
                 <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                    <Clock className="text-tripper-pink w-5 h-5" />
                    {t('selectTime')}
                 </h3>
                 <div className="grid grid-cols-3 gap-2 mb-8">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                        selectedTime === time
                          ? "bg-tripper-pink text-white border-tripper-pink"
                          : "bg-white text-gray-700 border-gray-200 hover:border-tripper-pink hover:text-tripper-pink"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                    <Users className="text-tripper-pink w-5 h-5" />
                    {t('selectTickets')}
                 </h3>
                 <div className="space-y-4">
                    {/* Adult */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">{t('adult')}</span>
                            <span className="text-xs text-gray-500">
                              € {currentPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => updateTicket('adult', -1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Minus size={16} /></button>
                            <span className="w-4 text-center font-medium">{tickets.adult}</span>
                            <button onClick={() => updateTicket('adult', 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Plus size={16} /></button>
                        </div>
                    </div>
                     {/* Child */}
                     <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">{t('child')}</span>
                            <span className="text-xs text-gray-500">€ {(currentPrice * 0.5).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => updateTicket('child', -1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Minus size={16} /></button>
                            <span className="w-4 text-center font-medium">{tickets.child}</span>
                            <button onClick={() => updateTicket('child', 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Plus size={16} /></button>
                        </div>
                    </div>
                     {/* Senior */}
                     <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">{t('senior')}</span>
                            <span className="text-xs text-gray-500">€ {(currentPrice * 0.8).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => updateTicket('senior', -1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Minus size={16} /></button>
                            <span className="w-4 text-center font-medium">{tickets.senior}</span>
                            <button onClick={() => updateTicket('senior', 1)} className="p-1 rounded-full hover:bg-gray-100 text-gray-500"><Plus size={16} /></button>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Right Side: Summary */}
              <div className="p-6 w-full md:w-64 flex flex-col bg-gray-50">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 pr-4">
                        <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">{dealTitle}</h4>
                        <p className="text-xs text-gray-500">Tripper Deal</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">{t('date')}:</span>
                        <span className="font-medium">{selectedDate ? format(selectedDate, 'dd MMM') : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">{t('time')}:</span>
                        <span className="font-medium">{selectedTime || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">{t('tickets')}:</span>
                        <span className="font-medium">{tickets.adult + tickets.child + tickets.senior}</span>
                    </div>
                     <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                        <span>{t('total')}:</span>
                        <span className="text-tripper-pink">€ {totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime || (tickets.adult + tickets.child + tickets.senior === 0)}
                    className="w-full bg-tripper-pink text-white py-3 rounded-lg font-bold hover:bg-tripper-pink-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-tripper-pink/20"
                  >
                    {t('confirm')}
                  </button>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                      {t('service.terms')} | Trippa.nl
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
