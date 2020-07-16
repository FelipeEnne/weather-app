import displayData from './DOMmodel';

function addEventbut() {
  document.getElementById('buttom-celsius').addEventListener('click', () => {
    displayData(0);
  });

  document.getElementById('buttom-fahrenheit').addEventListener('click', () => {
    displayData(1);
  });
}

export default addEventbut;