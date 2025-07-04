document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const originalImage = document.getElementById('originalImage');
    const resultImage = document.getElementById('resultImage');
    const resultSection = document.getElementById('resultSection');
    const downloadPngBtn = document.getElementById('downloadPngBtn');
    const downloadJpgBtn = document.getElementById('downloadJpgBtn');
    const tryAnotherBtn = document.getElementById('tryAnotherBtn');
    const loader = document.getElementById('loader');
    
    // API Configuration
    const API_KEY = 'DHpoHvmhBzVWajGQm5d1Y1f4'; // Your test key
    const API_URL = 'https://api.remove.bg/v1.0/removebg'; // Correct endpoint
    
    // Event Listeners
    uploadBox.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', handleFileSelect);

    <script type="text/javascript">
	atOptions = {
		'key' : 'd3877aae0779c4c8ad68bbf48972d921',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//nodthunderthis.com/d3877aae0779c4c8ad68bbf48972d921/invoke.js"></script>
    
    // Drag and Drop functionality
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
<script type='text/javascript' src='//nodthunderthis.com/f9/68/99/f96899c24245178fcf54fca7a83304da.js'></script>
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect({ target: fileInput });
        }
    });
    
    downloadPngBtn.addEventListener('click', () => downloadImage('png'));
    downloadJpgBtn.addEventListener('click', () => downloadImage('jpg'));
    tryAnotherBtn.addEventListener('click', resetTool);
    
    // Functions
    function handleFileSelect(e) {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Check file type
        if (!file.type.match('image.*')) {
            showError('Please select an image file (JPG, PNG, WEBP)');
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showError('File size should be less than 10MB');
            return;
        }
        
        // Display original image
        const reader = new FileReader();
        reader.onload = function(event) {
            originalImage.src = event.target.result;
            
            // Show result section
            resultSection.style.display = 'block';
            
            // Scroll to result section
            setTimeout(() => {
                resultSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            
            // Process image
            processImage(file);
        };
        reader.readAsDataURL(file);
    }
    
    async function processImage(file) {
        try {
            // Show loader
            loader.style.display = 'flex';
            resultImage.src = '';
            
            // Create FormData
            const formData = new FormData();
            formData.append('image_file', file);
            
            // API Request
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'X-API-Key': API_KEY
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Check if we got a result image URL
            if (data.result_url) {
                resultImage.src = data.result_url;
            } else {
                throw new Error('No result image URL in response');
            }
        } catch (error) {
            console.error('Error processing image:', error);
            showError('Error processing image. Please try again.');
        } finally {
            // Hide loader
            loader.style.display = 'none';
        }
    }
    
    function downloadImage(format) {
        if (!resultImage.src) {
            showError('No image to download');
            return;
        }
        
        // Create a temporary link
        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = `background-removed.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function resetTool() {
        // Reset file input
        fileInput.value = '';
        
        // Clear images
        originalImage.src = '';
        resultImage.src = '';
        
        // Hide result section
        resultSection.style.display = 'none';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function showError(message) {
        // In a real app, you'd want a more sophisticated error display
        alert(message);
    }
    async function processImage(file) {
    try {
        loader.style.display = 'flex';
        resultImage.src = '';
        
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');
        
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': API_KEY
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        // Create blob from response
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        resultImage.src = url;
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to process image. Please try again.');
    } finally {
        loader.style.display = 'none';
    }
}  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

