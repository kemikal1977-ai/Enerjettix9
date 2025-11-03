
'use client';import { useState } from 'react'; import { createUserWithEmailAndPassword } from 'firebase/auth'; import { auth,db } from '@/firebase/config';
import { doc,setDoc,updateDoc } from 'firebase/firestore'; import { useRouter } from 'next/navigation'; import Link from 'next/link';
export default function Register(){ const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [role,setRole]=useState('member'); const r=useRouter();
  const onS=async(e:any)=>{e.preventDefault(); const res=await createUserWithEmailAndPassword(auth,email,pass); await setDoc(doc(db,'users',res.user.uid),{email,role,plan:'free',createdAt:new Date()});
    try{ const rr=await fetch('/api/stripe/create-customer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,uid:res.user.uid})}); const d=await rr.json(); if(d.customerId){ await updateDoc(doc(db,'users',res.user.uid),{customerId:d.customerId}); } }catch{}
    r.push('/dashboard'); };
  return(<main className="max-w-md mx-auto px-5 py-16"><h1 className="neon text-3xl font-extrabold">Create Account</h1>
    <form className="mt-4 space-y-3" onSubmit={onS}><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input type="password" className="input" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/>
    <select className="input" value={role} onChange={e=>setRole(e.target.value)}><option value="member">Join as Member</option><option value="coach">Join as Coach</option></select>
    <button className="btn btn-p w-full">Start</button></form><p className="mt-3 text-cyan-300/80">Already joined? <Link href="/auth/login" className="underline">Login</Link></p></main>);
}
