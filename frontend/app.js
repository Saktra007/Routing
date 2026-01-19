const API_URL = "http://localhost:3000/api/users";
const userTableBody = document.getElementById("userTableBody");
const userForm = document.getElementById("userForm");
const userModal = document.getElementById("userModal");

// UI Logic: Toggle Modal visibility
function toggleModal() {
  userModal.classList.toggle("active");

  //If modal is closing, reset form fields and set title back to default
  if (!userModal.classList.contains("active")) {
    userForm.reset();
    document.getElementById("userId").value = "";
    document.getElementById("modalTitle").innerText = "Add New User";
  }
}

//CRUD: Fetch all users from the server GET)
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    //Clear existing table table content before rendering fresh data
    userTableBody.innerHTML = "";

    const users = result.data;

    users.forEach((user, index) => {
      const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-edit" onclick="editUser('${user.id}','${user.name}','${user.email}')">Edit</button>
                        <button class="btn btn-delete" onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                </tr>
            `;
      userTableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// CRUD: Create (Post) or Update (PUT) a user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //Prevent page refresh on form submit

  const id = document.getElementById("userId").value;
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;

  const userData = { name, email };

  try {
    let response;
    // If id exists, we are in Edit mode (PUT), otherwise Create mode(POST)
    if (id) {
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    } else {
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    }
    if (!response.ok) {
      const err = await response.json();
      alert(err.message);
      return;
    }
    fetchUsers();
    toggleModal();
  } catch (error) {
    console.error("Error saving user:", error);
  }
});

// CRUD: Delete user from server (DELETE)

async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        return;
      }
      
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}

// UI Helper: Fill form with existing data for editing
function editUser(id, name, email) {
  document.getElementById("userId").value = id;
  document.getElementById("userName").value = name;
  document.getElementById("userEmail").value = email;
  document.getElementById("modalTitle").innerText = "Edit User";
  toggleModal();
}

// Utility: Export table data to Excel (CSV format)
function exportExcel() {
  const table = document.querySelector("table");
  const rows = Array.from(table.querySelectorAll("tr"));

  //Convert table rows to CSV string format
  const csvContent = rows
    .map((row) => {
      const columns = Array.from(row.querySelectorAll("th,td"));
      //Exclude the 'Action' column (index 3) from export
      return columns
        .slice(0, 3)
        .map((col) => `"${col.innerText}"`)
        .join(",");
    })
    .join("\n");

  //Create a dounloadable blob with UTF-8 encoding
  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "User_List.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initial data fetch when page finishes loading
window.onload = fetchUsers;
