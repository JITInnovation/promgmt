import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AllocationService from '../services/allocation.service';
import AuthService from '../services/auth.service';

ChartJS.register(ArcElement, Tooltip, Legend);

const Developer = () => {
    const [chartData, setChartData] = useState({ datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            AllocationService.getUserAllocations(currentUser.id).then(
                response => {
                    if (response.data && response.data.length > 0) {
                        const data = {
                            labels: response.data.map(a => a.project.projectName),
                            datasets: [{
                                data: response.data.map(a => a.percentage),
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#4BC0C0',
                                    '#9966FF',
                                    '#FF9F40'
                                ]
                            }]
                        };
                        setChartData(data);
                    }
                    setLoading(false);
                },
                error => {
                    console.error("Error fetching allocations", error);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>My Allocations</h3>
            </header>
            <div style={{width: '50%', margin: 'auto'}}>
                {loading ? (
                    <p>Loading chart...</p>
                ) : (
                    chartData.datasets && chartData.datasets.length > 0 ? (
                        <Pie data={chartData} />
                    ) : (
                        <p>No allocation data to display.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Developer;
