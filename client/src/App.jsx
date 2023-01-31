import Table from "./components/Table";

const App = () => {
  return (
    <div className="w-screen h-screen xl:w-[80%] mx-auto flex justify-center items-center">
      <div className="w-full mx-4 my-auto p-8  flex flex-col gap-2 xl:gap-8 ">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-center text-2xl pb-4">
            Scouting Report
          </h4>
          <h6 className="text-lg text-center pb-4">
            Below you will find the current active Scouting Reports submitted.
          </h6>
        </div>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default App;
