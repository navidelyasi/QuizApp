export const quizData = {
  quiz_kids_1: [
    {
      id: "k1_1",
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
      id: "k1_2",
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
      id: "k1_3",
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
      id: "k1_4",
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
      id: "k1_5",
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
  quiz_adults_3: [
    {
      id: "a1_1",
      type: "topic",
      retry: false,
      picture: "bedroom1",
      shortAnswers: false,
      title1: "به تصویر نگاه کنید و به سوال ها پاسخ دهید.۱. ",
      title2: "Look at the picture and answer the questions.",
      data: ["الف. کتابها کجا هستند؟", "چراغ ها کجا هستند؟", "پرده کجاست؟"],
    },
    {
      id: "a1_2",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: true,
      title1: "کلمات را جمع ببندید۲. ",
      title2: "Write the plural for these words.",
      data: ["۲.۱. دکتر", "۲.۲. درخت", "۲.۳. مهندس", "۲.۴. کتاب", "۲.۵. مادر"],
    },
    {
      id: "a1_3",
      type: "topic",
      retry: false,
      picture: "bedroom2",
      shortAnswers: true,
      title1: "ﺑﮫ ﻋﮑس زﯾر ﻧﮕﺎه ﮐﻧﯾد و ﻧﺎم ھر ﺷﮑل را ﺑﻧوﯾﺳﯾد.۳.",
      title2: "look at the picture and write the name of mentioned numbers.",
      data: [
        "۱.",
        "۲.",
        "۳.",
        "۴.",
        "۵.",
        "۶.",
        "۷.",
        "۸.",
        "۹.",
        "۱۰.",
        "۱۱.",
        "۱۲.",
      ],
    },
    {
      id: "a1_4",
      type: "topic",
      retry: false,
      picture: "no",
      shortAnswers: false,
      title1: " ۴. ﺑﮫ ﺳواﻻت زﯾر ﭘﺎﺳﺦ دھﯾد.",
      title2: "Answer the questions about you.",
      data: [
        "۴.۱. آیا تو نروژی هستی؟",
        "۴.۲. آیا تو مربی ورزش نیستی؟",
        "۴.۳. اسلو زندگی میکنی؟",
        "۴.۴. اسمت سارا نیست؟",
      ],
    },
  ],
};
