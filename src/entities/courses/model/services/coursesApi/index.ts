import { useFetch } from "@Shared/api";
import { CourseEntity } from "../../types";

export function useCourses(
  options?: Parameters<typeof useFetch<CourseEntity[]>>[1]
) {
  return useFetch<CourseEntity[]>(
    "https://logiclike.com/docs/courses.json",
    options
  );
}
