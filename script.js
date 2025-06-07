function encryptFile() {
  const fileInput = document.getElementById('fileInput');
  const password = document.getElementById('password').value;
  const status = document.getElementById('status');

  if (!fileInput.files.length || !password) {
    alert('Please select a file and enter password');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const fileContent = reader.result;
    const encrypted = CryptoJS.AES.encrypt(fileContent, password).toString();
    downloadFile(encrypted, fileInput.files[0].name + ".enc");
    status.innerText = "✅ File encrypted successfully!";
  };
  reader.readAsText(fileInput.files[0]);
}

function decryptFile() {
  const fileInput = document.getElementById('fileInput');
  const password = document.getElementById('password').value;
  const status = document.getElementById('status');

  if (!fileInput.files.length || !password) {
    alert('Please select an encrypted file and enter password');
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    try {
      const decrypted = CryptoJS.AES.decrypt(reader.result, password);
      const text = decrypted.toString(CryptoJS.enc.Utf8);
      if (!text) throw new Error("Wrong password");
      downloadFile(text, "decrypted_" + fileInput.files[0].name.replace(".enc", ""));
      status.innerText = "✅ File decrypted successfully!";
    } catch {
      status.innerText = "❌ Decryption failed. Wrong password or file.";
    }
  };
  reader.readAsText(fileInput.files[0]);
}

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.click();
}
