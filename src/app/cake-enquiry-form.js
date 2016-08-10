const cakeEnquiryFormEl = document.querySelector('.cake-enquiry-form');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
function trim(s) {
  return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function getCelebrationType() {
  const celebrationTypeEl = cakeEnquiryFormEl.querySelector('[name=celebration-type]:checked');
  return celebrationTypeEl ? celebrationTypeEl.value : null;
}

function getCelebrationTypeOther() {
  const celebrationTypeOtherEl = cakeEnquiryFormEl.querySelector('[name=celebration-type-other]');
  return trim(celebrationTypeOtherEl.value);
}

function validate() {
  const errors = [];
  const celebrationType = getCelebrationType();
  if (celebrationType === 'other') {
    if (!getCelebrationTypeOther()) {
      errors.push({ field: 'celebration-type', message: 'Please enter your celebration type' });
    }
  }
  return errors;
}

function renderCelebrationTypeError(error) {
  const fieldEl = cakeEnquiryFormEl.querySelector('[name=celebration-type-other]');
  const messageEl = cakeEnquiryFormEl.querySelector('.celebration-type-other-error');
  fieldEl.classList.add('error');
  messageEl.textContent = error.message;
}

function renderErrors(errors) {
  errors.forEach((error) => {
    switch (error.field) {
      case 'celebration-type':
        renderCelebrationTypeError(error);
        break;
      default:
        break;
    }
  });
}

function clearErrors() {
  const fieldEl = cakeEnquiryFormEl.querySelector('[name=celebration-type-other]');
  const messageEl = cakeEnquiryFormEl.querySelector('.celebration-type-other-error');
  fieldEl.classList.remove('error');
  messageEl.textContent = '';
}

function attachEvents() {
  const submitButtonEl = cakeEnquiryFormEl.querySelector('button[type=submit]');
  submitButtonEl.addEventListener('click', (event) => {
    event.preventDefault();
    clearErrors();
    const errors = validate();
    if (errors) {
      renderErrors(errors);
    }
  });
}

attachEvents();
