// Kelimeler:
const words = [
    "Freelancer",
    "YouTuber",
    "Developer",
];

let index = 0;
let job = document.querySelector(".job");
job.innerHTML = words[index];

// İkinci kelime:
const secondWord = document.querySelector(".second-word");

// İkinci kelimenin genişliği
const secondWordComputedWidth = parseInt(getComputedStyle(secondWord).width);

// Caret:
const caret = document.querySelector(".caret");

// Caretin başlangıç pozisyonu:
let caretPosition = parseInt(getComputedStyle(caret).left);

// Caret başlangıç pozisyonuna değer ataması:
caret.style.left = secondWordComputedWidth + "px";

// Caretin genişliği
let caretWidth = parseInt(getComputedStyle(caret).width);

// Caret genişliğine değer ataması:
caret.style.width = secondWordComputedWidth + "px";

// Decrease işlemini kontrol eden boolean değişken:
let isDecreaseCompleted = false;

// Timeout değişkenini alma:
let splitted = caret.style.width.split("p");
let caretStyleWidth = parseInt(splitted[0]);
let timeout = parseInt(caretStyleWidth * 20) + 20;

// Sola kaydırma fonksiyonu:
function decrease(callback){
    const decreaseInterval = setInterval(
        function(){
            const caretPosition = parseInt(getComputedStyle(caret).left);

            // Caret pozisyonu 0'dan büyükse:
            if(caretPosition>=0){
                // Caret'in pozisyonunu 1'er 1'er azalt.
                caret.style.left = caretPosition - 1 + "px";
                // Değilse:
            }else{
                // isDecreaseCompleted değişkenini false yap ve intervali temizle
                isDecreaseCompleted = true;
                clearInterval(decreaseInterval);
            }
        }, 20 // Fonksiyon 20ms'de 1 çalışacak.
    );

    // İşlem bittiğinde callback fonksiyonu (increase) çağır 
    setTimeout(() => {
        callback();
    }, timeout);
}

function increase(){
    const increaseInterval = setInterval(
        function(){
            job.innerHTML = words[index+1];

            const caretPosition = parseInt(getComputedStyle(caret).left);

            const caretWidth = parseInt(getComputedStyle(caret).width);

            if(caretPosition<=caretWidth){
                caret.style.left = caretPosition + 1 + "px";
            }else{
                clearInterval(increaseInterval);

                caret.style.left = secondWordComputedWidth + "px";

                setTimeout(function () {
                    isDecreaseCompleted = false;
                    decrease(increase);
                }, timeout);
            }
        },20
    );
}
decrease(increase);