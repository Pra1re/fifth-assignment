const displaycn = document.querySelector('.flex.items-center.gap-2.justify-center'),
    coinparagraph = displaycn.querySelector('p'),
    cicon = displaycn.querySelector('img'),
    recharge = document.querySelector('.rcbtn'),
    modal = document.getElementById('modal');

coinparagraph.style.display = 'none';
cicon.style.display = 'none';
displaycn.appendChild(recharge);
document.body.appendChild(modal);

// Initialize balance
let balance = parseFloat(localStorage.getItem('balance')) || 0;

// Function to update and manage the display of the balance and recharge button
function mbalance() {
    coinparagraph.innerText = `${balance} bdt`;

    if (balance === 0) {
        cicon.style.display = 'none';
        coinparagraph.style.display = 'none';
        recharge.style.display = 'block';
    } else {
        cicon.style.display = 'block';
        coinparagraph.style.display = 'block';
        recharge.style.display = 'none';
    }
}
mbalance(); // Update the balance display when page loads

// Recharge button event to show the modal
recharge.addEventListener('click', () => modal.classList.remove('hidden'));

// Close modal on clicking the close button
document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));

// Recharge submission event
document.getElementById('rsub').addEventListener('click', () => {
    const inputamnt = document.getElementById('amnt'),
        amount = parseFloat(inputamnt.value);

    if (amount > 0) {
        balance += amount;
        mbalance(); // Update the navbar balance
        localStorage.setItem('balance', balance); // Save the main balance
        modal.classList.add('hidden'); // Hide modal after recharge
        inputamnt.value = ''; // Clear input
    } else {
        alert('Please enter a valid amount');
    }
});

// Donation thank you modal creation
const donation = document.createElement('div');
donation.className = 'donation-modal hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center';
donation.innerHTML = `
    <div class="bg-white px-16 py-8 rounded-[8px] shadow-md text-center">
        <h3 class="font-bold text-3xl mb-2">Thank You!</h3>
        <img src="./assets/coin.png" alt="Coin" class="mx-auto mb-2" style="width: 30px; height: auto;" />
        <p class="mb-4">You have donated for humanity.</p>
        <div class="flex justify-center">
            <button id="closeDonationModal" class="bg-lime-300 px-4 py-2 rounded-[8px] font-bold">Close</button>
        </div>
    </div>
`;
document.body.appendChild(donation);

// Close donation modal
document.getElementById('closeDonationModal').addEventListener('click', () => donation.classList.add('hidden'));

// Function to show donation modal
function modalmsg() {
    donation.classList.remove('hidden');
}

// Process each card donation and reset functionality
document.querySelectorAll('.cards .border').forEach(card => {
    const cardamount = card.querySelector('h3');
    const id = card.dataset.cardId; // Using data-card-id attribute to get unique ID

    // Load the saved amount from local storage when the page loads
    const savedAmount = localStorage.getItem('cardBalance_' + id);
    cardamount.innerText = savedAmount ? `${savedAmount} bdt` : `0 bdt`;

    // Handle donation button click
    card.querySelector('button').addEventListener('click', () => {
        const input = card.querySelector('input'),
            donationAmount = parseFloat(input.value);

        if (!isNaN(donationAmount) && donationAmount > 0 && donationAmount <= balance) {
            const currentAmount = parseFloat(cardamount.innerText.split(' ')[0]);
            const updatedAmount = currentAmount + donationAmount;

            cardamount.innerText = `${updatedAmount} bdt`; // Update the display
            balance -= donationAmount; // Deduct from balance
            mbalance(); // Update the navbar balance
            localStorage.setItem('balance', balance); // Save the main balance
            localStorage.setItem('cardBalance_' + id, updatedAmount); // Save the updated card balance

            input.value = '';

const title = card.querySelector('h2').innerText,date = new Date().toLocaleString();

// Create a donation record
const donationRecord = {amount: donationAmount,title: title,date: date};

const history = JSON.parse(localStorage.getItem('donationHistory')) || [];
history.push(donationRecord);
localStorage.setItem('donationHistory', JSON.stringify(history));




            modalmsg();





        } else {
            alert('Invalid donation amount or insufficient balance');
        }
    });

    // Reset the card donation amount on click
    cardamount.addEventListener('click', () => {
        cardamount.innerText = `0 bdt`;
        localStorage.setItem('cardBalance_' + id, 0);
    });
});



function loadhs() {
    const hc = document.querySelector('.history-container'),
          history = JSON.parse(localStorage.getItem('donationHistory')) || [];

    // Create and append each history record
    if (history.length > 0) {
        history.forEach(record => {
            const hitem = document.createElement('div');
            hitem.className = 'history-item';

            hitem.innerHTML = `
                <p style="font-size: 18px;"><strong>Amount:</strong> ${record.amount} bdt donated for ${record.title}</p>
                <p style="font-size: 18px;"><strong>Date:</strong> ${record.date}</p>
            `;

            hitem.style.border = '1px solid black'; // Add a border
            hitem.style.width = '87%'; // Set the width to 87%
            hitem.style.margin = '10px auto'; // Center the div
            hitem.style.padding = '20px'; // Add padding

            hc.appendChild(hitem);
        });

        // Create the reset button
        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset History';
        resetButton.style.display = 'block'; // Ensure the button is block level
        resetButton.style.margin = '20px auto'; // Center the button
        resetButton.style.padding = '10px 20px'; // Add padding for better appearance
        resetButton.style.backgroundColor = '#f00'; // Set a color (optional)
        resetButton.style.color = '#fff'; // Set text color to white
        resetButton.style.border = 'none'; // Remove default border
        resetButton.style.borderRadius = '8px'; // Optional rounded corners
        resetButton.style.cursor = 'pointer'; // Make it a pointer on hover

        // Add the reset functionality
        resetButton.addEventListener('click', () => {
            localStorage.removeItem('donationHistory'); // Clear the local storage
            hc.innerHTML = ''; // Clear the history container on the page
        });

        // Append the reset button to the history container
        hc.appendChild(resetButton);
    } else {
        // If there's no history, display a message or do nothing
        const noHistoryMsg = document.createElement('p');
        noHistoryMsg.innerText = 'No donation history available.';
        noHistoryMsg.style.textAlign = 'center';
        noHistoryMsg.style.fontSize = '18px';
        hc.appendChild(noHistoryMsg);
    }
}

// Call the function to load history
loadhs();



