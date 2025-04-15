function trackPackage() {
  const id = document.getElementById('trackingId').value.trim();
  const resultBox = document.getElementById('result');

  if (!id) {
    resultBox.innerHTML = "<p>Please enter a tracking ID.</p>";
    return;
  }

  const dbRef = firebase.database().ref("packages/" + id);

  dbRef.once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        resultBox.innerHTML = `
          <h3>Package Status:</h3>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Last Updated:</strong> ${data.updated}</p>
        `;
      } else {
        resultBox.innerHTML = "<p>No package found with that ID.</p>";
      }
    })
    .catch(error => {
      console.error(error);
      resultBox.innerHTML = "<p>Error retrieving data. Try again later.</p>";
    });
}function loginAdmin() {
    const username = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPass').value;
    const message = document.getElementById('loginMessage');
  
    // Hardcoded admin credentials
    if (username === "admin" && password === "blezgo123") {
      message.innerHTML = "Login successful. Redirecting...";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.innerHTML = "Incorrect username or password.";
    }
  }function updatePackage() {
    const id = document.getElementById("packageId").value.trim();
    const status = document.getElementById("packageStatus").value.trim();
    const updated = document.getElementById("updateTime").value.trim();
    const result = document.getElementById("adminResult");
  
    if (!id || !status || !updated) {
      result.innerHTML = "Please fill out all fields.";
      return;
    }
  
    firebase.database().ref("packages/" + id).set({
      status: status,
      updated: updated
    }).then(() => {
      result.innerHTML = "Package updated successfully.";
    }).catch(error => {
      result.innerHTML = "Error updating package.";
      console.error(error);
    });
  }