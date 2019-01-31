// Records script

const recordsUrl = 'https://ireporter-endpoints.herokuapp.com/api/v1/records';
const main = document.getElementById('main');

function getRecords() {
    fetch(recordsUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            credentials: 'cors',
        },
    })
        .then(res => res.json())
        .then((Response) => {
            const records = Response.data;
            if (!records[0]) {
                main.innerHTML = 'No record';
            } else {
                let output = ' ';
                records.forEach((record) => {
                    const recordType = record.type.replace(/ /g, '');
                    const img = recordType === 'intervention' ? '<img src="img/report.png">' : '<img src="img/flag.png">';
                    output += `
                        <div class="cards">
                            <h4>${img}${record.type}</h4>
                            <p>${record.comment}</p>
                            <p>Status: <i class="draft"> ${record.status}</i></p>
                            <button onclick="location.href='details.html?type=${recordType}&id=${record.id}';">Details</button>
                        </div>
                        `;
                });
                main.innerHTML += output;
            }
        });
}

getRecords();
