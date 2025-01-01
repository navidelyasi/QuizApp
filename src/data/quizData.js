// _______________________ quiz data _______________________
/*   {
     id: "pk1_1", // practice kids 1
     type: "flashcards",
     retry: true,
     title: "",
     data: [
       { cardid: 11, tag: "bag", back: "کیف" },
        ...
     ],
   },
   {
     id: "pk1_2",
     type: "multi_choice",
     retry: true,
     title: "",
     data: [
       {
         chid: 21,
         question: "کلمات: هستی، مدرسه، در، من، هستم",
         answers: ["من در مدرسه هستم", "هستی در مدرسه من", "مدرسه من در هستم"],
         correct: 0,
       }, ...
     ],
   },
   {
     id: "pk1_3",
     type: "drag_column",
     retry: true,
     title: "",
     data: [
       { dcid: 21, one: ".من اهل نروژم", two: "اهل کجا هستی؟" }, ...
     ],
   },
   {
     id: "pk1_4",
     type: "multi_choice",
     retry: true,
     title: "",
     data: [
       {
         chid: 21,
         question: "در کجا قار است دیدار کنیم؟",
         answers: ["درست است", "غطب است", "باید دید"],
         correct: 1,
       }, ...
     ],
   },
   {
     id: "pk1_5",
     type: "multi_choice",
     retry: true,
     title: "",
     data: [
       {
         chid: 21,
         question: "در کجا قار است دیدار کنیم؟",
         answers: ["درست است", "غطب است", "باید دید"],
         correct: 1,
       }, ...
     ],
   },
], */
// _______________________ practice and quiz ________________
export const quizData = {
  // _______________________ practice kids _______________________
  practice_kids_1: [
    {
      id: "pk1_1",
      type: "flashcards",
      retry: true,
      title: "این سوال تنها تمرینی است برای کلمات درس اول",
      data: [
        { cardid: 11, tag: "bag", back: "کیف" },
        { cardid: 12, tag: "book", back: "کتاب" },
        { cardid: 13, tag: "chair", back: "صندلی" },
        { cardid: 14, tag: "desk", back: "میز" },
        { cardid: 15, tag: "door", back: "در" },
        { cardid: 16, tag: "eraser", back: "پاک کن" },
        { cardid: 17, tag: "fire", back: "آتش" },
        { cardid: 18, tag: "marker", back: "ماژیک" },
        { cardid: 19, tag: "notebook", back: "دفتر" },
        { cardid: 20, tag: "paper", back: "کاغذ" },
      ],
    },
    {
      id: "pk1_2",
      type: "multi_choice",
      retry: true,
      title: "۲. جمله درست را انتخاب کنید",
      data: [
        {
          chid: 21,
          question: "کلمات: هستی، مدرسه، در، من، هستم",
          answers: ["من در مدرسه هستم", "هستی در مدرسه من", "مدرسه من در هستم"],
          correct: 0,
        },
        {
          chid: 22,
          question: "کلمات: مدرسه، من، میروم، به، میرود",
          answers: [
            "من میرود به مدرسه",
            "من به مدرسه میروم",
            "مدرسه به من میرود",
          ],
          correct: 1,
        },
        {
          chid: 23,
          question: "کلمات: ما، خانه، هست، است، زیبا",
          answers: ["خانه ما هست زیبا", "ما خانه زیبا هست", "خانه ما زیبا است"],
          correct: 2,
        },
      ],
    },
    {
      id: "pk1_3",
      type: "drag_column",
      retry: true,
      title: "تمرین تطبیق جملات",
      data: [
        { dcid: 21, one: ".من اهل نروژم", two: "اهل کجا هستی؟" },
        { dcid: 22, one: "اسمت چیه؟", two: "اسم تو چیه؟" },
        { dcid: 23, one: ".ایران رو دوست دارم", two: "چه کشوری رو دوست داری؟" },
        { dcid: 24, one: "ایرانی", two: "ایران" },
      ],
    },
    {
      id: "pk1_4",
      type: "multi_choice",
      retry: true,
      title: "سوالات چند گزینه ای",
      data: [
        {
          chid: 21,
          question: "در کجا قار است دیدار کنیم؟",
          answers: ["درست است", "غطب است", "باید دید"],
          correct: 1,
        },
        {
          chid: 22,
          question: "برای چه زمانی زندگی میکنیم؟",
          answers: ["بیا جلو", "برو غقب", "در جبهه بمان"],
          correct: 0,
        },
        {
          chid: 23,
          question: "آیا با هم مهربان هستیم؟",
          answers: [
            "در مدار بین النحرین",
            "در مدار زمین",
            "در همه جای عالم هستی",
          ],
          correct: 2,
        },
        {
          chid: 24,
          question: "در گذر رمان ما را به تو میدهند؟",
          answers: ["در دام تو ام", "دراز کردم", "کوتاه شدم"],
          correct: 1,
        },
      ],
    },
    {
      id: "pk1_5",
      type: "multi_choice",
      retry: true,
      title: "سوالات چند گزینه ای",
      data: [
        {
          chid: 21,
          question: "در کجا قار است دیدار کنیم؟",
          answers: ["درست است", "غطب است", "باید دید"],
          correct: 1,
        },
        {
          chid: 22,
          question: "برای چه زمانی زندگی میکنیم؟",
          answers: ["بیا جلو", "برو غقب", "در جبهه بمان"],
          correct: 0,
        },
        {
          chid: 23,
          question: "آیا با هم مهربان هستیم؟",
          answers: [
            "در مدار بین النحرین",
            "در مدار زمین",
            "در همه جای عالم هستی",
          ],
          correct: 2,
        },
        {
          chid: 24,
          question: "در گذر رمان ما را به تو میدهند؟",
          answers: ["در دام تو ام", "دراز کردم", "کوتاه شدم"],
          correct: 1,
        },
      ],
    },
  ],
  // _______________________ quiz kids _______________________
  quiz_kids_1: [
    {
      id: "qk1_1",
      type: "flashcards",
      retry: true,
      title: "این سوال تنها تمرینی است برای کلمات درس اول",
      data: [
        { cardid: 11, tag: "bag", back: "کیف" },
        { cardid: 12, tag: "book", back: "کتاب" },
        { cardid: 13, tag: "chair", back: "صندلی" },
        { cardid: 14, tag: "desk", back: "میز" },
        { cardid: 15, tag: "door", back: "در" },
        { cardid: 16, tag: "eraser", back: "پاک کن" },
        { cardid: 17, tag: "fire", back: "آتش" },
        { cardid: 18, tag: "marker", back: "ماژیک" },
        { cardid: 19, tag: "notebook", back: "دفتر" },
        { cardid: 20, tag: "paper", back: "کاغذ" },
      ],
    },
    {
      id: "qk1_2",
      type: "fill_input",
      retry: true,
      title: "بخش دوم شهر ها و پراکندگی",
      data: [
        { text: "مرکز @@ ایران دربارهٔ ترکیب", correct: "آمار" },
        { text: "و چیدمان @@ و تباری مردم ایران،", correct: "قومی" },
        { text: "جمعیت و @@ فارسی‌زبان‌ها", correct: "تراکم" },
        { text: "نزدیک ۷۳ @@ ۷۵ درصد", correct: "تا" },
        {
          text: "آبی @@ و بنفش رنگین کمون چند رنگه هفت رنکه قرمز نارنجی زرد و سبز",
          correct: "نیلی",
        },
        {
          text: "آبی نیلی و بنفش قرمز @@ زرد و سبز آبی نیلی و بنفش سر ،‌شونه ، زانو پا",
          correct: "نارنجی",
        },
      ],
    },
    {
      id: "qk1_3",
      type: "drag_column",
      retry: true,
      title: "تمرین تطبیق جملات",
      data: [
        { dcid: 21, one: ".من اهل نروژم", two: "اهل کجا هستی؟" },
        { dcid: 22, one: "اسمت چیه؟", two: "اسم تو چیه؟" },
        { dcid: 23, one: ".ایران رو دوست دارم", two: "چه کشوری رو دوست داری؟" },
        { dcid: 24, one: "ایرانی", two: "ایران" },
      ],
    },
    {
      id: "qk1_4",
      type: "multi_choice",
      retry: true,
      title: "سوالات چند گزینه ای",
      data: [
        {
          chid: 21,
          question: "در کجا قار است دیدار کنیم؟",
          answers: ["درست است", "غطب است", "باید دید"],
          correct: 1,
        },
        {
          chid: 22,
          question: "برای چه زمانی زندگی میکنیم؟",
          answers: ["بیا جلو", "برو غقب", "در جبهه بمان"],
          correct: 0,
        },
        {
          chid: 23,
          question: "آیا با هم مهربان هستیم؟",
          answers: [
            "در مدار بین النحرین",
            "در مدار زمین",
            "در همه جای عالم هستی",
          ],
          correct: 2,
        },
        {
          chid: 24,
          question: "در گذر رمان ما را به تو میدهند؟",
          answers: ["در دام تو ام", "دراز کردم", "کوتاه شدم"],
          correct: 1,
        },
      ],
    },
    {
      id: "qk1_5",
      type: "multi_choice",
      retry: true,
      title: "سوالات چند گزینه ای",
      data: [
        {
          chid: 21,
          question: "در کجا قار است دیدار کنیم؟",
          answers: ["درست است", "غطب است", "باید دید"],
          correct: 1,
        },
        {
          chid: 22,
          question: "برای چه زمانی زندگی میکنیم؟",
          answers: ["بیا جلو", "برو غقب", "در جبهه بمان"],
          correct: 0,
        },
        {
          chid: 23,
          question: "آیا با هم مهربان هستیم؟",
          answers: [
            "در مدار بین النحرین",
            "در مدار زمین",
            "در همه جای عالم هستی",
          ],
          correct: 2,
        },
        {
          chid: 24,
          question: "در گذر رمان ما را به تو میدهند؟",
          answers: ["در دام تو ام", "دراز کردم", "کوتاه شدم"],
          correct: 1,
        },
      ],
    },
  ],
  // _______________________ practice adults _______________________
  practice_adults_1: [
    {
      id: "pa1_1",
      type: "topic-drag",
      retry: true,
      picture: "no",
      shortAnswers: true,
      title1: "سوال اول. جملات را به فارسی ترجمه کنید",
      title2: "Question 1 - Translate the sentences to Farsi.",
      data: [
        { text: "1.1. I am French.", correct: "من فرانسوی هستم" },
        { text: "1.2. She is Norwegian.", correct: "او نروژی است" },
        { text: "1.3. They are Canadian.", correct: "آنها کانادایی هستند" },
        { text: "1.4. We are Iranian.", correct: "ما ایرانی هستیم" },
        { text: "1.5. You are British.", correct: "تو بریتانیایی هستی" },
      ],
    },
    {
      id: "pa1_2",
      type: "multi_choice",
      retry: true,
      title: "سوال دوم. با توجه به کلمات داده شده، جمله درست را انتخاب کنید",
      data: [
        {
          chid: 21,
          question: "کلمات: هستی، مدرسه، در، من، هستم",
          answers: ["من در مدرسه هستم", "هستی در مدرسه من", "مدرسه من در هستم"],
          correct: 0,
        },
        {
          chid: 22,
          question: "کلمات: مدرسه، من، میروم، به، میرود",
          answers: [
            "من میرود به مدرسه",
            "من به مدرسه میروم",
            "مدرسه به من میرود",
          ],
          correct: 1,
        },
        {
          chid: 23,
          question: "کلمات: ما، خانه، هست، است، زیبا",
          answers: ["خانه ما هست زیبا", "ما خانه زیبا هست", "خانه ما زیبا است"],
          correct: 2,
        },
      ],
    },
  ],
  practice_adults_2: [
    {
      id: "pa2_1",
      type: "sentence-making",
      retry: true,
      title1: "با کلمات زیر جمله بسازید.",
      title2: "Make a sentence with the following words.",
      data: [
        {
          id: "a211",
          text: ["هستی", "مدرسه", "در", "من", "هستم"],
          correct: ["من", "در", "مدرسه", "هستم"],
        },
        {
          id: "a212",
          text: ["مدرسه", "من", "میروم", "به", "میرود"],
          correct: ["من", "به", "مدرسه", "میروم"],
        },
        {
          id: "a213",
          text: ["ما", "خانه", "هست", "است", "زیبا"],
          correct: ["خانه", "ما", "زیبا", "است"],
        },
      ],
    },
    {
      id: "pa2_2",
      type: "sentence-making",
      retry: true,
      title1: " ۲. با کلمات زیر جمله بسازید.",
      title2: "2 . Make a sentence with the following words.",
      data: [
        {
          id: "a221",
          text: ["هستی", "مدرسه", "در", "من", "هستم"],
          correct: ["من", "در", "مدرسه", "هستم"],
        },
        {
          id: "a222",
          text: ["مدرسه", "من", "میروم", "به", "میرود"],
          correct: ["من", "به", "مدرسه", "میروم"],
        },
        {
          id: "a223",
          text: ["ما", "خانه", "هست", "است", "زیبا"],
          correct: ["خانه", "ما", "زیبا", "است"],
        },
      ],
    },
  ],
  practice_adults_3: [
    {
      id: "pa3_1",
      type: "topic",
      retry: false,
      picture: "bedroom1",
      shortAnswers: false,
      title1: "به تصویر نگاه کنید و به سوال ها پاسخ دهید.۱. ",
      title2: "Look at the picture and answer the questions.",
      data: [
        { text: "الف. کتابها کجا هستند؟", correct: "" },
        { text: "چراغ ها کجا هستند؟", correct: "" },
        { text: "پرده کجاست؟", correct: "" },
      ],
    },
    {
      id: "pa3_2",
      type: "topic-drag",
      retry: true,
      picture: "no",
      shortAnswers: true,
      title1: "کلمات را جمع ببندید۲. ",
      title2: "Write the plural for these words.",
      data: [
        { text: "۲.۱. دکتر", correct: "دکترها" },
        { text: "۲.۲. درخت", correct: "درختان" },
        { text: "۲.۳. مهندس", correct: "مهندسان" },
        { text: "۲.۴. کتاب", correct: "کتابها" },
        { text: "۲.۵. مادر", correct: "مادران" },
      ],
    },
    {
      id: "pa3_3",
      type: "topic-drag",
      retry: true,
      picture: "bedroom2",
      shortAnswers: true,
      title1: "ﺑﮫ ﻋﮑس زﯾر ﻧﮕﺎه ﮐﻧﯾد و ﻧﺎم ھر ﺷﮑل را ﺑﻧوﯾﺳﯾد.۳.",
      title2: "look at the picture and write the name of mentioned numbers.",
      data: [
        { text: "۱.", correct: "صندلی" },
        { text: "۲.", correct: "پرده" },
        { text: "۳.", correct: "تخت" },
        { text: "۴.", correct: "میز" },
        { text: "۵.", correct: "کمد" },
        { text: "۶.", correct: "کتاب" },
        { text: "۷.", correct: "تلفن" },
        { text: "۸.", correct: "کامپیوتر" },
        { text: "۹.", correct: "آینه" },
        { text: "۱۰.", correct: "فرش" },
        { text: "۱۱.", correct: "در" },
        { text: "۱۲.", correct: "پنجره" },
      ],
    },
    {
      id: "pa3_4",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: " ۴. ﺑﮫ ﺳواﻻت زﯾر ﭘﺎﺳﺦ دھﯾد.",
      title2: "Answer the questions about you.",
      data: [
        { text: "۴.۱. آیا تو نروژی هستی؟", correct: "" },
        { text: "۴.۲. آیا تو مربی ورزش نیستی؟", correct: "" },
        { text: "۴.۳. اسلو زندگی میکنی؟", correct: "" },
        { text: "۴.۴. اسمت سارا نیست؟", correct: "" },
      ],
    },
  ],
  // _______________________ quiz adults _______________________
  quiz_adults_1: [
    {
      id: "qa1_1",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: "سوال ۱ - جملات را به فارسی ترجمه کنید",
      title2: "Question 1 - Translate the sentences to Farsi.",
      data: [
        { text: "1.1. I am Iranian.", correct: "" },
        { text: "1.2. She is French.", correct: "" },
        { text: "1.3. They are British.", correct: "" },
        { text: "1.4. We are Norwegian.", correct: "" },
        { text: "1.5. You are American. (Singular)", correct: "" },
      ],
    },
    {
      id: "qa1_2",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: "سوال ۲ - جملات را به فارسی ترجمه کنید",
      title2: "Question 2 - Translate the sentences to Farsi.",
      data: [
        { text: "2.1. Good morning.", correct: "" },
        { text: "2.2. Good night.", correct: "" },
        { text: "2.3. How are you?", correct: "" },
        { text: "2.4. Hi, how is it going?", correct: "" },
      ],
    },
    {
      id: "qa1_3",
      type: "topic",
      retry: false,
      picture: "person",
      shortAnswers: false,
      title1:
        "سوال ۳ - سه سوال به فارسی بنویسید با توجه به اطلاعاتی که می بینید",
      title2:
        "Question 3 - Write 3 questions in persian, based on the information you see.",
      data: [
        { text: "3.1. Q1", correct: "" },
        { text: "3.2. Q2", correct: "" },
        { text: "3.3. Q3", correct: "" },
      ],
    },
    {
      id: "qa1_4",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: "سوال ۴ - جملات را به به انگلیسی بنویسید",
      title2: "Question 4 - Write the sentences in English.",
      data: [
        { text: "صُحبَت کَردَن", correct: "" },
        { text: "زِندِگی کردن", correct: "" },
        { text: "شصت و چهار", correct: "" },
        { text: "پنجاه و نه", correct: "" },
        { text: "دو و سه", correct: "" },
      ],
    },
  ],
  quiz_adults_2: [
    {
      id: "qa2_1",
      type: "sentence-making",
      retry: true,
      title1: "با کلمات زیر جمله بسازید.",
      title2: "Make a sentence with the following words.",
      data: [
        {
          id: "a211",
          text: ["هستی", "مدرسه", "در", "من", "هستم"],
          correct: ["من", "در", "مدرسه", "هستم"],
        },
        {
          id: "a212",
          text: ["مدرسه", "من", "میروم", "به", "میرود"],
          correct: ["من", "به", "مدرسه", "میروم"],
        },
        {
          id: "a213",
          text: ["ما", "خانه", "هست", "است", "زیبا"],
          correct: ["خانه", "ما", "زیبا", "است"],
        },
      ],
    },
    {
      id: "qa2_2",
      type: "sentence-making",
      retry: true,
      title1: " ۲. با کلمات زیر جمله بسازید.",
      title2: "2 . Make a sentence with the following words.",
      data: [
        {
          id: "a221",
          text: ["هستی", "مدرسه", "در", "من", "هستم"],
          correct: ["من", "در", "مدرسه", "هستم"],
        },
        {
          id: "a222",
          text: ["مدرسه", "من", "میروم", "به", "میرود"],
          correct: ["من", "به", "مدرسه", "میروم"],
        },
        {
          id: "a223",
          text: ["ما", "خانه", "هست", "است", "زیبا"],
          correct: ["خانه", "ما", "زیبا", "است"],
        },
      ],
    },
  ],
  quiz_adults_3: [
    {
      id: "qa1_1",
      type: "topic",
      retry: false,
      picture: "bedroom1",
      shortAnswers: false,
      title1: "سوال ۱ - به تصویر نگاه کنید و به سوال ها پاسخ دهید",
      title2: "Question 1 - Look at the picture and answer the questions.",
      data: [
        { text: "الف. کتابها کجا هستند؟", correct: "" },
        { text: "چراغ ها کجا هستند؟", correct: "" },
        { text: "پرده کجاست؟", correct: "" },
      ],
    },
    {
      id: "qa1_2",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: true,
      title1: "سوال ۲ - کلمات را جمع ببندید",
      title2: "Question 2 - Write the plural for these words.",
      data: [
        { text: "۲.۱. دکتر", correct: "" },
        { text: "۲.۲. درخت", correct: "" },
        { text: "۲.۳. مهندس", correct: "" },
        { text: "۲.۴. کتاب", correct: "" },
        { text: "۲.۵. مادر", correct: "" },
      ],
    },
    {
      id: "qa1_3",
      type: "topic-drag",
      retry: true,
      picture: "bedroom2",
      shortAnswers: true,
      title1: "سوال ۳ - به عکس نگاه کنید و نام هر شکل را بنویسید",
      title2:
        "Question 3 - look at the picture and write the name of mentioned numbers.",
      data: [
        { text: ".۱", correct: "صندلی" },
        { text: ".۲", correct: "پرده" },
        { text: ".۳", correct: "تخت" },
        { text: ".۴", correct: "میز" },
        { text: ".۵", correct: "کمد" },
        { text: ".۶", correct: "کتاب" },
        { text: ".۷", correct: "تلفن" },
        { text: ".۸", correct: "کامپیوتر" },
        { text: ".۹", correct: "آینه" },
        { text: ".۱۰", correct: "فرش" },
        { text: ".۱۱", correct: "در" },
        { text: ".۱۲", correct: "پنجره" },
      ],
    },
    {
      id: "qa1_4",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: "سوال ۴ - به سوالات زیر پاسخ دهید",
      title2: "Question 4 - Answer the questions about you.",
      data: [
        { text: "آیا تو نروژی هستی؟", correct: "" },
        { text: "آیا تو مربی ورزش نیستی؟", correct: "" },
        { text: "اسلو زندگی میکنی؟", correct: "" },
        { text: "اسمت سارا نیست؟", correct: "" },
      ],
    },
  ],
  quiz_adults_4: [
    {
      id: "qa4_1",
      type: "topic",
      retry: false,
      picture: "people1",
      shortAnswers: false,
      title1: "سوال ۱ - تصاویر زیر را در ۳ جمله توصیف کنید",
      title2: "Question 1 - Describe the pictures in 3 sentences.",
      data: [
        { text: "جمله شماره ۱", correct: "" },
        { text: "جمله شماره ۲", correct: "" },
        { text: "جمله شماره ۳", correct: "" },
      ],
    },
    {
      id: "qa4_2",
      type: "topic",
      retry: false,
      picture: "people2",
      shortAnswers: false,
      title1: "سوال ۲ - تصاویر زیر را در ۵ جمله توصیف کنید",
      title2: "Question 2 - Describe the pictures in 5 sentences.",
      data: [
        { text: "جمله شماره ۱", correct: "" },
        { text: "جمله شماره ۲", correct: "" },
        { text: "جمله شماره ۳", correct: "" },
        { text: "جمله شماره ۴", correct: "" },
        { text: "جمله شماره ۵", correct: "" },
      ],
    },
    {
      id: "qa4_3",
      type: "topic",
      retry: false,
      picture: "weather",
      shortAnswers: false,
      title1: "سوال ۳ - هوای پنج شهر را توصیف کنید",
      title2: "Question 3 - Describe the weather of 5 cities.",
      data: [
        { text: "جمله ۱ شهر لندن", correct: "" },
        { text: "جمله ۲ شهر سنگاپور", correct: "" },
        { text: "جمله ۳ شهر تورنتو", correct: "" },
        { text: "جمله ۴ شهر توکیو", correct: "" },
        { text: "جمله ۵ شهر نیویورک", correct: "" },
      ],
    },
    {
      id: "qa4_4",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1:
        "سوال ۴ - متن را بخوانید و در مورد فصل مورد علاقه خود یک پاراگراف بنویسید",
      title2:
        "Question 4 - Read the text and write pne paragraph about your favorite season.",
      data: [{ text: "متن", correct: "" }],
    },
  ],
  quiz_adults_6: [
    {
      id: "qa6_1",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: "سوال ۱ - برای هر گروه ۴ مورد نام ببرید",
      title2: "Question 1 - Write 4 words for each category.",
      data: [
        { text: "مورد ۱ میوه", correct: "" },
        { text: "مورد ۲ سبزی", correct: "" },
        { text: "مورد ۳ لبنیات", correct: "" },
        { text: "مورد ۴ نوشیدنی", correct: "" },
      ],
    },
    {
      id: "qa6_2",
      type: "topic",
      retry: false,
      picture: "items2",
      shortAnswers: false,
      title1:
        "سوال ۲ - در تصویر زیر چه چیزهایی وجود دارد؟ از کلمات زیر استفاده کنید: تا، کیلو، بسته، دونه",
      title2:
        "Question 2 - What is in the picture? Use the following words: تا، کیلو، بسته، دونه",
      data: [
        { text: "مورد ۱", correct: "" },
        { text: "مورد ۲", correct: "" },
        { text: "مورد ۳", correct: "" },
        { text: "مورد ۴", correct: "" },
        { text: "مورد ۵", correct: "" },
        { text: "مورد ۶", correct: "" },
        { text: "مورد ۷", correct: "" },
      ],
    },
    {
      id: "qa6_3",
      type: "topic",
      retry: false,
      picture: "describe2",
      shortAnswers: false,
      title1: "سوال ۳ - یکی از دو تصویر را توصیف کنید",
      title2: "Question 3 - Describe one of these 2 pictures.",
      data: [{ text: "توصیف", correct: "" }],
    },
    {
      id: "qa6_4",
      type: "topic",
      retry: false,
      picture: "season2",
      shortAnswers: false,
      title1:
        "سوال ۴ - قصل زمستان و بهار را با هم مقایسه کنید. از تر و ترین استفاده کنید.",
      title2:
        "Question 4 - Compare the winter and spring seasons. Use the words: تر و ترین",
      data: [{ text: "توصیف", correct: "" }],
    },
  ],
};
