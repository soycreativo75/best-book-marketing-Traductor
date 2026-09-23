import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  Image as ImageIcon,
  Type,
  Phone,
  DollarSign,
  Save,
  RotateCcw,
  ArrowLeft,
  Upload,
  CheckCircle,
  Trash2,
  Lock,
  User,
  KeyRound,
  LogOut,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Mail,
  Inbox,
  BookOpen,
  MessageSquare,
  Video,
  HelpCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Play,
  Download,
  FolderArchive,
  FileCode,
  Terminal,
  Globe,
  Palette,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
  FileText,
  Scale,
  Film,
  Rocket,
  PenTool,
  TrendingUp,
  Target,
  Award,
  Megaphone,
  Cpu,
  Zap,
  Star,
  BarChart3,
  Compass,
  Printer,
  Headphones,
  Users,
  Lightbulb,
  Check,
  Layers,
  Languages,
  Search,
  CheckCheck,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ThemeMode,
  AppPage,
  SiteConfig,
  PortfolioCover,
  TestimonialItem,
  BooktrailerItem,
  ServiceItem,
  FAQItem,
  SectionsVisibility,
  LeadSubmission,
} from '../../types';
import { useSiteConfig, DEFAULT_SITE_CONFIG } from '../../context/SiteConfigContext';
import {
  TRANSLATIONS,
  TRANSLATION_SECTIONS,
  TRANSLATION_FIELDS_META,
  Language,
  Translations,
} from '../../utils/i18n';
import { BestBookLogo } from '../BestBookLogo';

interface AdminPanelPageProps {
  theme: ThemeMode;
  onNavigate: (page: AppPage) => void;
  onToggleTheme: () => void;
}

type AdminTab =
  | 'sections'
  | 'leads'
  | 'theme_language'
  | 'translations'
  | 'legal'
  | 'email_config'
  | 'texts'
  | 'hero_book'
  | 'covers'
  | 'testimonials'
  | 'booktrailers'
  | 'services'
  | 'faqs'
  | 'pricing'
  | 'logo'
  | 'favicon'
  | 'export_project';

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  theme,
  onNavigate,
}) => {
  const {
    config,
    updateConfig,
    resetConfig,
    toggleSection,
    updateLeadStatus,
    deleteLead,
    clearAllLeads,
    addOrUpdateCover,
    deleteCover,
    addOrUpdateTestimonial,
    deleteTestimonial,
    addOrUpdateBooktrailer,
    deleteBooktrailer,
    addOrUpdateService,
    deleteService,
    addOrUpdateFaq,
    deleteFaq,
    updateCustomTranslations,
    resetCustomTranslations,
  } = useSiteConfig();

  // Estado para el Gestor Global de Traducciones del Sitio
  const [transLang, setTransLang] = useState<Language>('en');
  const [transSection, setTransSection] = useState<string>('all');
  const [transSearch, setTransSearch] = useState<string>('');
  const [transDraft, setTransDraft] = useState<Record<string, string>>({});
  const [transHasChanges, setTransHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const currentCustom = (config.customTranslations?.[transLang] as Record<string, string>) || {};
    setTransDraft({ ...currentCustom });
    setTransHasChanges(false);
  }, [transLang, config.customTranslations]);

  const handleTransFieldChange = (key: string, value: string) => {
    setTransDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
    setTransHasChanges(true);
  };

  const handleSaveTranslations = () => {
    updateCustomTranslations(transLang, transDraft as Partial<Translations>);
    setTransHasChanges(false);
    triggerToast(
      transLang === 'en'
        ? '¡Traducciones al inglés guardadas y activas en el sitio!'
        : '¡Textos en español guardados y activos en el sitio!'
    );
  };

  const handleResetTranslationItem = (key: string) => {
    const updated = { ...transDraft };
    delete updated[key];
    setTransDraft(updated);
    updateCustomTranslations(transLang, { [key]: undefined } as any);
    triggerToast(`Restablecido valor predeterminado para "${key}"`);
  };

  const handleResetAllForLang = () => {
    if (
      window.confirm(
        `¿Restablecer todos los textos de ${transLang === 'en' ? 'Inglés (EN)' : 'Español (ES)'} a los valores originales de fábrica?`
      )
    ) {
      resetCustomTranslations(transLang);
      setTransDraft({});
      setTransHasChanges(false);
      triggerToast(`Textos de ${transLang.toUpperCase()} restablecidos a valores originales.`);
    }
  };

  const handleExportTranslationsJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(transDraft, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bestbook_translations_${transLang}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast(`Archivo JSON de traducciones (${transLang.toUpperCase()}) descargado.`);
  };

  const handleImportTranslationsJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === 'object' && parsed !== null) {
          setTransDraft(parsed);
          updateCustomTranslations(transLang, parsed);
          setTransHasChanges(false);
          triggerToast(`¡Traducciones importadas correctamente para ${transLang.toUpperCase()}!`);
        }
      } catch (err) {
        triggerToast('Error: El archivo no es un JSON válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Autenticación requerida: socabento / Joseluis75*
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bbm_admin_authenticated') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [formState, setFormState] = useState<SiteConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<AdminTab>('sections');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Estados locales para nuevos elementos y edición
  const [editingCover, setEditingCover] = useState<PortfolioCover | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [editingBooktrailer, setEditingBooktrailer] = useState<BooktrailerItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Navegación de pestañas: modo carrusel con flechas o cuadrícula completa
  const [tabsViewMode, setTabsViewMode] = useState<'carousel' | 'grid'>('carousel');
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [showServiceIconModal, setShowServiceIconModal] = useState(false);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const scrollStep = 280;
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  // Mantener la pestaña activa visible en el scroll
  useEffect(() => {
    if (tabsScrollRef.current) {
      const activeEl = tabsScrollRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const whiteLogoInputRef = useRef<HTMLInputElement>(null);
  const blackLogoInputRef = useRef<HTMLInputElement>(null);
  const heroCoverInputRef = useRef<HTMLInputElement>(null);
  const heroBackInputRef = useRef<HTMLInputElement>(null);
  const heroSpineInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const trailerThumbInputRef = useRef<HTMLInputElement>(null);

  const isLight = theme === 'light';

  // Sincronizar formState si config cambia
  useEffect(() => {
    setFormState({ ...config });
  }, [config]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanUser = usernameInput.trim();
    const cleanPass = passwordInput.trim();

    if (cleanUser === 'socabento' && cleanPass === 'Joseluis75*') {
      setIsAuthenticated(true);
      sessionStorage.setItem('bbm_admin_authenticated', 'true');
      triggerToast('¡Acceso verificado! Bienvenido al panel de administración.');
    } else {
      setLoginError('Usuario o contraseña incorrectos. Por favor verifica tus credenciales.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('bbm_admin_authenticated');
    onNavigate('home');
  };

  const handleChange = (field: keyof SiteConfig, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateConfig(formState);
    triggerToast('¡Configuración guardada con éxito en el sitio web!');
  };

  const handleReset = () => {
    if (
      window.confirm(
        '¿Deseas restaurar todos los textos, logotipo y configuración a sus valores originales?'
      )
    ) {
      resetConfig();
      setFormState({ ...DEFAULT_SITE_CONFIG });
      triggerToast('Valores restaurados a la configuración inicial.');
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, mode: 'white' | 'black') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, SVG o JPG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (mode === 'white') {
        handleChange('logoWhiteUrl', result);
      } else {
        handleChange('logoBlackUrl', result);
      }
      triggerToast(
        mode === 'white'
          ? 'Logotipo para fondo oscuro cargado.'
          : 'Logotipo para fondo claro cargado.'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleGenericImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void,
    toastMsg: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG o WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onSuccess(result);
      triggerToast(toastMsg);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadDataBackup = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `best-book-marketing-datos-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Copia de respaldo (.JSON) descargada con éxito.');
  };

  // PANTALLA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
          isLight ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'
        }`}
      >
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 text-xs font-gotham font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm'
                  : 'bg-[#141118] hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-[#D62828]" />
              <span>Volver a la Web</span>
            </button>
            <BestBookLogo theme={theme} size="sm" />
          </div>

          <div
            className={`p-8 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 shadow-slate-200'
                : 'bg-[#141118] border-[#D62828]/40 text-white shadow-[0_0_50px_rgba(214,40,40,0.15)]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D62828] to-[#F5A623] flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-8">
              <h2 className="font-gotham text-2xl font-black tracking-tight mb-2 text-[#D62828]">
                Panel de Administración
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                Ingresa tus credenciales autorizadas para gestionar todo el contenido de Best Book Marketing.
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-[#D62828]/15 border border-[#D62828] flex items-center gap-3 text-xs text-[#ff6b6b]">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#D62828]" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-gotham font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                  Usuario Administrador:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="socabento"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white placeholder:text-slate-400 font-medium'
                        : 'bg-[#080709] border-white/10 text-white placeholder:text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-gotham font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                  Contraseña de Seguridad:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white placeholder:text-slate-400 font-medium'
                        : 'bg-[#080709] border-white/10 text-white placeholder:text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(214,40,40,0.35)] transition-all cursor-pointer"
              >
                Acceder al Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // PANEL PRINCIPAL
  return (
    <div
      className={`min-h-screen transition-colors duration-300 pb-20 ${
        isLight ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'
      }`}
    >
      {/* Toast flotante de confirmación */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold shadow-2xl border border-white/20"
          >
            <CheckCircle className="w-4 h-4 text-[#F5A623]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra superior de encabezado del panel */}
      <div
        className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-[#080709]/95 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 text-xs font-gotham font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  : 'bg-[#141118] hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-[#D62828]" />
              <span className="hidden sm:inline">Ver Sitio Web</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-gotham font-black text-sm tracking-tight">
                Panel Administrador Total
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('export_project')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-gotham font-bold transition-all cursor-pointer ${
                activeTab === 'export_project'
                  ? 'bg-[#D62828] text-white shadow-[0_0_15px_rgba(214,40,40,0.4)]'
                  : isLight
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
              title="Descargar ZIP del Proyecto y Copia de Datos"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Proyecto (ZIP)</span>
            </button>

            <button
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-gotham font-bold transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
              title="Restaurar a valores predeterminados"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restaurar Todo</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black hover:brightness-110 shadow-[0_0_15px_rgba(214,40,40,0.4)] transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>

            <button
              onClick={handleLogout}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-rose-50 text-rose-600' : 'bg-white/5 hover:bg-white/10 text-rose-400'
              }`}
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner de Correo Configurado */}
        <div
          className={`p-4 rounded-2xl border mb-6 flex flex-wrap items-center justify-between gap-4 ${
            isLight
              ? 'bg-amber-50 border-amber-300 text-slate-900'
              : 'bg-[#141118] border-[#D62828]/40 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#D62828] flex-shrink-0" />
            <div className="text-xs">
              <span className="font-gotham font-bold block">
                Buzón receptor activo para formularios y citas:
              </span>
              <span className="font-mono text-xs font-bold text-[#D62828]">
                {formState.notificationEmail || 'soycreativo2023@gmail.com'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('email_config')}
            className="text-xs font-gotham font-bold text-[#D62828] underline hover:brightness-125 cursor-pointer"
          >
            Modificar correo receptor
          </button>
        </div>

        {/* Controles de Navegación de Pestañas con Flechas de Avance y Scroll */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between gap-2 px-1">
            <span className="text-[11px] font-gotham font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Secciones & Configuración ({[
                'sections', 'leads', 'theme_language', 'legal', 'email_config', 'texts',
                'hero_book', 'covers', 'testimonials', 'booktrailers', 'services', 'faqs',
                'pricing', 'logo', 'favicon', 'export_project'
              ].length})</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTabsViewMode((prev) => (prev === 'carousel' ? 'grid' : 'carousel'))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-gotham font-bold border transition-all cursor-pointer ${
                  tabsViewMode === 'grid'
                    ? 'bg-[#D62828] text-white border-[#D62828]'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:text-white'
                }`}
                title={tabsViewMode === 'grid' ? 'Cambiar a cinta horizontal' : 'Ver todas las secciones a la vez'}
              >
                {tabsViewMode === 'grid' ? (
                  <>
                    <ListFilter className="w-3.5 h-3.5" />
                    <span>Vista Cinta</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Ver Todas las Secciones</span>
                  </>
                )}
              </button>

              {tabsViewMode === 'carousel' && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => scrollTabs('left')}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95'
                        : 'bg-[#141118] border-white/10 text-slate-300 hover:text-white hover:border-[#D62828] active:scale-95'
                    }`}
                    title="Avanzar pestañas a la izquierda"
                    aria-label="Pestañas anteriores"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTabs('right')}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95'
                        : 'bg-[#141118] border-white/10 text-slate-300 hover:text-white hover:border-[#D62828] active:scale-95'
                    }`}
                    title="Avanzar pestañas a la derecha"
                    aria-label="Pestañas siguientes"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Menú de Pestañas (Modo Cinta Deslizable con flechas o Modo Cuadrícula Completa) */}
          <div
            ref={tabsScrollRef}
            className={`pb-3 border-b border-white/10 transition-all ${
              tabsViewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1'
                : 'flex items-center gap-2 overflow-x-auto scroll-smooth scrollbar-thin [scrollbar-width:auto] [scrollbar-color:rgba(214,40,40,0.6)_rgba(255,255,255,0.06)]'
            }`}
          >
            {[
              { id: 'sections', label: 'Apagar Secciones', icon: ToggleRight },
              { id: 'leads', label: `Buzón Leads (${config.leadsInbox?.length || 0})`, icon: Inbox },
              { id: 'theme_language', label: 'Tema & Idioma (ES/EN)', icon: Globe },
              { id: 'translations', label: 'Traductor Global (ES/EN)', icon: Languages },
              { id: 'legal', label: 'Aviso Legal & NDA', icon: ShieldCheck },
              { id: 'email_config', label: 'Correo & Contacto', icon: Mail },
              { id: 'texts', label: 'Textos & Hero', icon: Type },
              { id: 'hero_book', label: 'Libro 3D Hero (Portadas)', icon: BookOpen },
              { id: 'covers', label: `Portadas (${config.portfolioCovers?.length || 0})`, icon: BookOpen },
              { id: 'testimonials', label: `Testimonios (${config.testimonials?.length || 0})`, icon: MessageSquare },
              { id: 'booktrailers', label: `Booktrailers YouTube (${config.booktrailers?.length || 0})`, icon: Video },
              { id: 'services', label: `Servicios (${config.services?.length || 0})`, icon: Settings },
              { id: 'faqs', label: `Preguntas FAQ (${config.faqs?.length || 0})`, icon: HelpCircle },
              { id: 'pricing', label: 'Planes & Precios', icon: DollarSign },
              { id: 'logo', label: 'Logotipo', icon: ImageIcon },
              { id: 'favicon', label: 'Favicon', icon: Sparkles },
              { id: 'export_project', label: 'Descargar Proyecto (ZIP)', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-active={isActive ? 'true' : undefined}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-gotham font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white shadow-[0_0_15px_rgba(214,40,40,0.4)] ring-1 ring-white/20'
                      : isLight
                      ? 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 font-semibold'
                      : 'bg-[#141118] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#D62828]'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENIDO DE CADA PESTAÑA */}

        {/* 1. SECCIONES ACTIVAS / APAGADAS */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Interruptor de Secciones del Sitio Web
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Enciende o apaga cualquier componente de la página de inicio con un solo clic en tiempo real.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'hero', title: 'Hero Principal & Libro 3D', desc: 'Encabezado con título persuasivo, 3D interactivo y estadísticas.' },
                { key: 'portfolioCovers', title: 'Carrusel de Portadas', desc: 'Muestra interactiva de portadas de libros en formato slider.' },
                { key: 'services', title: 'Servicios Editoriales 360', desc: 'Cuadrícula de maquetación, diseño, marketing y asesoría.' },
                { key: 'booktrailers', title: 'Galería de Booktrailers 4K', desc: 'Videos promocionales cinematográficos de libros.' },
                { key: 'royaltyCalculator', title: 'Calculadora de Regalías', desc: 'Simulador interactivo de ingresos en Amazon KDP.' },
                { key: 'testimonials', title: 'Testimonios de Autores', desc: 'Reseñas, casos de éxito y badge de verificación de ventas.' },
                { key: 'pricing', title: 'Tabla de Planes y Precios', desc: 'Tarjetas con los 3 paquetes editoriales (Starter, Pro, Elite).' },
                { key: 'contact', title: 'Formulario de Diagnóstico', desc: 'Formulario de contacto para solicitar propuesta de lanzamiento.' },
                { key: 'footer', title: 'Pie de Página (Footer)', desc: 'Enlaces legales, redes sociales, horarios y botón admin discreto.' },
              ].map((item) => {
                const isEnabled = formState.sectionsVisibility[item.key as keyof SectionsVisibility];
                return (
                  <div
                    key={item.key}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isEnabled
                        ? isLight
                          ? 'bg-white border-emerald-500/50 shadow-sm'
                          : 'bg-[#141118] border-emerald-500/40'
                        : isLight
                        ? 'bg-slate-100 border-slate-300 opacity-60'
                        : 'bg-[#141118]/40 border-white/5 opacity-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-gotham font-black text-sm ${isEnabled ? 'text-[#D62828]' : 'text-slate-500'}`}>
                          {item.title}
                        </h3>
                        <span
                          className={`text-[10px] font-gotham font-bold px-2 py-0.5 rounded-full ${
                            isEnabled
                              ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                          }`}
                        >
                          {isEnabled ? 'ACTIVA' : 'APAGADA'}
                        </span>
                      </div>
                      <p className={`text-xs ${isLight ? 'text-slate-800' : 'text-slate-400'} leading-relaxed mb-4`}>
                        {item.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const updated = {
                          ...formState.sectionsVisibility,
                          [item.key]: !isEnabled,
                        };
                        handleChange('sectionsVisibility', updated);
                        toggleSection(item.key as keyof SectionsVisibility);
                        triggerToast(
                          `Sección "${item.title}" ${!isEnabled ? 'activada' : 'desactivada'}.`
                        );
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-gotham font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isEnabled
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                          : isLight
                          ? 'bg-slate-300 hover:bg-slate-400 text-slate-800'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {isEnabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      <span>{isEnabled ? 'Apagar esta Sección' : 'Encender Sección'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. BANDEJA DE LEADS / FORMULARIOS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Bandeja de Entrada de Solicitudes y Formularios
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Registro de cada autor que completó el formulario de contacto o agendó una asesoría. Se envían a: <strong>{config.notificationEmail}</strong>.
                </p>
              </div>

              {config.leadsInbox && config.leadsInbox.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('¿Deseas vaciar todos los registros del buzón?')) {
                      clearAllLeads();
                      triggerToast('Buzón de leads vaciado.');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-gotham font-bold border border-rose-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar Registros</span>
                </button>
              )}
            </div>

            {(!config.leadsInbox || config.leadsInbox.length === 0) ? (
              <div className={`text-center py-16 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#141118] border-white/10'}`}>
                <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-gotham font-bold text-base mb-1">Buzón Vacío</h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} max-w-sm mx-auto`}>
                  Cuando los visitantes envíen formularios desde la página web, se registrarán aquí instantáneamente con todos sus datos.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {config.leadsInbox.map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-[#141118] border-white/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-gotham font-black text-sm text-[#D62828]">
                          {lead.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#D62828]/10 text-[#D62828] font-gotham font-bold">
                          {lead.source === 'contact_form' ? 'Formulario Diagnóstico' : 'Modal Asesoría'}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-gotham font-bold ${
                            lead.status === 'new'
                              ? 'bg-amber-500/20 text-amber-500'
                              : lead.status === 'contacted'
                              ? 'bg-blue-500/20 text-blue-500'
                              : 'bg-emerald-500/20 text-emerald-500'
                          }`}
                        >
                          {lead.status === 'new' ? 'NUEVO' : lead.status === 'contacted' ? 'CONTACTADO' : 'COMPLETADO'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(lead.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-slate-400 block">Correo:</span>
                        <a href={`mailto:${lead.email}`} className="font-medium text-[#D62828] hover:underline">
                          {lead.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Teléfono / WhatsApp:</span>
                        <span className="font-medium">{lead.phone || 'No especificado'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Género / Estado:</span>
                        <span className="font-medium">
                          {lead.genre || '-'} | {lead.manuscriptStatus || '-'}
                        </span>
                      </div>
                    </div>

                    {lead.message && (
                      <div className={`p-3 rounded-xl text-xs mb-3 ${isLight ? 'bg-slate-100 text-slate-800' : 'bg-white/5 text-slate-300'}`}>
                        <strong>Mensaje:</strong> {lead.message}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'contacted')}
                          className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-[11px] font-gotham font-bold cursor-pointer"
                        >
                          Marcar Contactado
                        </button>
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[11px] font-gotham font-bold cursor-pointer"
                        >
                          Marcar Completado
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${lead.email}?subject=Respuesta Best Book Marketing&body=Hola ${lead.name},`}
                          className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-[11px] font-gotham font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Responder por Correo</span>
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          title="Eliminar lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2B. TEMA POR DEFECTO E IDIOMA DEL SITIO */}
        {activeTab === 'theme_language' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#D62828]" />
                Tema por Defecto y Sistema de Idiomas
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Define cómo verán la página web los nuevos visitantes al cargarla por primera vez y el comportamiento del cambio de idioma automático.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selector de Tema por Defecto */}
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'}`}>
                <div>
                  <h3 className="font-gotham font-black text-base text-white dark:text-white flex items-center gap-2 mb-1">
                    <Palette className="w-4 h-4 text-[#D62828]" />
                    <span className={isLight ? 'text-slate-900' : 'text-white'}>Tema Predeterminado de Carga</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    El tema seleccionado se aplicará de forma automática a los usuarios que visiten la web sin preferencias previas.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Opción Oscuro */}
                  <div
                    onClick={() => {
                      handleChange('defaultTheme', 'dark');
                      updateConfig({ defaultTheme: 'dark' });
                      triggerToast('Tema por defecto guardado: Modo Oscuro.');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                      (formState.defaultTheme || 'dark') === 'dark'
                        ? 'border-[#D62828] bg-black/60 shadow-[0_0_20px_rgba(214,40,40,0.3)]'
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[#D62828]">
                      <Moon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-gotham font-black text-xs block text-white">Modo Oscuro</span>
                      <span className="text-[10px] text-slate-400">Cinematográfico KDP</span>
                    </div>
                    {(formState.defaultTheme || 'dark') === 'dark' && (
                      <span className="text-[10px] font-gotham font-black px-2 py-0.5 rounded bg-[#D62828] text-white">
                        Activo
                      </span>
                    )}
                  </div>

                  {/* Opción Claro */}
                  <div
                    onClick={() => {
                      handleChange('defaultTheme', 'light');
                      updateConfig({ defaultTheme: 'light' });
                      triggerToast('Tema por defecto guardado: Modo Claro.');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                      formState.defaultTheme === 'light'
                        ? 'border-[#D62828] bg-amber-500/10 shadow-[0_0_20px_rgba(214,40,40,0.3)]'
                        : isLight
                        ? 'border-slate-300 bg-slate-100 hover:border-slate-400'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-[#F5A623]">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`font-gotham font-black text-xs block ${isLight ? 'text-slate-900' : 'text-white'}`}>Modo Claro</span>
                      <span className="text-[10px] text-slate-400">Editorial Clásico</span>
                    </div>
                    {formState.defaultTheme === 'light' && (
                      <span className="text-[10px] font-gotham font-black px-2 py-0.5 rounded bg-[#D62828] text-white">
                        Activo
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-400 leading-relaxed">
                  💡 Los visitantes aún podrán alternar entre temas manualmente usando el botón del sol/luna en la cabecera.
                </div>
              </div>

              {/* Selector de Idioma por Defecto y Switch */}
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'}`}>
                <div>
                  <h3 className="font-gotham font-black text-base text-white dark:text-white flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-[#D62828]" />
                    <span className={isLight ? 'text-slate-900' : 'text-white'}>Idioma Predeterminado & Selector</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Traduce de forma fluida todos los títulos, botones, modales y llamadas a la acción sin modificar el diseño.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Español */}
                  <div
                    onClick={() => {
                      handleChange('defaultLanguage', 'es');
                      updateConfig({ defaultLanguage: 'es' });
                      triggerToast('Idioma por defecto: Español.');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                      (formState.defaultLanguage || 'es') === 'es'
                        ? 'border-[#D62828] bg-black/60 shadow-[0_0_20px_rgba(214,40,40,0.3)]'
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">🇪🇸</span>
                    <div>
                      <span className="font-gotham font-black text-xs block text-white">Español</span>
                      <span className="text-[10px] text-slate-400">Mercados Hispanos</span>
                    </div>
                    {(formState.defaultLanguage || 'es') === 'es' && (
                      <span className="text-[10px] font-gotham font-black px-2 py-0.5 rounded bg-[#D62828] text-white">
                        Predeterminado
                      </span>
                    )}
                  </div>

                  {/* Inglés */}
                  <div
                    onClick={() => {
                      handleChange('defaultLanguage', 'en');
                      updateConfig({ defaultLanguage: 'en' });
                      triggerToast('Idioma por defecto: English (Inglés).');
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                      formState.defaultLanguage === 'en'
                        ? 'border-[#D62828] bg-black/60 shadow-[0_0_20px_rgba(214,40,40,0.3)]'
                        : 'border-white/10 bg-black/20 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <span className="font-gotham font-black text-xs block text-white">English</span>
                      <span className="text-[10px] text-slate-400">US & Global Authors</span>
                    </div>
                    {formState.defaultLanguage === 'en' && (
                      <span className="text-[10px] font-gotham font-black px-2 py-0.5 rounded bg-[#D62828] text-white">
                        Predeterminado
                      </span>
                    )}
                  </div>
                </div>

                {/* Interruptor de Visibilidad del Selector de Idioma */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className={`font-gotham font-bold text-xs block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Botón de Cambio de Idioma en la Web:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Muestra un discreto icono de globo terráqueo en la barra de navegación para alternar ES/EN.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentVal = formState.enableLanguageSwitch !== false;
                      const nextVal = !currentVal;
                      handleChange('enableLanguageSwitch', nextVal);
                      updateConfig({ enableLanguageSwitch: nextVal });
                      triggerToast(nextVal ? 'Selector de idioma activado en la web' : 'Selector de idioma ocultado');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-gotham font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      formState.enableLanguageSwitch !== false
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {formState.enableLanguageSwitch !== false ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    <span>{formState.enableLanguageSwitch !== false ? 'Visible' : 'Oculto'}</span>
                  </button>
                </div>

                {/* Acceso Directo al Gestor de Traducciones */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#D62828]/15 via-transparent to-[#F5A623]/10 border border-[#D62828]/30">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Languages className="w-4 h-4 text-[#D62828]" />
                      <span className={`font-gotham font-black text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        ¿Deseas traducir o personalizar todos los textos del sitio?
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Modifica titulares, botones, calculadora de regalías, servicios y modales de todo el sitio web en Español e Inglés.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('translations')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black hover:brightness-110 shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <Languages className="w-4 h-4" />
                    <span>Abrir Traductor Global</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2B. GESTOR GLOBAL DE TRADUCCIONES DEL SITIO (ES / EN) */}
        {activeTab === 'translations' && (() => {
          const filteredFields = TRANSLATION_FIELDS_META.filter((field) => {
            const matchesSection = transSection === 'all' || field.section === transSection;
            const q = transSearch.toLowerCase().trim();
            if (!q) return matchesSection;
            const matchesSearch =
              field.label.toLowerCase().includes(q) ||
              field.key.toLowerCase().includes(q) ||
              (TRANSLATIONS[transLang][field.key] || '').toLowerCase().includes(q) ||
              (transDraft[field.key] || '').toLowerCase().includes(q);
            return matchesSection && matchesSearch;
          });

          const customCount = Object.keys(transDraft).length;

          return (
            <div className="space-y-6">
              {/* Encabezado y Descripción del Traductor */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-gotham text-xl font-black text-[#D62828] flex items-center gap-2">
                    <Languages className="w-6 h-6 text-[#D62828]" />
                    Gestor & Traductor Global de Todo el Sitio Web
                  </h2>
                  <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'} mt-1`}>
                    Personaliza cualquier texto, botón, título o etiqueta en <strong className="text-[#F5A623]">Español (ES)</strong> e <strong className="text-[#F5A623]">Inglés (EN)</strong> con aplicación instantánea en toda la web.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveTranslations}
                    className={`px-5 py-2.5 rounded-xl font-gotham font-black text-xs text-white shadow-lg transition-all cursor-pointer flex items-center gap-2 ${
                      transHasChanges
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 shadow-emerald-900/40 animate-pulse'
                        : 'bg-gradient-to-r from-[#D62828] to-[#b71c1c] hover:brightness-110'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    <span>{transHasChanges ? '¡Guardar Cambios Pendientes!' : 'Guardar Todo'}</span>
                  </button>
                </div>
              </div>

              {/* Selector de Idioma Activo para Edición */}
              <div className={`p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'} space-y-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-gotham font-black text-xs uppercase tracking-wider text-slate-400 block mb-1">
                      Paso 1: Selecciona el Idioma a Personalizar
                    </span>
                    <span className={`font-gotham font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Editando actualmente textos para: {transLang === 'en' ? '🇺🇸 English (Inglés)' : '🇪🇸 Español (Castellano)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTransLang('es')}
                      className={`px-4 py-2 rounded-xl text-xs font-gotham font-black flex items-center gap-2 transition-all cursor-pointer border ${
                        transLang === 'es'
                          ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_15px_rgba(214,40,40,0.5)]'
                          : isLight
                          ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                          : 'bg-[#080709] text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">🇪🇸</span>
                      <span>Español (ES)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransLang('en')}
                      className={`px-4 py-2 rounded-xl text-xs font-gotham font-black flex items-center gap-2 transition-all cursor-pointer border ${
                        transLang === 'en'
                          ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_15px_rgba(214,40,40,0.5)]'
                          : isLight
                          ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                          : 'bg-[#080709] text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">🇺🇸</span>
                      <span>English (EN)</span>
                    </button>
                  </div>
                </div>

                {/* Barra de utilidades: Búsqueda, Filtro de Sección y Acciones Backup */}
                <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Buscador en tiempo real */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por texto, título o clave técnica..."
                      value={transSearch}
                      onChange={(e) => setTransSearch(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-[#080709] border-white/10 text-white placeholder-slate-500'
                      }`}
                    />
                    {transSearch && (
                      <button
                        type="button"
                        onClick={() => setTransSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Acciones de exportar, importar y restaurar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/40 text-slate-400 border border-white/10">
                      {customCount} personalizados
                    </span>

                    <button
                      type="button"
                      onClick={handleExportTranslationsJson}
                      title="Descargar respaldo en JSON"
                      className={`px-3 py-1.5 rounded-lg border text-xs font-gotham font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-[#080709] hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5 text-[#F5A623]" />
                      <span>Exportar</span>
                    </button>

                    <label
                      title="Restaurar traducciones desde archivo JSON"
                      className={`px-3 py-1.5 rounded-lg border text-xs font-gotham font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-[#080709] hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Importar</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportTranslationsJson}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleResetAllForLang}
                      title="Restablecer todos los textos de este idioma a los originales de fábrica"
                      className={`px-3 py-1.5 rounded-lg border text-xs font-gotham font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLight ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' : 'bg-rose-950/30 border-rose-800/40 text-rose-300 hover:bg-rose-900/40'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restablecer Fábrica</span>
                    </button>
                  </div>
                </div>

                {/* Filtro rápido por sección */}
                <div className="pt-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
                  <button
                    type="button"
                    onClick={() => setTransSection('all')}
                    className={`px-3 py-1 rounded-full text-xs font-gotham font-bold whitespace-nowrap transition-all cursor-pointer ${
                      transSection === 'all'
                        ? 'bg-[#D62828] text-white shadow-sm'
                        : isLight
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-[#080709] text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    ✨ Todas las Secciones ({TRANSLATION_FIELDS_META.length})
                  </button>
                  {TRANSLATION_SECTIONS.map((sec) => {
                    const countInSec = TRANSLATION_FIELDS_META.filter((f) => f.section === sec.id).length;
                    const isActiveSec = transSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => setTransSection(sec.id)}
                        className={`px-3 py-1 rounded-full text-xs font-gotham font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isActiveSec
                            ? 'bg-[#D62828] text-white shadow-sm'
                            : isLight
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-[#080709] text-slate-400 hover:text-white border border-white/10'
                        }`}
                      >
                        <span>{sec.name}</span>
                        <span className="text-[10px] opacity-70 font-mono">({countInSec})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Indicador de Resultados */}
              <div className="flex items-center justify-between text-xs px-1 text-slate-400">
                <span>
                  Mostrando <strong>{filteredFields.length}</strong> campos traducibles
                  {transSection !== 'all' && ` en la sección selecionada`}
                  {transSearch && ` que coinciden con "${transSearch}"`}
                </span>
                {transHasChanges && (
                  <span className="text-emerald-400 font-gotham font-bold flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Hay cambios sin guardar en esta pestaña
                  </span>
                )}
              </div>

              {/* Grilla de Campos de Traducción */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFields.map((field) => {
                  const currentValue =
                    transDraft[field.key] !== undefined
                      ? transDraft[field.key]
                      : TRANSLATIONS[transLang][field.key] || '';
                  const defaultValue = TRANSLATIONS[transLang][field.key] || '';
                  const isModified =
                    transDraft[field.key] !== undefined && transDraft[field.key] !== defaultValue;
                  const isTextarea = field.type === 'textarea' || (defaultValue && defaultValue.length > 70);

                  return (
                    <div
                      key={field.key}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isModified
                          ? 'border-[#D62828] bg-black/40 ring-1 ring-[#D62828]/50 shadow-md'
                          : isLight
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-[#141118] border-white/10'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Cabecera del campo */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-gotham font-black uppercase text-[#F5A623] block mb-0.5">
                              {field.section.toUpperCase()}
                            </span>
                            <h4 className={`font-gotham font-black text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {field.label}
                            </h4>
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/10 shrink-0">
                            {field.key}
                          </span>
                        </div>

                        {/* Valor de referencia de fábrica */}
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-400 space-y-1">
                          <span className="block text-[9px] font-gotham font-bold uppercase tracking-wider text-slate-500">
                            Predeterminado de fábrica ({transLang.toUpperCase()}):
                          </span>
                          <p className="italic text-slate-300 leading-snug line-clamp-2">
                            "{defaultValue}"
                          </p>
                        </div>

                        {/* Campo de Entrada / Textarea */}
                        <div>
                          <label className="block text-[11px] font-gotham font-bold text-slate-300 mb-1">
                            Tu texto personalizado ({transLang === 'en' ? 'Inglés' : 'Español'}):
                          </label>
                          {isTextarea ? (
                            <textarea
                              rows={3}
                              value={currentValue}
                              onChange={(e) => handleTransFieldChange(field.key, e.target.value)}
                              placeholder={`Escribe la traducción en ${transLang === 'en' ? 'inglés' : 'español'}...`}
                              className={`w-full px-3 py-2 rounded-xl border text-xs font-medium leading-relaxed ${
                                isLight
                                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                                  : 'bg-[#080709] border-white/10 text-white focus:border-[#D62828]'
                              }`}
                            />
                          ) : (
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => handleTransFieldChange(field.key, e.target.value)}
                              placeholder={`Escribe la traducción en ${transLang === 'en' ? 'inglés' : 'español'}...`}
                              className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                                isLight
                                  ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                                  : 'bg-[#080709] border-white/10 text-white focus:border-[#D62828]'
                              }`}
                            />
                          )}
                        </div>
                      </div>

                      {/* Pie de la tarjeta */}
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        {isModified ? (
                          <>
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-gotham font-bold">
                              <CheckCheck className="w-3.5 h-3.5" />
                              Personalizado
                            </span>
                            <button
                              type="button"
                              onClick={() => handleResetTranslationItem(field.key)}
                              className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Restaurar fábrica</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            Usando original de fábrica
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredFields.length === 0 && (
                <div className="p-12 text-center rounded-2xl border border-white/10 bg-black/20 text-slate-400 space-y-3">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="font-gotham font-bold text-sm">
                    No se encontraron textos que coincidan con "{transSearch}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setTransSearch('');
                      setTransSection('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs font-gotham font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              )}

              {/* Botón flotante inferior para guardar si hay cambios */}
              {transHasChanges && (
                <div className="sticky bottom-6 z-40 flex justify-center">
                  <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl flex items-center gap-4 border border-white/20 animate-bounce">
                    <span className="text-xs font-gotham font-black">
                      Tienes cambios pendientes en las traducciones
                    </span>
                    <button
                      type="button"
                      onClick={handleSaveTranslations}
                      className="px-4 py-1.5 rounded-xl bg-white text-emerald-800 font-gotham font-black text-xs hover:bg-slate-100 transition-all cursor-pointer shadow-md"
                    >
                      Guardar Ahora
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* 2C. TEXTOS LEGALES: AVISO DE CONFIDENCIALIDAD & TÉRMINOS */}
        {activeTab === 'legal' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D62828]" />
                Personalización de Textos Legales y Términos
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Modifica los títulos, declaraciones de confidencialidad (NDA) y condiciones de contratación editorial para adaptarlos a tu empresa.
              </p>
            </div>

            <div className="space-y-8">
              {/* Sección 1: Aviso de Confidencialidad */}
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'}`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className={`font-gotham font-black text-base flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <Lock className="w-4 h-4 text-[#D62828]" />
                    Aviso de Confidencialidad y Custodia de Manuscritos
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Página: /aviso-confidencialidad
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div>
                    <label className={`block font-gotham font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                      Título Principal de la Página:
                    </label>
                    <input
                      type="text"
                      value={formState.privacyNoticeTitle || 'Aviso de Confidencialidad y Protección de Manuscritos'}
                      onChange={(e) => handleChange('privacyNoticeTitle', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-gotham font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                      Subtítulo / Declaración de Compromiso:
                    </label>
                    <textarea
                      rows={3}
                      value={
                        formState.privacyNoticeContent ||
                        'Garantía vinculante de no divulgación, custodia digital y preservación íntegra de la propiedad intelectual de cada autor que confía en Best Book Marketing.'
                      }
                      onChange={(e) => handleChange('privacyNoticeContent', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium leading-relaxed ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Condiciones de Servicio */}
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'}`}>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className={`font-gotham font-black text-base flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <FileText className="w-4 h-4 text-[#D62828]" />
                    Condiciones del Servicio Editorial
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Página: /condiciones-servicio
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div>
                    <label className={`block font-gotham font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                      Título Principal de Condiciones:
                    </label>
                    <input
                      type="text"
                      value={formState.termsConditionsTitle || 'Condiciones del Servicio Editorial'}
                      onChange={(e) => handleChange('termsConditionsTitle', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-gotham font-bold mb-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                      Descripción de Términos / Resumen Normativo:
                    </label>
                    <textarea
                      rows={3}
                      value={
                        formState.termsConditionsContent ||
                        'Directrices claras, plazos de entrega y compromisos mutuos que aseguran un proceso de producción y lanzamiento editorial con la máxima calidad y transparencia.'
                      }
                      onChange={(e) => handleChange('termsConditionsContent', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium leading-relaxed ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      handleChange('privacyNoticeTitle', DEFAULT_SITE_CONFIG.privacyNoticeTitle);
                      handleChange('privacyNoticeContent', DEFAULT_SITE_CONFIG.privacyNoticeContent);
                      handleChange('termsConditionsTitle', DEFAULT_SITE_CONFIG.termsConditionsTitle);
                      handleChange('termsConditionsContent', DEFAULT_SITE_CONFIG.termsConditionsContent);
                      triggerToast('Textos legales restaurados a valores originales.');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-gotham font-bold border transition-all cursor-pointer ${
                      isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    Restablecer Textos Originales
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateConfig({
                        privacyNoticeTitle: formState.privacyNoticeTitle,
                        privacyNoticeContent: formState.privacyNoticeContent,
                        termsConditionsTitle: formState.termsConditionsTitle,
                        termsConditionsContent: formState.termsConditionsContent,
                      });
                      triggerToast('Textos de Confidencialidad y Términos guardados exitosamente.');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black shadow-lg cursor-pointer hover:brightness-110"
                  >
                    Guardar Cambios Legales
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CORREO Y DATOS DE CONTACTO */}
        {activeTab === 'email_config' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828]">
                Canales de Recepción y Datos de Contacto
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Configura el correo al que deben llegar todos los formularios y botones de la página web.
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-gotham font-bold text-amber-500 block">
                    Dirección de Notificación Principal
                  </span>
                  <p className={isLight ? 'text-slate-800' : 'text-slate-300'}>
                    A este correo se envían automáticamente las alertas de nuevos autores interesados y solicitudes de diagnóstico.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Correo Electrónico Receptor (Notificaciones):
                  </label>
                  <input
                    type="email"
                    value={formState.notificationEmail || ''}
                    onChange={(e) => handleChange('notificationEmail', e.target.value)}
                    placeholder="soycreativo2023@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] font-mono ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-bold'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Predeterminado: soycreativo2023@gmail.com
                  </span>
                </div>

                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Correo de Contacto Público (Visible en Footer):
                  </label>
                  <input
                    type="email"
                    value={formState.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    placeholder="soycreativo2023@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-medium'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Número de WhatsApp (con prefijo internacional):
                  </label>
                  <input
                    type="text"
                    value={formState.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    placeholder="+34612345678"
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-medium'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Teléfono de Oficina:
                  </label>
                  <input
                    type="text"
                    value={formState.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    placeholder="+34 910 000 000"
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-medium'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Dirección Física / Sede:
                  </label>
                  <input
                    type="text"
                    value={formState.officeAddress}
                    onChange={(e) => handleChange('officeAddress', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-medium'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Horario de Atención:
                  </label>
                  <input
                    type="text"
                    value={formState.businessHours}
                    onChange={(e) => handleChange('businessHours', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white font-medium'
                        : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. TEXTOS Y HERO */}
        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828]">
                Textos del Hero Principal y Estadísticas
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Personaliza la propuesta de valor inicial que ven los autores al entrar a la página.
              </p>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
              <div>
                <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                  Badge Superior de Autoridad:
                </label>
                <input
                  type="text"
                  value={formState.heroBadge}
                  onChange={(e) => handleChange('heroBadge', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Título Línea 1 (Texto Blanco):
                  </label>
                  <input
                    type="text"
                    value={formState.heroTitleLine1}
                    onChange={(e) => handleChange('heroTitleLine1', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Título Destacado (Gradiente Rojo/Dorado):
                  </label>
                  <input
                    type="text"
                    value={formState.heroTitleHighlight}
                    onChange={(e) => handleChange('heroTitleHighlight', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                  Subtítulo Explicativo de Conversión:
                </label>
                <textarea
                  rows={3}
                  value={formState.heroSubtitle}
                  onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Texto del Botón CTA Principal:
                  </label>
                  <input
                    type="text"
                    value={formState.heroCtaText}
                    onChange={(e) => handleChange('heroCtaText', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-gotham font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                    Texto del Botón Secundario (Calculadora):
                  </label>
                  <input
                    type="text"
                    value={formState.heroSecondaryCtaText}
                    onChange={(e) => handleChange('heroSecondaryCtaText', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Estadísticas */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-gotham font-bold text-sm text-[#D62828] mb-4">
                  Métricas de Conversión del Hero
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs font-gotham font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                      Libros Top #1 Bestseller:
                    </label>
                    <input
                      type="text"
                      value={formState.statsTopBooks}
                      onChange={(e) => handleChange('statsTopBooks', e.target.value)}
                      placeholder="+180"
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] font-bold ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-gotham font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                      Regalías de Autor:
                    </label>
                    <input
                      type="text"
                      value={formState.statsRoyalties}
                      onChange={(e) => handleChange('statsRoyalties', e.target.value)}
                      placeholder="100%"
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] font-bold ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-gotham font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-slate-300'}`}>
                      Calificación Promedio:
                    </label>
                    <input
                      type="text"
                      value={formState.statsRating}
                      onChange={(e) => handleChange('statsRating', e.target.value)}
                      placeholder="4.9 / 5"
                      className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] font-bold ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4.1 PERSONALIZACIÓN DEL LIBRO 3D (PORTADA, CONTRAPORTADA Y LOMO) */}
        {activeTab === 'hero_book' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Personalización del Libro 3D del Hero
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Sustituye la portada frontal, la contraportada y el lomo del libro 3D interactivo con tus propias imágenes. Si dejas el campo vacío, el libro mantendrá automáticamente su diseño editorial rojo original.
                </p>
              </div>

              <button
                onClick={() => {
                  handleChange('heroBookCustomCoverImage', '');
                  handleChange('heroBookCustomBackCoverImage', '');
                  handleChange('heroBookCustomSpineImage', '');
                  triggerToast('Libro 3D restaurado al diseño editorial rojo predeterminado.');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-gotham font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isLight
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Diseño Rojo Original</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Portada Frontal */}
              <div
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-gotham font-black text-sm text-[#D62828]">
                      1. Portada Frontal
                    </h3>
                    <span className="text-[10px] uppercase font-gotham font-bold px-2 py-0.5 rounded bg-[#D62828]/20 text-[#D62828]">
                      {formState.heroBookCustomCoverImage ? 'Personalizada' : 'Diseño Rojo'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Imagen de la cubierta frontal que se visualiza al inicio y durante la apertura.
                  </p>

                  {/* Vista Previa */}
                  <div className="p-4 rounded-2xl bg-[#080709] border border-white/10 flex items-center justify-center min-h-[220px]">
                    {formState.heroBookCustomCoverImage ? (
                      <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-white/20">
                        <img
                          src={formState.heroBookCustomCoverImage}
                          alt="Portada Frontal"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 aspect-[2/3] rounded-lg bg-gradient-to-br from-[#800F2F] via-[#A01A33] to-[#D62828] p-3 text-white flex flex-col justify-between border border-white/20 shadow-xl">
                        <span className="text-[8px] font-gotham font-bold uppercase tracking-wider text-[#F5A623]">
                          Edición KDP
                        </span>
                        <div className="space-y-1 my-auto">
                          <div className="w-4 h-0.5 bg-[#F5A623]" />
                          <div className="font-gotham font-black text-[9px] uppercase leading-tight">
                            {formState.heroTitleHighlight || 'Bestseller'}
                          </div>
                          <div className="text-[7px] text-white/80 line-clamp-2">
                            {formState.heroSubtitle?.slice(0, 45) || 'Estrategia de lanzamiento'}
                          </div>
                        </div>
                        <span className="text-[7px] font-mono text-right text-slate-300">
                          Diseño Base
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-gotham font-bold mb-1">
                      URL de Imagen de Portada:
                    </label>
                    <input
                      type="text"
                      placeholder="https://... o sube un archivo"
                      value={formState.heroBookCustomCoverImage || ''}
                      onChange={(e) => handleChange('heroBookCustomCoverImage', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <input
                    type="file"
                    ref={heroCoverInputRef}
                    onChange={(e) =>
                      handleGenericImageUpload(
                        e,
                        (url) => handleChange('heroBookCustomCoverImage', url),
                        'Portada frontal personalizada cargada.'
                      )
                    }
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => heroCoverInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Portada</span>
                  </button>
                  {formState.heroBookCustomCoverImage && (
                    <button
                      onClick={() => {
                        handleChange('heroBookCustomCoverImage', '');
                        triggerToast('Portada frontal restaurada a la original.');
                      }}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Quitar imagen personalizada y usar original"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Contraportada */}
              <div
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-gotham font-black text-sm text-[#D62828]">
                      2. Contraportada
                    </h3>
                    <span className="text-[10px] uppercase font-gotham font-bold px-2 py-0.5 rounded bg-[#D62828]/20 text-[#D62828]">
                      {formState.heroBookCustomBackCoverImage ? 'Personalizada' : 'Diseño Rojo'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Imagen de la parte trasera del libro que se muestra cuando gira en 360°.
                  </p>

                  {/* Vista Previa */}
                  <div className="p-4 rounded-2xl bg-[#080709] border border-white/10 flex items-center justify-center min-h-[220px]">
                    {formState.heroBookCustomBackCoverImage ? (
                      <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden shadow-xl border border-white/20">
                        <img
                          src={formState.heroBookCustomBackCoverImage}
                          alt="Contraportada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 aspect-[2/3] rounded-lg bg-gradient-to-bl from-[#800F2F] via-[#A01A33] to-[#D62828] p-3 text-white flex flex-col justify-between border border-white/20 shadow-xl">
                        <span className="text-[8px] font-gotham font-bold uppercase tracking-wider text-slate-300">
                          Sinopsis
                        </span>
                        <div className="space-y-1 my-auto">
                          <div className="h-1 bg-white/40 rounded w-full" />
                          <div className="h-1 bg-white/30 rounded w-4/5" />
                          <div className="h-1 bg-white/30 rounded w-full" />
                          <div className="h-1 bg-white/20 rounded w-3/4" />
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-white/20">
                          <span className="text-[7px] font-mono text-slate-300">ISBN KDP</span>
                          <div className="w-6 h-3 bg-white/90 rounded-[2px]" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-gotham font-bold mb-1">
                      URL de Contraportada:
                    </label>
                    <input
                      type="text"
                      placeholder="https://... o sube un archivo"
                      value={formState.heroBookCustomBackCoverImage || ''}
                      onChange={(e) => handleChange('heroBookCustomBackCoverImage', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <input
                    type="file"
                    ref={heroBackInputRef}
                    onChange={(e) =>
                      handleGenericImageUpload(
                        e,
                        (url) => handleChange('heroBookCustomBackCoverImage', url),
                        'Contraportada personalizada cargada.'
                      )
                    }
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => heroBackInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Contraportada</span>
                  </button>
                  {formState.heroBookCustomBackCoverImage && (
                    <button
                      onClick={() => {
                        handleChange('heroBookCustomBackCoverImage', '');
                        triggerToast('Contraportada restaurada a la original.');
                      }}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Quitar imagen personalizada y usar original"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Lomo del Libro */}
              <div
                className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-gotham font-black text-sm text-[#D62828]">
                      3. Lomo del Libro
                    </h3>
                    <span className="text-[10px] uppercase font-gotham font-bold px-2 py-0.5 rounded bg-[#D62828]/20 text-[#D62828]">
                      {formState.heroBookCustomSpineImage ? 'Personalizado' : 'Diseño Rojo'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Imagen del lomo que se aprecia en el giro tridimensional de 360°.
                  </p>

                  {/* Vista Previa */}
                  <div className="p-4 rounded-2xl bg-[#080709] border border-white/10 flex items-center justify-center min-h-[220px]">
                    {formState.heroBookCustomSpineImage ? (
                      <div className="relative w-12 h-44 rounded-sm overflow-hidden shadow-xl border border-white/20">
                        <img
                          src={formState.heroBookCustomSpineImage}
                          alt="Lomo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-44 rounded-sm bg-gradient-to-b from-[#800F2F] via-[#D62828] to-[#800F2F] p-2 text-white flex flex-col justify-between items-center border border-white/20 shadow-xl">
                        <span className="text-[7px] font-mono text-[#F5A623]">BBM</span>
                        <span className="text-[8px] font-gotham font-black uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 text-white">
                          BESTSELLER KDP
                        </span>
                        <span className="text-[6px] font-mono text-slate-300">2026</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-gotham font-bold mb-1">
                      URL del Lomo:
                    </label>
                    <input
                      type="text"
                      placeholder="https://... o sube un archivo"
                      value={formState.heroBookCustomSpineImage || ''}
                      onChange={(e) => handleChange('heroBookCustomSpineImage', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <input
                    type="file"
                    ref={heroSpineInputRef}
                    onChange={(e) =>
                      handleGenericImageUpload(
                        e,
                        (url) => handleChange('heroBookCustomSpineImage', url),
                        'Lomo personalizado cargado.'
                      )
                    }
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => heroSpineInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Lomo</span>
                  </button>
                  {formState.heroBookCustomSpineImage && (
                    <button
                      onClick={() => {
                        handleChange('heroBookCustomSpineImage', '');
                        triggerToast('Lomo restaurado al original.');
                      }}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Quitar imagen personalizada y usar original"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. GESTOR DE PORTADAS (CARRUSEL DE LIBROS) */}
        {activeTab === 'covers' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Carrusel de Libros y Portadas Bestseller
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Añade, edita o elimina las portadas que se exhiben en el carrusel de la página de inicio.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingCover({
                    id: Date.now(),
                    title: 'Nuevo Libro Bestseller',
                    genre: 'Negocios',
                    sales: '+2,500 Copias',
                    imageUrl:
                      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
                    bgGradient: 'from-amber-950 via-slate-900 to-black',
                    accentColor: '#D62828',
                    bestsellerRank: 'Top #1 Bestseller',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Nueva Portada</span>
              </button>
            </div>

            {/* Formulario para editar portada */}
            {editingCover && (
              <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-lg' : 'bg-[#141118] border-[#D62828]/50 shadow-xl'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828] mb-4">
                  {config.portfolioCovers.some((c) => c.id === editingCover.id) ? 'Editar Portada' : 'Nueva Portada'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <label className="block font-gotham font-bold mb-1">Título del Libro:</label>
                    <input
                      type="text"
                      value={editingCover.title}
                      onChange={(e) => setEditingCover({ ...editingCover, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Género:</label>
                    <input
                      type="text"
                      value={editingCover.genre}
                      onChange={(e) => setEditingCover({ ...editingCover, genre: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Récord / Ventas (ej. +2,500 Copias):</label>
                    <input
                      type="text"
                      value={editingCover.sales}
                      onChange={(e) => setEditingCover({ ...editingCover, sales: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Badge (ej. Top #1 Bestseller):</label>
                    <input
                      type="text"
                      value={editingCover.bestsellerRank}
                      onChange={(e) => setEditingCover({ ...editingCover, bestsellerRank: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">URL de la Imagen de Portada:</label>
                    <input
                      type="text"
                      value={editingCover.imageUrl || ''}
                      onChange={(e) => setEditingCover({ ...editingCover, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingCover(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      addOrUpdateCover(editingCover);
                      setEditingCover(null);
                      triggerToast('Portada guardada en el carrusel.');
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black cursor-pointer"
                  >
                    Guardar Portada
                  </button>
                </div>
              </div>
            )}

            {/* Listado de portadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {config.portfolioCovers.map((cover) => (
                <div
                  key={cover.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#141118] border-white/10'
                  }`}
                >
                  <div className="aspect-[2/3] w-full overflow-hidden bg-black/40 relative">
                    {cover.imageUrl ? (
                      <img
                        src={cover.imageUrl}
                        alt={cover.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-slate-400 font-gotham font-bold">
                        {cover.title}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#D62828] text-white text-[10px] font-gotham font-bold">
                      {cover.bestsellerRank}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-gotham font-bold text-xs truncate mb-0.5">{cover.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{cover.genre} • {cover.sales}</p>
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-white/5">
                      <button
                        onClick={() => setEditingCover(cover)}
                        className="text-[11px] font-gotham font-bold text-[#D62828] hover:underline cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la portada "${cover.title}"?`)) {
                            deleteCover(cover.id);
                            triggerToast('Portada eliminada.');
                          }
                        }}
                        className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. GESTOR DE TESTIMONIOS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Testimonios de Clientes y Autores
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Gestiona las experiencias, reseñas y sellos de Bestseller que aparecen en la prueba social.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingTestimonial({
                    id: Date.now(),
                    name: 'Nuevo Autor',
                    role: 'Empresario & Autor',
                    book: 'Título de su Libro',
                    metric: '#1 en Ventas Amazon',
                    copies: '+1,500 Copias',
                    rating: 5,
                    quote:
                      'La maquetación y la portada superaron todas mis expectativas. En 48 horas estábamos en el Top 10.',
                    avatar:
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Testimonio</span>
              </button>
            </div>

            {editingTestimonial && (
              <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-lg' : 'bg-[#141118] border-[#D62828]/50 shadow-xl'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828] mb-4">
                  {config.testimonials.some((t) => t.id === editingTestimonial.id) ? 'Editar Testimonio' : 'Nuevo Testimonio'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <label className="block font-gotham font-bold mb-1">Nombre del Autor:</label>
                    <input
                      type="text"
                      value={editingTestimonial.name}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Rol / Profesión:</label>
                    <input
                      type="text"
                      value={editingTestimonial.role}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Título del Libro:</label>
                    <input
                      type="text"
                      value={editingTestimonial.book}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, book: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Métrica / Badge:</label>
                    <input
                      type="text"
                      value={editingTestimonial.metric}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, metric: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Cita / Testimonio:</label>
                    <textarea
                      rows={2}
                      value={editingTestimonial.quote}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">URL de Foto / Avatar:</label>
                    <input
                      type="text"
                      value={editingTestimonial.avatar}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingTestimonial(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      addOrUpdateTestimonial(editingTestimonial);
                      setEditingTestimonial(null);
                      triggerToast('Testimonio guardado.');
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black cursor-pointer"
                  >
                    Guardar Testimonio
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#141118] border-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#D62828]/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-gotham font-bold text-xs leading-tight">{t.name}</h4>
                        <span className="text-[11px] text-slate-400">{t.role}</span>
                      </div>
                    </div>
                    <div className="text-[11px] font-gotham font-bold text-[#D62828] mb-1">
                      {t.book} • {t.metric}
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-800' : 'text-slate-300'} italic leading-relaxed mb-3`}>
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <button
                      onClick={() => setEditingTestimonial(t)}
                      className="font-gotham font-bold text-[#D62828] hover:underline cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Eliminar el testimonio de "${t.name}"?`)) {
                          deleteTestimonial(t.id);
                          triggerToast('Testimonio eliminado.');
                        }
                      }}
                      className="text-rose-500 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. GESTOR DE BOOKTRAILERS */}
        {activeTab === 'booktrailers' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Booktrailers Cinematográficos 4K
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Administra los trailers de libros, duraciones y previews de video.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingBooktrailer({
                    id: Date.now(),
                    title: 'Trailer Cinematográfico',
                    genre: 'Ficción / Thriller',
                    duration: '0:45',
                    views: '12.4K',
                    youtubeUrl: 'https://www.youtube.com/watch?v=kYfxT2T_D08',
                    thumbnail:
                      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
                    videoPlaceholderTag: 'Teaser 4K',
                    directorNote: 'Producido para conversión en redes',
                    synopsis: 'Un teaser que eleva la tasa de conversión en redes.',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Booktrailer</span>
              </button>
            </div>

            {editingBooktrailer && (
              <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-lg' : 'bg-[#141118] border-[#D62828]/50 shadow-xl'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828] mb-4">
                  {config.booktrailers.some((b) => b.id === editingBooktrailer.id) ? 'Editar Trailer' : 'Nuevo Trailer'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <label className="block font-gotham font-bold mb-1">Título del Proyecto:</label>
                    <input
                      type="text"
                      value={editingBooktrailer.title}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Género:</label>
                    <input
                      type="text"
                      value={editingBooktrailer.genre}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, genre: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Duración (ej. 0:45):</label>
                    <input
                      type="text"
                      value={editingBooktrailer.duration}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Tag / Formato (ej. 4K Ultra HD):</label>
                    <input
                      type="text"
                      value={editingBooktrailer.videoPlaceholderTag}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, videoPlaceholderTag: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>

                  {/* Campo de Enlace de YouTube */}
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-[#D62828]" />
                        <span>Enlace de YouTube (URL completa o ID):</span>
                      </span>
                      {editingBooktrailer.youtubeUrl ? (
                        <span className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Video Conectado
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-500 font-mono">
                          Sin enlace (usará demo)
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v=kYfxT2T_D08 o https://youtu.be/kYfxT2T_D08"
                      value={editingBooktrailer.youtubeUrl || ''}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, youtubeUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs text-[#D62828] font-bold"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Al hacer clic en Play en la web pública, el video de YouTube se reproducirá fluidamente dentro del reproductor interactivo.
                    </p>
                  </div>

                  {/* Campo de Miniatura (Thumbnail) con Subida de Archivo */}
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">URL o Archivo de Miniatura (Thumbnail):</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://... o sube una imagen"
                        value={editingBooktrailer.thumbnail}
                        onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, thumbnail: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs"
                      />
                      <input
                        type="file"
                        ref={trailerThumbInputRef}
                        onChange={(e) =>
                          handleGenericImageUpload(
                            e,
                            (url) => setEditingBooktrailer({ ...editingBooktrailer, thumbnail: url }),
                            'Miniatura del trailer cargada con éxito.'
                          )
                        }
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => trailerThumbInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-300 dark:hover:bg-white/20"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir</span>
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Sinopsis / Descripción Breve:</label>
                    <textarea
                      rows={2}
                      value={editingBooktrailer.synopsis}
                      onChange={(e) => setEditingBooktrailer({ ...editingBooktrailer, synopsis: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingBooktrailer(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      addOrUpdateBooktrailer(editingBooktrailer);
                      setEditingBooktrailer(null);
                      triggerToast('Booktrailer guardado.');
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black cursor-pointer"
                  >
                    Guardar Booktrailer
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {config.booktrailers.map((b) => (
                <div
                  key={b.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#141118] border-white/10'
                  }`}
                >
                  <div className="aspect-video w-full overflow-hidden bg-black relative">
                    <img
                      src={b.thumbnail}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                      {b.duration}
                    </div>
                    {b.youtubeUrl && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#D62828] text-white text-[9px] font-gotham font-bold flex items-center gap-1 shadow">
                        <Video className="w-2.5 h-2.5" />
                        <span>YouTube</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-gotham font-bold text-xs">{b.title}</h4>
                      <span className="text-[10px] text-[#D62828] font-gotham font-bold">{b.videoPlaceholderTag}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">{b.synopsis}</p>
                    {b.youtubeUrl && (
                      <p className="text-[10px] font-mono text-slate-500 truncate mb-3">
                        {b.youtubeUrl}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <button
                        onClick={() => setEditingBooktrailer(b)}
                        className="font-gotham font-bold text-[#D62828] hover:underline cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar booktrailer "${b.title}"?`)) {
                            deleteBooktrailer(b.id);
                            triggerToast('Booktrailer eliminado.');
                          }
                        }}
                        className="text-rose-500 hover:underline cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. GESTOR DE SERVICIOS EDITORIALES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Servicios Editoriales 360
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Personaliza los títulos, descripciones y características de cada servicio ofrecido.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingService({
                    id: Date.now(),
                    title: 'Nuevo Servicio Editorial',
                    tagline: 'Solución Integral',
                    iconName: 'BookOpen',
                    desc: 'Descripción detallada de la solución para autores.',
                    features: ['Entrega en alta resolución', 'Revisión técnica', 'Soporte prioritario'],
                    deliverables: 'Archivos listos para subir',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Servicio</span>
              </button>
            </div>

            {editingService && (
              <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-lg' : 'bg-[#141118] border-[#D62828]/50 shadow-xl'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828] mb-4">
                  {config.services.some((s) => s.id === editingService.id) ? 'Editar Servicio' : 'Nuevo Servicio'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <label className="block font-gotham font-bold mb-1">Título del Servicio:</label>
                    <input
                      type="text"
                      value={editingService.title}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Subtítulo / Tagline:</label>
                    <input
                      type="text"
                      value={editingService.tagline}
                      onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>

                  {/* Selector con Galería Interna de Iconos para el Servicio */}
                  <div className="sm:col-span-2 p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block font-gotham font-bold text-xs text-[#F5A623] flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
                        <span>Icono del Servicio (Galería Interna de Iconos):</span>
                      </label>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#D62828]/20 text-[#D62828] border border-[#D62828]/40">
                        Seleccionado: {editingService.iconName || 'Sparkles'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Haz clic en cualquiera de los iconos para asignarlo a este servicio editorial:
                    </p>

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                      {[
                        { name: 'Palette', label: 'Diseño', icon: Palette },
                        { name: 'Layers', label: 'Maqueta', icon: Layers },
                        { name: 'Film', label: 'Video', icon: Film },
                        { name: 'Rocket', label: 'Lanzar', icon: Rocket },
                        { name: 'BookOpen', label: 'Libro', icon: BookOpen },
                        { name: 'PenTool', label: 'Estilo', icon: PenTool },
                        { name: 'TrendingUp', label: 'Ventas', icon: TrendingUp },
                        { name: 'Target', label: 'Nicho', icon: Target },
                        { name: 'ShieldCheck', label: 'Legal', icon: ShieldCheck },
                        { name: 'Award', label: 'Bestseller', icon: Award },
                        { name: 'Megaphone', label: 'Anuncios', icon: Megaphone },
                        { name: 'Cpu', label: 'KDP SEO', icon: Cpu },
                        { name: 'Globe', label: 'Global', icon: Globe },
                        { name: 'FileText', label: 'Manuscrito', icon: FileText },
                        { name: 'Zap', label: 'Express', icon: Zap },
                        { name: 'Star', label: 'Reseñas', icon: Star },
                        { name: 'BarChart3', label: 'Métricas', icon: BarChart3 },
                        { name: 'Compass', label: 'Asesoría', icon: Compass },
                        { name: 'Printer', label: 'Imprenta', icon: Printer },
                        { name: 'Headphones', label: 'Audio', icon: Headphones },
                        { name: 'DollarSign', label: 'Regalías', icon: DollarSign },
                        { name: 'Users', label: 'Lectores', icon: Users },
                        { name: 'Lightbulb', label: 'Idea', icon: Lightbulb },
                        { name: 'Sparkles', label: 'Especial', icon: Sparkles },
                      ].map((item) => {
                        const IconComponent = item.icon;
                        const isSelected = (editingService.iconName || 'Sparkles') === item.name;
                        return (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => setEditingService({ ...editingService, iconName: item.name })}
                            className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D62828] text-white border-[#D62828] shadow-[0_0_12px_rgba(214,40,40,0.5)] scale-105'
                                : 'bg-[#141118] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                            title={item.name}
                          >
                            <IconComponent className="w-5 h-5" />
                            <span className="text-[9px] font-gotham font-medium truncate w-full text-center">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Descripción:</label>
                    <textarea
                      rows={2}
                      value={editingService.desc}
                      onChange={(e) => setEditingService({ ...editingService, desc: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Entregables Clave:</label>
                    <input
                      type="text"
                      value={editingService.deliverables}
                      onChange={(e) => setEditingService({ ...editingService, deliverables: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      addOrUpdateService(editingService);
                      setEditingService(null);
                      triggerToast('Servicio editorial guardado.');
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black cursor-pointer"
                  >
                    Guardar Servicio
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.services.map((s) => (
                <div
                  key={s.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#141118] border-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-gotham font-bold px-2 py-0.5 rounded-full bg-[#D62828]/10 text-[#D62828]">
                        {s.tagline}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                        Icono: {s.iconName || 'Sparkles'}
                      </span>
                    </div>
                    <h4 className="font-gotham font-black text-sm mb-1 text-[#D62828]">{s.title}</h4>
                    <p className={`text-xs ${isLight ? 'text-slate-800' : 'text-slate-300'} leading-relaxed mb-3`}>
                      {s.desc}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      <strong>Entrega:</strong> {s.deliverables}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs mt-3">
                    <button
                      onClick={() => setEditingService(s)}
                      className="font-gotham font-bold text-[#D62828] hover:underline cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Eliminar el servicio "${s.title}"?`)) {
                          deleteService(s.id);
                          triggerToast('Servicio eliminado.');
                        }
                      }}
                      className="text-rose-500 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. GESTOR DE PREGUNTAS FRECUENTES (FAQS) */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Preguntas Frecuentes (Centro de Respuestas)
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Gestiona las preguntas y respuestas oficiales mostradas en la página de FAQs.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingFaq({
                    id: 'faq-' + Date.now(),
                    category: 'kdp',
                    question: 'Nueva Pregunta sobre el proceso KDP',
                    answer: 'Respuesta completa y detallada para orientar al autor.',
                  })
                }
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Pregunta</span>
              </button>
            </div>

            {editingFaq && (
              <div className={`p-6 rounded-2xl border ${isLight ? 'bg-white border-slate-300 shadow-lg' : 'bg-[#141118] border-[#D62828]/50 shadow-xl'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828] mb-4">
                  {config.faqs.some((f) => f.id === editingFaq.id) ? 'Editar Pregunta FAQ' : 'Nueva Pregunta FAQ'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Pregunta:</label>
                    <input
                      type="text"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-gotham font-bold mb-1">Categoría:</label>
                    <select
                      value={editingFaq.category}
                      onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as FAQItem['category'] })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    >
                      <option value="kdp">Amazon KDP & Regalías</option>
                      <option value="diseno">Diseño & Maquetación</option>
                      <option value="tramites">ISBN & Derechos</option>
                      <option value="marketing">Marketing & Bestseller</option>
                      <option value="precios">Plazos & Precios</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-gotham font-bold mb-1">Respuesta Detallada:</label>
                    <textarea
                      rows={4}
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingFaq(null)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-xs font-gotham font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      addOrUpdateFaq(editingFaq);
                      setEditingFaq(null);
                      triggerToast('Pregunta FAQ guardada.');
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-black cursor-pointer"
                  >
                    Guardar FAQ
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {config.faqs.map((f) => (
                <div
                  key={f.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#141118] border-white/10'
                  }`}
                >
                  <div className="space-y-1 max-w-2xl">
                    <span className="text-[10px] font-mono uppercase text-[#D62828] font-bold">
                      [{f.category}]
                    </span>
                    <h4 className="font-gotham font-bold text-xs sm:text-sm">{f.question}</h4>
                    <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-400'} line-clamp-2`}>
                      {f.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingFaq(f)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-xs font-gotham font-bold hover:text-[#D62828] cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Deseas eliminar esta pregunta frecuente?')) {
                          deleteFaq(f.id);
                          triggerToast('FAQ eliminada.');
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. PLANES Y PRECIOS */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828]">
                Tarifas y Títulos de los Planes Editoriales
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Actualiza los precios y nombres de los 3 paquetes de lanzamiento para autores.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Plan Starter */}
              <div className={`p-6 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
                <span className="text-xs font-gotham font-bold text-slate-400 uppercase tracking-wider block">
                  Paquete 1 (Esencial)
                </span>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Nombre del Plan:</label>
                  <input
                    type="text"
                    value={formState.planStarterTitle}
                    onChange={(e) => handleChange('planStarterTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Precio en USD ($):</label>
                  <input
                    type="number"
                    value={formState.planStarterPrice}
                    onChange={(e) => handleChange('planStarterPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-black"
                  />
                </div>
              </div>

              {/* Plan Pro */}
              <div className={`p-6 rounded-3xl border space-y-4 ring-2 ring-[#D62828]/50 ${isLight ? 'bg-white border-[#D62828]' : 'bg-[#141118] border-[#D62828]'}`}>
                <span className="text-xs font-gotham font-bold text-[#D62828] uppercase tracking-wider block">
                  Paquete 2 (Bestseller Pro)
                </span>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Nombre del Plan:</label>
                  <input
                    type="text"
                    value={formState.planProTitle}
                    onChange={(e) => handleChange('planProTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Precio en USD ($):</label>
                  <input
                    type="number"
                    value={formState.planProPrice}
                    onChange={(e) => handleChange('planProPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-black text-[#D62828]"
                  />
                </div>
              </div>

              {/* Plan Elite */}
              <div className={`p-6 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
                <span className="text-xs font-gotham font-bold text-slate-400 uppercase tracking-wider block">
                  Paquete 3 (Élite 360)
                </span>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Nombre del Plan:</label>
                  <input
                    type="text"
                    value={formState.planEliteTitle}
                    onChange={(e) => handleChange('planEliteTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-gotham font-bold mb-1">Precio en USD ($):</label>
                  <input
                    type="number"
                    value={formState.planElitePrice}
                    onChange={(e) => handleChange('planElitePrice', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 text-xs font-black"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 11. LOGOTIPO */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-gotham text-xl font-black text-[#D62828]">
                Gestión del Logotipo de Best Book Marketing
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                Sube tus propios archivos SVG o PNG de marca tanto para el tema oscuro como para el tema claro.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Logo Blanco */}
              <div className={`p-6 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828]">
                  Logotipo para Fondo Oscuro (Blanco)
                </h3>
                <p className="text-xs text-slate-400">
                  Se muestra en el Header oscuro, Hero y Footer.
                </p>

                <div className="p-6 rounded-2xl bg-[#080709] border border-white/10 flex items-center justify-center min-h-[110px]">
                  {formState.logoWhiteUrl ? (
                    <img
                      src={formState.logoWhiteUrl}
                      alt="Logo Blanco"
                      className="max-h-12 object-contain"
                    />
                  ) : (
                    <BestBookLogo theme="dark" size="md" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={whiteLogoInputRef}
                    onChange={(e) => handleLogoUpload(e, 'white')}
                    accept="image/png, image/svg+xml, image/jpeg"
                    className="hidden"
                  />
                  <button
                    onClick={() => whiteLogoInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl bg-[#D62828] text-white text-xs font-gotham font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Logo Blanco</span>
                  </button>
                  {formState.logoWhiteUrl && (
                    <button
                      onClick={() => handleChange('logoWhiteUrl', '')}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Quitar logo subido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Logo Negro */}
              <div className={`p-6 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-300' : 'bg-[#141118] border-white/10'}`}>
                <h3 className="font-gotham font-black text-sm text-[#D62828]">
                  Logotipo para Fondo Claro (Negro)
                </h3>
                <p className="text-xs text-slate-400">
                  Se muestra cuando el usuario activa el tema claro en páginas interiores.
                </p>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-center min-h-[110px]">
                  {formState.logoBlackUrl ? (
                    <img
                      src={formState.logoBlackUrl}
                      alt="Logo Negro"
                      className="max-h-12 object-contain"
                    />
                  ) : (
                    <BestBookLogo theme="light" size="md" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={blackLogoInputRef}
                    onChange={(e) => handleLogoUpload(e, 'black')}
                    accept="image/png, image/svg+xml, image/jpeg"
                    className="hidden"
                  />
                  <button
                    onClick={() => blackLogoInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-gotham font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Logo Negro</span>
                  </button>
                  {formState.logoBlackUrl && (
                    <button
                      onClick={() => handleChange('logoBlackUrl', '')}
                      className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Quitar logo subido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. GESTOR DE FAVICON */}
        {activeTab === 'favicon' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828]">
                  Gestor de Favicon del Sitio Web
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Cambia el icono que aparece en la pestaña del navegador, marcadores y accesos directos.
                </p>
              </div>

              {formState.faviconUrl && (
                <button
                  onClick={() => {
                    handleChange('faviconUrl', '');
                    triggerToast('Favicon restaurado al diseño monograma predeterminado.');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-gotham font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Favicon Predeterminado</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Configuración y Subida */}
              <div
                className={`p-6 rounded-3xl border space-y-5 ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div>
                  <h3 className="font-gotham font-black text-sm text-[#D62828] mb-1">
                    Cargar Nuevo Favicon
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sube una imagen cuadrada en formato PNG, SVG, ICO o WEBP (recomendado: 64x64 px o 128x128 px).
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-gotham font-bold">
                    URL directa del Favicon:
                  </label>
                  <input
                    type="text"
                    placeholder="https://... o sube un archivo"
                    value={formState.faviconUrl || ''}
                    onChange={(e) => handleChange('faviconUrl', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-[#080709] border-slate-300 dark:border-white/10 font-mono text-xs text-[#D62828] font-bold"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="file"
                    ref={faviconInputRef}
                    onChange={(e) =>
                      handleGenericImageUpload(
                        e,
                        (url) => handleChange('faviconUrl', url),
                        'Nuevo Favicon cargado con éxito.'
                      )
                    }
                    accept="image/png, image/x-icon, image/svg+xml, image/webp"
                    className="hidden"
                  />
                  <button
                    onClick={() => faviconInputRef.current?.click()}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white text-xs font-gotham font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(214,40,40,0.3)] hover:brightness-110"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Subir Archivo de Favicon</span>
                  </button>
                  {formState.faviconUrl && (
                    <button
                      onClick={() => {
                        handleChange('faviconUrl', '');
                        triggerToast('Favicon personalizado eliminado.');
                      }}
                      className="p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer"
                      title="Eliminar y usar el predeterminado"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    El favicon se actualiza inmediatamente en el encabezado HTML del navegador y se mantendrá guardado de forma persistente.
                  </p>
                </div>
              </div>

              {/* Simulación de Pestaña del Navegador */}
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <h3 className="font-gotham font-black text-sm text-[#D62828]">
                  Vista Previa en Pestaña del Navegador
                </h3>
                <p className="text-xs text-slate-400">
                  Así se visualiza tu favicon en la barra superior de los navegadores modernos:
                </p>

                {/* Mockup de Navegador */}
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1c1a24] shadow-xl">
                  {/* Barra de pestañas */}
                  <div className="bg-[#141118] px-3 pt-3 flex items-center gap-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5 pb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* Pestaña Activa */}
                    <div className="bg-[#1c1a24] rounded-t-xl px-3 py-1.5 flex items-center gap-2 max-w-[240px] border-t border-x border-white/10">
                      {formState.faviconUrl ? (
                        <img
                          src={formState.faviconUrl}
                          alt="Favicon"
                          className="w-4 h-4 object-contain rounded-[2px]"
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-[2px] bg-[#D62828] flex items-center justify-center text-[9px] font-black text-white font-gotham">
                          B
                        </div>
                      )}
                      <span className="text-[11px] font-gotham font-bold text-white truncate">
                        Best Book Marketing | Lanzamiento
                      </span>
                    </div>
                  </div>

                  {/* Barra de direcciones URL simulada */}
                  <div className="p-3 bg-[#1c1a24] flex items-center gap-2 text-xs border-b border-white/5">
                    <div className="w-full bg-[#141118] rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span className="text-slate-200">https://</span>
                      <span className="text-white">bestbookmarketing.com</span>
                    </div>
                  </div>

                  {/* Muestrario de Resoluciones */}
                  <div className="p-4 bg-[#141118]/60 flex items-center justify-around">
                    <div className="text-center space-y-1">
                      <div className="w-4 h-4 mx-auto rounded flex items-center justify-center bg-black/40 border border-white/10 p-0.5">
                        {formState.faviconUrl ? (
                          <img src={formState.faviconUrl} alt="16x16" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[7px] font-black text-[#D62828]">B</span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 block">16x16 px</span>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="w-8 h-8 mx-auto rounded flex items-center justify-center bg-black/40 border border-white/10 p-1">
                        {formState.faviconUrl ? (
                          <img src={formState.faviconUrl} alt="32x32" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[12px] font-black text-[#D62828]">B</span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 block">32x32 px</span>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center bg-black/40 border border-white/10 p-2">
                        {formState.faviconUrl ? (
                          <img src={formState.faviconUrl} alt="64x64" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[20px] font-black text-[#D62828]">B</span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 block">64x64 px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 13. DESCARGAR PROYECTO (ZIP) Y COPIAS DE RESPALDO */}
        {activeTab === 'export_project' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-gotham text-xl font-black text-[#D62828] flex items-center gap-2">
                  <FolderArchive className="w-5 h-5" />
                  <span>Descargar Proyecto Completo en ZIP y Respaldos</span>
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                  Exporta todo el código fuente del proyecto para tenerlo en tu ordenador o guarda una copia de todos los datos y personalizaciones.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tarjeta 1: Cómo descargar el ZIP completo desde Google AI Studio */}
              <div
                className={`p-6 rounded-3xl border space-y-5 ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/20 flex items-center justify-center text-[#D62828]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-gotham font-black text-sm text-[#D62828]">
                      1. Descargar Código Fuente Completo (.ZIP)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Incluye todo el código React 18, TypeScript, Tailwind, Vite y componentes.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Para descargar el archivo <strong className="text-[#D62828]">.ZIP</strong> con el 100% del código fuente, utiliza la función nativa de exportación de la plataforma:
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#080709] border border-slate-200 dark:border-white/10 text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <strong className="block text-[#D62828] font-gotham">Menú Superior de AI Studio</strong>
                        <span>Mira en la esquina superior derecha de la pantalla (en la barra superior de Google AI Studio).</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#080709] border border-slate-200 dark:border-white/10 text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <strong className="block text-[#D62828] font-gotham">Menú de Opciones / Settings</strong>
                        <span>Haz clic en el icono de tres puntos <strong>( ⋮ )</strong> o en el menú de <strong>Settings / Configuración</strong>.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#080709] border border-slate-200 dark:border-white/10 text-xs">
                      <div className="w-5 h-5 rounded-full bg-[#D62828] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <strong className="block text-[#D62828] font-gotham">Selecciona "Export" &gt; "Download ZIP"</strong>
                        <span>Elige <strong>Download ZIP</strong> (o <em>Export to GitHub / ZIP</em>) para que comience la descarga inmediata del paquete comprimido a tu computadora.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    El archivo .ZIP descargado contiene la estructura completa del proyecto sin dependencias pesadas, listo para que abras tu terminal y ejecutes <code className="font-mono bg-black/40 px-1 py-0.5 rounded">npm install</code>.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2: Respaldo de Datos y Configuración (.JSON) */}
              <div
                className={`p-6 rounded-3xl border space-y-5 flex flex-col justify-between ${
                  isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-[#141118] border-white/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-gotham font-black text-sm text-[#D62828]">
                        2. Respaldo Inmediato de Configuración (.JSON)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Descarga en un clic todos los datos editados, leads y enlaces de booktrailers.
                      </p>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Genera una copia de seguridad directa con todos los contenidos que has configurado en este panel:
                  </p>

                  <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-400">
                    <li>Lista de booktrailers con enlaces de YouTube y miniaturas</li>
                    <li>Portadas de libros subidas al carrusel 3D</li>
                    <li>Portada, contraportada y lomo del libro 3D del Hero</li>
                    <li>Buzón de leads recibidos de autores</li>
                    <li>Textos, testimonios, FAQs y correo receptor configurado</li>
                  </ul>

                  <button
                    onClick={handleDownloadDataBackup}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-gotham font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Respaldo de Datos (.JSON)</span>
                  </button>
                </div>

                {/* Tarjeta 3: Pasos para ejecutar en local */}
                <div className="p-4 rounded-2xl bg-[#080709] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-gotham font-bold text-slate-300">
                    <Terminal className="w-4 h-4 text-[#D62828]" />
                    <span>Cómo arrancar el proyecto tras descomprimir el ZIP:</span>
                  </div>
                  <pre className="font-mono text-[11px] text-emerald-400 bg-black/60 p-2.5 rounded-xl overflow-x-auto">
{`# 1. Descomprime el archivo ZIP
# 2. Abre la terminal en esa carpeta y ejecuta:
npm install
npm run dev`}
                  </pre>
                  <p className="text-[10px] text-slate-400">
                    La web se abrirá automáticamente en <code className="text-[#D62828]">http://localhost:3000</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
