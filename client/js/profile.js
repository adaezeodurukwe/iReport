// Profile script

const interventionsUrl = 'http://localhost:3000/api/v1/interventions';
const redflagsUrl = 'http://localhost:3000/api/v1/red-flags';
const token = localStorage.getItem('token');
const displayRecords = document.getElementById('red-flags');
const noRecord = document.getElementById('none');
const statusDraft = document.getElementById('draft');
const statusInvestigtion = document.getElementById('investigation');
const statusResolved = document.getElementById('resolved');
const statusRejected = document.getElementById('rejected');

const fetchData = {
    method: 'GET',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
        'x-access-token': token,
        credentials: 'cors',
    },
};

function loadRecords() {
    const fetchinterventions = fetch(interventionsUrl, fetchData);
    const fetchredflags = fetch(redflagsUrl, fetchData);

    Promise.all([fetchinterventions, fetchredflags])
        .then(res => Promise.all(res.map(response => response.json())))
        .then((response) => {
            const interventions = response[0];
            const redflags = response[1];

            const records = redflags.data.concat(interventions.data);
            if (!records[0]) {
                noRecord.innerHTML = 'No record';
            } else {
                let output = ' ';
                let draft = 0;
                let investigation = 0;
                let resolved = 0;
                let rejected = 0;
                records.forEach((record) => {
                    const recordStatus = record.status;
                    if (recordStatus === 'draft') draft += 1;
                    else if (recordStatus === 'under investigation') investigation += 1;
                    else if (recordStatus === 'resolved') resolved += 1;
                    else rejected += 1;
                    output += `
                    <div class="pmax-cards">
                        <div class="cards-body">
                            <div class="flag">
                                <span><h4>${record.type}</h4></span>
                                <span><b>Status: </b> ${record.status}</span>
                                <span><b>Location: </b>${record.location}</span>
                                <span><b>Comment: </b> ${record.comment}</span>
                            </div>
                            <div class="flag">
                                <b>Images: </b><br> 'No image added, update record to add images'
                            </div>
                        </div>
                        <div class="cards-footer">
                            <button onclick="location.href='details.html';" class="view">View</button>
                            <button onclick="location.href='create.html';" class="edit">Update</button>
                            <button class="delete">Delete</button>
                        </div>
                    </div>
                    `;
                });
                statusDraft.innerHTML = draft;
                statusInvestigtion.innerHTML = investigation;
                statusResolved.innerHTML = resolved;
                statusRejected.innerHTML = rejected;
                displayRecords.innerHTML = output;
            }
        })
        .catch(error => error);
}

loadRecords();
