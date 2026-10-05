// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// SCROLL BACKGROUND - 2 LAYER SMOOTH
// ============================================
const bgMario = document.getElementById('bgMario');
const bgWreck = document.getElementById('bgWreck');

function updateBackgroundShade() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    
    let progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    progress = Math.min(Math.max(progress, 0), 1);
    
    const eased = progress < 0.5 ? 
        2 * progress * progress : 
        -1 + (4 - 2 * progress) * progress;
    
    bgMario.style.opacity = 1 - eased;
    bgWreck.style.opacity = eased;
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateBackgroundShade();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    bgMario.style.opacity = '1';
    bgWreck.style.opacity = '0';
    setTimeout(() => {
        updateBackgroundShade();
    }, 300);
});

window.addEventListener('resize', () => {
    updateBackgroundShade();
});

console.log('🌊 Smooth shades biru: Gelap → Terang (continuous)');

// ============================================
// LOADING SCREEN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingTips = document.getElementById('loadingTips');
    
    const tips = [
        { icon: '💡', text: 'Terima kasih sudah meramaikan PLC 2K26!' },
        { icon: '🎮', text: 'Sampai jumpa di PLC 2K27!' },
        { icon: '🏆', text: '150+ peserta sudah ikut meramaikan!' },
        { icon: '📸', text: 'Cek galeri foto di bawah ya!' },
        { icon: '🍄', text: 'Kenangan indah yang tak terlupakan!' },
    ];
    
    let tipIndex = 0;
    let progress = 0;
    
    function updateTip() {
        const tip = tips[tipIndex % tips.length];
        loadingTips.innerHTML = `
            <span class="tip-icon">${tip.icon}</span>
            <span class="tip-text">${tip.text}</span>
        `;
        tipIndex++;
    }
    
    setInterval(updateTip, 1500);
    updateTip();
    
    function updateProgress() {
        progress += 5;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress > 50) {
            progressFill.style.background = 'linear-gradient(90deg, #FBD000, #E52521, #FBD000)';
        }
        if (progress > 80) {
            progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #FBD000, #4CAF50)';
            loadingPercentage.style.color = '#4CAF50';
        }
        
        if (progress < 100) {
            setTimeout(updateProgress, 50);
        } else {
            loadingPercentage.textContent = '100%';
            loadingPercentage.style.color = '#4CAF50';
            
            setTimeout(() => {
                loadingPercentage.textContent = '✓ READY!';
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    
                    const hero = document.querySelector('.hero');
                    if (hero) {
                        hero.style.opacity = '0';
                        hero.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            hero.style.transition = 'all 1s ease';
                            hero.style.opacity = '1';
                            hero.style.transform = 'translateY(0)';
                        }, 100);
                    }
                }, 400);
            }, 300);
        }
    }
    
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        updateProgress();
    }, 300);
});