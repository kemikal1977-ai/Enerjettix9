
import Stripe from 'stripe'; export async function POST(req:Request){ const {accountId,refreshUrl,returnUrl}=await req.json(); const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); const l=await s.accountLinks.create({account:accountId,refresh_url:refreshUrl,return_url:returnUrl,type:'account_onboarding'}); return Response.json({url:l.url}); }
