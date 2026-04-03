import { BottomNav } from "@/components/BottomNav";
import { TrendingUp, Target, Flame, Award } from "lucide-react";

const weeklyData = [
  { day: "سبت", value: 45 },
  { day: "أحد", value: 60 },
  { day: "اثن", value: 0 },
  { day: "ثلا", value: 75 },
  { day: "أرب", value: 50 },
  { day: "خمي", value: 90 },
  { day: "جمع", value: 30 },
];

const achievements = [
  { icon: Flame, title: "7 أيام متتالية", desc: "أكملت أسبوعًا كاملاً!", unlocked: true },
  { icon: Target, title: "الهدف الأول", desc: "حققت أول هدف لك", unlocked: true },
  { icon: Award, title: "بطل الشهر", desc: "أفضل أداء خلال الشهر", unlocked: false },
];

const Progress = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground">تقدمك</h1>
        <p className="text-sm text-muted-foreground">تتبع إنجازاتك وتطورك</p>
      </div>

      {/* Summary Cards */}
      <div className="px-4 grid grid-cols-3 gap-3">
        {[
          { label: "هذا الأسبوع", value: "5.5 ساعة", icon: TrendingUp },
          { label: "السعرات", value: "3,400", icon: Flame },
          { label: "التمارين", value: "12", icon: Target },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-3 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">النشاط الأسبوعي</h2>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-end gap-2 h-40">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{d.value}د</span>
                <div
                  className={`w-full rounded-t-md transition-all ${d.value > 0 ? "gradient-primary" : "bg-secondary"}`}
                  style={{ height: `${Math.max(d.value, 5)}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body Stats */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">إحصائيات الجسم</h2>
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          {[
            { label: "الوزن", current: "78 كجم", change: "-2 كجم", positive: true },
            { label: "نسبة الدهون", current: "18%", change: "-1.5%", positive: true },
            { label: "الكتلة العضلية", current: "35 كجم", change: "+1 كجم", positive: true },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-muted-foreground">{stat.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">{stat.current}</span>
                <span className={`text-xs ${stat.positive ? "text-success" : "text-destructive"}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">الإنجازات</h2>
        <div className="space-y-3">
          {achievements.map((a, i) => (
            <div key={i} className={`bg-card border rounded-xl p-4 flex items-center gap-4 ${a.unlocked ? "border-primary/30" : "border-border opacity-50"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${a.unlocked ? "gradient-primary" : "bg-secondary"}`}>
                <a.icon className={`w-5 h-5 ${a.unlocked ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Progress;
