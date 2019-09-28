
const monthlyExpenses = {};

function addBill(event) {
    event.preventDefault();
    const nameBill = document.getElementById('namebill').value;
    const amountBill = document.getElementById('amountbill').value;
    if (nameBill in monthlyExpenses) {
        monthlyExpenses[nameBill] += parseInt(amountBill)
    } else {
        monthlyExpenses[nameBill] = parseInt(amountBill)
    }
    updateDOM(monthlyExpenses)
}



function updateDOM(monthlyExpenses) {
    const dataTable = document.getElementById('data-table');
    removeAllChild(dataTable)
    let totalBudget = 0;
    for (let name in monthlyExpenses) {
        const dataRow = document.createElement('div');
        dataRow.classList.add('data-row');

        const nameP = document.createElement('p');
        nameP.innerText = name;
        dataRow.append(nameP);

        const dollarP = document.createElement('p');
        dollarP.innerText = '$' + monthlyExpenses[name].toString();
        dataRow.append(dollarP);

        const trashImg = document.createElement('img');
        trashImg.classList.add('trash-can');
        trashImg.setAttribute('src', './assets/trash_can.svg');
        trashImg.setAttribute('alt', 'trash_can');
        trashImg.addEventListener('click', trashCan);
        dataRow.append(trashImg);

        dataTable.append(dataRow);

        totalBudget += monthlyExpenses[name];
    }
    const totalHeader = document.getElementById('total');
    totalHeader.innerText = `Budget Total: $ ${totalBudget}`;
    if (totalBudget>= 50){alert("STOP SPENDING SO MUCH BRO!")}else if(totalBudget<= 50){alert("WHY DON'T YOU ENJOY LIFE MORE?")} ;
}

function removeAllChild(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addBill);

addButton.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
})

function trashCan(event){
    event.preventDefault();
    const dataRow = event.srcElement.parentElement;
    const name = dataRow.firstChild.innerText;
    delete monthlyExpenses[name];
    updateDOM(monthlyExpenses);
}


