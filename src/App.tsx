import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Ship, 
  Calendar, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  LogOut, 
  Plus, 
  Wrench, 
  FileText,
  ChevronDown,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BOATS, RECENT_BOOKINGS, STATS, CUSTOMERS, NOTIFICATIONS } from './constants';
import { Boat } from './types';

interface BoatCardProps {
  boat: Boat;
}

const BoatCard: React.FC<BoatCardProps> = ({ boat }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 flex flex-col gap-4"
    >
      <div className="relative h-36 w-full rounded-2xl overflow-hidden">
        <img 
          src={boat.image} 
          alt={boat.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <Badge 
          className={cn(
            "absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm",
            boat.status === 'available' ? "bg-green-500 text-white" : 
            boat.status === 'booked' ? "bg-blue-500 text-white" : 
            "bg-orange-500 text-white"
          )}
        >
          {boat.status}
        </Badge>
      </div>
      
      <div className="space-y-1">
        <h4 className="font-bold text-base">{boat.name}</h4>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{boat.type}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-500">
          <Users size={14} className="opacity-60" />
          <span className="text-xs font-semibold">{boat.capacity} Guests</span>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 font-medium uppercase">Per Hour</p>
          <p className="text-sm font-bold font-mono text-black">${boat.pricePerHour}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'fleet':
        return <FleetView />;
      case 'bookings':
        return <BookingsView />;
      case 'customers':
        return <CustomersView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-main-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-24 bg-black flex flex-col items-end py-8 relative z-20">
        <div className="w-20 flex justify-center mb-12 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
            <Ship className="text-black w-7 h-7" />
          </div>
        </div>
        
        <nav className="flex flex-col w-full relative items-end">
          {/* Active Indicator Background */}
          <div 
            className="absolute right-0 w-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] pointer-events-none"
            style={{ 
              top: activeTab === 'dashboard' ? '0px' : 
                   activeTab === 'fleet' ? '80px' : 
                   activeTab === 'bookings' ? '160px' : 
                   activeTab === 'customers' ? '240px' : 
                   activeTab === 'notifications' ? '320px' : 
                   activeTab === 'settings' ? '400px' : '0px',
              height: '80px'
            }}
          >
            {/* The White Well / Notch */}
            <div className="absolute right-0 top-0 w-20 h-20 bg-main-bg rounded-l-[40px] flex items-center justify-center">
              {/* Top Curve */}
              <div className="absolute right-0 -top-8 w-8 h-8 bg-main-bg">
                <div className="w-full h-full bg-black rounded-br-[32px]" />
              </div>
              {/* Bottom Curve */}
              <div className="absolute right-0 -bottom-8 w-8 h-8 bg-main-bg">
                <div className="w-full h-full bg-black rounded-tr-[32px]" />
              </div>
              
              {/* Inner Black Circle */}
              <div className="w-14 h-14 bg-black rounded-full shadow-lg" />
            </div>
          </div>

          <SidebarItem 
            icon={<LayoutGrid size={22} />} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Ship size={22} />} 
            active={activeTab === 'fleet'} 
            onClick={() => setActiveTab('fleet')} 
          />
          <SidebarItem 
            icon={<Calendar size={22} />} 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')} 
          />
          <SidebarItem 
            icon={<Users size={22} />} 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')} 
          />
          <SidebarItem 
            icon={<Bell size={22} />} 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
          />
          <SidebarItem 
            icon={<Settings size={22} />} 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>

        <div className="w-20 h-20 flex items-center justify-center mt-auto">
          <button className="text-white/50 hover:text-white transition-colors">
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 flex flex-col w-full max-w-[1600px] mx-auto">
          {/* Top Bar */}
          <header className="h-20 px-8 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=nikitin" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold leading-tight flex items-center gap-2">
                Greetings! 👋
              </h2>
              <p className="text-xs text-gray-500">Start your day with SAILBOUND</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search bookings, boats, or customers..." 
                className="pl-10 bg-white/50 border-none rounded-2xl h-11 focus-visible:ring-1 focus-visible:ring-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="bg-black text-white rounded-2xl px-6 h-11 hover:bg-black/90 hover:text-white flex gap-2">
              <Avatar className="w-6 h-6 border border-white/20">
                <AvatarImage src="https://i.pravatar.cc/150?u=nikitin" />
              </Avatar>
              <span className="text-sm font-medium">My account</span>
              <ChevronDown size={16} className="opacity-50" />
            </Button>
          </div>
        </header>

        {/* View Content */}
        <ScrollArea className="flex-1 px-8 pb-8">
          {renderContent()}
        </ScrollArea>
        </div>
      </main>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gray-100/50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}

function SidebarItem({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <button 
        onClick={onClick}
        className={cn(
          "relative z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500",
          active 
            ? "text-[#FFB800] scale-110" 
            : "text-white/40 hover:text-white"
        )}
      >
        {icon}
      </button>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Cards Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Fleet Overview</h3>
            <button className="text-sm text-gray-400 hover:text-gray-600">See all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dark Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card-dark text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl min-h-[220px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm font-medium">Monthly Revenue</p>
                  <h4 className="text-4xl font-bold font-mono">$ 15,780.0</h4>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex justify-between items-end z-10">
                <div className="space-y-1">
                  <p className="text-xs font-mono tracking-widest text-gray-400">**** 1810</p>
                  <p className="text-xs font-medium">10/24</p>
                </div>
                <div className="text-2xl font-bold italic opacity-80">VISA</div>
              </div>

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            </motion.div>

            {/* Light Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl relative overflow-hidden shadow-sm border border-gray-100 min-h-[220px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start z-10">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm font-medium">Total Bookings</p>
                  <h4 className="text-4xl font-bold font-mono">1,424</h4>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex justify-between items-end z-10">
                <div className="space-y-1">
                  <p className="text-xs font-mono tracking-widest text-gray-400">ACTIVE FLEET</p>
                  <p className="text-xs font-medium">10/24</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-5 bg-gray-100 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-4">
          <ActionButton icon={<Plus size={20} />} label="New Booking" active />
          <ActionButton icon={<Ship size={20} />} label="Add Boat" />
          <ActionButton icon={<Wrench size={20} />} label="Maintenance" />
          <ActionButton icon={<FileText size={20} />} label="Reports" />
        </section>

        {/* Recent Bookings */}
        <section>
          <h3 className="text-xl font-bold mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-4 text-xs font-medium text-gray-400 px-4 mb-2">
              <div>Customer</div>
              <div>Date</div>
              <div>Status</div>
              <div className="text-right">Amount</div>
            </div>
            {RECENT_BOOKINGS.map((booking) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={booking.customerAvatar} />
                    <AvatarFallback>{booking.customerName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">{booking.customerName}</span>
                </div>
                <div className="text-sm text-gray-500">{booking.date}</div>
                <div>
                  <Badge 
                    className={cn(
                      "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none",
                      booking.status === 'success' ? "bg-green-100 text-green-600" : 
                      booking.status === 'process' ? "bg-blue-100 text-blue-600" : 
                      "bg-red-100 text-red-600"
                    )}
                  >
                    • {booking.status}
                  </Badge>
                </div>
                <div className="text-right font-mono font-bold text-sm">
                  -${booking.amount.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column - Statistics */}
      <div className="col-span-12 lg:col-span-4">
        <Card className="rounded-3xl border-none shadow-sm h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              Statistic <span className="text-gray-300 text-xs font-normal">ⓘ</span>
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 h-8 rounded-lg bg-gray-50">
              This week <ChevronDown size={14} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Donut Chart */}
            <div className="h-64 w-full relative mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Total</p>
                <p className="text-2xl font-bold font-mono">$14,810.0</p>
              </div>
              
              {/* Small floating stat bubble as seen in image */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                $9,560.0
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-between gap-4 mb-8">
              {STATS.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: stat.color }} />
                  <span className="text-[10px] text-gray-400 font-medium">{stat.name}</span>
                </div>
              ))}
            </div>

            {/* Transaction List */}
            <div className="space-y-6 mt-auto">
              <TransactionItem 
                icon={<Ship size={16} />} 
                title="Boat Rental" 
                subtitle="11 minutes ago" 
                amount="-321$" 
                color="bg-blue-100 text-blue-600"
              />
              <TransactionItem 
                icon={<Wrench size={16} />} 
                title="Maintenance" 
                subtitle="32 minutes ago" 
                amount="-552$" 
                color="bg-gray-100 text-gray-600"
              />
              <TransactionItem 
                icon={<Users size={16} />} 
                title="Crew Salary" 
                subtitle="1 hour ago" 
                amount="-123$" 
                color="bg-black text-white"
              />
              <TransactionItem 
                icon={<FileText size={16} />} 
                title="Insurance" 
                subtitle="3 hour 21 minutes ago" 
                amount="-242$" 
                color="bg-blue-100 text-blue-600"
              />
              <TransactionItem 
                icon={<Bell size={16} />} 
                title="Marketing" 
                subtitle="1 day ago" 
                amount="-160$" 
                color="bg-black text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FleetView() {
  const [filter, setFilter] = useState<'all' | 'available' | 'booked' | 'maintenance'>('all');
  
  const filteredBoats = BOATS.filter(boat => filter === 'all' || boat.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Fleet Management</h3>
          <p className="text-sm text-gray-500">Manage and monitor your entire fleet in one place.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          {(['all', 'available', 'booked', 'maintenance'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                filter === f ? "bg-black text-white" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBoats.map((boat) => (
            <motion.div
              key={boat.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <BoatCard boat={boat} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Add New Boat Placeholder */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-black hover:text-black transition-all min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="font-bold text-sm">Add New Vessel</span>
        </motion.button>
      </div>
    </div>
  );
}

function BookingsView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Bookings</h3>
          <p className="text-sm text-gray-500">Track and manage all vessel reservations.</p>
        </div>
        <Button className="bg-black text-white rounded-2xl px-6">
          <Plus size={18} className="mr-2" /> New Reservation
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="grid grid-cols-5 p-6 border-b border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-2">Customer & Vessel</div>
          <div>Date</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="divide-y divide-gray-50">
          {RECENT_BOOKINGS.map((booking) => (
            <div key={booking.id} className="grid grid-cols-5 p-6 items-center hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="col-span-2 flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={booking.customerAvatar} />
                  <AvatarFallback>{booking.customerName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="font-bold text-sm">{booking.customerName}</h5>
                  <p className="text-[10px] text-gray-400 font-medium">Vessel ID: {booking.boatId}</p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600">{booking.date}</div>
              <div>
                <Badge 
                  className={cn(
                    "rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none",
                    booking.status === 'success' ? "bg-green-100 text-green-600" : 
                    booking.status === 'process' ? "bg-blue-100 text-blue-600" : 
                    "bg-red-100 text-red-600"
                  )}
                >
                  {booking.status}
                </Badge>
              </div>
              <div className="text-right font-mono font-bold text-sm">
                ${booking.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomersView() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold">Customers</h3>
        <p className="text-sm text-gray-500">Manage your client relationships and loyalty.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CUSTOMERS.map((customer) => (
          <Card key={customer.id} className="rounded-3xl border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-14 h-14 border-2 border-gray-50">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback>{customer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{customer.name}</h4>
                  <Badge className={cn(
                    "rounded-full px-2 py-0 text-[9px] font-bold uppercase",
                    customer.status === 'VIP' ? "bg-yellow-100 text-yellow-700" :
                    customer.status === 'Regular' ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  )}>
                    {customer.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Mail size={14} />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{customer.bookings} Total Bookings</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl border-gray-100 font-bold text-xs uppercase tracking-wider">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold">Notifications</h3>
        <p className="text-sm text-gray-500">Stay updated with the latest activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex gap-4 items-start hover:bg-gray-50/50 transition-colors cursor-pointer">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
              notif.type === 'booking' ? "bg-blue-50 text-blue-500" :
              notif.type === 'alert' ? "bg-red-50 text-red-500" :
              notif.type === 'payment' ? "bg-green-50 text-green-500" :
              "bg-yellow-50 text-yellow-500"
            )}>
              {notif.type === 'booking' && <Calendar size={20} />}
              {notif.type === 'alert' && <AlertCircle size={20} />}
              {notif.type === 'payment' && <CreditCard size={20} />}
              {notif.type === 'review' && <MessageSquare size={20} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-bold text-base">{notif.title}</h5>
                <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold">Settings</h3>
        <p className="text-sm text-gray-500">Configure your profile and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-black text-white font-bold text-sm shadow-lg">
            Profile Settings
          </button>
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors">
            Fleet Configuration
          </button>
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors">
            Billing & Plans
          </button>
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors">
            Security
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-50 space-y-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-gray-50 shadow-sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=nikitin" />
              <AvatarFallback>NK</AvatarFallback>
            </Avatar>
            <div>
              <Button className="bg-black text-white rounded-xl text-xs h-9 px-4 mb-2">Change Photo</Button>
              <p className="text-[10px] text-gray-400 font-medium">Recommended size: 400x400px</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
              <Input defaultValue="Nikitin Kirill" className="bg-gray-50 border-none rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <Input defaultValue="nikitin@example.com" className="bg-gray-50 border-none rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
              <Input defaultValue="+1 (555) 000-0000" className="bg-gray-50 border-none rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Location</label>
              <Input defaultValue="Miami, FL" className="bg-gray-50 border-none rounded-xl h-12" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <Button variant="ghost" className="rounded-xl font-bold text-xs uppercase tracking-wider">Cancel</Button>
            <Button className="bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider px-8">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button 
      className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-200 font-medium text-sm shadow-sm",
        active 
          ? "bg-blue-400 text-white shadow-blue-200" 
          : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-100"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center",
        active ? "bg-white/20" : "bg-gray-100"
      )}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function TransactionItem({ icon, title, subtitle, amount, color }: { icon: React.ReactNode, title: string, subtitle: string, amount: string, color: string }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", color)}>
          {icon}
        </div>
        <div>
          <h5 className="text-sm font-bold leading-tight">{title}</h5>
          <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>
      <span className="font-mono font-bold text-sm">{amount}</span>
    </div>
  );
}

