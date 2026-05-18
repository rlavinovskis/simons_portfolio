document.addEventListener('DOMContentLoaded', () => {
    const YOUTUBE_API_KEY = 'AIzaSyDKuKUZOniDxTd0RhrrDBQaylBCs3lHdY8';

    const gridView = document.getElementById('gridView');
    const videoDetail = document.getElementById('videoDetail');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const backBtn = document.getElementById('backBtn');
    const gridItems = document.querySelectorAll('.grid-item');
    const menuButtons = document.querySelectorAll('.menu button');

    // Hide description box entirely
    if (videoDesc) {
        videoDesc.style.display = 'none';
    }

    async function fetchVideoData() {
        const ids = Array.from(gridItems)
            .map(item => item.dataset.videoId)
            .join(',');

        if (!ids) return;

        try {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids}&key=${YOUTUBE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!data.items) return;

            data.items.forEach(video => {
                const id = video.id;
                const title = video.snippet.title;

                const item = document.querySelector(
                    `.grid-item[data-video-id="${id}"]`
                );

                if (item) {
                    item.dataset.title = title;

                    // Title only
                    const overlayH3 = item.querySelector('.overlay h3');
                    const overlayP = item.querySelector('.overlay p');

                    if (overlayH3) overlayH3.textContent = title;

                    // Remove overlay description
                    if (overlayP) {
                        overlayP.textContent = '';
                        overlayP.style.display = 'none';
                    }
                }
            });

        } catch (e) {
            console.error('Failed to fetch YouTube data:', e);
        }
    }

    if (gridItems.length > 0) {
        fetchVideoData();
    }

    // Video grid functionality
    if (gridView && videoDetail && videoPlayer && backBtn) {

        gridItems.forEach(item => {
            item.addEventListener('click', () => {

                const videoId = item.dataset.videoId;
                const title = item.dataset.title || '';

                videoPlayer.src =
                    `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

                videoTitle.textContent = title;

                gridView.style.display = 'none';
                videoDetail.style.display = 'block';

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        backBtn.addEventListener('click', () => {

            videoPlayer.src = '';

            gridView.style.display = 'grid';
            videoDetail.style.display = 'none';

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('popstate', () => {

            if (videoDetail.style.display === 'block') {
                backBtn.click();
            }

        });
    }

    // Menu navigation
    menuButtons.forEach(button => {

        button.addEventListener('click', () => {

            const section = button.dataset.section;

            if (section === 'main') {
                window.location.href = 'index.html';

            } else if (section === 'about') {
                window.location.href = 'about.html';

            } else if (section === 'info') {
                window.location.href = 'info.html';
            }

        });

    });

});