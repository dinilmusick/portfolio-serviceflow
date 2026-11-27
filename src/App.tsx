import { useState } from 'react';
import { BarChart3, CalendarDays, CircleHelp, LayoutDashboard, Settings, Users } from 'lucide-react';
import MainPage from './frontend/pages/main/page';
import SettingsPage from './frontend/pages/settings/page';
type View='overview'|'services'|'bookings'|'customers'|'settings';
const nav:{id:View;label:string;icon:typeof LayoutDashboard}[]=[
{id:'overview',label:'Overview',icon:LayoutDashboard},{id:'services',label:'Services',icon:BarChart3},{id:'bookings',label:'Bookings',icon:CalendarDays},{id:'customers',label:'Customers',icon:Users},{id:'settings',label:'Settings',icon:Settings}];
export default function App(){
 const [view,setView]=useState<View>('overview'); const [theme,setTheme]=useState<'light'|'dark'>('light');
 return <div className={theme==='dark'?'app app-dark':'app'}>
  <aside className="sidebar"><div className="brand"><div className="brand-mark">S</div><div><strong>ServiceFlow</strong><span>OPERATIONS OS</span></div></div>
  <div className="workspace-card"><span className="eyebrow">WORKSPACE</span><strong>Northstar Studio</strong><span className="muted">Pro plan · 4 teammates</span></div>
  <nav aria-label="Primary navigation">{nav.map(item=><button key={item.id} className={view===item.id?'nav-item active':'nav-item'} onClick={()=>setView(item.id)}><item.icon size={17}/><span>{item.label}</span></button>)}</nav>
  <div className="sidebar-spacer"/><div className="sidebar-help"><CircleHelp size={16}/><span>Portfolio demo</span></div></aside>
  <div className="main-shell"><header className="topbar"><div><span className="eyebrow">WORKSPACE</span><h1>{nav.find(x=>x.id===view)?.label}</h1></div><div className="topbar-actions"><button className="theme-toggle" onClick={()=>setTheme(t=>t==='light'?'dark':'light')}>{theme==='light'?'Dark mode':'Light mode'}</button><div className="avatar">MP</div></div></header>
  <main className="content">{view==='settings'?<SettingsPage theme={theme} onThemeChange={setTheme}/>:<MainPage view={view}/>}</main></div>
 </div>;
}