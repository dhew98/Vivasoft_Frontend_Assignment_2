


var data = [];
var scoreAscending = false;
const filterValues = item => item.score > 30;
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('table_body');

const scoreHeader = document.querySelector('#score_column');
document.addEventListener('DOMContentLoaded', () => {



    fetch('https://64743e827de100807b1a84ab.mockapi.io/api/v1/leaderboard/users')
        .then(response => response.json())
        .then(apiData => {
            data = apiData;
            renderTableRows(data);
        });

    searchInput.addEventListener('keyup', () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchText));
        renderTableRows(filteredData);
    });

});

const sortUserScores = () => {
    const tempData = [...data];
    tempData.sort((a, b) => scoreAscending ? a.score - b.score : b.score - a.score);
    const filteredData = tempData.filter(filterValues);
    const newData = tempData.map(item => ({ name: item.name, score: item.score }))
    scoreAscending = !scoreAscending;
    // while (tableBody.firstChild) {
    //     tableBody.removeChild(tableBody.firstChild);
    // }
    console.log(tempData, newData);
    renderTableRows(filteredData);
}
const renderTableRows = (data) => {
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
<td>${item.name}</td>
<td>${item.country}</td>
<td>${item.score}</td>
`;
        tableBody.appendChild(row);
    });
}