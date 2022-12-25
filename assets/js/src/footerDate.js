const footerYear = document.getElementById('footerYear');

function footerDate() {
  const year = new Date().getFullYear();

  if (footerYear.innerHTML === `${year}`)
    return;
  
  footerYear.innerHTML = year;
}

export default footerDate;
