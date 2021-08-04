var gTrans = {
  title: {
    en: 'Welcome to my bookshop',
    he: 'ברוכים הבאים לחנות הספרים',
  },
  id: {
    en: 'Id',
    he: 'מספר ספר',
  },
  name: {
    en: 'name',
    he: 'שם',
  },
  price: {
    en: 'price',
    he: 'מחיר',
  },
  action: {
    en: 'action',
    he: 'פעולה',
  },
  'wanna-add-book': {
    en: 'Do you want to add your own book ?',
    he: 'תרצה להוסיף ספר שלך ?',
  },
  'click-here': {
    en: 'Click Here!',
    he: 'לחץ כאן',
  },
  'name-new-book': {
    en: 'Name of the book',
    he: 'שם הספר',
  },
  'price-new-book': {
    en: 'Price of the book',
    he: 'מחיר הספר',
  },
  'add-book': {
    en: 'Add it!',
    he: 'הוסף',
  },
  read: {
    en: 'Read',
    he: 'קרא',
  },
  update: {
    en: 'Update',
    he: 'עדכן',
  },
  delete: {
    en: 'Delete',
    he: 'מחק',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans['en'];
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');

  els.forEach(function (el) {
    var txt = getTrans(el.dataset.trans);
    if (el.nodeName === 'INPUT') {
      el.setAttribute('placeholder', txt);
    } else {
      el.innerText = txt;
    }
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatNumOlder(num) {
  return num.toLocaleString('es');
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num);
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}
