
'use client';import Link from 'next/link'; import { useAuth } from '@/context/AuthContext'; import { useEffect } from 'react'; import { useRouter } from 'next/navigation';
export default function L({children}:{children:React.ReactNode}){ const {user,loading}=useAuth(); const r=useRouter(); useEffect(()=>{if(!loading&&!user) r.push('/auth/login')},[user,loading]);
  if(loading||!user) return <div className="grid place-items-center h-screen">Loading…</div>;
  const nav=[{href:'/dashboard',t:'🏠'},{href:'/pricing',t:'💳'},{href:'/dashboard/profile',t:'⚙️'},{href:'/dashboard/coach/payouts',t:'💸'}];
  return(<div className="min-h-screen flex"><aside className="hidden md:flex flex-col w-20 border-r border-cyan-500/30">
    <div className="py-6 text-center neon font-bold">⚡</div>{nav.map(n=><Link key={n.href} className="py-5 text-center hover:bg-cyan-500/10" href={n.href}>{n.t}</Link>)}</aside>
    <div className="flex-1">{children}</div></div>);
}
