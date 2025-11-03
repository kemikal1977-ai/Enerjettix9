
export default function D(){ const cards=[
  {t:'Pricing',e:'💳',h:'/pricing'},{t:'Profile',e:'⚙️',h:'/dashboard/profile'},{t:'Payouts (Coach)',e:'💸',h:'/dashboard/coach/payouts'}
]; return(<div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {cards.map(c=><a key={c.t} href={c.h} className="card"><div className="text-3xl">{c.e}</div><div className="mt-2 font-bold">{c.t}</div></a>)}
</div>); }
