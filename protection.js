/**
 * DANIELE. PROTOTYPE - LEGAL PROTECTION SYSTEM
 * Rileva ispezioni, forza il refresh e mostra avvisi legali di copyright.
 * Stealth mode: si auto-elimina dal DOM.
 */

(function() {
    'use strict';

    // 1. SELF-DESTRUCT: Nasconde la traccia dello script nel DOM
    const hideScript = () => {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes('protection.js')) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
    };
    hideScript();

    // 2. STILE NOTIFICA (Minimal & Montserrat)
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap');
        .legal-toast {
            position: fixed; bottom: 30px; right: 30px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 30px; border-radius: 15px;
            color: #fff; font-family: 'Montserrat', sans-serif;
            z-index: 99999; transform: translateY(150%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            max-width: 350px; text-transform: lowercase;
        }
        .legal-toast.active { transform: translateY(0); }
        .legal-toast h4 { font-weight: 900; font-size: 0.8rem; margin-bottom: 5px; color: #ff3b3b; }
        .legal-toast p { font-size: 0.65rem; color: #888; line-height: 1.4; }
    `;
    document.head.appendChild(style);

    // 3. LOGICA NOTIFICA
    const showLegalNotice = () => {
        const toast = document.createElement('div');
        toast.className = 'legal-toast';
        toast.innerHTML = `
            <h4>copyright violation alert</h4>
            <p>unauthorized inspection detected. all code, assets, and documents are protected under international copyright law. actions are being logged.</p>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('active'), 100);
        setTimeout(() => toast.classList.remove('active'), 6000);
    };

    // Controllo se siamo appena tornati da un tentativo di ispezione
    if (sessionStorage.getItem('legal_violation')) {
        window.onload = () => {
            showLegalNotice();
            sessionStorage.removeItem('legal_violation');
        };
    }

    const triggerProtection = () => {
        sessionStorage.setItem('legal_violation', 'true');
        location.reload();
    };

    // 4. RILEVAMENTO DEVTOOLS (Metodo dimensionale)
    const checkDevTools = () => {
        const threshold = 160;
        const isOpen = window.outerWidth - window.innerWidth > threshold || 
                       window.outerHeight - window.innerHeight > threshold;
        
        if (isOpen) triggerProtection();
    };

    // 5. ANTI-DEBUGGER (Leggero, senza crash)
    setInterval(() => {
        const start = performance.now();
        debugger;
        if (performance.now() - start > 100) triggerProtection();
    }, 1000);

    // 6. SHORTCUTS BLOCCHATE (Triggerano il reload)
    document.addEventListener('keydown', (e) => {
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
            (e.ctrlKey && e.keyCode === 85)
        ) {
            e.preventDefault();
            triggerProtection();
        }
    });

    window.addEventListener('resize', checkDevTools);
    checkDevTools();

    // Pulizia console
    setInterval(console.clear, 2000);

})();