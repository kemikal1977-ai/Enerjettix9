
'use client';import { useAuth } from '@/context/AuthContext'; import { useEffect,useState } from 'react'; import { db } from '@/firebase/config'; import { doc,updateDoc,getDoc } from 'firebase/firestore';
export default function Payouts(){ const {user}=useAuth(); const [acct,setAcct]=useState<string|null>(null); const [loading,setL]=useState(false);
  useEffect(()=>{(async()=>{const s=await getDoc(doc(db,'users',user.uid)); setAcct(s.data()?.connectAccountId||null)})()},[user?.uid]);
  const create=async()=>{ setL(True) }
  const onboard=async(id)=>{ const r=await fetch('/api/connect/onboard-link',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accountId:id,refreshUrl:location.href,returnUrl:location.href})}); const d=await r.json(); location.href=d.url; };
  const createAndOnboard=async()=>{ setL(true); const r=await fetch('/api/connect/create-account',{method:'POST'}); const d=await r.json(); await updateDoc(doc(db,'users',user.uid),{connectAccountId:d.accountId}); setAcct(d.accountId); setL(false); onboard(d.accountId); };
  const openDash=async()=>{ const r=await fetch('/api/connect/login-link',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({accountId:acct})}); const d=await r.json(); location.href=d.url; };
  return(<div className="p-6"><h1 className="neon text-2xl font-extrabold mb-4">Coach Payouts</h1>
    {!acct? <button className="btn btn-p" onClick={createAndOnboard} disabled={loading}>{loading?'Creating…':'Create & Onboard'}</button>
          : <div className="flex gap-3"><button className="btn btn-p" onClick={()=>onboard(acct!)}>Update Onboarding</button><button className="btn btn-o" onClick={openDash}>Open Stripe Dashboard</button></div>}
  </div>);
}
