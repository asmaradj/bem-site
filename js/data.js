const bemData = {
  subjects: [
    {
      id: "math",
      name: "الرياضيات",
      icon: "📐",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في الرياضيات",
      badge: "9 مواد",
      color: "#1565c0"
    },
    {
      id: "physics",
      name: "العلوم الفيزيائية",
      icon: "⚡",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في العلوم الفيزيائية",
      badge: "5 مواد",
      color: "#e65100"
    },
    {
      id: "nature",
      name: "علوم الطبيعة والحياة",
      icon: "🧬",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في علوم الطبيعة والحياة",
      badge: "4 مواد",
      color: "#2e7d32"
    },
    {
      id: "arabic",
      name: "اللغة العربية",
      icon: "📝",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في اللغة العربية",
      badge: "6 مواد",
      color: "#6a1b9a"
    },
    {
      id: "french",
      name: "اللغة الفرنسية",
      icon: "📗",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في اللغة الفرنسية",
      badge: "5 مواد",
      color: "#0d47a1"
    },
    {
      id: "english",
      name: "اللغة الإنجليزية",
      icon: "📘",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في اللغة الإنجليزية",
      badge: "5 مواد",
      color: "#c62828"
    },
    {
      id: "history",
      name: "التاريخ والجغرافيا",
      icon: "🌍",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في التاريخ والجغرافيا",
      badge: "6 مواد",
      color: "#4e342e"
    },
    {
      id: "islamic",
      name: "التربية الإسلامية",
      icon: "🕌",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في التربية الإسلامية",
      badge: "4 مواد",
      color: "#004d40"
    },
    {
      id: "civic",
      name: "التربية المدنية",
      icon: "🏛️",
      desc: "ملخصات وتمارين شهادة التعليم المتوسط في التربية المدنية",
      badge: "4 مواد",
      color: "#37474f"
    }
  ],
  details: {
    math: {
      subtitle: "الرياضيات - شهادة التعليم المتوسط",
      student: {
        name: "مريم بن علي",
        year: "معدل 19.25 في شهادة التعليم المتوسط 2024",
        advice: [
          "التركيز على فهم القواعد الأساسية في الجبر والهندسة قبل حل التمارين",
          "حل 3 تمارين على الأقل يومياً من مواضيع شهادة التعليم المتوسط السابقة",
          "استخدام الخرائط الذهنية لتلخيص كل محور",
          "المراجعة الجماعية مع الزميلات لمناقشة الأفكار",
          "عدم إهمال الدروس البسيطة مثل الإحصاء والهندسة الفضائية"
        ]
      },
      resources: [
        { icon: "📺", title: "قناة الرياضيات التعليمية", desc: "دروس فيديو شاملة لجميع المقاطع", link: "#" },
        { icon: "📱", title: "تطبيق تمارين الرياضيات", desc: "أكثر من 500 تمرين تفاعلي مع الحل", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في الرياضيات", desc: "أهم القواعد والتمارين المحلولة", link: "#" },
        { icon: "📄", title: "بنك مواضيع شهادة التعليم المتوسط", desc: "جميع مواضيع الرياضيات من 2008 إلى 2025 مع الحلول", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: الأعداد الطبيعية والأعداد الناطقة",
          lessons: [
            "مجموعة الأعداد الطبيعية ℕ ومجموعة الأعداد الناطقة ℚ",
            "المقارنة والترتيب",
            "القاسم المشترك الأكبر (PGCD)",
            "المضاعف المشترك الأصغر (PPCM)",
            "الأعداد الأولية والتفكيك إلى عوامل أولية"
          ],
          exercises: [
            { title: "تمرين 01: PGCD وأعداد طبيعية", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: تحليل عدد إلى عوامل أولية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المقارنة والترتيب", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 04: الأعداد الناطقة والعمليات", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 02: الحساب الحرفي والمعادلات",
          lessons: [
            "المتطابقات الشهورة",
            "النشر والتبسيط والتحليل",
            "المعادلات من الدرجة الأولى بمجهول واحد",
            "المتراجحات من الدرجة الأولى بمجهول واحد",
            "حل مشكلات باستعمال المعادلات"
          ],
          exercises: [
            { title: "تمرين 01: النشر والتحليل", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: حل معادلة من الدرجة الأولى", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: حل متراجحة وتمثيل الحلول", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 04: مسألة معادلة", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 03: نظرية طالس و النسب المثلثية",
          lessons: [
            "نظرية طالس المباشرة والعكسية",
            "النسب المثلثية في مثلث قائم (sin, cos, tan)",
            "المساقط و الزوايا",
            "حساب أطوال و مساحات"
          ],
          exercises: [
            { title: "تمرين 01: نظرية طالس", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: حساب طول باستعمال النسب المثلثية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: مسألة هندسة + مثلثات", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 04: تطبيقات نظرية طالس", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 04: الإحصاء والاحتمالات",
          lessons: [
            "تنظيم معطيات في جدول",
            "المدى - الوسيط - الربيعيات",
            "المتوسط الحسابي والمتوسط المرجح",
            "الاحتمالات: تجربة عشوائية، حدث، احتمال حدث",
            "تمثيل المعطيات بمخططات"
          ],
          exercises: [
            { title: "تمرين 01: حساب الوسط الحسابي والوسيط", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الاحتمالات", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: إحصاء وتمثيل بياني", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 05: الهندسة الفضائية و الإزاحة",
          lessons: [
            "الموشور القائم و الأسطوانة القائمة",
            "الهرم و المخروط الدوراني",
            "حساب الحجوم و المساحات الجانبية",
            "الإزاحة و خواصها",
            "المساقط و التماثل"
          ],
          exercises: [
            { title: "تمرين 01: حساب حجم هرم", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: إزاحة ومساقط", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: مسألة هندسة فضائية", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 06: الدوال و التمثيلات البيانية",
          lessons: [
            "الدالة الخطية و الدالة التآلفية",
            "تمثيل دالة خطية و دالة تآلفية بيانيا",
            "تفسير التمثيل البياني لدالة",
            "حل معادلة بمجهولين جبريا و بيانيا"
          ],
          exercises: [
            { title: "تمرين 01: دالة خطية وتمثيلها", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 02: دالة تآلفية + معادلة بمجهولين", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 03: قراءة بيانية", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 07: فيثاغورس و الدائرة المثلثية",
          lessons: [
            "نظرية فيثاغورس المباشرة والعكسية",
            "الدائرة المثلثية (cos x, sin x)",
            "زوايا مرکزية و محيطية",
            "المضلعات المنتظمة"
          ],
          exercises: [
            { title: "تمرين 01: نظرية فيثاغورس", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 02: زوايا و دائرة", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 03: مسألة هندسة + فيثاغورس", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 08: الدوال الأسية و الجذور",
          lessons: [
            "القوى ذات الأسس الصحيحة",
            "الكتابة العلمية",
            "الجذور التربيعية و العمليات عليها",
            "مقادير مركبة و تسيير"
          ],
          exercises: [
            { title: "تمرين 01: قوى و كتابة علمية", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: جذور تربيعية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: ترتيب و مقارنة", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 09: التناسبية و السرعة المتوسطة",
          lessons: [
            "التناسبية و معامل التناسب",
            "السرعة المتوسطة (المسافة - الزمن - السرعة)",
            "السلم و التكبير و التصغير",
            "النسبة المئوية"
          ],
          exercises: [
            { title: "تمرين 01: سرعة متوسطة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: تناسبية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: سلم و نسبة مئوية", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    physics: {
      subtitle: "العلوم الفيزيائية والتكنولوجية - شهادة التعليم المتوسط",
      student: {
        name: "سارة حمدي",
        year: "معدل 19.50 في شهادة التعليم المتوسط 2024",
        advice: [
          "فهم الظواهر الفيزيائية من الحياة اليومية يسهل حفظها",
          "رسم التجارب مهم جداً لفهم القوانين",
          "حفظ القوانين مع فهم معناها الفيزيائي وليس فقط حفظها نظرياً",
          "حل أكبر عدد من التمارين في الكهرباء والميكانيك",
          "استخدام المنحنيات والرسوم البيانية لفهم العلاقات"
        ]
      },
      resources: [
        { icon: "🎬", title: "قناة الفيزياء التعليمية", desc: "تجارب محاكاة و دروس مفصلة", link: "#" },
        { icon: "📱", title: "تطبيق الفيزياء التفاعلي", desc: "محاكاة الدوائر الكهربائية والتجارب", link: "#" },
        { icon: "📚", title: "كتاب المتميز في الفيزياء", desc: "ملخصات شاملة وتمارين مع الحلول", link: "#" },
        { icon: "📄", title: "مواضيع شهادة التعليم المتوسط", desc: "مجموعة كاملة من مواضيع الفيزياء مع التصحيح", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: الكهرباء - التيار الكهربائي المستمر",
          lessons: [
            "التيار الكهربائي و التوتر الكهربائي",
            "قانون أوم: U = R × I",
            "التوصيل على التسلسل و على التفرع",
            "القدرة الكهربائية P = U × I",
            "الطاقة الكهربائية E = P × t"
          ],
          exercises: [
            { title: "تمرين 01: قانون أوم", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: دارة كهربائية (تسلسل و تفرع)", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: حساب القدرة و الطاقة", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: الميكانيك - الحركة و السكون",
          lessons: [
            "الحركة و السكون (المسار - السرعة - التسارع)",
            "قوانين نيوتن (الربط - العطالة - الفعل و رد الفعل)",
            "الوزن و الكتلة: P = m × g",
            "الضغط و الكثافة",
            "مبدأ أرخميدس"
          ],
          exercises: [
            { title: "تمرين 01: السرعة المتوسطة و الحركة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: قانون نيوتن الثاني", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الضغط و أرخميدس", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: الضوء و البصريات",
          lessons: [
            "انتشار الضوء و خواصه",
            "انعكاس الضوء و انكساره",
            "العدسات (مجمعة - مفرقة)",
            "الصور المعطاة بعدسة مجمعة",
            "العين و آلية الإبصار"
          ],
          exercises: [
            { title: "تمرين 01: انعكاس و انكسار الضوء", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: العدسات و الصور", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: البصريات الهندسية", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 04: المغناطيسية و الكهرباء",
          lessons: [
            "المغناطيس و خواصه",
            "الحقل المغناطيسي",
            "التحريض الكهرمغناطيسي",
            "المحول الكهربائي",
            "التيار المتناوب"
          ],
          exercises: [
            { title: "تمرين 01: المغناطيسية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 02: التحريض الكهرمغناطيسي", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 03: المحول الكهربائي", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 05: الكيمياء - الذرة و التفاعلات",
          lessons: [
            "بنية الذرة (النواة - الإلكترونات)",
            "الجدول الدوري للعناصر",
            "الروابط الكيميائية (أيونية - تساهمية)",
            "التفاعلات الكيميائية و معادلتها",
            "المحاليل - التركيز - pH"
          ],
          exercises: [
            { title: "تمرين 01: بنية الذرة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: معادلة تفاعل كيميائي", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المحاليل و التركيز", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    nature: {
      subtitle: "علوم الطبيعة والحياة - شهادة التعليم المتوسط",
      student: {
        name: "آية عبد الرحمان",
        year: "معدل 19.00 في شهادة التعليم المتوسط 2024",
        advice: [
          "التركيز على الرسومات التخطيطية و التعليق عليها فهي أساس الإجابة",
          "ربط الدروس بالحياة اليومية و البيئة المحيطة",
          "حفظ المصطلحات العلمية بالعربية والفرنسية",
          "فهم سلاسل الغذاء و التنوع البيولوجي من خلال الصور",
          "حل تمارين المواضيع السابقة و التركيز على أسئلة التعليل"
        ]
      },
      resources: [
        { icon: "🔬", title: "قناة العلوم الطبيعية", desc: "دروس فيديو مع تجارب و رسومات", link: "#" },
        { icon: "📱", title: "تطبيق البيولوجيا", desc: "موسوعة بيولوجية مصورة", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في علوم الطبيعة", desc: "شروحات و تمارين مع الحلول", link: "#" },
        { icon: "📄", title: "مواضيع شهادة التعليم المتوسط", desc: "تصحيح مواضيع سابقة", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: التغذية عند الإنسان",
          lessons: [
            "المغذيات (البروتينات - السكريات - الدسم - الفيتامينات - الأملاح المعدنية)",
            "الجهاز الهضمي و مراحل الهضم",
            "الامتصاص المعوي",
            "النظام الغذائي المتوازن",
            "الأمراض المرتبطة بالتغذية"
          ],
          exercises: [
            { title: "تمرين 01: الجهاز الهضمي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المغذيات و الهضم", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الامتصاص المعوي", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: التنفس و الدوران",
          lessons: [
            "الجهاز التنفسي و آليات التنفس",
            "الجهاز الدوري (القلب - الأوعية الدموية - الدم)",
            "تبادل الغازات (الأكسجين و ثاني أكسيد الكربون)",
            "الدم و مكوناته و دور النقل",
            "أمراض الجهاز التنفسي و الدوري و الوقاية منها"
          ],
          exercises: [
            { title: "تمرين 01: الجهاز التنفسي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: القلب و الدورة الدموية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: تبادل الغازات", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: الإخراج و التنظيم",
          lessons: [
            "الجهاز البولي (الكليتان - المثانة)",
            "تكوين البول و إخراجه",
            "الجلد و دوره في الإخراج و التنظيم الحراري",
            "التنظيم الهرموني و العصبي",
            "اختلالات الجهاز البولي و الوقاية"
          ],
          exercises: [
            { title: "تمرين 01: الجهاز البولي", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 02: الجلد و التنظيم الحراري", year: "ش.ت.م 2022", link: "#" },
            { title: "تمرين 03: التنظيم الهرموني", year: "ش.ت.م 2021", link: "#" }
          ]
        },
        {
          title: "المقطع 04: التنسيق العصبي و الهرموني",
          lessons: [
            "الجهاز العصبي (الدماغ - النخاع الشوكي - الأعصاب)",
            "الخلية العصبية و انتقال السيالة العصبية",
            "الغدد الصماء و الهرمونات",
            "التوازن الداخلي (homeostasis)",
            "المنبهات و ردود الفعل"
          ],
          exercises: [
            { title: "تمرين 01: الجهاز العصبي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الغدد الصماء", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: ردود الفعل العصبية", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    arabic: {
      subtitle: "اللغة العربية - شهادة التعليم المتوسط",
      student: {
        name: "آمنة بلقاضي",
        year: "معدل 19.30 في شهادة التعليم المتوسط 2024",
        advice: [
          "قراءة النصوص الأدبية بعمق لفهم المعاني والأفكار الأساسية",
          "حفظ القواعد النحوية من خلال الجداول والخرائط الذهنية",
          "الكتابة اليومية لموضوع تعبير لتحسين الأسلوب",
          "حل تمارين الإعراب بانتظام",
          "مراجعة نصوص المطالعة الموجهة و فهم أسئلة الفهم"
        ]
      },
      resources: [
        { icon: "📺", title: "قناة العربية", desc: "دروس في النحو و البلاغة و الأدب", link: "#" },
        { icon: "📱", title: "تطبيق النحو العربي", desc: "تمارين تفاعلية في الإعراب", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في اللغة العربية", desc: "قواعد و تمارين و نماذج إعراب", link: "#" },
        { icon: "📄", title: "حلول مواضيع شهادة التعليم المتوسط", desc: "مجموعة كاملة من مواضيع العربية مع التصحيح", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: النحو - مكونات الجملة",
          lessons: [
            "الجملة الاسمية (المبتدأ و الخبر)",
            "الجملة الفعلية (الفعل و الفاعل و المفعول به)",
            "كان و أخواتها",
            "إن و أخواتها",
            "التمييز بين الحال و النعت"
          ],
          exercises: [
            { title: "تمرين 01: إعراب جمل اسمية", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: إعراب جمل فعلية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: كان و إن و أخواتهما", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: البلاغة و التعبير",
          lessons: [
            "التشبيه و أركانه",
            "الاستعارة (تصريحية - مكنية)",
            "الكناية",
            "المجاز المرسل",
            "المحسنات البديعية (الطباق - المقابلة - السجع - الجناس)"
          ],
          exercises: [
            { title: "تمرين 01: التشبيه و الاستعارة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المحسنات البديعية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: تحليل نص بلاغي", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: الصرف - الأوزان و المشتقات",
          lessons: [
            "الميزان الصرفي (فَعَلَ - فاعِل - مَفْعول)",
            "المشتقات (اسم الفاعل - اسم المفعول - الصفة المشبهة)",
            "اسم التفضيل",
            "المصادر (مصدر الثلاثي و الرباعي)",
            "الأفعال الصحيحة و المعتلة"
          ],
          exercises: [
            { title: "تمرين 01: الميزان الصرفي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المشتقات", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الصحيح و المعتل", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 04: النصوص الأدبية و المطالعة",
          lessons: [
            "النصوص الشعرية (الجاهلي - الإسلامي - الحديث)",
            "النثر الأدبي (المقالة - القصة)",
            "قراءة و فهم النصوص",
            "أفكار النصوص و تحليلها",
            "أسئلة الفهم و الاستخراج"
          ],
          exercises: [
            { title: "تمرين 01: تحليل نص شعري", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: تحليل نص نثري", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: أسئلة الفهم", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 05: الإملاء و الكتابة",
          lessons: [
            "الهمزة (في أول الكلمة - في وسطها - في آخرها)",
            "التاء المربوطة و التاء المفتوحة",
            "الألف اللينة في الأفعال و الأسماء",
            "علامات الترقيم",
            "قواعد كتابة الهمزة المتوسطة و المتطرفة"
          ],
          exercises: [
            { title: "تمرين 01: الهمزة في أول الكلمة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الهمزة المتوسطة", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الألف اللينة", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 06: التعبير الكتابي",
          lessons: [
            "أنواع التعبير (الوصف - السرد - الحجاج)",
            "كيفية كتابة فقرة متكاملة",
            "المقدمة و العرض و الخاتمة",
            "ربط الأفكار و استخدام الروابط المنطقية",
            "أسلوب السرد و الوصف في التعبير"
          ],
          exercises: [
            { title: "تمرين 01: كتابة فقرة وصفية", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: كتابة فقرة سردية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: كتابة نص حجاجي", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    french: {
      subtitle: "Français - Brevet d'Enseignement Moyen",
      student: {
        name: "Lina Mansouri",
        year: "19.45 au BEM 2024",
        advice: [
          "Lire des textes variés (récits, articles, poèmes) pour enrichir le vocabulaire",
          "Apprendre la conjugaison par groupes de verbes",
          "Pratiquer la rédaction régulièrement en suivant le plan: introduction, développement, conclusion",
          "Étudier les types de textes et leurs caractéristiques",
          "Réviser les accords (participe passé, pluriel des noms et adjectifs)"
        ]
      },
      resources: [
        { icon: "📺", title: "Chaîne Français BEM", desc: "Leçons en vidéo et exercices interactifs", link: "#" },
        { icon: "📱", title: "Appli Conjugaison", desc: "Toute la conjugaison française", link: "#" },
        { icon: "📚", title: "Le Réussite en Français", desc: "Résumés et exercices corrigés", link: "#" },
        { icon: "📄", title: "Sujets BEM Français", desc: "Annales corrigées 2008-2025", link: "#" }
      ],
      units: [
        {
          title: "Séquence 01: La grammaire",
          lessons: [
            "Les types de phrases (déclarative, interrogative, impérative, exclamative)",
            "Les formes de phrases (affirmative, négative)",
            "Les compléments (COD, COI, COS, compléments circonstanciels)",
            "Les propositions (indépendante, principale, subordonnée)",
            "Les modes et les temps verbaux"
          ],
          exercises: [
            { title: "Exercice 1: Analyse grammaticale", year: "BEM 2024", link: "#" },
            { title: "Exercice 2: Proposition subordonnée", year: "BEM 2023", link: "#" },
            { title: "Exercice 3: Conjugaison", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Séquence 02: La conjugaison",
          lessons: [
            "Les temps simples du présent, imparfait, futur simple, passé simple",
            "Les temps composés (passé composé, plus-que-parfait, futur antérieur)",
            "Les verbes du 1er, 2ème et 3ème groupe",
            "L'accord du participe passé",
            "La voix active et la voix passive"
          ],
          exercises: [
            { title: "Exercice 1: Temps composés", year: "BEM 2024", link: "#" },
            { title: "Exercice 2: Participe passé", year: "BEM 2023", link: "#" },
            { title: "Exercice 3: Voix passive", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Séquence 03: L'orthographe et le vocabulaire",
          lessons: [
            "Les accords dans le groupe nominal",
            "Les homophones (a/à, et/est, son/sont, on/ont)",
            "La formation des mots (préfixes, suffixes, racines)",
            "Les champs lexicaux",
            "Les figures de style (comparaison, métaphore, personnification)"
          ],
          exercises: [
            { title: "Exercice 1: Homophones", year: "BEM 2024", link: "#" },
            { title: "Exercice 2: Champs lexicaux", year: "BEM 2023", link: "#" },
            { title: "Exercice 3: Figures de style", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Séquence 04: La compréhension de l'écrit",
          lessons: [
            "Identifier le type de texte (narratif, descriptif, argumentatif, explicatif, injonctif)",
            "Repérer la situation d'énonciation",
            "Les connecteurs logiques et chronologiques",
            "Le paratexte et le hors-texte",
            "Répondre aux questions de compréhension"
          ],
          exercises: [
            { title: "Exercice 1: Compréhension d'un texte narratif", year: "BEM 2024", link: "#" },
            { title: "Exercice 2: Texte argumentatif", year: "BEM 2023", link: "#" },
            { title: "Exercice 3: Texte descriptif", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Séquence 05: La production écrite",
          lessons: [
            "Structure d'une production écrite (introduction, développement, conclusion)",
            "Rédiger un texte narratif",
            "Rédiger un texte argumentatif",
            "Le dialogue dans le récit",
            "Révision et correction de sa production"
          ],
          exercises: [
            { title: "Exercice 1: Rédaction d'un récit", year: "BEM 2024", link: "#" },
            { title: "Exercice 2: Texte argumentatif", year: "BEM 2023", link: "#" },
            { title: "Exercice 3: Suite d'un texte", year: "BEM 2022", link: "#" }
          ]
        }
      ]
    },
    english: {
      subtitle: "English - Brevet d'Enseignement Moyen",
      student: {
        name: "Yasmina Khelif",
        year: "19.35 at BEM 2024",
        advice: [
          "Listen to English songs and watch videos with subtitles to improve listening",
          "Read short texts and try to summarize them in your own words",
          "Practice writing short paragraphs about daily life topics",
          "Learn vocabulary by topic (family, school, environment, health)",
          "Master the tenses: simple present, present continuous, simple past, future"
        ]
      },
      resources: [
        { icon: "📺", title: "Channel English BEM", desc: "Video lessons with explanations in Arabic", link: "#" },
        { icon: "📱", title: "App Vocabulary Builder", desc: "Daily vocabulary with examples", link: "#" },
        { icon: "📚", title: "Success in English", desc: "Summaries and exercises with keys", link: "#" },
        { icon: "📄", title: "BEM English Topics", desc: "All BEM English exams with answers", link: "#" }
      ],
      units: [
        {
          title: "Sequence 01: Grammar",
          lessons: [
            "Tenses: Simple Present, Present Continuous",
            "Tenses: Simple Past, Past Continuous, Present Perfect",
            "Future: will / going to",
            "Modal verbs (can, must, should, may)",
            "Conditionals (Type 0, 1, 2)"
          ],
          exercises: [
            { title: "Exercise 1: Verb tenses", year: "BEM 2024", link: "#" },
            { title: "Exercise 2: Modals", year: "BEM 2023", link: "#" },
            { title: "Exercise 3: Conditionals", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Sequence 02: Vocabulary",
          lessons: [
            "Family and relationships",
            "School and education",
            "Environment and nature",
            "Health and body",
            "Travel and tourism"
          ],
          exercises: [
            { title: "Exercise 1: Family vocabulary", year: "BEM 2024", link: "#" },
            { title: "Exercise 2: Environment", year: "BEM 2023", link: "#" },
            { title: "Exercise 3: Health", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Sequence 03: Reading Comprehension",
          lessons: [
            "Understanding main ideas",
            "Finding specific information",
            "Answering wh-questions (who, what, where, when, why, how)",
            "Synonyms and antonyms in context",
            "Reference words (pronouns, determiners)"
          ],
          exercises: [
            { title: "Exercise 1: Reading passage", year: "BEM 2024", link: "#" },
            { title: "Exercise 2: Finding information", year: "BEM 2023", link: "#" },
            { title: "Exercise 3: Reference words", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Sequence 04: Writing",
          lessons: [
            "Writing a short paragraph (80-100 words)",
            "Writing a letter or an email",
            "Describing a person or a place",
            "Expressing opinion (I think, In my opinion, I believe)",
            "Using linking words (and, but, because, so, however)"
          ],
          exercises: [
            { title: "Exercise 1: Descriptive paragraph", year: "BEM 2024", link: "#" },
            { title: "Exercise 2: Email writing", year: "BEM 2023", link: "#" },
            { title: "Exercise 3: Opinion paragraph", year: "BEM 2022", link: "#" }
          ]
        },
        {
          title: "Sequence 05: Pronunciation & Language Functions",
          lessons: [
            "Asking for and giving directions",
            "Making requests and offers",
            "Expressing likes and dislikes",
            "Pronunciation: silent letters, stress patterns",
            "Telephone conversations and dialogues"
          ],
          exercises: [
            { title: "Exercise 1: Dialogue completion", year: "BEM 2024", link: "#" },
            { title: "Exercise 2: Functions matching", year: "BEM 2023", link: "#" },
            { title: "Exercise 3: Pronunciation", year: "BEM 2022", link: "#" }
          ]
        }
      ]
    },
    history: {
      subtitle: "التاريخ والجغرافيا - شهادة التعليم المتوسط",
      student: {
        name: "هدى صحراوي",
        year: "معدل 19.50 في شهادة التعليم المتوسط 2024",
        advice: [
          "ربط الأحداث التاريخية ببعضها لفهم التسلسل الزمني",
          "استخدام الخط الزمني لحفظ التواريخ المهمة",
          "فهم الخرائط و التعرف على المواقع الجغرافية",
          "تلخيص كل درس في نقاط محددة",
          "حل تمارين الخريطة و التعليق على الوثائق"
        ]
      },
      resources: [
        { icon: "📺", title: "قناة التاريخ و الجغرافيا", desc: "شروحات وثائقية و دروس تفاعلية", link: "#" },
        { icon: "📱", title: "تطبيق الخرائط التفاعلية", desc: "خرائط تاريخية و جغرافية تفاعلية", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في التاريخ", desc: "مختصر التاريخ و الجغرافيا", link: "#" },
        { icon: "📄", title: "مواضيع شهادة التعليم المتوسط", desc: "مجموعة مواضيع مع التصحيح", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: التاريخ - العصور القديمة",
          lessons: [
            "الحضارات القديمة (مصر - بلاد الرافدين - اليونان - الرومان)",
            "الجزائر عبر العصور القديمة (نوميديا - موريطانيا)",
            "ملوك نوميديا (ماسينيسا - يوغرطة)",
            "المقاومة ضد الاحتلال الروماني",
            "العلاقات بين شمال إفريقيا و حوض البحر المتوسط"
          ],
          exercises: [
            { title: "تمرين 01: الحضارات القديمة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: نوميديا", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المقاومة ضد الرومان", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: التاريخ - الفتح الإسلامي و الدولة الإسلامية",
          lessons: [
            "الفتح الإسلامي لشمال إفريقيا",
            "الدولة الإسلامية (الأموية - العباسية)",
            "الدول الإسلامية في المغرب (الأدارسة - الرستميون - الأغالبة)",
            "دولة المرابطين و الموحدين",
            "الحضارة الإسلامية و إسهاماتها"
          ],
          exercises: [
            { title: "تمرين 01: الفتح الإسلامي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الدول الإسلامية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الأندلس", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: التاريخ - الاحتلال الفرنسي و الثورة التحريرية",
          lessons: [
            "الاحتلال الفرنسي للجزائر (1830)",
            "المقاومات الشعبية (الأمير عبد القادر - المقراني - بوعمامة)",
            "الحركة الوطنية الجزائرية",
            "ثورة التحرير الكبرى (1954-1962)",
            "بيان أول نوفمبر و مؤتمر الصومام"
          ],
          exercises: [
            { title: "تمرين 01: الاحتلال الفرنسي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المقاومات الشعبية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: ثورة التحرير", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 04: الجغرافيا - الجزائر و موقعها",
          lessons: [
            "الموقع الجغرافي للجزائر و أهميته",
            "التضاريس في الجزائر (السهول - الجبال - الهضاب - الصحراء)",
            "المناخ في الجزائر (البحري - القاري - الصحراوي)",
            "الموارد المائية و الزراعية",
            "السكان و التوزيع في الجزائر"
          ],
          exercises: [
            { title: "تمرين 01: الموقع الجغرافي", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: التضاريس", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المناخ و الموارد", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 05: الجغرافيا - قضايا عالمية و تنمية",
          lessons: [
            "العولمة و التحديات المعاصرة",
            "التنمية المستدامة",
            "المنظمات الدولية (الأمم المتحدة - جامعة الدول العربية - الاتحاد الإفريقي)",
            "القضايا البيئية (الاحتباس الحراري - التصحر - تلوث المياه)",
            "التبادل التجاري بين الدول"
          ],
          exercises: [
            { title: "تمرين 01: التنمية المستدامة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المنظمات الدولية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: القضايا البيئية", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 06: الجغرافيا - الخرائط و المهارات",
          lessons: [
            "قراءة الخريطة و استخراج المعلومات",
            "رسم الخرائط و توظيف المفاتيح",
            "المقارنة بين الخرائط و استخلاص النتائج",
            "التعليق على وثائق جغرافية",
            "إنجاز مخططات بيانية"
          ],
          exercises: [
            { title: "تمرين 01: قراءة خريطة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: رسم خريطة", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: التعليق على وثائق", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    islamic: {
      subtitle: "التربية الإسلامية - شهادة التعليم المتوسط",
      student: {
        name: "نور الهدى بوشارب",
        year: "معدل 19.60 في شهادة التعليم المتوسط 2024",
        advice: [
          "فهم الآيات و الأحاديث و حفظها مع شرحها و ليس فقط تلاوتها",
          "حفظ الأحكام التجويدية من خلال التطبيق العملي",
          "ربط الدروس بالقيم الإسلامية و السلوك اليومي",
          "مراجعة السور المقررة مع تفسيرها",
          "تلخيص دروس الفقه و العقيدة في جداول"
        ]
      },
      resources: [
        { icon: "🎬", title: "قناة التربية الإسلامية", desc: "تفسير و تجويد و دروس الفقه", link: "#" },
        { icon: "📱", title: "تطبيق القرآن و التجويد", desc: "تلاوة و تجويد تفاعلي", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في التربية الإسلامية", desc: "ملخصات و تمارين", link: "#" },
        { icon: "📄", title: "مواضيع التربية الإسلامية", desc: "مجموعة أسئلة و أجوبة", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: القرآن الكريم و التفسير",
          lessons: [
            "سورة الكهف: تفسير و معاني",
            "سورة مريم: تفسير و معاني",
            "سورة طه: تفسير و معاني",
            "سورة المؤمنون: تفسير و معاني",
            "السور المقررة: حفظ و تسميع"
          ],
          exercises: [
            { title: "تمرين 01: تفسير سورة الكهف", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: تفسير سورة مريم", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: أحكام التلاوة", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: العقيدة الإسلامية",
          lessons: [
            "أركان الإيمان (الإيمان بالله - الملائكة - الكتب - الرسل - اليوم الآخر - القدر)",
            "الإيمان بالله (الألوهية - الربوبية - الأسماء و الصفات)",
            "الإيمان بالرسل و الكتب",
            "الإيمان باليوم الآخر و البعث و الجزاء",
            "الإيمان بالقضاء و القدر"
          ],
          exercises: [
            { title: "تمرين 01: أركان الإيمان", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الإيمان بالله", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: القضاء و القدر", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: الفقه و العبادات",
          lessons: [
            "الطهارة (الوضوء - الغسل - التيمم)",
            "الصلاة (شروطها - أركانها - نواقضها)",
            "الزكاة (أحكامها و مصارفها)",
            "الصيام (أحكامه و مبطلاته)",
            "الحج و العمرة"
          ],
          exercises: [
            { title: "تمرين 01: الطهارة و الصلاة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الزكاة", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الصيام", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 04: الحديث النبوي و القيم الإسلامية",
          lessons: [
            "الأحاديث المقررة: حفظ و شرح",
            "قيم الإسلام (الصدق - الأمانة - التسامح - التعاون)",
            "الأخلاق الإسلامية في المعاملات",
            "الآداب الإسلامية (آداب الطعام - السلام - المجالس)",
            "الوسطية و الاعتدال في الإسلام"
          ],
          exercises: [
            { title: "تمرين 01: شرح حديث", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: القيم الإسلامية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الآداب الإسلامية", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    },
    civic: {
      subtitle: "التربية المدنية - شهادة التعليم المتوسط",
      student: {
        name: "ملاك بن زيد",
        year: "معدل 19.40 في شهادة التعليم المتوسط 2024",
        advice: [
          "فهم المفاهيم الأساسية للحقوق و الواجبات",
          "متابعة الأخبار لفهم المؤسسات و القوانين",
          "تلخيص كل درس في نقاط محددة مع المصطلحات",
          "ربط الدروس بالواقع المعاش",
          "حفظ بنود الإعلان العالمي لحقوق الإنسان و الدستور الجزائري"
        ]
      },
      resources: [
        { icon: "📺", title: "قناة التربية المدنية", desc: "دروس في المواطنة و الحقوق", link: "#" },
        { icon: "📱", title: "تطبيق المواطنة", desc: "معلومات عن المؤسسات و القوانين", link: "#" },
        { icon: "📚", title: "كتاب المتفوق في التربية المدنية", desc: "مختصر الدروس و تمارين", link: "#" },
        { icon: "📄", title: "مواضيع التربية المدنية", desc: "مجموعة مواضيع و حلولها", link: "#" }
      ],
      units: [
        {
          title: "المقطع 01: الحقوق و الواجبات",
          lessons: [
            "الإعلان العالمي لحقوق الإنسان",
            "حقوق الطفل في القانون الدولي",
            "الحقوق المدنية و السياسية للمواطن الجزائري",
            "الواجبات تجاه الوطن و المجتمع",
            "المساواة بين المواطنين"
          ],
          exercises: [
            { title: "تمرين 01: حقوق الإنسان", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: حقوق الطفل", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: الحقوق و الواجبات", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 02: المؤسسات في الجزائر",
          lessons: [
            "الدستور الجزائري و مبادئه",
            "رئاسة الجمهورية و الحكومة",
            "البرلمان (المجلس الشعبي الوطني - مجلس الأمة)",
            "السلطة القضائية (المحاكم - المجلس الأعلى للقضاء)",
            "المؤسسات المحلية (الولاية - البلدية)"
          ],
          exercises: [
            { title: "تمرين 01: الدستور الجزائري", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: السلطات الدستورية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المؤسسات المحلية", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 03: المواطنة و المشاركة",
          lessons: [
            "مفهوم المواطنة و حقوق المواطن",
            "المشاركة في الحياة العامة (الانتخابات - العمل الجمعوي)",
            "الخدمة الوطنية و الواجب تجاه الوطن",
            "الحوار و التسامح و التعايش",
            "محاربة الفساد و الرشوة"
          ],
          exercises: [
            { title: "تمرين 01: المواطنة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: الانتخابات", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: المشاركة المجتمعية", year: "ش.ت.م 2022", link: "#" }
          ]
        },
        {
          title: "المقطع 04: العلاقات الدولية و المنظمات",
          lessons: [
            "الأمم المتحدة و أجهزتها",
            "المنظمات الإقليمية (جامعة الدول العربية - الاتحاد الإفريقي)",
            "العلاقات الدبلوماسية بين الدول",
            "المنظمات غير الحكومية",
            "التعاون الدولي في مواجهة التحديات"
          ],
          exercises: [
            { title: "تمرين 01: الأمم المتحدة", year: "ش.ت.م 2024", link: "#" },
            { title: "تمرين 02: المنظمات الإقليمية", year: "ش.ت.م 2023", link: "#" },
            { title: "تمرين 03: التعاون الدولي", year: "ش.ت.م 2022", link: "#" }
          ]
        }
      ]
    }
  }
};
