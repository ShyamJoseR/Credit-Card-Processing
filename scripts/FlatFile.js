document.addEventListener('DOMContentLoaded', function () {
    const selectLayoutsButton = document.getElementById('selectLayouts');
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    const selectLayoutDropdown = document.getElementById('selectLayout');
    const addRecordButton = document.getElementById('addRecordButton');
    const fileContentArea = document.getElementById('fileContentArea');
    const completeFileButton = document.getElementById('completeFileButton');
    const completeLayoutsMap = new Map();   //Map contains the Layout name as key and the inside Fields Array as a value
    // const individualLayoutMap = new Map();  //Map contains the Field Name as key and the Array of Field Properties as value. This map is used in the complete Layout Map.
    let individualLayout = [];              // The Field Array containing the list of fields and their properties in an array format

    let validLayouts = [];


    //Logic Updated perfectly for .txt Files
    //Need to upgrade for Excel
    function validateFileContent(content) {
        const requiredFields = ['Field Name', 'Format', 'Length', 'Default Value', 'Custom Logics'];
        let isValid = false;
        //Added logic to split based on either \n or \r as most .txt use \r
        const records = content.trim().split(/[\n\r]/);
        // console.log(records);
        const header = records[0];
        const headerFields = header.split(",");
        console.log(headerFields);
        isValid = requiredFields.every(field => headerFields.includes(field));
        console.log("The Header Check is successful...")

        // individualLayoutMap.clear();
        individualLayout = [];
        for (let i = 1; i < records.length; i++) {
            if (records[i] != "") {
                const recordFields = records[i].split(",");
                console.log(recordFields);
                if (recordFields.length != headerFields.length) {
                    isValid = false;
                    console.log("The line number " + (i + 1) + " does not follow the layout standards. "
                        + "\nThat is, there are '" + (headerFields.length) + "' Header fields but the record on line number " + (i + 1) + " contains '" + (recordFields.length) + "' Fields."
                        + "\nThus the layout fails to tally"
                        + "\nAnd hence the layout fails to load...");
                    // individualLayoutMap.clear();
                    individualLayout = [];
                    break;
                }
                individualLayout.push(recordFields);
                // individualLayoutMap.set(recordFields[0], recordFields);
            }
        }

        return isValid
    }

    function handleFileSelect(event) {
        //Made the valid layouts null whenever user clicks on the 'Select Layouts' button
        validLayouts = [];
        completeLayoutsMap.clear();

        const files = event.target.files;
        fileDisplayArea.innerHTML = '';

        Array.from(files).forEach(file => {

            const reader = new FileReader();
            reader.onload = function (e) {
                const content = e.target.result;
                let isValid = false;
                let displayName = file.name.split('.')[0];

                if (file.name.endsWith('.txt')) {
                    isValid = validateFileContent(content);
                } else {
                    const workbook = XLSX.read(content, { type: 'binary' });
                    workbook.SheetNames.forEach(sheetName => {
                        const sheetContent = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                        const valid = validateFileContent(sheetContent);
                        isValid = isValid || valid;
                        displayName = `${file.name.split('.')[0]}_${sheetName}`;
                        addFileBox(displayName, valid);
                        if (valid) validLayouts.push(displayName);
                    });
                }

                if (file.name.endsWith('.txt')) {
                    addFileBox(displayName, isValid);
                    if (isValid) {
                        validLayouts.push(displayName);
                        completeLayoutsMap.set(displayName, individualLayout);
                        console.log("Map is set between display Name and individual layout.");
                        console.log(displayName);
                        console.log(individualLayout);
                        individualLayout = [];
                    }
                }

                updateSelectLayoutDropdown();
            };

            if (file.name.endsWith('.txt')) {
                reader.readAsText(file);
            } else {
                reader.readAsBinaryString(file);
            }
        });
    }

    function addFileBox(name, isValid) {
        const box = document.createElement('div');
        box.className = `file-box ${isValid ? 'valid' : 'invalid'}`;
        box.textContent = name;
        fileDisplayArea.appendChild(box);
    }

    function updateSelectLayoutDropdown() {
        selectLayoutDropdown.innerHTML = '<option value="">Select Layout</option>';
        validLayouts.forEach(layout => {
            const option = document.createElement('option');
            option.value = layout;
            option.textContent = layout;
            selectLayoutDropdown.appendChild(option);
        });
    }

    selectLayoutsButton.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.csv,.xls,.xlsx,.xlsm';
        input.multiple = true;
        input.addEventListener('change', handleFileSelect);
        input.click();
    });

    // addRecordButton.addEventListener('click', function () {
    //     const selectedLayout = selectLayoutDropdown.value;
    //     if (!selectedLayout) {
    //         alert('Please select a layout.');
    //         return;
    //     }

    //     const newWindow = window.open('', '', 'width=600,height=400');
    //     newWindow.document.write('<html><head><title>' + selectedLayout + '</title></head><body>');
    //     newWindow.document.write('<h3>' + selectedLayout + '</h3>');
    //     newWindow.document.write('<form id="recordForm"></form>');
    //     const recordForm = newWindow.document.getElementById('recordForm');

    //     // Create form fields based on layout file content (here it's mocked)
    //     const layoutFields = [
    //         { name: 'Field1', defaultValue: '123', format: 'Numeric', length: 5, customLogic: '' },
    //         { name: 'Field2', defaultValue: 'ABC', format: 'String', length: 10, customLogic: 'Final' },
    //     ];

    //     layoutFields.forEach(field => {
    //         const fieldContainer = newWindow.document.createElement('div');
    //         fieldContainer.style.marginBottom = '10px';

    //         const label = newWindow.document.createElement('label');
    //         label.textContent = field.name;
    //         label.style.display = 'block';

    //         const input = newWindow.document.createElement('input');
    //         input.type = 'text';
    //         input.value = field.defaultValue;
    //         if (field.customLogic === 'Final') {
    //             input.readOnly = true;
    //         }

    //         fieldContainer.appendChild(label);
    //         fieldContainer.appendChild(input);
    //         recordForm.appendChild(fieldContainer);
    //     });

    //     const addButton = newWindow.document.createElement('button');
    //     addButton.textContent = 'Add';
    //     addButton.type = 'button';
    //     addButton.onclick = function () {
    //         const formData = new FormData(recordForm);
    //         let record = '';
    //         layoutFields.forEach(field => {
    //             let value = formData.get(field.name);
    //             if (field.format === 'Numeric') {
    //                 value = value.padStart(field.length, '0');
    //             } else {
    //                 value = value.padEnd(field.length, ' ');
    //             }
    //             record += value;
    //         });
    //         fileContentArea.value += record + '\n';
    //         newWindow.close();
    //     };

    //     const cancelButton = newWindow.document.createElement('button');
    //     cancelButton.textContent = 'Cancel';
    //     cancelButton.type = 'button';
    //     cancelButton.onclick = function () {
    //         newWindow.close();
    //     };

    //     recordForm.appendChild(addButton);
    //     recordForm.appendChild(cancelButton);
    //     newWindow.document.write('</body></html>');
    // });


    addRecordButton.addEventListener('click', function () {
        const selectedLayout = selectLayoutDropdown.value;
        if (!selectedLayout) {
            alert('Please select a layout.');
            return;
        }

        const newWindow = window.open('', '', 'width=600,height=400');
        newWindow.document.write(`
            <html>
            <head>
                <title>${selectedLayout}</title>
                <link rel="stylesheet" type="text/css" href="../styles/newFlatFileRecordStyles.css">
            </head>
            <body>
                <h3>${selectedLayout}</h3>
                <form id="recordForm"></form>
                <script src=../scripts/"newFlatFileRecordScript.js"></script>
            </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.onload = function () {
            const recordForm = newWindow.document.getElementById('recordForm');

            // Create form fields based on layout file content
            const layoutFieldsList = completeLayoutsMap.get(selectedLayout);
            const layoutFields = [];
            for (let i = 0; i < layoutFieldsList.length; i++) {
                const jsonObject = {
                    name: `${layoutFieldsList[i][0]}`,
                    defaultValue: `${layoutFieldsList[i][3]}`,
                    format: `${layoutFieldsList[i][1]}`,
                    length: `${layoutFieldsList[i][2]}`,
                    customLogic: `${layoutFieldsList[i][4]}`
                };
                console.log(jsonObject);
                layoutFields.push(jsonObject);
            }
            console.log(layoutFields);

            layoutFields.forEach(field => {
                const fieldContainer = newWindow.document.createElement('div');
                fieldContainer.style.marginBottom = '10px';

                const label = newWindow.document.createElement('label');
                label.textContent = field.name;
                label.style.display = 'block';

                // const input = Element;
                // switch (field.format) {
                //     case 'Numbers':
                //         input = newWindow.document.createElement('input');
                //         input.type = 'number';
                //         input.value = field.defaultValue;
                //         break;
                //     case 'Dropdown':
                //         input = newWindow.document.createElement('select');
                //         const optionsList = field.customLogic.split(":");
                //         optionsList.forEach(eachOption => {
                //             const option1 = document.createElement('option');
                //             option1.value = eachOption;
                //             option1.text = eachOption;
                //             input.appendChild(option1);
                //         });
                //         break;
                //     default:
                //         input = newWindow.document.createElement('input');
                //         input.type = 'text';
                //         input.value = field.defaultValue;
                // }

                const input = newWindow.document.createElement('input');
                input.type = 'text';
                input.value = field.defaultValue;

                if (field.customLogic === 'Final') {
                    input.readOnly = true;
                }


                fieldContainer.appendChild(label);
                fieldContainer.appendChild(input);
                recordForm.appendChild(fieldContainer);
            });

            const addButton = newWindow.document.createElement('button');
            addButton.textContent = 'Add';
            addButton.type = 'button';
            addButton.onclick = function () {
                const formData = new FormData(recordForm);
                let record = '';
                layoutFields.forEach(field => {
                    let value = formData.get(field.name);
                    if (field.format === 'Numeric') {
                        value = value.padStart(field.length, '0');
                    } else {
                        value = value.padEnd(field.length, ' ');
                    }
                    record += value;
                });
                fileContentArea.value += record + '\n';
                newWindow.close();
            };

            const cancelButton = newWindow.document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.type = 'button';
            cancelButton.onclick = function () {
                newWindow.close();
            };

            recordForm.appendChild(addButton);
            recordForm.appendChild(cancelButton);
        };
    });

    completeFileButton.addEventListener('click', function () {
        const blob = new Blob([fileContentArea.value], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
});
