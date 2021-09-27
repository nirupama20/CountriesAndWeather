var container = document.createElement("div");
container.setAttribute("class", "container-fluid");
var parentDiv = document.createElement("div");
parentDiv.setAttribute("class", "row");
parentDiv.style.cssText = "justify-content: space-between;margin: 15px;"
container.appendChild(parentDiv);
document.body.appendChild(parentDiv);

var apikey = "b7d11cabc8af26d6aa46acfa5eb82f24";
var url = `http://api.countrylayer.com/v2/all?access_key=${apikey}`;

const showWeatherInfo = (country) => {
    document.getElementById("title").innerText=country.name;
    var url=`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=b9695604e3d206ec7afff8e288d8a818`;
    fetch(url)
    .then(function(data){
        return data.json();
    })
    .then(function(json_data){
        document.getElementById('temperatureValue').innerText=`Temperature : ${json_data.main.temp}`;
        document.getElementById('pressureValue').innerText=`Pressure : ${json_data.main.pressure}`;
        document.getElementById('humidityValue').innerText=`Humidity : ${json_data.main.humidity}`;
    })
};

var allCountries = fetch(url)
    .then(function (data) {
        return data.json();
    }).then(data => {
        data.forEach(country => {
            var cardParent = document.createElement("div");
            cardParent.setAttribute("class", "col-lg-4");
            cardParent.style.cssText = "margin-bottom: 20px";
            var cardContainer = document.createElement("div");
            cardContainer.setAttribute("class", "col-sm-12");
            var card = document.createElement("div");
            card.setAttribute("class", "card");
            card.style.cssText = 'color:white;background-image: linear-gradient(to left, #112f3b, #e4cea6);text-align:center;';
            cardContainer.appendChild(card);
            cardParent.appendChild(cardContainer);
    
            // Show country name inside card-header
            var head = document.createElement("div");
            head.setAttribute("class", "card-header");
            head.style.cssText = 'background-color:black;';
            head.innerHTML = country.name;
            
            // Adding country details inside card body
            var body = document.createElement("div");
            body.setAttribute("class", "card-body");
            body.style.cssText = 'padding:10px;background-image: linear-gradient(to left, #112f3b, #e4cea6);';
            // Adding flag image
            const flag = document.createElement('img');
            flag.setAttribute('src', `https://restcountries.com/data/png/${country.alpha3Code.toLowerCase()}.png`);
            flag.style.cssText = 'width: 80%; height: 180px; margin-bottom: 8px; margin-top: 15px;'
            body.appendChild(flag);
            var capital = document.createElement('div');
            capital.innerHTML = `Capital : ${country.capital}`
            body.appendChild(capital);
            var region = document.createElement('div');
            region.innerHTML = `Region : ${country.region}`
            body.appendChild(region);
            var countryCode = document.createElement('div');
            countryCode.innerHTML = `Country Code: ${country.alpha3Code}`
            body.appendChild(countryCode);

            // Adding button for weather info            
            const button = document.createElement('button');
            button.setAttribute('class', 'btn btn-primary');
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#weatherModal');
            button.onclick = () => showWeatherInfo(country);
            button.style.cssText = 'background-color: transparent;border-color:white';
            button.innerHTML = 'Click for Weather';
            body.appendChild(button);
            // Adding head and body to card
            card.appendChild(head);
            card.appendChild(body);

            parentDiv.appendChild(cardParent);
        });
    });
