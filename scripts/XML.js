// script.js
document.addEventListener('DOMContentLoaded', () => {
    const selectXsdButton = document.getElementById('selectXsdButton');
    const xsdInput = document.getElementById('xsdInput');
    const xsdDisplayArea = document.getElementById('xsdDisplayArea');
    const selectSchema = document.getElementById('selectSchema');
    const addRecordButton = document.getElementById('addRecordButton');
    const xmlDisplayBox = document.getElementById('xmlDisplayBox');
    const downloadButton = document.getElementById('downloadButton');
    
    let validXsds = [];

    selectXsdButton.addEventListener('click', () => {
        xsdInput.click();
    });

    xsdInput.addEventListener('change', async (event) => {
        const files = Array.from(event.target.files);
        xsdDisplayArea.innerHTML = '';
        validXsds = [];
        
        for (const file of files) {
            const isValid = await validateXsd(file);
            const box = document.createElement('div');
            box.classList.add('xsd-box', isValid ? 'green' : 'red');
            box.textContent = file.name.replace('.xsd', '');
            xsdDisplayArea.appendChild(box);
            
            if (isValid) {
                validXsds.push(file);
                const option = document.createElement('option');
                option.value = file.name;
                option.textContent = file.name.replace('.xsd', '');
                selectSchema.appendChild(option);
            }
        }
        
        addRecordButton.disabled = validXsds.length === 0;
    });

    addRecordButton.addEventListener('click', () => {
        const selectedSchema = selectSchema.value;
        if (selectedSchema) {
            // Fetch the selected XSD content and generate XML skeleton
            const selectedFile = validXsds.find(file => file.name === selectedSchema);
            if (selectedFile) {
                generateXmlSkeleton(selectedFile);
            }
        }
    });

    downloadButton.addEventListener('click', () => {
        const blob = new Blob([xmlDisplayBox.value], { type: 'text/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'generated.xml';
        link.click();
    });

    async function validateXsd(file) {
        try {
            const text = await file.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "application/xml");
            return !xmlDoc.querySelector('parsererror');
        } catch (error) {
            return false;
        }
    }

    function generateXmlSkeleton(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "application/xml");
            // Assuming you have a way to extract elements from the XSD
            const xmlSkeleton = createSkeletonFromXsd(xmlDoc.documentElement);
            xmlDisplayBox.value = xmlSkeleton;
            downloadButton.disabled = false;
        };
        reader.readAsText(file);
    }

    function createSkeletonFromXsd(rootElement) {
        let skeleton = '';
        // Generate XML skeleton based on the rootElement
        // This function needs to be implemented based on the XSD structure
        return skeleton;
    }
});
