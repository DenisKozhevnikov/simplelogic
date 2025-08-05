import { CourseEntity } from "@Entities/courses";
import { useMemo } from "react";
import { ALL_TAGS } from "../../const/tag";

export function useFilteredCourses(
  courses?: CourseEntity[] | null,
  selectedTag?: string
) {
  return useMemo(() => {
    if (!courses) {
      return [];
    }

    if (selectedTag === ALL_TAGS || !selectedTag) {
      return courses;
    }

    return courses.filter((course) => course.tags?.includes(selectedTag));
  }, [courses, selectedTag]);
}
