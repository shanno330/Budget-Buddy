let updateBalance = document.getElementById("updateBalance");
let availableAmt = document.getElementById("spendLabel");
let entertainmentTotal = 0.0;
let clothingTotal = 0.0;
let foodTotal = 0.0;
let billsTotal = 0.0;
document.querySelector(".editBudget").style.visibility = "hidden";
document.querySelector(".submitBudget").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".budgetAmount").style.visibility = "hidden";
  document.querySelector(".editBudget").style.visibility = "visible";
  document.querySelector(".submitBudget").style.visibility = "hidden";
  document.querySelector(".displayTotal").style.visibility = "visible";
  document.querySelector(".displayTotal").style.color = "yellow";
  let inputValue = document.querySelector(".budgetAmount").value;
  let display = document.querySelector(".displayTotal");
  let indiv = document.getElementById("indiv");
  let amt = document.getElementById("amt");
  indiv.style.color = "yellow";
  indiv.style.fontSize = "40";
  amt.style.color = "yellow";
  amt.style.fontSize = "40";
  availableAmt.style.color = "yellow";
  availableAmt.style.fontSize = "40px";
  updateBalance.style.color = "yellow";
  updateBalance.style.fontSize = "40px";
  display.innerHTML = `$ ${inputValue}`;
  if (inputValue === "") {
    alert("Enter the value");
  } else {
    amt.innerHTML = `${parseFloat(amt.innerHTML) + parseFloat(inputValue)}`;
    updateBalance.innerHTML = `${
      parseFloat(updateBalance.innerHTML) + parseFloat(inputValue)
    }`;
  }
  document.querySelector(".editBudget").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".budgetAmount").style.visibility = "visible";
    document.querySelector(".editBudget").style.visibility = "hidden";
    document.querySelector(".submitBudget").style.visibility = "visible";
    document.querySelector(".displayTotal").style.visibility = "hidden";
    document.querySelector(".budgetAmount").value = "none";
  });
});

document.getElementById("purchase").addEventListener("click", function (e) {
  e.preventDefault();
  let stuff = document.getElementById("stuff").value;
  let expenses = document.getElementById("expenses").value;
  let purchaseAmount = document.getElementById("purchaseAmount").value;
  let listOfItems = document.getElementById("listOfItems");
  let balanceCheck = 0.0;
  balanceCheck =
    parseFloat(updateBalance.innerHTML) - parseFloat(purchaseAmount);
  if (purchaseAmount != 0) {
    if (balanceCheck >= 0.0) {
      updateBalance.innerHTML = (
        parseFloat(updateBalance.innerHTML) - parseFloat(purchaseAmount)
      ).toFixed(2);
    } else {
      alert("Do not have sufficient money!");
      availableAmt.style.color = "red";
      availableAmt.style.fontSize = "40px";
      updateBalance.style.color = "red";
      updateBalance.style.fontSize = "40px";
      updateBalance.innerHTML = parseFloat(updateBalance.innerHTML).toFixed(2);
      console.log(updateBalance.innerHTML);
    }
  }

  if (expenses === "Entertainment" && balanceCheck >= 0) {
    let item1 = document.createElement("div");
    item1.innerHTML = `${stuff}: $ ${purchaseAmount}`;
    item1.classList.add('itemList');
    item1.addEventListener('click', deleteTask);
    listOfItems.append(item1);
    entertainmentTotal = entertainmentTotal + parseFloat(purchaseAmount);
  } else if (expenses === "Food" && balanceCheck >= 0) {
    let item2 = document.createElement("div");
    item2.innerHTML = `${stuff}: $ ${purchaseAmount}`;
    listOfItems.append(item2);
    foodTotal = foodTotal + parseFloat(purchaseAmount);
    item2.classList.add('itemList');
    item2.addEventListener('click', deleteTask);
  } else if (expenses === "Bills" && balanceCheck >= 0) {
    let item4 = document.createElement("div");
    item4.classList.add('itemList');
    item4.addEventListener('click', deleteTask);
    item4.innerHTML = `${stuff}: $ ${purchaseAmount}`;
    billsTotal = billsTotal + parseFloat(purchaseAmount);
    listOfItems.append(item4);
  } else if (expenses === "Clothing" && balanceCheck >= 0) {
    let item3 = document.createElement("div");
    item3.classList.add('itemList');
    item3.addEventListener('click', deleteTask);
    item3.innerHTML = ` ${stuff}: $ ${purchaseAmount}`;
    listOfItems.append(item3);
    clothingTotal = clothingTotal + parseFloat(purchaseAmount);
  }
function deleteTask(event){
  // let updateBalance = document.getElementById("updateBalance");
  event.target.remove();
  let itemListValue = document.getElementsByClassName('itemList').innerText;
  console.log(itemListValue);
  // updateBalance.innerHTML =
  //   parseFloat(updateBalance.innerHTML) + parseFloat(itemListValue);
}
  var ctx = document.getElementById("chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Entertainment", "Clothing", "Food", "Bills"],
      datasets: [
        {
          label: "Spending by Category",
          data: [entertainmentTotal, clothingTotal, foodTotal, billsTotal],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(255,127,80, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(234, 100, 191, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(255,127,80, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(234, 100, 191, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });
});
