// document.addEventListener('DOMContentLoaded', function() {
//     const recordForm = document.getElementById('recordForm');
//     const layoutFields = [
//         { name: 'Field1', defaultValue: '123', format: 'Numeric', length: 5, customLogic: '' },
//         { name: 'Field2', defaultValue: 'ABC', format: 'String', length: 10, customLogic: 'Final' },
//     ];

//     layoutFields.forEach(field => {
//         const fieldContainer = document.createElement('div');
//         fieldContainer.style.marginBottom = '10px';

//         const label = document.createElement('label');
//         label.textContent = field.name;
//         label.style.display = 'block';

//         const input = document.createElement('input');
//         input.type = 'text';
//         input.value = field.defaultValue;
//         if (field.customLogic === 'Final') {
//             input.readOnly = true;
//         }

//         fieldContainer.appendChild(label);
//         fieldContainer.appendChild(input);
//         recordForm.appendChild(fieldContainer);
//     });

//     const addButton = document.createElement('button');
//     addButton.textContent = 'Add';
//     addButton.type = 'button';
//     addButton.onclick = function() {
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
//         window.opener.document.getElementById('fileContentArea').value += record + '\n';
//         window.close();
//     };

//     const cancelButton = document.createElement('button');
//     cancelButton.textContent = 'Cancel';
//     cancelButton.type = 'button';
//     cancelButton.onclick = function() {
//         window.close();
//     };

//     recordForm.appendChild(addButton);
//     recordForm.appendChild(cancelButton);
// });
