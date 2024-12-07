import Day from "./Day";

function DaysBox() {
  const weekDays = ["Saturday", "Sunday", "Monday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="days">
      {weekDays.map((weekDay, i) => (
        <Day num={weekDay} key={i} />
      ))}
    </div>
  );
}

export default DaysBox;
