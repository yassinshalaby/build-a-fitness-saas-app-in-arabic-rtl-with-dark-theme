import { useState } from "react";
import { Check, Dumbbell } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  gifUrl?: string;
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
      <div className="flex items-start gap-3">
        {/* GIF */}
        {exercise.gifUrl ? (
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-20 h-20 rounded-lg object-cover bg-secondary shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <Dumbbell className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base ${completed ? "text-success" : "text-foreground"}`}>
            {exercise.name}
          </h3>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
            <span>{exercise.sets} مجموعات</span>
            <span>{exercise.reps} تكرار</span>
            <span>راحة: {exercise.rest}</span>
          </div>
        </div>

        {/* Complete button */}
        <button
          onClick={() => setCompleted(!completed)}
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${
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
