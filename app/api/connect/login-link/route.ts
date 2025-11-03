
import Stripe from 'stripe'; export async function POST(req:Request){ const {accountId}=await req.json(); const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); const l=await s.accounts.createLoginLink(accountId); return Response.json({url:l.url}); }
