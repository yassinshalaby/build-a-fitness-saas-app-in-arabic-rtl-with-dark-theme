import { BottomNav } from "@/components/BottomNav";
import { WorkoutPlans } from "@/components/WorkoutPlans";
import { Flame, Dumbbell, Clock, TrendingUp, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { externalSupabase } from "@/integrations/supabase/external-client";

const muscleTranslations: Record<string, string> = {
  "Chest": "صدر",
  "Back (Lats)": "ظهر",
  "Shoulders": "أكتاف",
  "Arms (Biceps)": "باي",
  "Arms (Triceps)": "تراي",
  "Legs (Quads)": "أرجل",
  "Legs (Glutes)": "مؤخرة",
  "Core": "بطن",
};

const stats = [
  { icon: Flame, label: "سعرات محروقة", value: "1,240", color: "text-primary" },
  { icon: Dumbbell, label: "تمارين اليوم", value: "3", color: "text-success" },
  { icon: Clock, label: "وقت التمرين", value: "75 د", color: "text-warning" },
  { icon: TrendingUp, label: "الأسبوع", value: "+12%", color: "text-primary" },
];

interface WorkoutGroup {
  id: string;
  title: string;
  muscles: string[];
  count: number;
}

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: workoutGroups, isLoading } = useQuery({
    queryKey: ["dashboard-workouts"],
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("saas_workouts")
        .select("muscle, type")
        .limit(500);
      if (error) throw error;

      // Group by muscle to create workout cards
      const muscleMap = new Map<string, { count: number; types: Set<string> }>();
      for (const ex of data || []) {
        const entry = muscleMap.get(ex.muscle) || { count: 0, types: new Set<string>() };
        entry.count++;
        if (ex.type) entry.types.add(ex.type);
        muscleMap.set(ex.muscle, entry);
      }

      const groups: WorkoutGroup[] = [];
      // Create paired workout groups
      const muscles = Array.from(muscleMap.keys());
      const chestIdx = muscles.indexOf("Chest");
      const tricepsIdx = muscles.indexOf("Arms (Triceps)");
      
      if (chestIdx !== -1 && tricepsIdx !== -1) {
        groups.push({
          id: "1",
          title: "تمرين الصدر والترايسبس",
          muscles: ["Chest", "Arms (Triceps)"],
          count: (muscleMap.get("Chest")?.count || 0) + (muscleMap.get("Arms (Triceps)")?.count || 0),
        });
      }

      const backIdx = muscles.indexOf("Back (Lats)");
      const bicepsIdx = muscles.indexOf("Arms (Biceps)");
      if (backIdx !== -1 && bicepsIdx !== -1) {
        groups.push({
          id: "2",
          title: "تمرين الظهر والباي",
          muscles: ["Back (Lats)", "Arms (Biceps)"],
          count: (muscleMap.get("Back (Lats)")?.count || 0) + (muscleMap.get("Arms (Biceps)")?.count || 0),
        });
      }

      const shouldersIdx = muscles.indexOf("Shoulders");
      const coreIdx = muscles.indexOf("Core");
      if (shouldersIdx !== -1 || coreIdx !== -1) {
        groups.push({
          id: "3",
          title: "تمرين الأكتاف والبطن",
          muscles: ["Shoulders", "Core"].filter(m => muscles.includes(m)),
          count: (muscleMap.get("Shoulders")?.count || 0) + (muscleMap.get("Core")?.count || 0),
        });
      }

      const legsExist = muscles.some(m => m.startsWith("Legs"));
      if (legsExist) {
        const legMuscles = muscles.filter(m => m.startsWith("Legs"));
        groups.push({
          id: "4",
          title: "تمرين الأرجل",
          muscles: legMuscles,
          count: legMuscles.reduce((sum, m) => sum + (muscleMap.get(m)?.count || 0), 0),
        });
      }

      return groups;
    },
  });

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 h-20 animate-pulse" />
            ))
          ) : workoutGroups?.map((w) => (
            <button
              key={w.id}
              onClick={() => navigate(`/workout/${w.id}`)}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-all text-right"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{w.title}</h3>
                <div className="flex gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                  {w.muscles.map(m => (
                    <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {muscleTranslations[m] || m}
                    </span>
                  ))}
                  <span>{w.count} تمرين متاح</span>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Workout Plans */}
      <WorkoutPlans />

      {/* Weekly Chart */}
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
