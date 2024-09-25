const displaycn = document.querySelector('.flex.items-center.gap-2.justify-center'),
    coinparagraph = displaycn.querySelector('p'),
    cicon = displaycn.querySelector('img'),
    recharge = document.querySelector('.rcbtn'),
    modal = document.getElementById('modal');

coinparagraph.style.display = 'none';
cicon.style.display = 'none';
displaycn.appendChild(recharge);
document.body.appendChild(modal);


let balance = parseFloat(localStorage.getItem('balance')) || 0;


function mbalance() {
    coinparagraph.innerText = `${balance} bdt`;

    if (balance === 0) {
        cicon.style.display = 'none';
        coinparagraph.style.display = 'none';
        recharge.style.display = 'block';
    }
    
    
    else {
        cicon.style.display = 'block';
        coinparagraph.style.display = 'block';
        recharge.style.display = 'none';
    }
}
mbalance();


recharge.addEventListener('click', () => modal.classList.remove('hidden'));


document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));


document.getElementById('rsub').addEventListener('click', () => {
    const inputamnt = document.getElementById('amnt'),amount = parseFloat(inputamnt.value);

    if (amount > 0) {
        balance += amount;
        mbalance(); 
        localStorage.setItem('balance', balance); 
        modal.classList.add('hidden'); 
        inputamnt.value = '';
    }
    
    
    else {
        alert('Please enter a valid amount');
    }
});


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


document.getElementById('closeDonationModal').addEventListener('click', () => donation.classList.add('hidden'));


function modalmsg() {
    donation.classList.remove('hidden');
}

document.querySelectorAll('.cards .border').forEach(card => {
    const cardamount = card.querySelector('h3');
    const id = card.dataset.cardId; 

    
    const savedAmount = localStorage.getItem('cardBalance_' + id);
    cardamount.innerText = savedAmount ? `${savedAmount} bdt` : `0 bdt`;

    card.querySelector('button').addEventListener('click', () => {
        const input = card.querySelector('input'),
            donationam = parseFloat(input.value);



        if (!isNaN(donationam) && donationam > 0 && donationam <= balance) {
            const cur = parseFloat(cardamount.innerText.split(' ')[0]);
            const apdatedamount = cur + donationam;




            cardamount.innerText = `${apdatedamount} bdt`;
            balance -= donationam;
            mbalance(); 
            localStorage.setItem('balance', balance); 


            localStorage.setItem('cardBalance_' + id, apdatedamount);

            input.value = '';

const title = card.querySelector('h2').innerText,date = new Date().toLocaleString();


const donationRecord = {amount: donationam,title: title,date: date};

const history = JSON.parse(localStorage.getItem('donationHistory')) || [];
history.push(donationRecord);
localStorage.setItem('donationHistory', JSON.stringify(history));




            modalmsg();





        }
        
        
        
        
        else {
            alert('Invalid donation amount or insufficient balance');
        }
    });

    cardamount.addEventListener('click', () => {
        cardamount.innerText = `0 bdt`;
        localStorage.setItem('cardBalance_' + id, 0);
    });
});



function loadhs() {
    const hc = document.querySelector('.history-container'),
          history = JSON.parse(localStorage.getItem('donationHistory')) || [];

    if (history.length > 0) {
        history.forEach(record => {
            const hitem = document.createElement('div');
            hitem.className = 'history-item';

            hitem.innerHTML = `
                <p style="font-size: 20px;font-weight:400; margin-bottom:8px;"><strong>Amount:</strong> ${record.amount} bdt donated for ${record.title}</p>
                <p style="font-size: 18px;"><strong>Date:</strong> ${record.date}</p>
            `;

            hitem.style.border = '1px solid rgba(0, 0, 0, 0.2)'; 
            hitem.style.width = '87%'; 
            hitem.style.margin = '10px auto'; 
            hitem.style.padding = '30px 20px'; 
            hitem.style.borderRadius = '8px';

            hc.appendChild(hitem);
        });

        const resetButton = document.createElement('button');
        resetButton.innerText = 'Reset History';

        resetButton.style.display = 'block'; 


        resetButton.style.margin = '20px auto'; 

        resetButton.style.padding = '10px 20px';

        resetButton.style.backgroundColor = '#f00'; 


        resetButton.style.color = '#fff'; 

        resetButton.style.border = 'none'; 

        resetButton.style.borderRadius = '8px';
        resetButton.style.cursor = 'pointer'; 

        resetButton.addEventListener('click', () => {
            localStorage.removeItem('donationHistory'); 
            hc.innerHTML = ''; 
        });

        
        hc.appendChild(resetButton);
    } 
    
    
    
    else {
       
        const noHistoryMsg = document.createElement('p');
        noHistoryMsg.innerText = 'No donation history available.';
        noHistoryMsg.style.textAlign = 'center';
        noHistoryMsg.style.fontSize = '28px';
        hc.appendChild(noHistoryMsg);
    }
}

loadhs();



