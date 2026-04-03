import { BottomNav } from "@/components/BottomNav";
import { Flame, Dumbbell, Clock, TrendingUp, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const todayWorkouts = [
  { id: 1, title: "تمرين الصدر والترايسبس", duration: "45 دقيقة", exercises: 6, calories: 320 },
  { id: 2, title: "تمرين الكارديو", duration: "30 دقيقة", exercises: 4, calories: 250 },
];

const stats = [
  { icon: Flame, label: "سعرات محروقة", value: "1,240", color: "text-primary" },
  { icon: Dumbbell, label: "تمارين اليوم", value: "3", color: "text-success" },
  { icon: Clock, label: "وقت التمرين", value: "75 د", color: "text-warning" },
  { icon: TrendingUp, label: "الأسبوع", value: "+12%", color: "text-primary" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <p className="text-muted-foreground text-sm">مرحبًا بعودتك 👋</p>
        <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
      </div>

      {/* Stats */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Workouts */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">تمارين اليوم</h2>
        <div className="space-y-3">
          {todayWorkouts.map((w) => (
            <button
              key={w.id}
              onClick={() => navigate(`/workout/${w.id}`)}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-all text-right"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{w.title}</h3>
                <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{w.duration}</span>
                  <span>{w.exercises} تمارين</span>
                  <span>{w.calories} سعرة</span>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Chart Placeholder */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">نشاطك هذا الأسبوع</h2>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 55, 80, 45, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md gradient-primary transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {["سب", "أح", "اث", "ثل", "أر", "خم", "جم"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
