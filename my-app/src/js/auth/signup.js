var selectedRegionCode = null;
var selectedProvinceCode = null;
var selectedCityCode = null;
var selectedBarangayCode = null;

var apiEndpoints = {
    region: 'https://psgc.gitlab.io/api/regions/',
    provinces: 'https://psgc.gitlab.io/api/provinces/',
    cities: 'https://psgc.gitlab.io/api/cities/',
    barangays: 'https://psgc.gitlab.io/api/barangays/'
};

axios.get(apiEndpoints.region)
.then(function (response) {
    var regions = response.data; 
    var regionDropdownMenu = document.getElementById('regionDropdown');
    var regionDropdownButton = document.getElementById('regionDropdownButton');

    regions.forEach(function(region) {
        var listItem = document.createElement('li');
        var anchor = document.createElement('a');
        anchor.className = 'dropdown-item';
        anchor.textContent = region.name; 
        
        anchor.addEventListener('click', function() {
            selectedRegionCode = region.code; 
            regionDropdownButton.textContent = region.name; 
            populateProvinces(selectedRegionCode);
        });

        listItem.appendChild(anchor);
        regionDropdownMenu.appendChild(listItem);
    });
})
.catch(function (error) {
    console.log(error);
});

function populateProvinces(regionCode) {
    axios.get(apiEndpoints.provinces)
    .then(function (response) {
        var provinceDropdownMenu = document.getElementById('provinceDropdown');
        var provinceDropdownButton = document.getElementById('provinceDropdownButton');
        provinceDropdownMenu.innerHTML = ''; 

        var filteredProvinces = response.data.filter(function(province) {
            return province.regionCode === regionCode; 
        });

        filteredProvinces.forEach(function(province) {
            var listItem = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.className = 'dropdown-item';
            anchor.textContent = province.name;

            anchor.addEventListener('click', function() {
                selectedProvinceCode = province.code; 
                provinceDropdownButton.textContent = province.name; 
                populateCities(selectedProvinceCode); 
            });

            listItem.appendChild(anchor);
            provinceDropdownMenu.appendChild(listItem);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

function populateCities(provinceCode) {
    axios.get(apiEndpoints.cities)
    .then(function (response) {
        var cityDropdownMenu = document.getElementById('cityDropdown');
        var cityDropdownButton = document.getElementById('cityDropdownButton');
        cityDropdownMenu.innerHTML = ''; 

        var filteredCities = response.data.filter(function(city) {
            return city.provinceCode === provinceCode; 
        });

        filteredCities.forEach(function(city) {
            var listItem = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.className = 'dropdown-item';
            anchor.textContent = city.name;

            anchor.addEventListener('click', function() {
                selectedCityCode = city.code; 
                cityDropdownButton.textContent = city.name; 
                populateBarangays(selectedCityCode); 
            });

            listItem.appendChild(anchor);
            cityDropdownMenu.appendChild(listItem);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

function populateBarangays(cityCode) {
    axios.get(apiEndpoints.barangays)
    .then(function (response) {
        var barangayDropdownMenu = document.getElementById('barangayDropdown');
        var barangayDropdownButton = document.getElementById('barangayDropdownButton');
        barangayDropdownMenu.innerHTML = ''; 

        var filteredBarangays = response.data.filter(function(barangay) {
            return barangay.cityCode === cityCode; 
        });

        filteredBarangays.forEach(function(barangay) {
            var listItem = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.className = 'dropdown-item';
            anchor.textContent = barangay.name;

            anchor.addEventListener('click', function() {
                selectedBarangayCode = barangay.code; 
                barangayDropdownButton.textContent = barangay.name; 
            });

            listItem.appendChild(anchor);
            barangayDropdownMenu.appendChild(listItem);
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

const submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = async (e) => {
    e.preventDefault(); // 
    
    const firstname = document.getElementById('firstname').value.trim();
    const middlename = document.getElementById('middlename').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const extensionname = document.getElementById('extensionname').value.trim();
    const username = document.getElementById('username').value.trim();
    const gender = document.getElementById('genderDropdownButton').value.trim();

    const password = document.getElementById('password').value.trim();
    const passwordConfirm = document.getElementById('passwordconfirm').value.trim();
    const birthdate = document.getElementById('birthdate').value.trim();
    const region = document.getElementById('regionDropdownButton').textContent.trim();
    const province = document.getElementById('provinceDropdownButton').textContent.trim();
    const city = document.getElementById('cityDropdownButton').textContent.trim();
    const barangay = document.getElementById('barangayDropdownButton').textContent.trim();

    if (!firstname || !lastname || !username || !password || !passwordConfirm || !birthdate || !selectedRegionCode || !selectedProvinceCode || !selectedCityCode || !selectedBarangayCode) {
        alert('Please fill out all required fields.');
        return; 
    }

    if (password !== passwordConfirm) {
        alert('Passwords do not match. Please try again.');
        return; 
    }

    console.log('First Name: ' + firstname);
    console.log('Middle Name: ' + middlename);
    console.log('Last Name: ' + lastname);
    console.log('Extension Name: ' + extensionname);
    console.log('User Name: ' + username);
    console.log('Gender: ' + gender);
    console.log('Password: ' + password);
    console.log('Birthdate: ' + birthdate);
    console.log('Region: ' + region);
    console.log('Province: ' + province);
    console.log('City: ' + city);
    console.log('Barangay: ' + barangay);

        alert('Registered successfully!');

};
