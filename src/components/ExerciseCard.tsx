import { useState } from "react";
import {
  Check,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMuscleTranslation, getMuscleColor, getExerciseMeta } from "@/lib/exercise-meta";

export interface ExerciseData {
  name: string;
  gifUrl?: string;
  muscle: string;
  type: string;
  sets: number;
  reps: string;
  rest: string;
}

interface ExerciseCardProps {
  exercise: ExerciseData;
  index: number;
  onDone?: () => void;
  onSkip?: () => void;
}

export const ExerciseCard = ({ exercise, index, onDone, onSkip }: ExerciseCardProps) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [stepsOpen, setStepsOpen] = useState(false);
  const [easierOpen, setEasierOpen] = useState(false);
  const allDone = currentSet >= exercise.sets;
  const meta = getExerciseMeta(exercise.muscle);

  const handleDoneSet = () => {
    if (currentSet < exercise.sets) {
      setCurrentSet((s) => s + 1);
    }
    if (currentSet + 1 >= exercise.sets) {
      onDone?.();
    }
  };

  return (
    <div
      className={`bg-card border rounded-2xl overflow-hidden transition-all animate-fade-in ${
        allDone ? "border-success/50" : "border-border"
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top: GIF + Name + Badge */}
      <div className="flex gap-4 p-4">
        {exercise.gifUrl ? (
          exercise.gifUrl.endsWith(".mp4") ? (
            <video
              src={exercise.gifUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-24 h-24 rounded-xl object-cover bg-secondary shrink-0"
            />
          ) : (
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-24 h-24 rounded-xl object-cover bg-secondary shrink-0"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )
        ) : (
          <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <Dumbbell className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-foreground text-base leading-tight">{meta.nameAr}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{exercise.name}</p>
            </div>
            {/* Sets × Reps Badge */}
            <span className="shrink-0 gradient-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
              {exercise.sets}×{exercise.reps}
            </span>
          </div>

          {/* Muscle Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getMuscleColor(exercise.muscle)}`}>
              {getMuscleTranslation(exercise.muscle)}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {exercise.type}
            </span>
          </div>

          {/* Set Progress */}
          <div className="flex gap-1 mt-3">
            {Array.from({ length: exercise.sets }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < currentSet ? "gradient-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible Steps */}
      <div className="border-t border-border">
        <button
          onClick={() => setStepsOpen(!stepsOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="font-medium">خطوات التنفيذ</span>
          {stepsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {stepsOpen && (
          <div className="px-4 pb-4 space-y-2 animate-fade-in">
            {meta.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warning */}
      {meta.warning && (
        <div className="mx-4 mb-3 bg-warning/10 border border-warning/20 rounded-lg p-3 flex gap-2.5 items-start">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-warning leading-relaxed">{meta.warning}</p>
        </div>
      )}

      {/* Easier Version */}
      {meta.easierVersion && (
        <div className="border-t border-border">
          <button
            onClick={() => setEasierOpen(!easierOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="font-medium">نسخة أسهل</span>
            </span>
            {easierOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {easierOpen && (
            <div className="px-4 pb-4 animate-fade-in">
              <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg p-3 leading-relaxed">
                {meta.easierVersion}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-border p-4 flex gap-3 items-center">
        <span className="text-xs text-muted-foreground flex-1">
          {allDone ? (
            <span className="text-success font-medium flex items-center gap-1">
              <Check className="w-4 h-4" /> اكتمل التمرين!
            </span>
          ) : (
            <>المجموعة {currentSet + 1} من {exercise.sets} • راحة: {exercise.rest}</>
          )}
        </span>
        <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
          <SkipForward className="w-4 h-4 ml-1" />
          تخطي
        </Button>
        <Button
          variant="hero"
          size="sm"
          onClick={handleDoneSet}
          disabled={allDone}
        >
          <Check className="w-4 h-4 ml-1" />
          {allDone ? "تم" : "أنهِ المجموعة"}
        </Button>
      </div>
    </div>
  );
};
