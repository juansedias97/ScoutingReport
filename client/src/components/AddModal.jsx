import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import axios from "axios";

const AddModal = ({ handleAdd }) => {
  const [show, setShow] = useState(false);
  const [players, setPlayers] = useState([]);
  const [scouts, setScouts] = useState([]);
  const [form, setForm] = useState({
    playerKey: 0,
    playerFirstName: "",
    playerLastName: "",
    scoutId: "",
    scoutName: "",
    comment: "",
    defenseRate: 1,
    reboundRate: 1,
    shootingRate: 1,
    assistRate: 1,
  });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setForm({
      playerKey: 0,
      playerFirstName: "",
      playerLastName: "",
      scoutId: "",
      scoutName: "",
      comment: "",
      defenseRate: 1,
      reboundRate: 1,
      shootingRate: 1,
      assistRate: 1,
    });
    setShow(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "scoutName") {
      if (value != "default") {
        const s = scouts?.find((s) => s.azureAdUserId === value);
        setForm((prev) => ({
          ...prev,
          scoutId: s.azureAdUserId,
          scoutName: s.name,
        }));
        return;
      }
      return;
    }

    if (name == "playerName") {
      if (value != "default") {
        const p = players?.find((s) => s.playerKey === parseInt(value));
        setForm((prev) => ({
          ...prev,
          playerKey: p.playerKey,
          playerLastName: p.lastName,
          playerFirstName: p.firstName,
        }));
        return;
      }

      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const submitNewReport = (report) => {
    handleAdd(report);
    handleClose();
  };
  const fetchPlayers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/GetAllPlayers",
      }).then((res) => {
        setPlayers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchScouts = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/GetActiveUsers",
      }).then((res) => {
        setScouts(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPlayers();
    fetchScouts();
  }, []);

  return (
    <>
      <button
        onClick={handleShow}
        className="py-2 px-4 rounded-full bg-[#611ff0] text-white"
      >
        Add New Report
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
      >
        <div className="m-4">
          <div>
            <h1 className="text-2xl">Add New Scouting Report</h1>
          </div>
          <form className="w-full my-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Player
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="playerName"
                    onChange={handleChange}
                  >
                    <option value="default">Please Select A Player</option>
                    {players &&
                      players.map((player) => {
                        return (
                          <option
                            key={player.playerKey}
                            value={player.playerKey}
                          >
                            {player.firstName} {player.lastName}
                          </option>
                        );
                      })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Scout
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="scoutName"
                    onChange={handleChange}
                  >
                    <option value="default">Please Select A Scout</option>
                    {scouts &&
                      scouts.map((scout) => {
                        return (
                          <option
                            key={scout.azureAdUserId}
                            value={scout.azureAdUserId}
                          >
                            {scout.name}
                          </option>
                        );
                      })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Defense Rate
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="defenseRate"
                    onChange={handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Rebound Rate
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="reboundRate"
                    onChange={handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Shooting Rate
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="shootingRate"
                    onChange={handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 whitespace-nowrap"
                  htmlFor="grid-state"
                >
                  Assist Rate
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="assistRate"
                    onChange={handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                className="block placeholder:text-black appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 p-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Insert Comments"
                name="comment"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
          <div className="flex gap-4 justify-end ">
            <button
              onClick={handleClose}
              className="hover:text-blue-700 hover:underline"
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 rounded-full bg-[#611ff0] text-white"
              onClick={() => submitNewReport(form)}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModal;
