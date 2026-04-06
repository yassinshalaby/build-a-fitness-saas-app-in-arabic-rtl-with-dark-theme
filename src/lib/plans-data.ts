import planPushPull from "@/assets/plan-push-pull.jpg";
import planFullBody from "@/assets/plan-full-body.jpg";
import planUpperLower from "@/assets/plan-upper-lower.jpg";
import planHome from "@/assets/plan-home.jpg";
import plan5Day from "@/assets/plan-5day.jpg";

export interface WorkoutPlan {
  id: string;
  title: string;
  titleEn: string;
  duration: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  levelEn: "Beginner" | "Intermediate" | "Advanced";
  badge?: "شائع" | "جديد";
  image: string;
  category: string;
  description: string;
  daysPerWeek: number;
  muscles: string[];
  recommended?: boolean;
  days: PlanDay[];
}

export interface PlanDay {
  day: number;
  title: string;
  focus: string;
  exercises: string[];
}

export const planCategories = [
  { id: "ppl", label: "Push Pull Legs" },
  { id: "fullbody", label: "Full Body" },
  { id: "upperlower", label: "Upper / Lower" },
  { id: "home", label: "تمارين منزلية" },
  { id: "5day", label: "5 Day Split" },
];

export const workoutPlans: WorkoutPlan[] = [
  // Push Pull Legs
  {
    id: "ppl-beginner",
    title: "برنامج Push Pull Legs للمبتدئين",
    titleEn: "Beginner Push Pull Legs",
    duration: "6-8 أسابيع",
    level: "مبتدئ",
    levelEn: "Beginner",
    badge: "شائع",
    image: planPushPull,
    category: "ppl",
    description: "برنامج مثالي للمبتدئين يركز على تقسيم العضلات بين دفع وسحب وأرجل. مناسب لبناء أساس قوي.",
    daysPerWeek: 3,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل", "باي", "تراي"],
    recommended: true,
    days: [
      { day: 1, title: "يوم الدفع", focus: "صدر + أكتاف + تراي", exercises: ["Bench Press", "Shoulder Press", "Triceps Pushdown", "Chest Fly", "Lateral Raise"] },
      { day: 2, title: "يوم السحب", focus: "ظهر + باي", exercises: ["Lat Pulldown", "Barbell Row", "Bicep Curl", "Face Pull", "Hammer Curl"] },
      { day: 3, title: "يوم الأرجل", focus: "أرجل + بطن", exercises: ["Squat", "Leg Press", "Leg Curl", "Calf Raise", "Plank"] },
    ],
  },
  {
    id: "ppl-intermediate",
    title: "برنامج PPL متوسط",
    titleEn: "Intermediate PPL",
    duration: "8-12 أسبوع",
    level: "متوسط",
    levelEn: "Intermediate",
    image: planPushPull,
    category: "ppl",
    description: "برنامج PPL متقدم مع حجم تدريب أعلى وتمارين مركبة أكثر.",
    daysPerWeek: 6,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل", "باي", "تراي"],
    days: [
      { day: 1, title: "Push A", focus: "صدر + أكتاف + تراي", exercises: ["Bench Press", "Incline DB Press", "OHP", "Lateral Raise", "Triceps Dip"] },
      { day: 2, title: "Pull A", focus: "ظهر + باي", exercises: ["Deadlift", "Pull-Up", "Barbell Row", "Face Pull", "Barbell Curl"] },
      { day: 3, title: "Legs A", focus: "أرجل", exercises: ["Squat", "Romanian Deadlift", "Leg Press", "Leg Curl", "Calf Raise"] },
      { day: 4, title: "Push B", focus: "صدر + أكتاف + تراي", exercises: ["Incline Bench", "DB Shoulder Press", "Cable Fly", "Lateral Raise", "Overhead Extension"] },
      { day: 5, title: "Pull B", focus: "ظهر + باي", exercises: ["Barbell Row", "Lat Pulldown", "Cable Row", "Rear Delt Fly", "Hammer Curl"] },
      { day: 6, title: "Legs B", focus: "أرجل", exercises: ["Front Squat", "Hip Thrust", "Leg Extension", "Leg Curl", "Calf Raise"] },
    ],
  },
  // Full Body
  {
    id: "fb-beginner",
    title: "برنامج Full Body للمبتدئين",
    titleEn: "Beginner Full Body",
    duration: "4-6 أسابيع",
    level: "مبتدئ",
    levelEn: "Beginner",
    badge: "جديد",
    image: planFullBody,
    category: "fullbody",
    description: "تمرين جسم كامل 3 أيام في الأسبوع. مثالي للمبتدئين لبناء القوة الأساسية.",
    daysPerWeek: 3,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل"],
    days: [
      { day: 1, title: "يوم A", focus: "جسم كامل", exercises: ["Squat", "Bench Press", "Barbell Row", "OHP", "Plank"] },
      { day: 2, title: "يوم B", focus: "جسم كامل", exercises: ["Deadlift", "Incline Press", "Lat Pulldown", "Lateral Raise", "Leg Curl"] },
      { day: 3, title: "يوم C", focus: "جسم كامل", exercises: ["Front Squat", "DB Press", "Cable Row", "Face Pull", "Calf Raise"] },
    ],
  },
  {
    id: "fb-advanced",
    title: "برنامج Full Body متقدم",
    titleEn: "Advanced Full Body",
    duration: "8 أسابيع",
    level: "متقدم",
    levelEn: "Advanced",
    image: planFullBody,
    category: "fullbody",
    description: "برنامج متقدم لتمرين الجسم بالكامل مع تمارين مركبة ثقيلة.",
    daysPerWeek: 4,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل", "بطن"],
    days: [
      { day: 1, title: "القوة A", focus: "جسم كامل - قوة", exercises: ["Squat", "Bench Press", "Barbell Row", "OHP", "Deadlift"] },
      { day: 2, title: "Hypertrophy A", focus: "جسم كامل - حجم", exercises: ["Leg Press", "DB Press", "Cable Row", "Lateral Raise", "Curl"] },
      { day: 3, title: "القوة B", focus: "جسم كامل - قوة", exercises: ["Front Squat", "Incline Bench", "Pull-Up", "DB OHP", "Romanian Deadlift"] },
      { day: 4, title: "Hypertrophy B", focus: "جسم كامل - حجم", exercises: ["Leg Extension", "Cable Fly", "Lat Pulldown", "Face Pull", "Triceps"] },
    ],
  },
  // Upper / Lower
  {
    id: "ul-beginner",
    title: "برنامج Upper Lower للمبتدئين",
    titleEn: "Beginner Upper Lower",
    duration: "6 أسابيع",
    level: "مبتدئ",
    levelEn: "Beginner",
    badge: "شائع",
    image: planUpperLower,
    category: "upperlower",
    description: "تقسيم بسيط بين الجزء العلوي والسفلي. مناسب جداً للمبتدئين.",
    daysPerWeek: 4,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل"],
    days: [
      { day: 1, title: "Upper A", focus: "جزء علوي", exercises: ["Bench Press", "Barbell Row", "OHP", "Lat Pulldown", "Bicep Curl"] },
      { day: 2, title: "Lower A", focus: "جزء سفلي", exercises: ["Squat", "Romanian Deadlift", "Leg Press", "Leg Curl", "Calf Raise"] },
      { day: 3, title: "Upper B", focus: "جزء علوي", exercises: ["Incline DB Press", "Cable Row", "DB OHP", "Pull-Up", "Triceps Pushdown"] },
      { day: 4, title: "Lower B", focus: "جزء سفلي", exercises: ["Front Squat", "Hip Thrust", "Leg Extension", "Leg Curl", "Plank"] },
    ],
  },
  // At Home
  {
    id: "home-beginner",
    title: "تمارين منزلية بدون أوزان",
    titleEn: "Bodyweight Home Workout",
    duration: "4 أسابيع",
    level: "مبتدئ",
    levelEn: "Beginner",
    badge: "جديد",
    image: planHome,
    category: "home",
    description: "برنامج تمارين منزلية بدون أي معدات. مثالي للبدء من البيت.",
    daysPerWeek: 4,
    muscles: ["صدر", "ظهر", "أرجل", "بطن"],
    days: [
      { day: 1, title: "جزء علوي", focus: "صدر + ظهر", exercises: ["Push-Up", "Diamond Push-Up", "Pike Push-Up", "Superman", "Plank"] },
      { day: 2, title: "جزء سفلي", focus: "أرجل + بطن", exercises: ["Squat", "Lunge", "Glute Bridge", "Calf Raise", "Crunch"] },
      { day: 3, title: "جزء علوي", focus: "أكتاف + ذراع", exercises: ["Wide Push-Up", "Tricep Dip", "Arm Circle", "Plank Tap", "Mountain Climber"] },
      { day: 4, title: "جزء سفلي", focus: "أرجل + بطن", exercises: ["Bulgarian Split Squat", "Wall Sit", "Step-Up", "Leg Raise", "Bicycle Crunch"] },
    ],
  },
  {
    id: "home-intermediate",
    title: "تمارين منزلية متوسطة",
    titleEn: "Intermediate Home Workout",
    duration: "6 أسابيع",
    level: "متوسط",
    levelEn: "Intermediate",
    image: planHome,
    category: "home",
    description: "برنامج منزلي متقدم مع تمارين أكثر تحدياً.",
    daysPerWeek: 5,
    muscles: ["صدر", "ظهر", "أرجل", "بطن", "أكتاف"],
    days: [
      { day: 1, title: "Push", focus: "صدر + أكتاف", exercises: ["Decline Push-Up", "Pike Push-Up", "Diamond Push-Up", "Plank to Push-Up", "Shoulder Tap"] },
      { day: 2, title: "Pull", focus: "ظهر", exercises: ["Inverted Row", "Superman", "Reverse Snow Angel", "Towel Row", "Back Extension"] },
      { day: 3, title: "Legs", focus: "أرجل", exercises: ["Pistol Squat", "Jump Squat", "Walking Lunge", "Single Leg Deadlift", "Calf Raise"] },
      { day: 4, title: "Core", focus: "بطن", exercises: ["Plank", "Side Plank", "V-Up", "Flutter Kick", "Russian Twist"] },
      { day: 5, title: "HIIT", focus: "كارديو", exercises: ["Burpee", "Mountain Climber", "Jump Squat", "High Knees", "Push-Up"] },
    ],
  },
  // 5 Day Split
  {
    id: "5day-intermediate",
    title: "برنامج 5 أيام Bro Split",
    titleEn: "5 Day Bro Split",
    duration: "8-12 أسبوع",
    level: "متوسط",
    levelEn: "Intermediate",
    badge: "شائع",
    image: plan5Day,
    category: "5day",
    description: "برنامج كلاسيكي 5 أيام مع تركيز على عضلة واحدة كل يوم.",
    daysPerWeek: 5,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل", "ذراع"],
    recommended: true,
    days: [
      { day: 1, title: "صدر", focus: "صدر", exercises: ["Bench Press", "Incline DB Press", "Cable Fly", "Chest Dip", "Pec Deck"] },
      { day: 2, title: "ظهر", focus: "ظهر", exercises: ["Deadlift", "Pull-Up", "Barbell Row", "Lat Pulldown", "Cable Row"] },
      { day: 3, title: "أكتاف", focus: "أكتاف", exercises: ["OHP", "Lateral Raise", "Face Pull", "Rear Delt Fly", "Shrug"] },
      { day: 4, title: "أرجل", focus: "أرجل", exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Leg Extension", "Leg Curl"] },
      { day: 5, title: "ذراعين", focus: "باي + تراي", exercises: ["Barbell Curl", "Triceps Pushdown", "Hammer Curl", "Overhead Extension", "Preacher Curl"] },
    ],
  },
  {
    id: "5day-advanced",
    title: "برنامج 5 أيام متقدم",
    titleEn: "Advanced 5 Day Split",
    duration: "12 أسبوع",
    level: "متقدم",
    levelEn: "Advanced",
    image: plan5Day,
    category: "5day",
    description: "برنامج متقدم مع حجم تدريب عالي وتكنيكات متقدمة.",
    daysPerWeek: 5,
    muscles: ["صدر", "ظهر", "أكتاف", "أرجل", "ذراع"],
    days: [
      { day: 1, title: "صدر + تراي", focus: "صدر + تراي", exercises: ["Bench Press", "Incline Press", "Cable Fly", "Dip", "Skull Crusher", "Pushdown"] },
      { day: 2, title: "ظهر + باي", focus: "ظهر + باي", exercises: ["Deadlift", "Pull-Up", "Barbell Row", "Cable Row", "Barbell Curl", "Hammer Curl"] },
      { day: 3, title: "أكتاف + بطن", focus: "أكتاف + بطن", exercises: ["OHP", "Arnold Press", "Lateral Raise", "Face Pull", "Cable Crunch", "Plank"] },
      { day: 4, title: "أرجل - Quad", focus: "أرجل أمامية", exercises: ["Squat", "Front Squat", "Leg Press", "Leg Extension", "Walking Lunge", "Calf Raise"] },
      { day: 5, title: "أرجل - Hamstring", focus: "أرجل خلفية", exercises: ["Romanian Deadlift", "Hip Thrust", "Leg Curl", "Bulgarian Split Squat", "Good Morning", "Calf Raise"] },
    ],
  },
];
