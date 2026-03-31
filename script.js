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

// Add 'event' as a parameter here
function selectGoal(goal, event) {
    document.getElementById("purpose").value = goal;

    document.querySelectorAll(".goals button").forEach(btn => {
        btn.style.background = "#222";
    });

    // Now 'event' will work correctly
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

    const display = document.getElementById("total");
    if (selectedPrice === 0) {
        display.innerText = "Please select a plan above";
    } else {
        display.innerText = "Total: ₹" + total;
    }
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

    const phone = "9912432683"; // replace with real number

    const message = `Hi, I want to join PowerFit Gym.%0A` +
                `*Name:* ${userData?.name}%0A` +
                `*Plan:* ₹${selectedPrice}%0A` +
                `*Months:* ${months}%0A` +
                `*Total:* ₹${totalAmount}`;

// Use the variable in the URL
window.location.href = `https://wa.me/${phone}?text=${message}`;

    localStorage.clear();
}

window.onload = function () {
    const savedPlan = localStorage.getItem("selectedPlan");
    
    if (savedPlan) {
        // Set the global variable
        selectedPrice = Number(savedPlan);

        // Find the card that matches the price and add the 'active' class
        document.querySelectorAll(".plan").forEach(p => {
            if (p.getAttribute("data-price") === savedPlan) {
                p.classList.add("active");
            }
        });
    }
    calculateTotal();
};