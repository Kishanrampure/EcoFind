document.getElementById("suggestForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("storeName").value;
    const location = document.getElementById("storeLocation").value;
    const description = document.getElementById("storeDescription").value;

    fetch("/submit-store", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, location, description })
    }).then(res => {
        if (res.ok) alert("Store suggested successfully!");
    });
});

function searchStores() {
    const query = document.getElementById("locationInput").value.toLowerCase();
    fetch("/get-stores")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("storeList");
            list.innerHTML = "";
            data.forEach(store => {
                if (store.location.toLowerCase().includes(query)) {
                    const li = document.createElement("li");
                    li.textContent = store.name + " - " + store.location + " - " + store.description;
                    list.appendChild(li);
                }
            });
        });
}
