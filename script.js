const zipcode = document.querySelector('.zipcode');
const outputContainer = document.querySelector('.output-container');
const check = document.querySelector('.check-times');
const closeInfo = document.querySelector('.times');
const invalid = document.querySelector('.not-found');

zipcode.addEventListener('input', fetchInfo);
check.addEventListener('click', function () {
    outputContainer.style.display = 'none';
    check.style.display = 'none';
    invalid.style.display = 'none';
    zipcode.value = '';
});
closeInfo.addEventListener('click', function () {
    outputContainer.style.display = 'none';
    check.style.display = 'none';
    zipcode.value = '';
});

function fetchInfo(event) {
    event.preventDefault();
    const code = zipcode.value;
    if (isNaN(code) || code.length != 5) {
        return;
    } else {
        fetch(`http://api.zippopotam.us/us/${code}`)
            .then(function (response) {
                if (response.ok) {
                    validZipcode();
                    return response.json();
                } else if (response.status === 404) {
                    invalidZipcode();
                    throw error(response.statusText);
                }
            })
            .then(function (data) {
                const city = document.querySelector('.city');
                const state = document.querySelector('.state');
                const longitude = document.querySelector('.long');
                const latitude = document.querySelector('.lat');

                city.textContent = data.country;
                state.textContent = data
                    .places[0]
                    .state;
                longitude.textContent = data
                    .places[0]
                    .longitude;
                latitude.textContent = data
                    .places[0]
                    .latitude;

            })
            .catch(function (error) {
                console.log(error)
            })
        }

}
//when the zipcode is  a valid US zipcode
function validZipcode() {
    outputContainer.style.display = 'block';
    check.style.display = 'block';
    check.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    // zipcode.value = '';
}
//when zipcode is not a invalid US zipcode
function invalidZipcode() {
    outputContainer.style.display = 'none';
    invalid.style.display = 'block';
    check.style.display = 'block';
    check.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
}
