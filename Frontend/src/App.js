import "./styles.css";
import { Data } from "./utils/data";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import Routes from './Routes/Routes';
import axios from "axios";

Chart.register(CategoryScale);
export default function App() {

  const [chartData, setChartData] = useState({});
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios("/api/customers/date/healthData");
        const jsonData = response.data.students;
        // setData(jsonData);
        setChartData({
          labels: jsonData.map((data) => data._id),
          datasets: [
            {
              label: "Users Gained ",
              data: jsonData.map((data) => data.totalSteps),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[])


  return (
    <div className="App">
        <Routes />
    </div>
  );
}
