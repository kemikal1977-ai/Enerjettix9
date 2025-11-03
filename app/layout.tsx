
import './globals.css'; export const metadata={title:'Enerjettix Get-Fit',description:'Cyber-Neon Fitness'};
export default function Root({children}:{children:React.ReactNode}){
  return (<html lang="en"><body><div className="fixed inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(1200px 600px at 50% -10%, #00131a 0%, #000 55%)',opacity:.9}}></div><div className="relative">{children}</div></body></html>);
}
