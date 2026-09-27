import { useState, useEffect } from 'react';
import { NotificationSettings } from '../types';
import { RASHIFAL_DATA } from '../data/calendarData';
import { SUPPORTED_LANGUAGES } from '../data/localization';
import { Bell, BellOff, X, Check, Clock, Globe } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onSaveSettings: (settings: NotificationSettings) => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}: NotificationModalProps) {
  const [localSettings, setLocalSettings] = useState<NotificationSettings>(settings);
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const res = await Notification.requestPermission();
      setPermissionState(res);
      if (res === 'granted') {
        const updated = { ...localSettings, masterEnabled: true };
        setLocalSettings(updated);
        onSaveSettings(updated);
      }
    }
  };

  const handleToggleMaster = () => {
    const nextVal = !localSettings.masterEnabled;
    const updated = { ...localSettings, masterEnabled: nextVal };
    setLocalSettings(updated);
    onSaveSettings(updated);

    if (nextVal && permissionState !== 'granted' && typeof window !== 'undefined' && 'Notification' in window) {
      handleRequestPermission();
    }
  };

  const handleCategoryChange = (key: keyof NotificationSettings, val: any) => {
    const updated = { ...localSettings, [key]: val };
    setLocalSettings(updated);
    onSaveSettings(updated);
  };

  const handleSendTestNotification = () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      const rashiObj = RASHIFAL_DATA.find((r) => r.rashiId === localSettings.selectedRashi);
      const rashiName = rashiObj ? rashiObj.name : 'Your Rashi';
      new Notification('NewsDarshan Vedic Alert', {
        body: `Today's Panchang and ${rashiName} Rashifal are now ready for New Delhi.`,
        icon: '/favicon.ico'
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      alert('Please allow browser notifications to receive test alerts.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FAF7F2] border border-stone-300 w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#9A3412]" />
            <h2 className="text-base font-semibold text-stone-900">Notification Preferences</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Master Switch */}
          <div className="flex items-center justify-between p-3.5 bg-stone-100 rounded-lg border border-stone-200">
            <div>
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                {localSettings.masterEnabled ? (
                  <Bell className="w-4 h-4 text-emerald-600" />
                ) : (
                  <BellOff className="w-4 h-4 text-stone-500" />
                )}
                <span>Master Notifications</span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {localSettings.masterEnabled
                  ? 'Notifications are currently active'
                  : 'Turn off all reminders and alerts with one click'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleMaster}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                localSettings.masterEnabled ? 'bg-[#9A3412]' : 'bg-stone-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  localSettings.masterEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Granular Preferences (only enabled if master is on) */}
          <div className={`space-y-3.5 transition-opacity ${localSettings.masterEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Notification Categories
            </div>

            {/* Daily Panchang */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-stone-800">Daily Morning Panchang</div>
                <div className="text-xs text-stone-500">Sunrise, Tithi, Nakshatra & Rahu Kaal summary</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.dailyPanchang}
                onChange={(e) => handleCategoryChange('dailyPanchang', e.target.checked)}
                className="w-4 h-4 accent-[#9A3412]"
              />
            </label>

            {/* Festivals */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-stone-800">Major Festivals & Jayantis</div>
                <div className="text-xs text-stone-500">Alerts 1 day prior and morning of celebration</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.festivals}
                onChange={(e) => handleCategoryChange('festivals', e.target.checked)}
                className="w-4 h-4 accent-[#9A3412]"
              />
            </label>

            {/* Ekadashi Vrat */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-stone-800">Ekadashi Fast & Parana Timing</div>
                <div className="text-xs text-stone-500">Fasting alert and exact morning parana time</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.ekadashi}
                onChange={(e) => handleCategoryChange('ekadashi', e.target.checked)}
                className="w-4 h-4 accent-[#9A3412]"
              />
            </label>

            {/* Purnima & Amavasya */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-stone-800">Purnima & Amavasya Observances</div>
                <div className="text-xs text-stone-500">Moonrise, Satyanarayan Puja & Pitru Tarpan reminders</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.purnimaAmavasya}
                onChange={(e) => handleCategoryChange('purnimaAmavasya', e.target.checked)}
                className="w-4 h-4 accent-[#9A3412]"
              />
            </label>

            {/* Shubh Muhurat */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-stone-800">Next Shubh Muhurat Reminders</div>
                <div className="text-xs text-stone-500">Upcoming Vivah, Griha Pravesh & Vahan dates</div>
              </div>
              <input
                type="checkbox"
                checked={localSettings.muhurat}
                onChange={(e) => handleCategoryChange('muhurat', e.target.checked)}
                className="w-4 h-4 accent-[#9A3412]"
              />
            </label>

            {/* Custom Rashifal (Rashi Specific Only!) */}
            <div className="pt-2 border-t border-stone-200">
              <label className="flex items-center justify-between cursor-pointer mb-2">
                <div>
                  <div className="font-medium text-stone-800">Personalized Rashifal Alert</div>
                  <div className="text-xs text-stone-500">Receive alert ONLY for your saved Rashi (no spam)</div>
                </div>
                <input
                  type="checkbox"
                  checked={localSettings.rashifal}
                  onChange={(e) => handleCategoryChange('rashifal', e.target.checked)}
                  className="w-4 h-4 accent-[#9A3412]"
                />
              </label>

              {localSettings.rashifal && (
                <div className="mt-2 pl-2">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Select Your Rashi for Exclusive Notifications:
                  </label>
                  <select
                    value={localSettings.selectedRashi}
                    onChange={(e) => handleCategoryChange('selectedRashi', e.target.value)}
                    className="w-full text-xs py-1.5 px-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                  >
                    {RASHIFAL_DATA.map((r) => (
                      <option key={r.rashiId} value={r.rashiId}>
                        {r.name} ({r.nameHi})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Delivery Time and Language */}
            <div className="pt-2 border-t border-stone-200 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Delivery Time</span>
                </label>
                <select
                  value={localSettings.scheduledTime}
                  onChange={(e) => handleCategoryChange('scheduledTime', e.target.value)}
                  className="w-full text-xs py-1.5 px-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                >
                  <option value="06:00">06:00 AM (Sunrise)</option>
                  <option value="07:00">07:00 AM</option>
                  <option value="08:00">08:00 AM</option>
                  <option value="09:00">09:00 AM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Alert Language</span>
                </label>
                <select
                  value={localSettings.language}
                  onChange={(e) => handleCategoryChange('language', e.target.value)}
                  className="w-full text-xs py-1.5 px-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#9A3412]"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={handleSendTestNotification}
            className="text-xs text-[#9A3412] hover:underline font-medium"
          >
            {testSent ? '✓ Alert Sent!' : 'Send Test Alert'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#9A3412] text-white text-xs font-medium rounded-lg hover:bg-[#78280B] transition-colors"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
