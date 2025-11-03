
'use client';import { useState } from 'react'; import { signInWithEmailAndPassword } from 'firebase/auth'; import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation'; import Link from 'next/link';
export default function Login(){ const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [err,setErr]=useState(''); const r=useRouter();
  const onS=async(e:any)=>{e.preventDefault(); try{await signInWithEmailAndPassword(auth,email,pass); r.push('/dashboard');}catch{setErr('Invalid login');}};
  return(<main className="max-w-md mx-auto px-5 py-16"><h1 className="neon text-3xl font-extrabold">Login</h1>{err&&<p className="text-red-400 mt-2">{err}</p>}
    <form className="mt-4 space-y-3" onSubmit={onS}><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input type="password" className="input" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/><button className="btn btn-p w-full">Enter</button></form>
    <p className="mt-3 text-cyan-300/80">No account? <Link href="/auth/register" className="underline">Join</Link></p></main>);
}
