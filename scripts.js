// Function to open the modal and display the clicked image
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("enlargedImage");
    const caption = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imageSrc;
    caption.innerText = imageSrc.split('/').pop(); // Display the image filename
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Function to hash the password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Correct hashed password (precomputed SHA-256 hash of "DeathStar123")
const correctHashedPassword = "f27cf3671a823bd72dc7b0578f07152a5de6e153319e98500ffdbb4e603fd727";

document.getElementById("unlock-btn").addEventListener("click", async () => {
    const passwordInput = document.getElementById("password").value;

    // Hash the entered password and compare it with the correct hash
    const hashedPassword = await hashPassword(passwordInput);
    if (hashedPassword === correctHashedPassword) {
        // Store a flag in local storage
        localStorage.setItem("accessGranted", "true");
        // Redirect to the main page
        window.location.href = "main.html";
    } else {
        alert("Incorrect password. Please try again!");
    }
});
