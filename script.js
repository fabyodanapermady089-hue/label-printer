const fileInput = document.getElementById('files');
const container = document.getElementById('stickerContainer');
const paper = document.getElementById('paper');
let imageSource = null;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        imageSource = ev.target.result;
        render();
    };
    reader.readAsDataURL(file);
});

function render() {
    if (!imageSource) return;

    container.innerHTML = '';
    paper.className = document.getElementById('paperSize').value;
    
    const cols = document.getElementById('gridCols').value;
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;

    const w = document.getElementById('wCm').value;
    const h = document.getElementById('hCm').value;
    const pad = document.getElementById('padding').value;
    const copies = document.getElementById('copies').value;

    for (let i = 0; i < copies; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'sticker-item';
        wrapper.style.width = w + 'cm';
        wrapper.style.height = h + 'cm';
        wrapper.style.padding = pad + 'px';

        const img = document.createElement('img');
        img.src = imageSource;
        
        wrapper.appendChild(img);
        container.appendChild(wrapper);
    }
}

// Event listener agar preview berubah otomatis saat input diisi
['paperSize', 'wCm', 'hCm', 'padding', 'copies', 'gridCols'].forEach(id => {
    document.getElementById(id).addEventListener('input', render);
});
