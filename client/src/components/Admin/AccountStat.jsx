
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux'
import axios from 'axios';
export default function AccountStat() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
 const [labels, setLabels] = useState([]);
    const [data1, setData] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/account/adminStat", {
                    headers: {
                        "Authorization": "Bearer " + user.token
                    }
                });
                console.log(response)
                setLabels(response.data?.labels || []);
                setData(response.data?.accountCount || []);
            } catch (error) {
                console.log(error);
            }
        };
        getInfo();
    }, [user.token]);
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: labels,
            datasets: [
                {
                    data: data1,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                          documentStyle.getPropertyValue('--blue-400'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, [labels, data1]);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
        