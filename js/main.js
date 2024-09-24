const coinDisplayDiv = document.querySelector('.flex.items-center.gap-2.justify-center');
const coinDisplayParagraph = coinDisplayDiv.querySelector('p');
const coinIcon = coinDisplayDiv.querySelector('img'); // Select the coin icon

const rechargeButton = document.createElement('button');
rechargeButton.innerText = 'Recharge';
rechargeButton.className = 'bg-lime-300 px-4 py-2 rounded-[8px] font-bold';


coinDisplayParagraph.style.display = 'none';
coinIcon.style.display = 'none'; 
coinDisplayDiv.appendChild(rechargeButton);

const modal = document.createElement('div');
modal.className = 'modal hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center';
modal.innerHTML = `
    <div class="bg-white p-5 rounded shadow-md">
        <h3 class="font-bold mb-4">Recharge Your Account</h3>
        <input type="number" id="rechargeAmount" placeholder="Enter amount" class="border p-2 mb-4 w-full" />
        <div class="flex justify-end">
            <button id="submitRecharge" class="bg-lime-300 px-4 py-2 rounded-[8px] font-bold">Submit</button>
            <button id="closeModal" class="ml-2 bg-red-500 px-4 py-2 rounded-[8px] font-bold">Close</button>
        </div>
    </div>
`;
document.body.appendChild(modal);

rechargeButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.add('hidden');
});


document.getElementById('submitRecharge').addEventListener('click', () => {
    const amountInput = document.getElementById('rechargeAmount');
    const amount = amountInput.value;

    if (amount && amount > 0) {
        coinDisplayParagraph.innerText = `${amount} bdt`;
        localStorage.setItem('rechargedAmount', amount);

        rechargeButton.remove(); 
        coinDisplayParagraph.style.display = 'block'; 
        coinIcon.style.display = 'block'; 

        // Close the modal
        modal.classList.add('hidden');

        // Clear the input field
        amountInput.value = '';
    } else {
        alert('Please enter a valid positive amount');
});
window.addEventListener('load', () => {
    const storedAmount = localStorage.getItem('rechargedAmount');
    if (storedAmount) {
        // Display the stored amount
        coinDisplayParagraph.innerText = `${storedAmount} bdt`;
        coinDisplayParagraph.style.display = 'block';
        coinIcon.style.display = 'block';
        rechargeButton.remove();
    }
});
