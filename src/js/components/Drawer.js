// ====================================
// DRAWER CLASS
// ====================================
export default class Drawer {
    constructor(genre, count) {
        this.genre = genre;
        this.count = count;
    }

    createElement() {
        const drawer = document.createElement('div');
        drawer.classList.add('drawer');
        drawer.setAttribute('data-genre', this.genre);

        drawer.innerHTML = `
            <div class="drawer-front">
                <div class="drawer-name-plate">
                    <span class="drawer-name">${this.genre}</span>
                </div>
                <span class="drawer-count">${this.count}</span>
            </div>
        `;   
        
        return drawer;
    }
}