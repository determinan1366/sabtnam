document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // جلوگیری از رفرش صفحه

        // اعتبارسنجی
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const major = document.getElementById('major').value;

        if (!firstName || !lastName || !studentId || !email || !phone || !major) {
            showMessage('❌ لطفاً تمام فیلدها را پر کنید.', 'error');
            return;
        }

        submitBtn.disabled = true;
        showMessage('⏳ در حال ارسال اطلاعات...', 'loading');

        const data = new FormData(form);
        fetch('https://formspree.io/f/mbdnnnnz', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showMessage('✅ ثبت‌نام با موفقیت انجام شد!', 'success');
                form.reset();
            } else {
                showMessage('❌ خطا در ارسال. دوباره تلاش کنید.', 'error');
            }
        })
        .catch(() => showMessage('❌ خطای شبکه. اتصال اینترنت را بررسی کنید.', 'error'))
        .finally(() => submitBtn.disabled = false);
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
    }
});