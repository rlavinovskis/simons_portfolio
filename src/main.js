document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const gridView = document.getElementById('gridView');
    const videoDetail = document.getElementById('videoDetail');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const backBtn = document.getElementById('backBtn');
    const gridItems = document.querySelectorAll('.grid-item');
    const menuButtons = document.querySelectorAll('.menu button');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Determine current language from path
    const currentPath = window.location.pathname;
    const isLatvian = currentPath.includes('/lv/');
    const isEnglish = currentPath.includes('/eng/');

    // Video functionality - only for main pages
    if (gridView && videoDetail && videoPlayer && backBtn) {
        // Handle video item clicks
        gridItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.dataset.videoId;
                const title = item.dataset.title;
                const description = item.dataset.description;

                // Update video player
                videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
                videoTitle.textContent = title;
                videoDesc.textContent = description;

                // Show video detail view
                gridView.style.display = 'none';
                videoDetail.style.display = 'block';

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Handle back button
        backBtn.addEventListener('click', () => {
            // Stop video playback
            videoPlayer.src = '';

            // Show grid view
            gridView.style.display = 'grid';
            videoDetail.style.display = 'none';

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Optional: Handle browser back button
        window.addEventListener('popstate', () => {
            if (videoDetail.style.display === 'block') {
                backBtn.click();
            }
        });
    }

    // Handle menu navigation
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section;
            const lang = isLatvian ? 'lv' : 'eng';

            // Navigate to appropriate page
            if (section === 'main') {
                window.location.href = `index-${lang}.html`;
            } else if (section === 'about') {
                window.location.href = `about-${lang}.html`;
            } else if (section === 'info') {
                window.location.href = `info-${lang}.html`;
            }
        });
    });

    // Handle language switching
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetLang = button.dataset.lang;

            // Determine which page we're on
            if (currentPath.includes('about')) {
                window.location.href = targetLang === 'lv'
                    ? '../lv/about-lv.html'
                    : '../eng/about-eng.html';
            } else if (currentPath.includes('info')) {
                window.location.href = targetLang === 'lv'
                    ? '../lv/info-lv.html'
                    : '../eng/info-eng.html';
            } else {
                // Main page
                window.location.href = targetLang === 'lv'
                    ? '../lv/index-lv.html'
                    : '../eng/index-eng.html';
            }
        });
    });
});