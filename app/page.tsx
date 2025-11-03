
'use client';import Link from 'next/link';
export default function Home(){
  return(<main className="max-w-5xl mx-auto px-5 py-16">
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2"><img src="/logo.jpeg" className="h-8 w-8 rounded" alt="logo"/><span className="neon font-extrabold tracking-wide">ENERJETTIX GET-FIT</span></div>
      <nav className="space-x-4 text-cyan-300"><Link href="/pricing">Pricing</Link><Link href="/auth/register">Join</Link><Link href="/auth/login">Login</Link></nav>
    </header>
    <section className="mt-12"><h1 className="neon text-5xl font-extrabold">Train in the future.</h1>
      <p className="mt-3 text-cyan-300/80">Join as a member or coach, match smartly, watch workouts, and manage billing.</p>
      <div className="mt-5 flex gap-3 flex-wrap"><Link className="btn btn-p" href="/auth/register">Join</Link><Link className="btn btn-o" href="/pricing">View Pricing</Link></div>
    </section>
  </main>);
}
