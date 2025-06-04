const CourseIdPage = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  return (
    <div>
      <p>Curso {params.courseId}</p>
    </div>
  );
};

export default CourseIdPage;