import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async event => {
  update();
});

document.querySelector("form").addEventListener("submit", async event => {
  event.preventDefault();

  const waitingElement = document.querySelector("#waiting");
  waitingElement.textContent = "Please wait for processing!";

  const inputAmountElement = document.querySelector("#input-amount");
  const outputAmountElement = document.querySelector("#withdrawal-amount");

  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  const inputAmount = parseFloat(inputAmountElement.value);
  const outputAmount = parseFloat(outputAmountElement.value);

  if (!isNaN(inputAmount)) await dbank_backend.topUp(inputAmount);
  if (!isNaN(outputAmount)) await dbank_backend.withdrawl(outputAmount);

  update();

  button.removeAttribute("disabled");

  inputAmountElement.value = "";
  outputAmountElement.value = "";

  waitingElement.textContent = "";

});

async function update() {
  dbank_backend.compound();

  const currentAmount = await dbank_backend.checkBalance();
  document.querySelector("#value").textContent = currentAmount.toFixed(2);
}