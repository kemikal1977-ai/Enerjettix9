
'use client';import { createContext,useContext,useEffect,useState } from 'react'; import { auth,db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth'; import { doc,getDoc } from 'firebase/firestore';
type Role='member'|'coach'|'admin'; type U={uid:string;email:string;role:Role;plan?:string;customerId?:string|null;connectAccountId?:string|null}|null;
const C=createContext<any>(null); export const useAuth=()=>useContext(C);
export function AuthProvider({children}:{children:React.ReactNode}){
  const [user,setUser]=useState<U>(null); const [loading,setLoading]=useState(true);
  useEffect(()=> onAuthStateChanged(auth, async fb=>{ if(!fb){setUser(null);setLoading(false);return;}
    const s=await getDoc(doc(db,'users',fb.uid)); const d=s.data()||{}; setUser({uid:fb.uid,email:fb.email||'',role:d.role||'member',plan:d.plan||'free',customerId:d.customerId||null,connectAccountId:d.connectAccountId||null}); setLoading(false);
  }),[]);
  return <C.Provider value={{user,loading}}>{children}</C.Provider>;
}
