import { useQuery } from "@tanstack/react-query";
import { externalSupabase } from "@/integrations/supabase/external-client";

export interface ExternalExercise {
  id: string;
  name: string;
  gif_url: string;
  muscle: string;
  type: string;
}

export const useExternalExercises = (muscle?: string, type?: string) => {
  return useQuery({
    queryKey: ["external-exercises", muscle, type],
    queryFn: async () => {
      let query = externalSupabase.from("saas_workouts").select("*");
      if (muscle) query = query.eq("muscle", muscle);
      if (type) query = query.eq("type", type);
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data as ExternalExercise[];
    },
  });
};

export const useExerciseMuscles = () => {
  return useQuery({
    queryKey: ["exercise-muscles"],
    queryFn: async () => {
      const { data, error } = await externalSupabase
        .from("saas_workouts")
        .select("muscle")
        .limit(1000);
      if (error) throw error;
      const unique = [...new Set((data as { muscle: string }[]).map((d) => d.muscle))].filter(Boolean);
      return unique;
    },
  });
};
