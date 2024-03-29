// Function to check user's online status
function checkOnlineStatus() {
    const offlineAlert = document.getElementById('offlineAlert');
    const onlineAlert = document.getElementById('onlineAlert');

    if (navigator.onLine) {
        // User is online
        if (!offlineAlert.classList.contains('d-none')) {
            offlineAlert.classList.add('d-none');
        }
        if (!onlineAlert.classList.contains('d-none')) {
            onlineAlert.classList.add('d-none');
        }
    } else {
        // User is offline
        if (!onlineAlert.classList.contains('d-none')) {
            onlineAlert.classList.add('d-none');
        }
        offlineAlert.classList.remove('d-none');
    }
}

// Check user's online status initially
window.addEventListener('load', checkOnlineStatus);

// Check user's online status every 30 seconds
setInterval(checkOnlineStatus, 30000); // 30 seconds in milliseconds

// Add event listeners to detect user interactions
document.addEventListener('mousemove', checkOnlineStatus);
document.addEventListener('keydown', checkOnlineStatus);
document.addEventListener('scroll', checkOnlineStatus);
// Add more event listeners as needed for other types of user interactions
