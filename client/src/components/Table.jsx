import { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

const Table = () => {
  const [data, setData] = useState([]);

  const addRecord = async (report) => {
    try {
      const {
        playerKey,
        playerFirstName,
        playerLastName,
        scoutId,
        scoutName,
        comment,
        defenseRate,
        reboundRate,
        shootingRate,
        assistRate,
      } = report;
      const response = await axios({
        method: "post",
        url: `/CreateScoutingReport/`,
        data: {
          playerKey: playerKey,
          playerFirstName: playerFirstName,
          playerLastName: playerLastName,
          scoutId: scoutId,
          scoutName: scoutName,
          comment: comment,
          defenseRate: parseInt(defenseRate),
          reboundRate: parseInt(reboundRate),
          shootingRate: parseInt(shootingRate),
          assistRate: parseInt(assistRate),
        },
      });

      if (response.status == 200) {
        setData(response.data.value);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const deleteRecord = async (id) => {
    try {
      const response = await axios({
        method: "put",
        url: `/DeleteScoutingReport/${id}`,
      });
      if (response.status == 200) {
        setData(response.data.value);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const editRecord = async (report) => {
    try {
      const {
        reportKey,
        comment,
        defenseRate,
        reboundRate,
        shootingRate,
        assistRate,
      } = report;
      const response = await axios({
        method: "put",
        url: `/UpdateScoutingReport/${reportKey}`,
        data: {
          comment: comment,
          defenseRate: parseInt(defenseRate),
          reboundRate: parseInt(reboundRate),
          shootingRate: parseInt(shootingRate),
          assistRate: parseInt(assistRate),
        },
      });

      if (response.status == 200) {
        setData(response.data.value);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/GetScoutingReports",
      }).then((res) => {
        setData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="rounded-lg">
      {data.length > 0 ? (
        <div className="overflow-scroll">
          <table className="w-full h-full text-sm text-left drop-shadow-sm">
            <thead className="text-md text-white uppercase bg-[#611ff0] border">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Player Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Scout
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Defense Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Rebound Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Shooting Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Assist Rate
                </th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data.map((report) => (
                <tr
                  key={report.reportKey}
                  className="bg-white border-b font-bold drop-shadow-md"
                >
                  <td id={report.reportKey} className="p-4 text-center">
                    {
                      <div className="w-full flex justify-center gap-6">
                        <EditModal {...{ report }} handleEdit={editRecord} />
                        <DeleteModal
                          id={report.reportKey}
                          deleteRecord={deleteRecord}
                        />
                      </div>
                    }
                  </td>
                  <td className="p-4 text-center bg-gray-100">
                    {report.playerFirstName}, {report.playerLastName}
                  </td>
                  <td className="p-4 text-center ">{report.scoutName}</td>
                  <td className="p-4 text-center bg-gray-100">
                    {report.defenseRate}
                  </td>
                  <td className="p-4 text-center">{report.reboundRate}</td>
                  <td className="p-4 text-center bg-gray-100">
                    {report.shootingRate}
                  </td>
                  <td className="p-4 text-center">{report.assistRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <table className="w-full h-full text-sm text-left drop-shadow-lg">
            <thead className="text-md text-white uppercase bg-[#611ff0]">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Player Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Scout
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Defense Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Rebound Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Shooting Rate
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Assist Rate
                </th>
              </tr>
            </thead>
          </table>
          <div className="p-6 bg-gray-50 drop-shadow-lg w-full text-center m-4">
            No Records Found
          </div>
        </div>
      )}
      <div className="w-full flex justify-end my-4">
        <AddModal handleAdd={addRecord} />
      </div>
    </div>
  );
};

export default Table;
