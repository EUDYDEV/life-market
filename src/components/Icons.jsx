import {
  Search, Heart, Bell, User, Menu, X, MapPin, House, Compass, Plus, ArrowRight, Check, Zap, Phone, Star, Eye,
  MessageSquare, ChartColumn, LayoutGrid, List, CreditCard, Trash2, Share2, SlidersHorizontal, ShieldCheck, Gift,
  Send, Play, Tv, Shirt, Sparkles, Smartphone, Sofa, Apple, Baby, Car, Building2, Briefcase, Wrench,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

// Vraies icônes : Lucide (+ pictogramme WhatsApp officiel via react-icons).
const MAP = {
  search: Search, heart: Heart, bell: Bell, user: User, menu: Menu, close: X, pin: MapPin, home: House, compass: Compass,
  plus: Plus, arrow: ArrowRight, check: Check, bolt: Zap, phone: Phone, star: Star, eye: Eye, chat: MessageSquare,
  chart: ChartColumn, grid: LayoutGrid, list: List, card: CreditCard, trash: Trash2, share: Share2, filter: SlidersHorizontal,
  shield: ShieldCheck, gift: Gift, send: Send, play: Play, tv: Tv,
  mode: Shirt, beaute: Sparkles, tech: Smartphone, maison: Sofa, alimentation: Apple, enfants: Baby, vehicules: Car,
  immobilier: Building2, pro: Briefcase, services: Wrench,
};

export default function Icon({ name, size = 22, stroke = 1.9, fill = false, className = '' }) {
  if (name === 'whatsapp') return <FaWhatsapp className={`ico ${className}`} size={size} aria-hidden="true" />;
  const C = MAP[name];
  if (!C) return null;
  return <C className={`ico ${className}`} size={size} strokeWidth={stroke || 1.9} fill={fill ? 'currentColor' : 'none'} aria-hidden="true" />;
}
