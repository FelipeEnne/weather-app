function storeCity(city) {
  const cit = JSON.stringify(city);
  sessionStorage.setItem(0, cit);
}

document.getElementById('button-getCity').addEventListener('click', () => {
  const val = document.getElementById('input-getCity').value;
  storeCity(val);
});

function getCity() {
  const cit = sessionStorage.getItem(0);
  return JSON.parse(cit);
}

export default getCity;
