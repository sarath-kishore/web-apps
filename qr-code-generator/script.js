const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form .qrInput"),
generateBtn = wrapper.querySelector(".form .submit"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

function generateQR() {
        let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
}

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

generateBtn.addEventListener("click", () => {
generateQR();
});

document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    generateQR();
});