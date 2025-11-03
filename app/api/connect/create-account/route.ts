
import Stripe from 'stripe'; export async function POST(){ const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); const a=await s.accounts.create({type:'express'}); return Response.json({accountId:a.id}); }
