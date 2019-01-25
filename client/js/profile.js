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
const id = new URLSearchParams(window.location.search).get('id');
const rType = new URLSearchParams(window.location.search).get('type');
const url = rType === 'redflag' ? redflagsUrl : interventionsUrl;


const headers = {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    'x-access-token': token,
    credentials: 'cors',
};

function loadRecords() {
    const fetchinterventions = fetch(interventionsUrl, { method: 'GET', headers });
    const fetchredflags = fetch(redflagsUrl, { method: 'GET', headers });

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
                    const recordType = record.type.replace(/ /g, '');
                    if (recordStatus === 'draft') draft += 1;
                    else if (recordStatus === 'under investigation') investigation += 1;
                    else if (recordStatus === 'resolved') resolved += 1;
                    else rejected += 1;
                    output += `
                    <div class="pmax-cards">
                        <div class="card-body">
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
                            <button onclick="location.href='details.html?type=${recordType}&id=${record.id}';" class="view">View</button>
                            <button onclick="location.href='update.html?type=${recordType}&id=${record.id}';" class="edit">Update</button>
                            <button class="delete" onclick="location.href='profile.html?type=${recordType}&id=${record.id}'" >Delete</button>
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

function deleteRecord() {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers,
    })
        .then(() => {
            window.location.replace('profile.html');
        });
}

if (rType && id) deleteRecord();
else loadRecords();
