import { supabase } from "@/utils/supabase";

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

type MealRow = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
};

const toMeal = (row: MealRow): Meal => ({
  id: row.id,
  name: row.name,
  calories: row.calories,
  protein: row.protein,
  carbs: row.carbs,
  fat: row.fat,
  createdAt: row.created_at,
});

export const getMeals = async (): Promise<Meal[]> => {
  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as MealRow[]).map(toMeal);
};

export const addMeal = async (
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  const { data, error } = await supabase
    .from("meals")
    .insert({
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    })
    .select()
    .single();

  if (error) throw error;
  return toMeal(data as MealRow);
};

export const deleteMeal = async (id: string): Promise<void> => {
  const { error } = await supabase.from("meals").delete().eq("id", id);

  if (error) throw error;
};

export const clearAllMeals = async (): Promise<void> => {
  const { error } = await supabase
    .from("meals")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) throw error;
};
