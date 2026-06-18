
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function BranchStat() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
const [labels, setLabels] = useState([]);
    const [data1, setData] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/branch/stat", {
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
                setLabels(response.data?.labels || []);
                setData(response.data?.branchCount || []);
            } catch (error) {
                console.log(error);
            }
        };
        getInfo();
    }, [user.token]);
    useEffect(() => {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Accounts Count',
                    data: data1,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [labels, data1]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        