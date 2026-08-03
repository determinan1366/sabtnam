// وقتی صفحه کاملاً بارگذاری شد
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('formMessage');

    // رویداد ارسال فرم
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // جلوگیری از بارگذاری مجدد صفحه

        // دریافت مقادیر از فیلدها
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const major = document.getElementById('major').value;

        // اعتبارسنجی ساده سمت کلاینت
        if (!firstName || !lastName || !studentId || !email || !phone || !major) {
            showMessage('لطفاً تمام فیلدها را پر کنید.', 'error');
            return;
        }

        // غیرفعال کردن دکمه ارسال تا از ارسال مجدد جلوگیری شود
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        showMessage('در حال ارسال اطلاعات...', 'loading');

        // آماده‌سازی داده برای ارسال به Google Sheets
        const formData = {
            firstName: firstName,
            lastName: lastName,
            studentId: studentId,
            email: email,
            phone: phone,
            major: major,
            timestamp: new Date().toLocaleString('fa-IR') // تاریخ و زمان ثبت
        };

        // ** آدرس URL که از Google Apps Script دریافت می‌کنید (بعداً جایگزین کنید) **
        const SCRIPT_URL = 'https://script.google.com/macros/s/توکن_خود_را_اینجا_قرار_دهید/exec';

        // ارسال داده به سرور با استفاده از Fetch API
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // به دلیل محدودیت CORS در Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // به دلیل mode: 'no-cors'، نمی‌توانیم پاسخ را بخوانیم،
            // اما اگر خطایی رخ ندهد، یعنی درخواست با موفقیت ارسال شده است.
            showMessage('✅ ثبت‌نام شما با موفقیت انجام شد!', 'success');
            form.reset(); // پاک کردن فرم
        })
        .catch((error) => {
            console.error('خطا:', error);
            showMessage('❌ خطایی رخ داد. لطفاً دوباره تلاش کنید.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false; // فعال کردن مجدد دکمه
        });
    });

    // تابع کمکی برای نمایش پیام
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
    }
});