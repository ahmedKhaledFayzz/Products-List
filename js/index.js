/// Select all nav links
const navLinks = document.querySelectorAll(".nav-link");
// Select the navbar collapse element
const navbarCollapse = document.querySelector(".navbar-collapse");
// Select the toggler button
const navbarToggler = document.querySelector(".navbar-toggler");

// Add an event listener to update the active link on click
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        // Remove active class from all links
        navLinks.forEach(nav => nav.classList.remove("active"));

        // Add active class to the clicked link
        this.classList.add("active");

        // Close the navbar collapse after clicking (for small screens)
        if (navbarCollapse.classList.contains("show")) {
            navbarCollapse.classList.remove("show");
        }
    });
});

// Add toggle functionality for the toggler button
navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
});

// Optional: Scrollspy-like feature to update active link based on section
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 80;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            const id = section.getAttribute("id");

            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add active class to the link corresponding to the visible section
            document
                .querySelector(`.nav-link[href="#${id}"]`)
                ?.classList.add("active");
        }
    });
});


// updateCartDisplay();

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const engineerNumber = '+201114189971'; // رقم المهندس أحمد خالد

    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">No products available.</p>';
    } else {
        products.forEach((product, index) => {
            const card = `
                <div class="card m-3 w-25 align-items-center border shadow-sm p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top w-50" alt="${product.name}">
                    <div class="card-body p-0 m-">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                        <button class="btn btn-success btn-sm" onclick="sendWhatsAppMessage(${index})">Send via WhatsApp</button>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    // Function to send WhatsApp message
    window.sendWhatsAppMessage = (index) => {
        const product = products[index];
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const greeting = hours < 12 ? 'Good morning' : 'Good evening';
        const message = `${greeting}, Ahmed Khaled.
I would like to purchase the following product:
- *Name:* ${product.name}
- *Price:* $${product.price}
- *Description:* ${product.description}`;

        const url = `https://wa.me/${engineerNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
});
