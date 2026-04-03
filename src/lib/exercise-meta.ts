// Rich metadata for exercises - keyed by partial English name match
// This provides Arabic translations, instructions, warnings, and alternatives

export interface ExerciseMeta {
  nameAr: string;
  steps: string[];
  warning?: string;
  easierVersion?: string;
}

const muscleTranslations: Record<string, string> = {
  "Chest": "صدر",
  "Back (Lats)": "ظهر عريضة",
  "Back (Upper Back)": "ظهر علوي",
  "Back (Traps)": "ترابيز",
  "Shoulders": "أكتاف",
  "Arms (Biceps)": "بايسبس",
  "Arms (Triceps)": "ترايسبس",
  "Legs (Quads)": "أمامي أرجل",
  "Legs (Hamstrings)": "خلفي أرجل",
  "Legs (Glutes)": "مؤخرة",
  "Legs (Calves)": "سمانة",
  "Core": "بطن",
  "Full Body": "جسم كامل",
  "Cardio": "كارديو",
};

const muscleColors: Record<string, string> = {
  "Chest": "bg-red-500/20 text-red-400",
  "Back (Lats)": "bg-blue-500/20 text-blue-400",
  "Back (Upper Back)": "bg-blue-500/20 text-blue-400",
  "Back (Traps)": "bg-indigo-500/20 text-indigo-400",
  "Shoulders": "bg-yellow-500/20 text-yellow-400",
  "Arms (Biceps)": "bg-emerald-500/20 text-emerald-400",
  "Arms (Triceps)": "bg-teal-500/20 text-teal-400",
  "Legs (Quads)": "bg-purple-500/20 text-purple-400",
  "Legs (Hamstrings)": "bg-violet-500/20 text-violet-400",
  "Legs (Glutes)": "bg-pink-500/20 text-pink-400",
  "Legs (Calves)": "bg-fuchsia-500/20 text-fuchsia-400",
  "Core": "bg-orange-500/20 text-orange-400",
  "Full Body": "bg-cyan-500/20 text-cyan-400",
  "Cardio": "bg-rose-500/20 text-rose-400",
};

// Generic metadata by muscle group for exercises without specific metadata
const genericMeta: Record<string, ExerciseMeta> = {
  "Chest": {
    nameAr: "تمرين صدر",
    steps: [
      "استلقِ على البنش مع تثبيت قدميك على الأرض",
      "أمسك البار/الدمبل بقبضة مناسبة",
      "أنزل الوزن ببطء حتى يلامس صدرك",
      "ادفع الوزن للأعلى بقوة مع الزفير",
    ],
    warning: "لا تقوّس ظهرك بشكل مبالغ فيه وتجنب قفل المرفقين في الأعلى",
    easierVersion: "استخدم وزن أخف أو جرب الدفع على الأرض (Push-up)",
  },
  "Arms (Triceps)": {
    nameAr: "تمرين ترايسبس",
    steps: [
      "ثبّت مرفقيك بجانب جسمك",
      "ابدأ من وضع الانثناء الكامل",
      "مدّ ذراعيك ببطء مع التحكم في الوزن",
      "ارجع للوضع الأصلي ببطء",
    ],
    warning: "لا تحرك مرفقيك أثناء التمرين - يجب أن يبقيا ثابتين",
    easierVersion: "استخدم الكابل بدلاً من الأوزان الحرة للتحكم الأفضل",
  },
  "Arms (Biceps)": {
    nameAr: "تمرين بايسبس",
    steps: [
      "قف بشكل مستقيم مع إمساك الوزن",
      "ارفع الوزن بثني المرفق فقط",
      "اضغط عند القمة لثانية",
      "أنزل الوزن ببطء للوضع الأصلي",
    ],
    warning: "تجنب التأرجح بالجسم واستخدم العضلة فقط",
    easierVersion: "استخدم بار EZ أو قم بالتمرين جالساً",
  },
  "Back (Lats)": {
    nameAr: "تمرين ظهر",
    steps: [
      "أمسك البار بقبضة أوسع من الكتفين",
      "اسحب لأسفل مع ضغط لوحي الكتف",
      "أنزل حتى مستوى الذقن",
      "ارجع ببطء للوضع الأصلي",
    ],
    warning: "لا تميل للخلف بشكل مبالغ فيه أثناء السحب",
    easierVersion: "استخدم جهاز المساعدة أو حبال المقاومة",
  },
  "Back (Traps)": {
    nameAr: "تمرين ترابيز",
    steps: [
      "قف بشكل مستقيم مع إمساك الأوزان",
      "ارفع كتفيك للأعلى نحو أذنيك",
      "ثبّت لثانيتين في الأعلى",
      "أنزل ببطء مع التحكم",
    ],
    warning: "لا تدوّر كتفيك - الحركة عمودية فقط",
    easierVersion: "ابدأ بدمبلز خفيفة قبل الانتقال للبار",
  },
  "Shoulders": {
    nameAr: "تمرين أكتاف",
    steps: [
      "اجلس أو قف بظهر مستقيم",
      "ارفع الوزن من مستوى الكتف للأعلى",
      "مدّ ذراعيك بالكامل دون قفل المرفق",
      "أنزل ببطء لمستوى الكتف",
    ],
    warning: "لا ترفع وزن أثقل مما تستطيع التحكم فيه - الكتف مفصل حساس",
    easierVersion: "استخدم جهاز الضغط بدلاً من الأوزان الحرة",
  },
  "Core": {
    nameAr: "تمرين بطن",
    steps: [
      "استلقِ على ظهرك مع ثني ركبتيك",
      "شدّ عضلات بطنك",
      "ارفع كتفيك عن الأرض مع الزفير",
      "ارجع ببطء مع الشهيق",
    ],
    warning: "لا تشد رقبتك بيديك - ركز على عضلات البطن",
    easierVersion: "ابدأ بتمرين البلانك الثابت لبناء الأساس",
  },
  "Legs (Glutes)": {
    nameAr: "تمرين مؤخرة",
    steps: [
      "قف بقدمين بعرض الكتفين",
      "ادفع وركك للخلف وانزل ببطء",
      "حافظ على ركبتيك في اتجاه أصابع قدميك",
      "ادفع من كعبيك للعودة للوقوف",
    ],
    warning: "لا تدع ركبتيك تتجاوز أصابع قدميك بشكل مبالغ فيه",
    easierVersion: "استخدم وزن الجسم فقط أو جرب السكوات على الكرسي",
  },
  "Legs (Quads)": {
    nameAr: "تمرين أرجل أمامي",
    steps: [
      "اجلس على الجهاز مع تثبيت ظهرك",
      "مدّ ساقيك ببطء حتى الاستقامة",
      "ثبّت لثانية في الأعلى",
      "ارجع ببطء مع التحكم",
    ],
    warning: "لا تستخدم وزن ثقيل جداً يجعلك تفقد السيطرة",
    easierVersion: "قلل نطاق الحركة أو استخدم وزن أخف",
  },
  "Legs (Hamstrings)": {
    nameAr: "تمرين أرجل خلفي",
    steps: [
      "استلقِ على جهاز ثني الساق",
      "ثبّت وركك على المقعد",
      "اثنِ ساقيك للخلف ببطء",
      "ارجع للوضع الأصلي مع التحكم",
    ],
    warning: "لا ترفع وركك عن المقعد أثناء الحركة",
    easierVersion: "جرب تمرين الجسر (Glute Bridge) كبديل",
  },
  "Legs (Calves)": {
    nameAr: "تمرين سمانة",
    steps: [
      "قف على حافة درجة بأصابع قدميك",
      "ارفع كعبيك للأعلى ببطء",
      "ثبّت في الأعلى لثانيتين",
      "أنزل ببطء تحت مستوى الدرجة للتمدد",
    ],
    warning: "لا تؤدي الحركة بسرعة - التحكم هو المفتاح",
    easierVersion: "قم بالتمرين على الأرض بدلاً من الدرجة",
  },
};

export function getMuscleTranslation(muscle: string): string {
  return muscleTranslations[muscle] || muscle;
}

export function getMuscleColor(muscle: string): string {
  return muscleColors[muscle] || "bg-muted text-muted-foreground";
}

export function getExerciseMeta(muscle: string): ExerciseMeta {
  return genericMeta[muscle] || {
    nameAr: "تمرين",
    steps: ["نفذ التمرين بالشكل الصحيح", "حافظ على التحكم في الوزن", "تنفس بشكل منتظم"],
    warning: "استخدم وزن مناسب لمستواك",
    easierVersion: "قلل الوزن أو عدد التكرارات",
  };
}
