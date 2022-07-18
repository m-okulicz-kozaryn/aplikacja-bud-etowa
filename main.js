let income = [];
let incomeSummary = 0;

let costs = [];
let costsSummary = 0;

let isButtonEditClickedIncome = false;
let isButtonEditClickedCosts = false;

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", addBudget);

  const costsButton = document.getElementById("costsButton");
  costsButton.addEventListener("click", addCosts);
});

function addBudget() {
  let uniqueNumber = new Date().valueOf() + Math.random().toString(16).slice(2);
  let cash = document.getElementById("cash");
  let itemName = document.getElementById("income");
  if (cash.value < 1 || cash.value > 1000000) {
    alert("Liczba powinna być w zakresie 1-1000000");
  } else if (cash.value === "") {
    alert("Pole z kwotą nie może być puste");
  } else if (itemName.value === "") alert("Pole z nazwą nie może być puste");
  else {
    income.push({
      id: uniqueNumber,
      name: itemName.value,
      cash: cash.value,
    });
    renderIncomeList();
    handleClick("income", "cash");
  }
}

function handleClick(nameInputId, cashInputId) {
  const nameInput = document.getElementById(nameInputId);
  const cashInput = document.getElementById(cashInputId);

  nameInput.value = "";
  cashInput.value = "";
}

function renderIncomeList() {
  document.getElementById("incomeList").innerHTML = "";
  income.map((itemIncome, index) => {
    const node = document.createElement("li");
    node.id = itemIncome.id;
    const item = renderListItem(itemIncome, index);
    node.appendChild(item);

    document.getElementById("incomeList").appendChild(node);
    const buttonEdit = document.getElementById(
      "edit" + index + "_" + itemIncome.id
    );

    buttonEdit.addEventListener("click", (event) =>
      editFunction(itemIncome, node, event, index)
    );
    const buttonRemove = document.getElementById(
      "remove" + index + "_" + itemIncome.id
    );
    buttonRemove.addEventListener("click", (event) =>
      removeFunction(index, "income")
    );
  });

  calculateBudget();
  moneyToSpent();
}

function removeFunction(index, listType) {
  isButtonEditClicked = true;
  console.log(isButtonEditClicked);
  if (listType === "income") {
    if (isButtonEditClickedIncome == true) {
      console.log(income[index]);
      document.getElementById("error" + income[index].id).innerHTML =
        "Kliknij przycisk Akceptuj";
      return;
    } else {
      income.splice(index, 1);
    }
    renderIncomeList();
  } else {
    costs.splice(index, 1);
    if (isButtonEditClickedCosts == true) {
      document.getElementById("error" + costs[index].id).innerHTML =
        "Kliknij przycisk Akceptuj";
      return;
    }
    renderCostsList();
  }
}

function editFunction(itemIncome, node, event, index) {
  event.preventDefault();
  if (isButtonEditClickedIncome == true) {
    document.getElementById("error" + itemIncome.id).innerHTML =
      "Kliknij przycisk Akceptuj";
    return;
  }

  isButtonEditClickedIncome = true;
  console.log(isButtonEditClickedIncome);

  if ((isButtonEditClickedIncome = true)) {
    addButton.disabled = true;
  }

  node.innerHTML = "";

  const nameInput = document.createElement("input");
  const cashInput = document.createElement("input");
  const buttonAccept = document.createElement("button");

  buttonAccept.innerHTML = "Akceptuj";
  nameInput.value = itemIncome.name;
  cashInput.value = itemIncome.cash;

  node.appendChild(nameInput);
  node.appendChild(cashInput);
  node.appendChild(buttonAccept);

  buttonAccept.addEventListener("click", (event) =>
    acceptFunction(cashInput, nameInput, index, node)
  );
}

function acceptFunction(cashInput, nameInput, index, node) {
  isButtonEditClickedIncome = false;
  addButton.disabled = false;

  node.innerHTML = "";

  income[index].name = nameInput.value;
  income[index].cash = cashInput.value;

  renderIncomeList();
}

function calculateBudget() {
  incomeSummary = 0;
  income.map((itemIncome) => {
    incomeSummary += parseInt(itemIncome.cash);
  });
  document.getElementById("incomeSum").innerHTML =
    "SUMA PRZYCHODÓW :" + " " + incomeSummary + " złotych ";
}

function renderButtonEdit(index, id) {
  const buttonEdit = document.createElement("button");
  buttonEdit.id = "edit" + index + "_" + id;
  buttonEdit.appendChild(document.createTextNode("edytuj"));
  buttonEdit.className = "editButton";
  return buttonEdit;
}

function renderButtonRemove(index, id) {
  const buttonRemove = document.createElement("button");
  buttonRemove.id = "remove" + index + "_" + id;
  buttonRemove.appendChild(document.createTextNode("usuń"));
  buttonRemove.className = "removeButton";
  return buttonRemove;
}

function renderErrorField(id) {
  const divError = document.createElement("div");
  divError.id = "error" + id;
  return divError;
}

function renderListItem(itemIncome, index) {
  const div = document.createElement("div");
  div.className = "list_item";

  const itemName = document.createElement("div");
  itemName.id = itemIncome.id + itemIncome.name;
  itemName.appendChild(document.createTextNode(itemIncome.name));
  itemName.className = "itemName";
  div.appendChild(itemName);

  const cash = document.createElement("div");
  cash.id = itemIncome.id + itemIncome.cash;
  cash.appendChild(document.createTextNode(itemIncome.cash));
  cash.className = "cashToStyle";
  const buttonEdit = renderButtonEdit(index, itemIncome.id);
  buttonEdit.className = "buttonEdit";
  cash.appendChild(buttonEdit);
  const buttonRemove = renderButtonRemove(index, itemIncome.id);
  buttonRemove.className = "buttonRemove";
  cash.appendChild(buttonRemove);
  const divError = renderErrorField(itemIncome.id);
  divError.className = "error";
  cash.appendChild(divError);

  div.appendChild(cash);

  return div;
}

function addCosts() {
  let expenses = document.getElementById("expenses");
  let costsPosition = document.getElementById("costsPosition");
  let uniqueNumber = new Date().valueOf() + Math.random().toString(16).slice(2);
  if (expenses.value < 1 || expenses.value > 1000000) {
    alert("Liczba powinna być w zakresie 1-1000000");
  } else if (expenses.value === "") {
    alert("Pole z kwotą nie może być puste");
  } else if (costsPosition.value === "") {
    alert("Pole z nazwą nie może być puste");
  } else {
    costs.push({
      id: uniqueNumber,
      name: costsPosition.value,
      cash: expenses.value,
    });
    renderCostsList();
    handleClick("costsPosition", "expenses");
  }
}

function renderCostsList() {
  document.getElementById("costs_list").innerHTML = "";

  costs.map((itemCosts, index) => {
    const liCostsList = document.createElement("li");
    liCostsList.id = itemCosts.id;
    const itemCostsNew = renderListItem(itemCosts, index);
    liCostsList.appendChild(itemCostsNew);

    document.getElementById("costs_list").appendChild(liCostsList);
    const costsButton = document.getElementById(
      "edit" + index + "_" + itemCosts.id
    );
    costsButton.addEventListener("click", (event) =>
      editCostsFunction(itemCosts, liCostsList, event, index)
    );
    const buttonRemove = document.getElementById(
      "remove" + index + "_" + itemCosts.id
    );

    buttonRemove.addEventListener("click", (event) =>
      removeFunction(index, "costs")
    );
  });
  calculateCosts();
  moneyToSpent();
}

function editCostsFunction(itemCosts, node, event, index) {
  event.preventDefault();

  if (isButtonEditClickedCosts == true) {
    document.getElementById("error" + itemCosts.id).innerHTML =
      "Kliknij przycisk Akceptuj";
    return;
  }
  isButtonEditClickedCosts = true;
  console.log(isButtonEditClickedCosts);
  if ((isButtonEditClickedCosts = true)) {
    costsButton.disabled = true;
    node.innerHTML = "";
  }

  const nameInput = document.createElement("input");
  const cashInput = document.createElement("input");
  const buttonAccept = document.createElement("button");

  buttonAccept.innerHTML = "Akceptuj";
  nameInput.value = itemCosts.name;
  cashInput.value = itemCosts.cash;

  node.appendChild(nameInput);
  node.appendChild(cashInput);
  node.appendChild(buttonAccept);

  buttonAccept.addEventListener("click", (event) =>
    acceptCostsFunction(cashInput, nameInput, index, node)
  );
}

function acceptCostsFunction(cashInput, nameInput, index, node) {
  isButtonEditClickedCosts = false;
  costsButton.disabled = false;

  console.log(isButtonEditClickedCosts);
  node.innerHTML = "";
  costs[index].name = nameInput.value;
  costs[index].cash = cashInput.value;
  renderCostsList();
}

function calculateCosts() {
  costsSummary = 0;
  costs.map((itemCosts) => {
    costsSummary += parseInt(itemCosts.cash);
  });
  document.getElementById("costsSum").innerHTML =
    "SUMA WYDATKÓW :" + " " + costsSummary + " złotych ";
}

function moneyToSpent() {
  let moneyLeft = incomeSummary - costsSummary;
  let message = "";
  if (moneyLeft > 0) {
    message = "Możesz wydać:" + moneyLeft + " złotych ";
  }
  if (moneyLeft === 0) {
    message = "Bilans wynosi:" + moneyLeft + " złotych ";
  }
  if (moneyLeft < 0) {
    message = "Jesteś na minusie: " + moneyLeft + " złotych ";
  }
  document.getElementById("money_to_spent").innerHTML = message;
}
