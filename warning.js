/**
 * warning.js
 * Impedisce la visualizzazione su Mobile/Tablet iniettando un overlay bloccante.
 * Da implementare tramite: <script src="warning.js"></script>
 */

(function() {
    const initWarning = () => {
        // Rilevamento device (Mobile o Tablet basato su UserAgent e larghezza schermo)
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = (window.innerWidth <= 1024 && window.innerHeight <= 1366);

        if (isMobile || isTablet) {
            // 1. Iniezione CSS per l'overlay
            const style = document.createElement('style');
            style.innerHTML = `
                #mobile-block-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: #000;
                    z-index: 999999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 40px;
                    font-family: 'Montserrat', sans-serif;
                    color: #fff;
                    text-transform: lowercase;
                    overflow: hidden;
                }
                .block-title {
                    font-size: 1.8rem;
                    font-weight: 900;
                    margin-bottom: 20px;
                    letter-spacing: -1px;
                }
                .block-msg {
                    font-size: 0.9rem;
                    color: #888;
                    line-height: 1.6;
                    max-width: 320px;
                    letter-spacing: 1px;
                    font-weight: 300;
                }
                .block-footer {
                    margin-top: 50px;
                    font-size: 0.6rem;
                    color: #444;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                }
            `;
            document.head.appendChild(style);

            // 2. Iniezione HTML dell'overlay
            const overlay = document.createElement('div');
            overlay.id = 'mobile-block-overlay';
            overlay.innerHTML = `
                <div class="block-title">desktop only.</div>
                <div class="block-msg">
                    due to ongoing maintenance and optimization for mobile devices, 
                    this experience is currently restricted to desktop browsers.
                </div>
                <div class="block-footer">under construction</div>
            `;
            
            // Blocca lo scroll del body
            document.body.style.overflow = 'hidden';
            document.body.appendChild(overlay);

            // Rimuove elementi critici che potrebbero comunque pesare in background
            const spline = document.querySelector('spline-viewer');
            if (spline) spline.remove();
        }
    };

    // Esegue al caricamento del DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWarning);
    } else {
        initWarning();
    }
})();
