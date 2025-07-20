// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    } else { 
    x.className = x.className.replace(" w3-show", "");
    }
}





  //show 3d model automatically without pressing run button
var iframe = document.getElementById( 'api-frame' );
var uid = 'e3343a0e5e3346c1bacc1b6a77bcab9e';

// By default, the latest version of the viewer API will be used.
var client = new Sketchfab( iframe );

    client.init( uid, {
        success: function onSuccess( api ){
            api.start();
            api.addEventListener( 'viewerready', function() {
                  // API is ready to use
                  // Insert your code here
                console.log( 'Viewer is ready' );
            } );
        },
        error: function onError() {
            console.log( 'Viewer error' );
        }
    } );



// Funktion, um das Menü umzuschalten
function toggleFooterMenu() {
    var menu = document.getElementById("footerMenu");
    if (menu.classList.contains("w3-hide")) {
        menu.classList.remove("w3-hide");
    } else {
        menu.classList.add("w3-hide");
    }
}

function toggleFooterMenu(event) {
    event.preventDefault(); // Prevent any default action
    const footerMenu = document.getElementById('footerMenu');
    if (footerMenu.classList.contains('w3-hide')) {
        footerMenu.classList.remove('w3-hide'); // Show menu
    } else {
        footerMenu.classList.add('w3-hide'); // Hide menu
    }
}







  // Funktion, um das Modal zu öffnen für die fotos
function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = image.src;
}

  // Funktion, um das Modal zu schließen
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}












//kartenspiel
const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
const imageContainer = document.getElementById('image-container');
        
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
});
        
draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    });
}); 
dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        zone.appendChild(dragging);
    });

zone.addEventListener('drop', () => {
    const dragging = document.querySelector('.dragging');
        if (dragging.id === zone.dataset.match) {
            zone.classList.add('correct');
            } else {
            zone.classList.add('wrong');
            setTimeout(() => {
            imageContainer.appendChild(dragging);
            zone.classList.remove('wrong');
            }, 1000);
            }
    });
});

document.addEventListener('dragover', e => {
    e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) {
            const scrollSpeed = 10;
                if (e.clientY < 50) {
                        window.scrollBy(0, -scrollSpeed);
                    } else if (e.clientY > window.innerHeight - 50) {
                window.scrollBy(0, scrollSpeed);
            }
    }
});



// Funktion, um die Reihenfolge der Texte zufällig zu mischen
function shuffleText() {
const container = document.getElementById("text-container");
const elements = Array.from(container.getElementsByClassName("drop-zone"));

// Mischen der Elemente
    for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
            [elements[i], elements[j]] = [elements[j], elements[i]];
        }

// Füge die gemischten Elemente zurück in den Container
    elements.forEach(element => container.appendChild(element));
    }

// Rufe die Funktion zum Mischen der Texte auf
window.onload = shuffleText;












// conceptboard 
const conceptboard = document.querySelector('.conceptboard');
let isZoomed = false;  
let isDragging = false;  
let startX, startY;  
let translateX = 0, translateY = 0; 
let scale = 1; 

// Funktion, um das Bild zu zoomen
conceptboard.addEventListener("click", function(event) {
    const rect = conceptboard.getBoundingClientRect();
    const x = event.clientX - rect.left; // Mausposition relativ zum Bild
    const y = event.clientY - rect.top;

    // Berechnet den Prozentsatz der Mausposition relativ zur Bildgröße
    const zoomX = (x / rect.width) * 100;
    const zoomY = (y / rect.height) * 100;

    if (!isZoomed) {
        // Zoom-In
        scale = 2;
        conceptboard.style.transformOrigin = `${zoomX}% ${zoomY}%`;
        conceptboard.style.transform = `scale(${scale})`;
        isZoomed = true;
    } else {
        // Zoom-Out und zurücksetzen
        scale = 1;
        conceptboard.style.transform = `scale(${scale}) translate(0px, 0px)`;
        conceptboard.style.transformOrigin = "center center";
        isZoomed = false;
        translateX = 0;
        translateY = 0;
    }
});

// Event-Listener für das Starten des Ziehens
conceptboard.addEventListener("mousedown", function(event) {
    if (isZoomed) {
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        conceptboard.classList.add("dragging"); // Ändert den Cursor
    }
});

// Event-Listener für das Ziehen des Bildes
document.addEventListener("mousemove", function(event) {
    if (isDragging) {
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        conceptboard.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`; // Bild verschieben
    }
});

// Event-Listener für das Beenden des Ziehens
document.addEventListener("mouseup", function() {
    if (isDragging) {
        isDragging = false;
        conceptboard.classList.remove("dragging"); // Cursor zurücksetzen
    }
});













// Scroll-Zoom-Funktionalität
conceptboard.addEventListener("wheel", function(event) {
    event.preventDefault();
    const zoomIntensity = 0.1;

    // Berechnung des neuen Zoom-Levels
    if (event.deltaY < 0) {
        scale = Math.min(scale + zoomIntensity, 3); // Maximal 3x Zoom
    } else {
        scale = Math.max(scale - zoomIntensity, 1); // Minimal 1x Zoom
    }

    if (scale === 1) {
        // Wenn vollständig herausgezoomt, Position zurücksetzen
        translateX = 0;
        translateY = 0;
        isZoomed = false;
    } else {
        isZoomed = true;
    }

    conceptboard.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});











// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}


//für storys
  // Öffnen des Modals mit einer spezifischen ID
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

// Schließen des Modals mit einer spezifischen ID
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Wenn der Benutzer außerhalb des Modals klickt, wird es ebenfalls geschlossen
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}













 // Funktion, um den Scrollfortschritt zu berechnen
function updateScrollLine() {
    const scrollLine = document.querySelector('.scroll-line');
    const scrollTop = window.scrollY; // Scrollposition von oben
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollLine.style.width = scrollPercent + '%';
}

// Event-Listener für Scroll-Events
window.addEventListener('scroll', updateScrollLine);