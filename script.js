function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function sendData(event) {
    event.preventDefault();

    const data = {
        name: document.querySelector("[name=name]").value,
        email: document.querySelector("[name=email]").value,
        purpose: document.querySelector("[name=purpose]").value
    };

    // store temporarily
    localStorage.setItem("userData", JSON.stringify(data));

    // go to plans page
    window.location.href = "plans.html";
}function goToJoin() {
    window.location.href = "join.html";
}

function selectGoal(goal) {
    document.getElementById("purpose").value = goal;

    // highlight selected
    document.querySelectorAll(".goals button").forEach(btn => {
        btn.style.background = "#222";
    });

    event.target.style.background = "#ff5733";
}

let selectedPrice = 0;

function selectPlan(element) {
    selectedPrice = Number(element.getAttribute("data-price"));

    // remove highlight from all
    document.querySelectorAll(".plan").forEach(p => {
        p.classList.remove("active");
    });

    // add highlight
    element.classList.add("active");

    // store selection
    localStorage.setItem("selectedPlan", selectedPrice);

    calculateTotal();
}

function calculateTotal() {
    const months = Number(document.getElementById("months").value) || 0;
    const total = selectedPrice * months;

    document.getElementById("total").innerText = "Total: ₹" + total;
}

document.getElementById("months")?.addEventListener("input", calculateTotal);
function submitFinal() {

    const months = Number(document.getElementById("months").value);

    if (!selectedPrice || !months) {
        alert("Please select plan and months");
        return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));

    const totalAmount = selectedPrice * months;

    alert("Successfully Joined! 🎉");

    const phone = "91XXXXXXXXXX"; // replace with real number

    const message = `Hi, I want to join PowerFit Gym.
Name: ${userData?.name}
Plan: ₹${selectedPrice}
Months: ${months}
Total: ₹${totalAmount}`;

    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    localStorage.clear();
}

window.onload = function () {

    const monthsInput = document.getElementById("months");
    if (monthsInput) {
        monthsInput.addEventListener("input", calculateTotal);
    }

    const savedPlan = localStorage.getItem("selectedPlan");

    if (savedPlan) {
        selectedPrice = Number(savedPlan);

        document.querySelectorAll(".plan").forEach(p => {
            if (p.getAttribute("data-price") == savedPlan) {
                p.classList.add("active");
            }
        });
    }

    calculateTotal();
};