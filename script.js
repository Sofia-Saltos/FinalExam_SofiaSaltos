document.getElementById('package-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const recipientName = document.getElementById('recipientName').value;
    const packageId = parseInt(document.getElementById('packageId').value);
    const address = document.getElementById('address').value;
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (!validateInputs(recipientName, packageId, address, weight)) {
      displayError('Invalid input. Please correct the errors.');
      return;
    }
  
    const trackingCode = generateTrackingCode(packageId, weight);
    addPackage({ recipientName, packageId, address, weight, trackingCode });
    displayPackages();
    clearForm();
  });
  
  function validateInputs(recipientName, packageId, address, weight) {
    const alphaRegex = /^[A-Za-z\s]+$/;
    if (!alphaRegex.test(recipientName)) return false;
    if (isNaN(packageId) || packageId <= 0) return false;
    if (address.trim() === '' || /\d/.test(address)) return false;
    if (isNaN(weight) || weight <= 0) return false;
    return true;
  }
  
  function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
  }
  
  function generateTrackingCode(packageId, weight) {
    return (packageId << 4) | Math.floor(weight);
  }
  
  const packages = [];
  
  function addPackage(package) {
    packages.push(package);
    packages.sort((a, b) => a.weight - b.weight);
  }
  
  function displayPackages() {
    const tbody = document.getElementById('packages-table').querySelector('tbody');
    tbody.innerHTML = '';
    packages.forEach(pkg => {
      const row = `<tr>
        <td>${pkg.recipientName}</td>
        <td>${pkg.packageId}</td>
        <td>${pkg.address}</td>
        <td>${pkg.weight}</td>
        <td>${pkg.trackingCode}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }
  
  function clearForm() {
    document.getElementById('package-form').reset();
  }
  