
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data: ${error}`);
        return null;
    }
};

(async () => {
    const data = await fetchData("https://raw.githubusercontent.com/FedeeBrescio/ProgettoTecno/main/PFE.json");
    console.log("Date:", data);

    //const filtro = data.filter()

    const labels = data.map(x => x.Date);
    const totaleData = data.map(x => x["High"]);
    console.log(totaleData);

    const ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "PFE",
                data: totaleData,
                borderColor: "rgba(0, 0, 255, 1)",
                hidden: false
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
        options: {
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true
                        }
                    }
                }
            }
        }
    });

})();