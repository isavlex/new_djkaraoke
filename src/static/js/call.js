import Swal from 'sweetalert2'
import Cleave from 'cleave.js'
import 'cleave.js/dist/addons/cleave-phone.ru'

function pushData(orderData) {
  const request = new XMLHttpRequest()
  const url = 'mail.php'
  const userData =
    'name=' +
    orderData.name +
    '&phone=' +
    orderData.phone +
    '&order=' +
    orderData.order
  request.open('POST', url, true)
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
      Swal.fire(
        'Заявка отправлена!',
        'Мы вам перезвоним в ближайшее время.',
        'success'
      )
    }
  })
  request.send(userData)
}

const orders = document.querySelectorAll('[data-type="order"]')
const offers = {
  'minimal-karaoke': 'KARAOKE MINIMAL',
  'lite-karaoke': 'KARAOKE LITE',
  'pro-karaoke': 'DJKARAOKE PRO',
  'minimal-dj': 'DJ MINIMAL',
  'lite-dj': 'DJ LITE',
  'pro-dj': 'DJ PRO',
}

orders.forEach((el) => {
  el.addEventListener('click', (e) => {
    let dataUser = {}
    Swal.fire({
      title: `<strong>${offers[e.target.dataset.order]}</strong>`,
      input: 'text',
      inputLabel: 'Ваше имя:',
      inputValidator: (value) => {
        if (!value || value.length < 2) {
          return 'Введите корректное имя, длинна которого более 2-х символов.'
        } else {
          dataUser.name = value
        }
      },
    }).then((result) => {
      if (!result.isDismissed) {
        Swal.fire({
          title: `<strong>${offers[e.target.dataset.order]}</strong>`,
          input: 'text',
          inputValue: '+7',
          customClass: {
            input: 'phone-box',
          },
          inputLabel: 'Ваш телефон:',
          confirmButtonText: 'Заказать звонок',
          inputValidator: (value) => {
            if (!value || value.length < 3) {
              return 'Введите корректный телефон'
            } else {
              dataUser.phone = value
              dataUser.order = e.target.dataset.order
            }
          },
        }).then((result) => {
          if (!result.isDismissed) {
            pushData(dataUser)
          }
        })
        const cleave = new Cleave('.phone-box', {
          phone: true,
        })
      }
    })
  })
})
