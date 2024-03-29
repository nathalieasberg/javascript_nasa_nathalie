//Api till nasa
const apiUrlNasa = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-6-3&api_key=vdntEq2OKCmt53gfay178pIUphmEaRgtIjZmrPE4";

const switchBtn = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body');

const darkModeKey = 'theme-dark';
const darkModeValue = 'active';

const addBtn = document.querySelector('#btn_add');
const inputText = document.querySelector('#inputText');
const nameText = document.querySelector('#name');

fetch(apiUrlNasa)
    .then((respons) => respons.json())
    .then((data) => {
        console.log(data);
        const nasaImg = data.photos;
        const imgContainer = document.querySelector(".cardContainer")
        //För att begränsa antalet bilder som visas
        const firstImgs = nasaImg.slice(0, 4);
        if (firstImgs.length !== 0) {
            // Om detta är sant finns det data
            console.log("Det finns data");
            //Skapar en loop för datan
            firstImgs.forEach((nasaCard) => {
                console.log(nasaCard.name);
                const newCard = createCard(nasaCard);

                //För att lägga till nya card i container
                imgContainer.append(newCard);
            })

        } else {
            console.log("Detta är felet");
            //Om en bild inte kan laddas in
            const noImg = document.createElement("h3");
            noImg.classList.add("card");
            noImg.textContent = "Can't find any photos from this date";
            imgContainer.appendChild(noImg);
        }
    // För att det ska stå i consolen om det är något som är fel
    }).catch((error) => console.log(`detta är felet: ${error}`));

    function createCard(nasaCard) {
        //Skapar upp html element
        const card = document.createElement("article");
        const fig = document.createElement("figure");
        const image = document.createElement("img");
        const rubrik = document.createElement("h3");
        const info = document.createElement("p");

        //Begränsar antalet cards som visas
        //Gör klasser på element
        card.classList.add("card");
        fig.classList.add("imgHolder");
        image.classList.add("image");
        rubrik.classList.add("rubrik");
        info.classList.add("info");

        //Hämtar och lägger till text
        rubrik.textContent = `NASA rover title : ${nasaCard.camera.name}`;
        info.textContent = `Date of photo: ${nasaCard.earth_date}`;
        card.appendChild(rubrik);
        card.appendChild(info);

        //Hämtar och lägger till bild
        image.src = nasaCard.img_src;
        image.alt = "Mars Image";
        card.appendChild(fig);
        fig.appendChild(image);

        //För att skicka det nya cardet till loopen
        return card;

    }

// Lägga till en lyssnare på addBtn
addBtn.addEventListener('click', () => {

    // För att hämta värdet i input
    // Lägga till text i ett html-element
    nameText.textContent = inputText.value;
    // Rensar input på värde
    inputText.value = '';
})

//För att lyssna på när det är mer än 3 tecken
inputText.addEventListener('keyup', () => {

    console.log(inputText.value.length);
    let getValueLength = inputText.value.length;

    if(getValueLength > 3 ) {
        console.log('det är mer är 3 tecken');
        btn_add.disabled = false;

    } else {
        console.log('Det är mindre än 3 tecken');
        btn_add.disabled = true;
    }
    
});

//För att få btn disabled efter man klickat på den
btn_add.addEventListener('click', () => {

    if(inputText.value === '') {
        //Om det är tomt i input
        console.log('Det finns inget i input');
        //Knappen vill vara disabled om det är tomt i input
        btn_add.disabled = true;
    }

});

//Kontrollera om det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    //Om detta är sant so finns det i localStorage
    console.log('Det finns något i localStorage');
    //Anropar funktion för att lägga till klassen dark
    enabledDarkMode();
}

//Lyssnare på click på switchBtn
switchBtn.addEventListener('click', () => {
    //Anropa funktionen som kontrollerar om dark finns
    toggleDarkMode();
});


// Skapa en funktion
function toggleDarkMode(){
    // Funktion som ska kolla om klassen dark finns på body
    console.log('ToggleDarkMode körs');
    // Om body HAR klassen dark
    if(bodyRef.classList.contains('dark')){
        //Blir sann om dark finns på body
        console.log('Body har klassen dark');
        disabledDarkMode();
    }else{
        console.log('Body har INTE klassen dark');
        // Om dark inte finns vill den läggas till
        enabledDarkMode();
    }
}
function enabledDarkMode(){
    //Funktion för att lägga till dark
    console.log('enabledDarkMode körs');
    //För att sätta input till checked
    switchBtn.checked = true;
    //Lägga till class på body
    bodyRef.classList.add('dark');
    //Anrop till funktion
    setLocalStorage();
}

function disabledDarkMode(){
    //Funktion för att ta bort klassen dark
    console.log('disabledDarkMode körs');
    switchBtn.checked = false;
    bodyRef.classList.remove('dark');
    //För att ta bort localStorage
    removeLocalStorage();
}

function setLocalStorage(){
    //Funktionen för att sätta localStorage
    console.log('Sätter localStorage');
    //Sätter localStorage
    localStorage.setItem(darkModeKey,darkModeValue);
}

function removeLocalStorage(){
    //Funktion för att ta bort localStorage
    console.log('remove localStorage körs');
    //För att ta bort localStorage
    localStorage.removeItem(darkModeKey);
}