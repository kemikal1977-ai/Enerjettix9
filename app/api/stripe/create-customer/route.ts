
import Stripe from 'stripe'; export async function POST(req:Request){ const {email,uid}=await req.json(); const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); const c=await s.customers.create({email,metadata:{firebase_uid:uid}}); return Response.json({customerId:c.id}); }
