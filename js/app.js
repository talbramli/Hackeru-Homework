// const FIRST_NUM = document.getElementById("first-num");
// const SECOND_NUM = document.getElementById("second-num");
// const BTN = document.getElementById("btn");
// const RESULT = document.getElementById("result");

// const sum = (firstNum, secondNum) => {
//   return firstNum + secondNum;
// };
// const printNum = (firstNum, secondNum) => {
//   const sumOnNum = sum(firstNum, secondNum);
//   RESULT.innerHTML = sumOnNum;
// };
// BTN.addEventListener("click", () =>
//   printNum(FIRST_NUM.value, SECOND_NUM.value)
// );

class User {
  name = "wow!!!";
  text = User.name;
}

const user = new User();
console.dir(user);
