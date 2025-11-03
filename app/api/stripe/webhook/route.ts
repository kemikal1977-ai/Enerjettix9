
import Stripe from 'stripe'; import { initializeApp,cert,getApps } from 'firebase-admin/app'; import { getFirestore } from 'firebase-admin/firestore';
if(!getApps().length&&process.env.FIREBASE_SERVICE_ACCOUNT){ try{ initializeApp({credential:cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string))}); }catch{} }
export async function POST(req:Request){ const sig=req.headers.get('stripe-signature') as string; const raw=await req.text(); const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); let event;
  try{ event=s.webhooks.constructEvent(raw,sig,process.env.STRIPE_WEBHOOK_SECRET!);}catch(e:any){ return new Response('Webhook Error: '+e.message,{status:400}); }
  try{ const db=getFirestore();
    if(event.type==='checkout.session.completed'){ const session:any=event.data.object; const email=session.customer_details?.email; const customerId=session.customer as string; let plan='paid';
      if(session.mode==='subscription'&&session.subscription){ const sub=await s.subscriptions.retrieve(session.subscription as string); const priceId=sub.items.data[0]?.price?.id||''; if(priceId.includes('elite')) plan='elite'; else if(priceId.includes('fit')) plan='fit'; }
      if(email){ const snap=await db.collection('users').where('email','==',email).limit(1).get(); if(!snap.empty){ await snap.docs[0].ref.set({plan,customerId,active:true},{merge:true}); } }
    }
    if(event.type==='customer.subscription.deleted'){ const sub:any=event.data.object; const customerId=sub.customer; const snap=await db.collection('users').where('customerId','==',customerId).limit(1).get(); if(!snap.empty){ await snap.docs[0].ref.set({plan:'free',active:false},{merge:true}); } }
  }catch{}
  return new Response('OK',{status:200});
}
export const config={api:{bodyParser:false}} as any;
