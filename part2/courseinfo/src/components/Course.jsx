const Header = ({ course }) => <h1>{course.name}</h1>;
const Content = ({ course }) => {
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return (
    <ul>
      {course.parts.map((part) => (
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
      ))}
      <li>
        <strong>total of {total} exercises</strong>
      </li>
    </ul>
  );
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
  </>
);
export default Course;
