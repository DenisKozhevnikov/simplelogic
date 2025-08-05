import { CourseEntity } from "@Entities/courses";
import { useMemo } from "react";
import { ALL_TAGS } from "../../const/tag";

export function useCourseTags(courses?: CourseEntity[] | null) {
  return useMemo(() => {
    if (!courses?.length) {
      return [];
    }

    const tagsSet = new Set<string>();

    tagsSet.add(ALL_TAGS);

    courses.forEach((course) =>
      course.tags?.forEach((tag) => tagsSet.add(tag))
    );

    return Array.from(tagsSet);
  }, [courses]);
}
