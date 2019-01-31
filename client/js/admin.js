// Admin script

const id = new URLSearchParams(window.location.search).get('id');
const rType = new URLSearchParams(window.location.search).get('type');
const status = new URLSearchParams(window.location.search).get('status');
const statusUrl = 'https://ireporter-endpoints.herokuapp.com/api/v1/auth/user';
const recordsUrl = 'https://ireporter-endpoints.herokuapp.com/api/v1/records';
const redflagUrl = `https://ireporter-endpoints.herokuapp.com/api/v1/red-flags/${id}/status`;
const interventionUrl = `https://ireporter-endpoints.herokuapp.com/api/v1/interventions/${id}/status`;
const token = localStorage.getItem('token');
const main = document.getElementById('main');
const recId = document.getElementById('recordid');
const statusDraft = document.getElementById('draft');
const statusInvestigtion = document.getElementById('investigation');
const statusResolved = document.getElementById('resolved');
const statusRejected = document.getElementById('rejected');
const optionDraft = document.getElementById('inputdraft');
const optionInvestigtion = document.getElementById('inputinvestigation');
const optionResolved = document.getElementById('inputresolved');
const optionRejected = document.getElementById('inputrejected');
const modal = document.getElementById('myModal');
const errormsg = document.getElementById('errormsg');
const snackbar = document.getElementById('snackbar');
const url = rType === 'redflag' ? redflagUrl : interventionUrl;

const headers = {
    Accept: 'application/json, text/plain, */*',
    'content-type': 'application/json',
    'x-access-token': token,
    credentials: 'cors',
};

function getStatus() {
    fetch(statusUrl, { method: 'GET', headers })
        .then(res => res.json())
        .then((Response) => {
            if (Response.status !== 200) window.location.replace('signin.html');
            if (Response.user.status !== true) window.location.replace('index.html');
        });
}

function displayError(message) {
    errormsg.innerHTML = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
}

function getRecords() {
    fetch(recordsUrl, { method: 'GET', headers })
        .then(res => res.json())
        .then((Response) => {
            const records = Response.data;
            if (!records[0]) {
                main.innerHTML = 'No record';
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
                        <div class="cards">
                            <div class="cards-body">
                                <span><h4>${record.type}</h4></span>
                                <span><b>Created by: </b> ${record.lastname}, ${record.firstname}</span>
                                <span><b>Record ID: </b> ${record.id}</span>
                                <span><b>Status: </b> ${record.status}</span>
                                <span><b>Location: </b>${record.location}</span>
                                <span class="comment"><b>Comment: </b> ${record.comment}</span>
                            </div>
                            <div class="cards-footer">
                                <button onclick="location.href='details.html?type=${recordType}&id=${record.id}';" class="view">View</button>
                                <button class="edit" onclick="location.href='admin.html?type=${recordType}&id=${record.id}&status=${record.status}';">Update</button>
                            </div>
                        </div>
                        `;
                });
                statusDraft.innerHTML = draft;
                statusInvestigtion.innerHTML = investigation;
                statusResolved.innerHTML = resolved;
                statusRejected.innerHTML = rejected;
                main.innerHTML = output;
            }
        });
}

function loadData() {
    modal.style.display = 'block';
    recId.value = id;
    if (status === 'draft') optionDraft.checked = true;
    else if (status === 'rejected') optionRejected.checked = true;
    else if (status === 'resolved') optionResolved.checked = true;
    else optionInvestigtion.checked = true;
}


function updateStatus(e) {
    e.preventDefault();

    const checked = document.querySelector('input[name=status]:checked');
    fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            status: checked.value,
        }),
    })
        .then(res => res.json())
        .then((Response) => {
            if (Response.status !== 200) displayError(Response.message);
            else window.location.replace('admin.html');
        })
        .catch(err => err);
}

document.getElementById('updateStatus').addEventListener('submit', updateStatus);

getStatus();
getRecords();
if (id && rType && status) loadData();
