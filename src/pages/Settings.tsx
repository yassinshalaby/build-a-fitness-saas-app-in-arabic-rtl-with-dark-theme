import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Bell, Moon, Globe, Shield, HelpCircle, ChevronLeft } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate("/");
  };

  const settingsSections = [
    {
      title: "عام",
      items: [
        { icon: Bell, label: "الإشعارات", type: "toggle" as const, defaultOn: true },
        { icon: Moon, label: "الوضع الداكن", type: "toggle" as const, defaultOn: true },
        { icon: Globe, label: "اللغة", type: "link" as const, value: "العربية" },
      ],
    },
    {
      title: "الحساب",
      items: [
        { icon: Shield, label: "الخصوصية والأمان", type: "link" as const },
        { icon: HelpCircle, label: "المساعدة والدعم", type: "link" as const },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
            م
          </div>
          <div>
            <h3 className="font-semibold text-foreground">محمد أحمد</h3>
            <p className="text-sm text-muted-foreground">mohamed@email.com</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section, si) => (
        <div key={si} className="px-4 mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">{section.title}</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {section.items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 ${
                  i < section.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{item.label}</span>
                </div>
                {item.type === "toggle" ? (
                  <Switch defaultChecked={item.defaultOn} />
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {item.value && <span className="text-sm">{item.value}</span>}
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="px-4">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 ml-2" />
          تسجيل الخروج
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
