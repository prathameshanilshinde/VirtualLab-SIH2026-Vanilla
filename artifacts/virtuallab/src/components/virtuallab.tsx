import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowRight, Bell, Boxes, Check, ChevronDown, Clock3,
  Command, FileCode2, FlaskConical, LayoutDashboard,
  LogOut, Menu, Settings2, TerminalSquare, X,
} from 'lucide-react';
import { type Practical, type Role, student, faculty } from '@/lib/mock-data';

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline" data-testid="link-brand">
      <span className={`relative grid h-9 w-9 place-items-center rounded-xl ${dark ? 'bg-[#d8f25a] text-[#172031]' : 'bg-[#172031] text-[#d8f25a]'}`}>
        <span className="font-display text-sm font-bold">VL</span>
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#4b72f2]" />
      </span>
      <span className={`font-display text-[17px] font-bold tracking-[-.03em] ${dark ? 'text-[#f6f2e8]' : 'text-[#172031]'}`}>VirtualLab</span>
    </Link>
  );
}

export function Button({ children, variant = 'primary', className = '', type = 'button', onClick, disabled, testId }: {
  children: ReactNode; variant?: 'primary' | 'dark' | 'ghost' | 'outline' | 'lime' | 'danger'; className?: string;
  type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean; testId?: string;
}) {
  const styles = {
    primary: 'bg-[#416cf2] text-white shadow-[0_6px_14px_rgba(65,108,242,.2)] hover:bg-[#3358d6]',
    dark: 'bg-[#172031] text-[#f6f2e8] hover:bg-[#26334a]',
    ghost: 'bg-transparent text-[#435169] hover:bg-[#e9e6dc]',
    outline: 'border border-[#bac2cd] bg-transparent text-[#26334a] hover:bg-[#e9e6dc]',
    lime: 'bg-[#d8f25a] text-[#172031] hover:bg-[#c7e74b]',
    danger: 'bg-[#f9e2df] text-[#a13b34] hover:bg-[#f4d1cd]',
  };
  return <button type={type} onClick={onClick} disabled={disabled} data-testid={testId} className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}>{children}</button>;
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'blue' | 'lime' | 'orange' | 'violet' | 'danger' }) {
  const tones = {
    neutral: 'bg-[#e7e8e4] text-[#566274]',
    blue: 'bg-[#e1e9ff] text-[#3057c6]',
    lime: 'bg-[#ebf6bd] text-[#536800]',
    orange: 'bg-[#fde9d8] text-[#a35922]',
    violet: 'bg-[#ebe4fc] text-[#6950af]',
    danger: 'bg-[#f8dfdd] text-[#a03d36]',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.08em] ${tones[tone]}`} data-testid="status-badge">{children}</span>;
}

function navItems(role: Role) {
  return role === 'student'
    ? [
      { href: '/student/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/student/labs', label: 'Lab directory', icon: FlaskConical },
      { href: '/student/lab/linked-list', label: 'My workspace', icon: TerminalSquare },
    ]
    : [
      { href: '/faculty/dashboard', label: 'Overview', icon: LayoutDashboard },
      { href: '/faculty/practicals', label: 'Practicals', icon: FileCode2 },
    ];
}

export function Sidebar({ role, open, onClose }: { role: Role; open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  const person = role === 'student' ? student : faculty;
  return (
    <>
      {open && <button aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-30 bg-[#172031]/30 md:hidden" data-testid="button-close-sidebar" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[254px] flex-col bg-[#172031] px-4 py-5 text-[#e9e8e1] transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2">
          <Brand dark />
          <button onClick={onClose} className="rounded-md p-1 text-[#9ca7b9] hover:bg-[#26334a] md:hidden" aria-label="Close navigation" data-testid="button-sidebar-close"><X size={17} /></button>
        </div>
        <div className="mt-10 px-2">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#7c899c]">Workspace</p>
          <nav className="mt-3 space-y-1" aria-label="Primary navigation">
            {navItems(role).map(({ href, label, icon: Icon }) => {
              const active = location === href || (href.includes('dashboard') && location.endsWith('dashboard'));
              return <Link key={href} href={href} onClick={onClose} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`} className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-[#d8f25a] text-[#172031]' : 'text-[#aeb8c8] hover:bg-[#26334a] hover:text-[#f7f5ec]'}`}>
                <Icon size={17} strokeWidth={active ? 2.4 : 1.8} /><span>{label}</span>
                {label === 'My workspace' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#4b72f2]" />}
              </Link>;
            })}
          </nav>
        </div>
        <div className="mt-9 px-2">
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#7c899c]">Your account</p>
          <nav className="mt-3 space-y-1">
            <Link href={role === 'student' ? '/student/dashboard' : '/faculty/dashboard'} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#aeb8c8] hover:bg-[#26334a] hover:text-[#f7f5ec]" data-testid="link-settings"><Settings2 size={17} strokeWidth={1.8} /><span>Settings</span></Link>
            <button onClick={() => { window.location.href = '/login'; }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#aeb8c8] hover:bg-[#26334a] hover:text-[#f7f5ec]" data-testid="button-log-out"><LogOut size={17} strokeWidth={1.8} /><span>Sign out</span></button>
          </nav>
        </div>
        <div className="mt-auto rounded-xl border border-[#314057] bg-[#202d42] p-3">
          <div className="flex items-center gap-2.5">
            <Avatar initials={person.initials} />
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{person.name}</p><p className="truncate text-[11px] text-[#8997ab]">{role === 'student' ? student.id : faculty.id}</p></div>
            <ChevronDown size={14} className="ml-auto text-[#7c899c]" />
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-[#314057] pt-3 text-[10px] uppercase tracking-[.1em] text-[#8794a7]"><span className="h-1.5 w-1.5 rounded-full bg-[#d8f25a]" /> Mock session active</div>
        </div>
      </aside>
    </>
  );
}

export function Avatar({ initials, className = '' }: { initials: string; className?: string }) {
  return <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#d8f25a] font-display text-xs font-bold text-[#172031] ${className}`} data-testid="avatar-user">{initials}</span>;
}

export function Topbar({ role, onMenu }: { role: Role; onMenu: () => void }) {
  const [notice, setNotice] = useState('');
  const person = role === 'student' ? student : faculty;
  return <header className="relative flex h-[70px] items-center justify-between border-b border-[#d8d8d0] bg-[#f4f1ea]/85 px-5 backdrop-blur md:px-8">
    <div className="flex items-center gap-3"><button onClick={onMenu} className="rounded-lg p-2 hover:bg-[#e8e5dc] md:hidden" aria-label="Open navigation" data-testid="button-open-sidebar"><Menu size={20} /></button><div className="hidden items-center gap-2 text-xs text-[#8290a4] sm:flex"><span className="font-mono">VL /</span><span className="text-[#26334a]">{role === 'student' ? 'Student workspace' : 'Faculty workspace'}</span></div></div>
    <div className="flex items-center gap-4"><button onClick={() => setNotice('You are all caught up.')} className="relative rounded-lg p-2 text-[#536177] hover:bg-[#e8e5dc]" aria-label="Notifications" data-testid="button-notifications"><Bell size={18} strokeWidth={1.8} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#416cf2]" /></button><div className="hidden h-6 w-px bg-[#d5d4cd] sm:block" /><div className="flex items-center gap-2"><Avatar initials={person.initials} /><span className="hidden text-sm font-semibold text-[#26334a] sm:inline">{person.name.split(' ')[0]}</span></div></div>
    {notice && <Toast message={notice} onClose={() => setNotice('')} />}
  </header>;
}

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="noise min-h-[100dvh] bg-[#f4f1ea]"><Sidebar role={role} open={open} onClose={() => setOpen(false)} /><div className="min-h-[100dvh] md:pl-[254px]"><Topbar role={role} onMenu={() => setOpen(true)} /><main>{children}</main></div></div>;
}

export function StatCard({ label, value, detail, icon: Icon, tone = 'blue' }: { label: string; value: string; detail: string; icon: typeof Boxes; tone?: 'blue' | 'lime' | 'orange' }) {
  const accent = tone === 'lime' ? 'bg-[#d8f25a]' : tone === 'orange' ? 'bg-[#ffbe81]' : 'bg-[#416cf2]';
  return <div className="rounded-xl border border-[#d7d8d1] bg-[#fbfaf6] p-5 shadow-[0_1px_2px_rgba(23,32,47,.04)]" data-testid={`stat-${label.toLowerCase().replaceAll(' ', '-')}`}>
    <div className="flex items-start justify-between"><span className={`grid h-9 w-9 place-items-center rounded-lg ${accent} text-[#172031]`}><Icon size={18} strokeWidth={2} /></span><span className="font-mono text-[10px] uppercase tracking-[.14em] text-[#8994a4]">01 / 04</span></div>
    <p className="mt-5 text-[12px] font-medium uppercase tracking-[.1em] text-[#758096]">{label}</p><p className="mt-1 font-display text-[30px] font-bold tracking-[-.04em] text-[#172031]">{value}</p><p className="mt-1 text-xs text-[#758096]">{detail}</p>
  </div>;
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <div className="mb-5 flex items-end justify-between gap-3"><div>{eyebrow && <p className="mb-1 font-mono text-[10px] uppercase tracking-[.17em] text-[#416cf2]">{eyebrow}</p>}<h2 className="font-display text-xl font-bold tracking-[-.03em] text-[#172031]">{title}</h2></div>{action}</div>;
}

export function PracticalCard({ practical, compact = false }: { practical: Practical; compact?: boolean }) {
  const tones = { blue: 'bg-[#e1e9ff]', lime: 'bg-[#edf6bd]', orange: 'bg-[#fde4d0]', violet: 'bg-[#ebe4fc]' };
  const badgeTone = practical.status === 'In progress' ? 'blue' : practical.status === 'Submitted' ? 'lime' : practical.status === 'Published' ? 'lime' : 'neutral';
  return <div className={`group rounded-xl border border-[#d7d8d1] bg-[#fbfaf6] p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,32,47,.07)] ${compact ? '' : 'min-h-[188px]'}`} data-testid={`card-practical-${practical.id}`}>
    <div className="flex items-start justify-between gap-3"><span className={`grid h-9 w-9 place-items-center rounded-lg ${tones[practical.color]} text-[#26334a]`}><FileCode2 size={17} strokeWidth={1.8} /></span><Badge tone={badgeTone}>{practical.status}</Badge></div>
    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[.1em] text-[#7d899b]">{practical.course} / {practical.topic}</p><h3 className="mt-1 font-display text-[16px] font-bold leading-tight text-[#172031]">{practical.title}</h3>
    {practical.progress !== undefined && <div className="mt-4"><div className="flex justify-between text-[11px] text-[#758096]"><span>Progress</span><span className="font-mono text-[#26334a]">{practical.progress}%</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e5e6df]"><div className="h-full rounded-full bg-[#416cf2] transition-all" style={{ width: `${practical.progress}%` }} /></div></div>}
    <div className="mt-4 flex items-center justify-between text-xs text-[#788397]"><span className="flex items-center gap-1.5"><Clock3 size={13} />{practical.due}</span>{practical.submissions !== undefined && <span className="font-mono">{practical.submissions} submitted</span>}<ArrowRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" /></div>
  </div>;
}

export function EmptyState({ icon: Icon = TerminalSquare, title, description, action }: { icon?: typeof TerminalSquare; title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-[185px] flex-col items-center justify-center rounded-xl border border-dashed border-[#c5c9c6] bg-[#f7f6f0] px-6 text-center" data-testid="empty-state"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8eae4] text-[#67748a]"><Icon size={20} /></span><p className="mt-3 font-display text-sm font-bold text-[#26334a]">{title}</p><p className="mt-1 max-w-[330px] text-xs leading-relaxed text-[#7a8697]">{description}</p>{action && <div className="mt-4">{action}</div>}</div>;
}

export function Modal({ open, title, eyebrow, onClose, children }: { open: boolean; title: string; eyebrow?: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172031]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="modal-dialog"><div className="w-full max-w-[520px] rounded-2xl border border-[#d5d7d0] bg-[#fbfaf6] p-6 shadow-[0_24px_70px_rgba(23,32,47,.22)] fade-up"><div className="flex items-start justify-between"><div>{eyebrow && <p className="font-mono text-[10px] uppercase tracking-[.17em] text-[#416cf2]">{eyebrow}</p>}<h2 className="mt-1 font-display text-xl font-bold tracking-[-.03em]">{title}</h2></div><button onClick={onClose} className="rounded-lg p-1.5 text-[#768195] hover:bg-[#e9e6dc]" aria-label="Close modal" data-testid="button-close-modal"><X size={18} /></button></div>{children}</div></div>;
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-[#172031] px-4 py-3 text-sm text-[#f7f5ec] shadow-[0_12px_28px_rgba(23,32,47,.25)] fade-up" role="status" data-testid="toast-message"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#d8f25a] text-[#172031]"><Check size={13} strokeWidth={3} /></span>{message}<button onClick={onClose} aria-label="Dismiss notification" className="ml-2 text-[#9daabd]" data-testid="button-dismiss-toast"><X size={14} /></button></div>;
}

export function LogoMark() {
  return <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[#d8f25a] text-[#172031] shadow-[0_8px_18px_rgba(216,242,90,.2)]"><Command size={24} strokeWidth={2.4} /><span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#416cf2]" /></span>;
}