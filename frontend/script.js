async function downloadImages() {
    const links = document.getElementById('links').value;
    const folderName = document.getElementById('folderName').value;
    const downloadBtn = document.getElementById('downloadBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const downloadingStatus = document.getElementById('downloadingStatus');
    const completionStatus = document.getElementById('completionStatus');
    const failedStatus = document.getElementById('failedStatus');
    const currentCount = document.getElementById('currentCount');
    const totalCount = document.getElementById('totalCount');
    const finalCount = document.getElementById('finalCount');
    const failedList = document.getElementById('failedList');
    
    if (!links.trim()) {
        alert('Please enter image links');
        return;
    }
    
    downloadBtn.disabled = true;
    downloadingStatus.classList.remove('hidden');
    completionStatus.classList.add('hidden');
    failedStatus.classList.add('hidden');
    progressFill.style.width = '0%'; // Reset progress bar
    failedList.innerHTML = ''; // Clear failed list

    try {
        const response = await fetch('http://localhost:5000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                links: links,
                folderName: folderName
            })
        });

        const reader = response.body.getReader();
        const textDecoder = new TextDecoder();
        
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const text = textDecoder.decode(value);
            const events = text.split('\n\n').filter(Boolean);
            
            events.forEach(event => {
                try {
                    const data = JSON.parse(event.replace('data: ', '').trim());
                    const { current, total, failed, complete } = data;

                    currentCount.textContent = current;
                    totalCount.textContent = total;

                    // Update progress bar
                    const percentage = ((current / total) * 100).toFixed(2);
                    progressFill.style.width = `${percentage}%`;

                    // Show failed URLs
                    if (failed && failed.length > 0) {
                        failedStatus.classList.remove('hidden');
                        failedList.innerHTML = failed.map(url => `<li>${url}</li>`).join('');
                    }

                    if (complete) {
                        downloadingStatus.classList.add('hidden');
                        completionStatus.classList.remove('hidden');
                        finalCount.textContent = current;
                    }
                } catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            });
        }
    } catch (error) {
        completionStatus.textContent = 'Error: ' + error.message;
        completionStatus.classList.remove('hidden');
    } finally {
        downloadBtn.disabled = false;
        downloadingStatus.classList.add('hidden');
    }
}
