document.getElementById('wordgate-form').addEventListener('submit', function checkPassword(e) {

  e.preventDefault();

  if (document.getElementById('uwm-input')

  && document.getElementById('uwm-input').value == 'letmein') window.location.href = '/uwm/uwm.html';

  if (document.getElementById('citi-input')

  && document.getElementById('citi-input').value == 'letmein') window.location.href = '/citi/citi.html';

  if (document.getElementById('bcg-input')

  && document.getElementById('bcg-input').value == 'letmein') window.location.href = '/bcg/bcg.html';

});
