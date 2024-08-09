"use client"
import {Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import moment from "moment/moment";

const BarChart = ({reports}: any) => {

    const data = {
        labels: reports?.map(item => moment(item?.month).format('MMMM')),
        datasets: [
            {
                label: 'Total Visit',
                data: reports?.map(item => item?.visit_counts),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Total Interaction',
                data: reports?.map(item => item?.call_counts),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    };

    // Bar chart options
    const options = {
        scales: {
            y: {
                // type: 'linear',
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <Bar data={data} options={options}/>
        </>
    );
};

export default BarChart;


