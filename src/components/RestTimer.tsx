import { useState, useEffect, useCallback, useRef } from "react";
import { SkipForward, Dumbbell, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMuscleTranslation, getMuscleColor, getExerciseMeta } from "@/lib/exercise-meta";
import type { ExerciseData } from "@/components/ExerciseCard";

interface RestTimerProps {
  durationSeconds: number;
  currentExercise: ExerciseData;
  nextExercise?: ExerciseData;
  onComplete: () => void;
  onSkip: () => void;
}

export const RestTimer = ({
  durationSeconds,
  currentExercise,
  nextExercise,
  onComplete,
  onSkip,
}: RestTimerProps) => {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [hasPlayedWarning, setHasPlayedWarning] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playPing = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio not supported
    }
  }, []);

  useEffect(() => {
    if (remaining <= 0) {
      playPing();
      onComplete();
      return;
    }

    if (remaining === 10 && !hasPlayedWarning) {
      playPing();
      setHasPlayedWarning(true);
    }

    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining, onComplete, playPing, hasPlayedWarning]);

  const meta = getExerciseMeta(currentExercise.muscle);
  const nextMeta = nextExercise ? getExerciseMeta(nextExercise.muscle) : null;

  // Circle progress
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = remaining / durationSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  // Pick a random tip from exercise steps
  const tipIndex = Math.floor(Date.now() / 10000) % meta.steps.length;
  const tip = meta.steps[tipIndex];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-between p-6 animate-fade-in">
      {/* Header */}
      <div className="text-center pt-8">
        <p className="text-muted-foreground text-sm">وقت الراحة</p>
        <h2 className="text-lg font-semibold text-foreground mt-1">{meta.nameAr}</h2>
      </div>

      {/* Timer Circle */}
      <div className="relative flex items-center justify-center">
        <svg width="260" height="260" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: remaining <= 10 ? "drop-shadow(0 0 10px hsl(var(--primary) / 0.6))" : "none",
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span
            className={`text-6xl font-bold tabular-nums ${
              remaining <= 10 ? "text-primary animate-pulse" : "text-foreground"
            }`}
          >
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
          {remaining <= 10 && (
            <span className="text-xs text-primary mt-1 flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              استعد!
            </span>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="w-full max-w-sm bg-card border border-border rounded-xl p-4 text-center">
        <p className="text-xs text-primary font-medium mb-1">💡 نصيحة</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
      </div>

      {/* Next Exercise Preview */}
      {nextExercise && nextMeta && (
        <div className="w-full max-w-sm">
          <p className="text-xs text-muted-foreground mb-2">التمرين القادم</p>
          <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
            {nextExercise.gifUrl ? (
              <img
                src={nextExercise.gifUrl}
                alt={nextExercise.name}
                className="w-14 h-14 rounded-lg object-cover bg-secondary shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground">{nextMeta.nameAr}</h4>
              <p className="text-xs text-muted-foreground truncate">{nextExercise.name}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getMuscleColor(nextExercise.muscle)}`}>
                  {getMuscleTranslation(nextExercise.muscle)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {nextExercise.sets}×{nextExercise.reps}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skip Button */}
      <div className="pb-6">
        <Button variant="ghost" onClick={onSkip} className="text-muted-foreground hover:text-foreground">
          <SkipForward className="w-4 h-4 ml-2" />
          تخطي الراحة
        </Button>
      </div>
    </div>
  );
};
