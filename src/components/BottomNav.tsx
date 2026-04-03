import { useNavigate } from "react-router-dom";
import { Home, Dumbbell, MessageCircle, BarChart3, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/dashboard" },
  { icon: Dumbbell, label: "التمارين", path: "/workout/1" },
  { icon: MessageCircle, label: "المساعد", path: "/chat" },
  { icon: BarChart3, label: "التقدم", path: "/progress" },
  { icon: Settings, label: "الإعدادات", path: "/settings" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border px-2 py-2 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path.split("/").slice(0, 2).join("/")) 
            || (item.path === "/dashboard" && location.pathname === "/dashboard");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[56px] ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
