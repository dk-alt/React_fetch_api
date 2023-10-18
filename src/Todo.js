import "./styles.css";

export const Todo = ({ title, onClick }) => {
  return (
    <div className={"todo-box"}>
      <span> {title}</span>
      <button onClick={onClick}>x</button>
    </div>
  );
};
