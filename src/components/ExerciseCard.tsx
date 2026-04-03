import { useState } from "react";
import { Check } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

export const ExerciseCard = ({ exercise, index }: { exercise: Exercise; index: number }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className={`bg-card border rounded-xl p-4 transition-all animate-fade-in ${
        completed ? "border-success/50 bg-success/5" : "border-border"
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${completed ? "text-success" : "text-foreground"}`}>
            {exercise.name}
          </h3>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>{exercise.sets} مجموعات</span>
            <span>{exercise.reps} تكرار</span>
            <span>راحة: {exercise.rest}</span>
          </div>
        </div>
        <button
          onClick={() => setCompleted(!completed)}
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
            completed
              ? "border-success bg-success text-success-foreground"
              : "border-border hover:border-primary text-muted-foreground"
          }`}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
