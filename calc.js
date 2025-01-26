const resultShow = document.getElementById("discalc");
const btns = document.querySelectorAll(".btns button");

let current = "";
let oper = "";
let firstValue = "";
let calculated = false;

function safeEval(first, operator, second) {
  first = parseFloat(first);
  second = parseFloat(second);

  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      if (second === 0) {
        resultShow.value = "Error";
        return "";
      }
      return first / second;
    default:
      return "";
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const value = btn.textContent;

    if (value === "C") {
      current = "";
      oper = "";
      firstValue = "";
      resultShow.value = "";
      calculated = false;
      return;
    }

    if (calculated && !isNaN(value)) {
      current = "";
      calculated = false;
    }

    if (value === "=") {
      if (current && oper && firstValue) {
        const result = safeEval(firstValue, oper, current);
        resultShow.value = result !== "" ? result : "Error";
        current = result.toString();
        firstValue = "";
        oper = "";
        calculated = true;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (current !== "") {
        oper = value;
        firstValue = current;
        current = "";
      }
    } else {
      current += value;
      resultShow.value = current;
    }
  });
});
