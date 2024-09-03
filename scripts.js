document.getElementById('inventoryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const assetIdToUpdate = document.getElementById('assetIdToUpdate').value;

    const url = assetIdToUpdate ? 'update_asset.php' : 'add_asset.php';

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        document.getElementById('inventoryForm').reset();
        document.getElementById('assetIdToUpdate').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchAssetId = document.getElementById('searchAssetId').value;

    fetch('search_asset.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'searchAssetId': searchAssetId
        })
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (data.length > 0) {
            data.forEach(asset => {
                resultsDiv.innerHTML += `
                    <div>
                        <p>Employee Name: ${asset.employeeName}</p>
                        <p>Employee ID: ${asset.employeeId}</p>
                        <p>CPU No: ${asset.cpuNo}</p>
                        <p>Asset ID: ${asset.assetId}</p>
                        <p>Serial Number/Service Tag: ${asset.serialNumber}</p>
                        <p>Purchase Date: ${asset.purchaseDate}</p>
                        <p>Issued Date: ${asset.issuedDate}</p>
                        <p>Issued Status: ${asset.issuedStatus}</p>
                        <p>Verification Status: ${asset.verificationStatus}</p>
                        <button onclick="editAsset('${asset.assetId}')">Edit</button>
                    </div>
                `;
            });
        } else {
            resultsDiv.innerHTML = '<p>No asset found.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function editAsset(assetId) {
    fetch('get_asset.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'assetId': assetId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            document.getElementById('employeeName').value = data.employeeName;
            document.getElementById('employeeId').value = data.employeeId;
            document.getElementById('cpuNo').value = data.cpuNo;
            document.getElementById('assetId').value = data.assetId;
            document.getElementById('serialNumber').value = data.serialNumber;
            document.getElementById('purchaseDate').value = data.purchaseDate;
            document.getElementById('issuedDate').value = data.issuedDate;
            document.getElementById('issuedStatus').value = data.issuedStatus;
            document.getElementById('verificationStatus').value = data.verificationStatus;
            document.getElementById('assetIdToUpdate').value = data.assetId;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}