
'use client'; import { useState } from 'react'; import { useAuth } from '@/context/AuthContext';
export default function Pricing(){ const { user } = useAuth(); const [loading,setL]=useState<string|false>(false);
  const go=async(id:string)=>{ setL(id); const r=await fetch('/api/stripe/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({priceId:id,email:user?.email})}); const d=await r.json(); location.href=d.url; };
  return(<div className="max-w-5xl mx-auto px-5 py-12"><h1 className="neon text-3xl font-extrabold mb-6">Plans</h1>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card"><h3 className="font-bold">Free</h3><p>Browse basics</p></div>
      <div className="card"><h3 className="font-bold">Fit</h3><p>Workouts + chat</p><button onClick={()=>go('price_fit_123')} className="btn btn-p mt-3">{loading==='price_fit_123'?'Loading…':'Upgrade to Fit'}</button></div>
      <div className="card"><h3 className="font-bold">Elite</h3><p>Everything + sessions</p><button onClick={()=>go('price_elite_123')} className="btn btn-p mt-3">{loading==='price_elite_123'?'Loading…':'Upgrade to Elite'}</button></div>
    </div></div>);
}
