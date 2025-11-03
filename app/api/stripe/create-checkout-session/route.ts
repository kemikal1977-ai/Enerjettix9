
import Stripe from 'stripe';
export async function POST(req:Request){ const {priceId,email}=await req.json(); const s=new Stripe(process.env.STRIPE_SECRET_KEY!,{apiVersion:'2024-06-20'} as any);
  const sess=await s.checkout.sessions.create({mode:'subscription',customer_email:email,line_items:[{price:priceId,quantity:1}],success_url:`${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,cancel_url:`${process.env.NEXT_PUBLIC_DOMAIN}/pricing`});
  return Response.json({url:sess.url});
}
