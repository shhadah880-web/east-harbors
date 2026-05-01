$(document).ready(function () {
    // 1. اظهار واخفاء التفاصيل المكونات
    $('.detail-chk').on('change', function () {
        $(this).closest('tr').next('.details-row').toggle(this.checked);
    });

    // 2. اظهار الفورم عند المتابعة
    $('#btn-continue').click(function () {
        if ($('.meal-chk:checked').length > 0) {
            $('#order-form-section').fadeIn();
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل للمتابعة.");
        }
    });

    $('#order-form').submit(function (e) {
        e.preventDefault();

        // التحقق الوحيد المطلوب: الرقم الوطني 11 رقم
        var name = $('#cust-name').val().trim();
        var arabicPattern = /^[\u0600-\u06FF\s]+$/;

        var nidRegex = /^((0[1-9])|(1[0-4]))[0-9]{9}$/;
        var natID = $('#nat-id').val();

        var birthDateVal = $('#birth-date').val();
        var selectedDate = new Date(birthDateVal);
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        var phoneNumber = $('#mobile').val().trim();
        var syriaPattern = /^(09)(3|9|4|5|6|8)\d{7}$/;

        var emailVal = $('#email').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name !== "" && !arabicPattern.test(name)) {
            alert("خطأ: إذا أردت إدخال الاسم يجب أن يكون باللغة العربية فقط")
            return;
        }

        if (natID === "") {
            alert("خطأ: حقل الرقم الوطني إجباري ولا يمكن تركه فارغاً");
            return;
        }
        if (!nidRegex.test(natID)) {
            alert("خطأ: الرقم الوطني يجب أن يبدأ برمز محافظة صحيح (01-14) ويتكون من 11 رقماً");
            return;
        }

        if (birthDateVal !== "" && selectedDate > today) {
            alert("خطأ: تاريخ الميلاد لايمكن أن يكون في المستقبل");
            return;

        }

        if (phoneNumber !== "" && !syriaPattern.test(phoneNumber)) {
            alert("خطأ:رقم الموبايل غير صحيح يجب أن يبدأ ب 09 ويكون من 10 خانات");
            return;
        }

        if (emailVal !== "" && !emailPattern.test(emailVal)) {
            alert("خطأ: صيغة البريد الإلكتروني غير صحيحة، يرجى التأكد منها");
            return false; // لإيقاف الإرسال
        }


        // حساب الأسعار
        let total = 0;
        $('.meal-chk:checked').each(function () {
            total += parseInt($(this).data('price'));
        });


        let discount = total * 0.05; // حسم 5%
        let finalPrice = total - discount;

        // رسالة الفاتورة النهائية  
        alert("ملخص الفاتورة - \n" +
            "----------------------------------------\n" +
            "إجمالي السعر: " + total.toLocaleString() + " ل.س\n" +
            "قيمة الحسم (5%): " + discount.toLocaleString() + " ل.س\n" +
            "المبلغ الصافي المطلوب: " + finalPrice.toLocaleString() + " ل.س\n\n" +
            "شكراً لتعاملكم مع مطعم مرافئ الشرق.");
    });
});
