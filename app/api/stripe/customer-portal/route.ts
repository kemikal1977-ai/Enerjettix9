
import Stripe from 'stripe'; export async function POST(req:Request){ const {customerId}=await req.json(); if(!customerId) return new Response('Missing customerId',{status:400});
  const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any); const session=await s.billingPortal.sessions.create({customer:customerId,return_url:`${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`});
  return Response.json({url:session.url});
}
