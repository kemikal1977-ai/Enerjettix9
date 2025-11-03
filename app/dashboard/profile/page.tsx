
'use client';import { useAuth } from '@/context/AuthContext'; import { useEffect,useState } from 'react'; import { doc,getDoc } from 'firebase/firestore'; import { db } from '@/firebase/config';
export default function Profile(){ const {user}=useAuth(); const [cust,setCust]=useState<string|null>(null); const [loading,setL]=useState(false);
  useEffect(()=>{(async()=>{const s=await getDoc(doc(db,'users',user.uid)); setCust(s.data()?.customerId||null)})()},[user?.uid]);
  const portal=async()=>{ if(!cust){alert('No Stripe customer yet'); return;} setL(true); const r=await fetch('/api/stripe/customer-portal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerId:cust})}); const d=await r.json(); location.href=d.url; };
  return(<div className="p-6"><h1 className="neon text-2xl font-extrabold mb-4">Profile & Billing</h1><p>{user.email}</p><a className="btn btn-o mt-3 inline-block" href="/pricing">Upgrade Plan</a><button className="btn btn-p ml-3" onClick={portal} disabled={loading}>{loading?'Opening…':'Manage Billing'}</button></div>);
}
