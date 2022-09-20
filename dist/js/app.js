'use strict';

const url = "api/hotels.json";

const hotels = document.querySelector('.hotels');
const pagination = document.getElementById('pagination');

let currentPage = 1;
let rows = 2;

const getData = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        showData(data);
        paginationList(data,hotels,rows,currentPage);
        paginationCreate(data,pagination,rows);
    })
    .catch(error => console.log(error))
}
getData(url);

const showData = (data) => {
    hotels.innerHTML = '';
    data.forEach(hotel => {
        UI(hotel);
    });
}

const UI = (hotel) => {
    const hotelItems = document.createElement('div');
    hotelItems.classList.add('hotel-item');
    hotelItems.innerHTML = `
        <div class="hotel-header">
            <div class="row align-items-center justify-content-between">
                <div class="col-lg-9 col-md-8 col-10">
                    <div class="hotel-title">
                        <a href="${hotel.url}" title="${hotel.hotelName}" target="_blank">
                            <h2> ${hotel.hotelName} </h2>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-2">
                    <div class="hotel-score">
                        <div class="hotel-score-text">
                            <div class="hotel-score-title"> ${hotel.customersPointText} </div>
                            <div class="hotel-score-sub-title">
                                <a href="${hotel.url}" title="${hotel.hotelName}" target="_blank">32 Değerlendirme</a>
                            </div>
                        </div>
                        <div class="hotel-score-point"> ${hotel.customerScore} </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hotel-content">
            <div class="row">
                <div class="col-lg-3">
                    <div class="hotel-image-container">
                        <div class="hotel-image">
                            <a href="${hotel.url}" title="${hotel.hotelName}" target="_blank">
                                <img src="${hotel.photoPath}" data-src="${hotel.photoPath}" class="lazy" alt="${hotel.hotelName}">
                            </a>
                        </div>
                        <div class="hotel-favorites">
                            <a href="${hotel.url}" title="Favorilere Ekle">
                                <i class="fa-regular fa-heart"></i>
                            </a>
                        </div>
                        <div class="hotel-badge">
                            <div class="hotel-badge-item badge-one">
                                <i class="fa-solid fa-money-bill"></i>
                                <span>Ön Ödeme Fırsatı</span>
                            </div>
                            <div class="hotel-badge-item badge-two">
                                <i class="fa-solid fa-notes-medical"></i>
                                <span>Sağlık Sertifikası</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="hotel-information">
                        <div class="hotel-location">
                            <i class="fa-sharp fa-solid fa-location-dot"></i>
                            <strong> ${hotel.areaName} - ${hotel.subAreaName} </strong>
                        </div>
                        <div class="hotel-campaign"> ${hotel.campaignName} </div>
                        <div class="hotel-free-cancel">
                            <i class="fa-solid fa-circle-info"></i>
                            <span>Ücretsiz İptal</span>
                        </div>
                        <div class="hotel-features">
                            <ul>
                                ${hotel.hotelPropertyList.map(feature => `<li><span>${feature.name}</span></li>`).join("")}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="hotel-price-container">
                        <div class="hotel-accommodation"> ${hotel.accommodation} </div>
                        <div class="hotel-price">
                            <div class="hotel-price-old"> 
                                <span> ${Math.floor(hotel.price)} TL </span>
                            </div>
                            <div class="hotel-price-new"> 
                                <strong> ${Math.floor(hotel.discountPrice)} TL </strong>
                            </div>
                        </div>
                        <div class="hotel-price-description">
                            <p> Gecelik kişi başı </p>
                        </div>
                        <div class="hotel-detail">
                            <a href="${hotel.url}" title="${hotel.hotelName}">Detayları İncele</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    hotels.appendChild(hotelItems);
}

const paginationList = (data,container,rowsPage,page) => {
    container.innerHTML = '';
    page--;

    let start = rowsPage * page;
    let end = start + rowsPage;
    let paginatedItems = data.slice(start,end);

    for(let i = 0; i < paginatedItems.length; i++) {
        let dataItem = paginatedItems[i];
        UI(dataItem);
    }
}

const paginationCreate = (data,container,rowsPage) => {
    container.innerHTML = '';

    let pageCount = Math.ceil(data.length / rowsPage);
    for (let i = 1; i < pageCount; i++) {
        let btn = paginationButton(i,data);
        container.appendChild(btn);
    }
}

const paginationButton = (pageNumber,data) => {
    let button = document.createElement('button');
    button.innerText = pageNumber;

    if(currentPage == pageNumber) button.classList.add('active');

    button.addEventListener('click', () => {
        currentPage = pageNumber;
        paginationList(data,hotels,rows,currentPage);

        let activeButton = document.querySelector('#pagination button.active');
        activeButton.classList.remove('active');
        
        button.classList.add('active');
    });

    return button;
}