document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input") as HTMLInputElement;
  const previewContainer = document.getElementById("preview-container");
  const createButton = document.getElementById("create-button");

  const handleFiles = (files: FileList) => {
    previewContainer.innerHTML = ''; // Clear previous previews
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target?.result as string;
        img.alt = file.name;
        previewContainer?.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  };

  dropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone?.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      handleFiles(target.files);
    }
  });

  createButton?.addEventListener("click", () => {
    const files = fileInput.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const payload = {
          "$schema": "https://github.com/magnetar-io/strange_matter_specification/blob/main/Component_Schema/v.9/component.json",
          "title": "Component",
          "type": "object",
          "properties": {
            "ComponentType": ".../component.strangematter.id/v1",
            "ComponentHash": "909D9FA8328A39BE246E5281B9E7CCFB",
            "AuthorIdentifier": "greg.schleusner@hok.com",
            "Context": "myprojectdata.ifc5",
            "Function": "Instance",
            "Includes": ["include1", "include2"],
            "EntityGUID": "01HZCVEB7Z25PDNM32QFW5P6EB",
            "ComponetGUID": "1823e736-a75e-4c3d-a13b-a8c9e16def22",
            "ComponentVersionGUID": "45be6d64-3a6f-49b8-a26d-75dc2ea41e0b",
            "DateCreated": "20240602130548.1343902",
            "Name": "",
            "SequenceGUID": "",
            "SequenceName": "",
            "SequenceValue": "",
            "ResponceToComponent": "",
            "HashDefinition": "MD5",
            "PayloadHash": "D41D8CD98F00B204E9800998ECF8427E",
            "PayloadDataType": "json",
            "Payload": [base64]
          },
          "required": [
            "ComponentType",
            "ComponentHash",
            "AuthorIdentifier",
            "Context",
            "Function",
            "EntityGUID",
            "ComponetGUID",
            "ComponentVersionGUID",
            "DateCreated",
            "HashDefinition",
            "PayloadHash",
            "PayloadDataType",
            "Payload"
          ]
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `component_${index + 1}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };
      reader.readAsDataURL(file);
    });
  });
});
