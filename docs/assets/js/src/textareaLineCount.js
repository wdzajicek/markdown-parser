const INPUT = document.getElementById('input');
const COUNT = document.getElementById('lineCount');

function populateCount(num, popBool = true) {
  const iterator = Array(num).keys();

  for (const key of iterator) {
    if (popBool) {
      const span = document.createElement('span');

      span.classList.add('textarea__count');
      COUNT.append(span);
    } else {
      COUNT.removeChild(COUNT.lastChild);
    }
  }
}

function textareaLineCount() {
  const initialCount = INPUT.value.split('\n').length;
  populateCount(initialCount);

  INPUT.addEventListener('keyup', (e) => {
    const count = e.target.value.split('\n').length;
    const countIsShort = (count > COUNT.childElementCount);
    const countIsLong = (count < COUNT.childElementCount);
    let difference;

    if (countIsShort) {
      difference = count - COUNT.childElementCount;

      populateCount(difference);
    }
    if (countIsLong) {
      difference = COUNT.childElementCount - count

      populateCount(difference, false);
    }

  });
}

export default textareaLineCount;
