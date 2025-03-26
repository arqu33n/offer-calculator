function validateNumberInput(input) {
  input.value = input.value.replace(/\D/g, '') // Убираем все нечисловые символы
}

document.addEventListener('DOMContentLoaded', (event) => {
  const calculatorAddButton = document.querySelector('.add-kp')
  const calculatorSaveButton = document.querySelector('.save-kp')
  const calculatorContent = document.querySelector('.calculator__content')
  const calculatorContentInputs = document.querySelectorAll(
    '.calculator__content input'
  )
  const calculatorProductInputs = document.querySelectorAll(
    '.template__product-inputs input'
  )

  const calculatorContainer = document.querySelector('.calculator__container')
  const segmentProportion = document.getElementById('proportion')
  const segmentCount = document.getElementById('segment-count')
  const segmentAmount = document.getElementById('amount')
  const segmentTitle = document.getElementById('segment')
  const period = document.getElementById('period')

  const calculatorButtonsContainer = document.querySelector('.calculator__save')
  const compensationTabs = document.querySelectorAll('.compensation-btn')
  const courseTabs = document.querySelectorAll('.course-btn ')
  const downloadBtn = document.querySelector('.total__download')
  const totalSum = document.querySelector('.total__sum-num')
  const corporateDiscount = document.querySelector('.total__corp-discount-num')
  const totalSumWithDiscount = document.querySelector(
    '.total__sum-with-discount-num'
  )
  const monthlySum = document.querySelector('.total__mounthly-sum-num')

  let course
  let compensation

  function handleCompensationTabClick(event) {
    compensationTabs.forEach((tab) => {
      tab.classList.remove('tab_active')
    })
    event.target.classList.add('tab_active')
    compensation = parseFloat(event.target.innerText.slice(0, -1))
  }
  compensationTabs.forEach((tab) => {
    tab.addEventListener('click', handleCompensationTabClick)
  })

  function handleCourseTabClick(event) {
    courseTabs.forEach((tab) => {
      tab.classList.remove('tab_active')
    })
    event.target.classList.add('tab_active')
    course = event.target.innerText
  }
  courseTabs.forEach((tab) => {
    tab.addEventListener('click', handleCourseTabClick)
  })
  function insertResultMarkup() {
    let segment = segmentTitle.value
    let segmentCountStorage = segmentCount.value
    let proportionStorage = proportion.value
    let amount = segmentAmount.value
    let averageBill
    // тут какие то цены
    if (course === 'Premium English') {
      averageBill = 72000
    } else if (course === 'General English') {
      averageBill = 50000
    } else if (course === 'Для бизнеса и общения') {
      averageBill = 25000
    } else if (course === 'Для IT-специалистов') {
      averageBill = 15000
    } else if (course === 'Для маркетологов') {
      averageBill = 10000
    } else if (course === 'Безграничный английский') {
      averageBill = 100000
    } else {
      averageBill = 0
    }
    let compensationBill = (averageBill * compensation) / 100
    let bill = averageBill * amount
    // totalBillAccumulator = totalBillAccumulator + bill;
    let discount
    if (document.querySelector('.compensation-btn.tab_active') != null) {
      discount = document.querySelector(
        '.compensation-btn.tab_active'
      ).innerHTML
    }

    const resultContainer = document.querySelector('.calculator__result-items')
    const markup = `
    <div class="result-item-wrap">
            <div class="result-header__product">${
              course ? course : 'Выберите продукт'
            }</div>
            <div class="result-header__segment">${segment ? segment : ''}</div>
            <div class="result-header__amount">${amount ? amount : ''}</div>
            <div class="result-header__average-bill">${
              averageBill ? averageBill.toLocaleString('ru-RU') : 0
            } ₽</div>
            <div class="result-header__compensation-bill">${
              compensationBill ? compensationBill.toLocaleString('ru-RU') : 0
            } ₽ <span class="result-header__discount">${
      discount ? `(${discount})` : ``
    }</span></div>
            <div class="result-header__bill">${
              bill ? bill.toLocaleString('ru-RU') : 0
            } ₽</div>
            <div class="result-header__edit"></div>
            <div class="result-header__delete"></div>
            <div class="result-header__segment-count">${segmentCountStorage}</div>
            <div class="result-header__proportion">${proportionStorage}</div>
            </div>
        `
    resultContainer.insertAdjacentHTML('beforeend', markup)
  }

  function addErrorToEmptyInputs() {
    const emptyInputs = document.querySelectorAll(
      'input[type="text"], input[type="number"]'
    )
    const emptyInputsArray = Array.from(emptyInputs).filter(
      (input) => input.value.trim() === ''
    )

    if (emptyInputsArray.length > 0) {
      // Добавляем класс 'input-error' к каждому пустому инпуту
      emptyInputsArray.forEach((input) => {
        input.classList.add('input-error')
      })

      // Через 2 секунды удаляем класс 'input-error'
      setTimeout(() => {
        emptyInputsArray.forEach((input) => {
          input.classList.remove('input-error')
        })
      }, 2000)
    }
  }

  // Функция проверки значений
  function validateInputsAndProceed() {
    const periodValue = Number(document.getElementById('period').value)
    const amountValue = Number(document.getElementById('amount').value)

    // Проверка значений
    if (periodValue <= 0 || amountValue <= 0) {
      console.log('Ошибка: Значения period и amount должны быть больше 0')
      addErrorToEmptyInputs()
      return
    }

    // Если всё в порядке, вызываем основную функцию
    if (calculatorSaveButton.innerHTML === 'Сохранить') {
      calculatorSaveButton.innerHTML = 'Расчитать КП'
    }
    insertResultMarkup()
  }

  // Привязываем обработчик к кнопке
  calculatorSaveButton.addEventListener('click', validateInputsAndProceed)

  //   calculatorSaveButton.addEventListener("click", insertResultMarkup);

  const resultContainer = document.querySelector('.calculator__result-items')
  resultContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('result-header__delete')) {
      const resultItem = event.target.closest('.result-item-wrap')
      if (resultItem) {
        resultItem.remove()
      }
    }
    if (event.target.classList.contains('result-header__edit')) {
      const resultItem = event.target.closest('.result-item-wrap')
      if (resultItem) {
        resultItem.remove()
        calculatorSaveButton.innerHTML = 'Сохранить'
      }
      calculatorProductInputs.forEach((input) => (input.value = ''))
      segmentTitle.value = resultItem.querySelector(
        '.result-header__segment'
      ).innerHTML
      segmentCount.value = resultItem.querySelector(
        '.result-header__segment-count'
      ).innerHTML
      segmentProportion.value = resultItem.querySelector(
        '.result-header__proportion'
      ).innerHTML
      segmentAmount.value = resultItem.querySelector(
        '.result-header__amount'
      ).innerHTML
      const discount = resultItem.querySelector(
        '.result-header__discount'
      ).innerHTML
      const course = resultItem.querySelector(
        '.result-header__product'
      ).innerHTML
      const discountStorage = Array.from(compensationTabs).find(
        (tab) => tab.innerHTML === discount.replace(/[\(\)]/g, '')
      )
      compensationTabs.forEach((tab) => {
        tab.classList.remove('tab_active')
      })
      discountStorage.classList.add('tab_active')

      const courseStorage = Array.from(courseTabs).find(
        (tab) => tab.innerHTML === course.replace(/[\(\)]/g, '')
      )
      courseTabs.forEach((tab) => {
        tab.classList.remove('tab_active')
      })
      courseStorage.classList.add('tab_active')
      document.querySelector('a[href="#calc"]').click()
    }
  })
  let observer = new MutationObserver(() => {
    updateTotalBill()
  })

  function updateTotalBill() {
    let totalBillAccumulator
    let acc = 0
    document
      .querySelectorAll('.calculator__result-items .result-header__bill')
      .forEach((item) => {
        const itemValue = parseInt(item.innerHTML.replace(/[^\d]/g, ''))
        console.log(itemValue)
        acc = acc + itemValue
        console.log(`Total sum: ${acc}`)
      })
    totalBillAccumulator = acc
    totalSum.innerHTML = `${totalBillAccumulator.toLocaleString('ru-RU')} ₽`
    // тут какая-то логика с корп. скидкой от цены контракта
    let corporateDiscountValue
    // логика со скидкой с ценами
    // if (totalBillAccumulator < 100000) {
    //   corporateDiscountValue = 5;
    // } else {
    //   corporateDiscountValue = 10;
    // }
    // новая логика со скидкой с ценами
    if (totalBillAccumulator < 100000) {
      corporateDiscountValue = 20
    } else if (
      totalBillAccumulator >= 100000 &&
      totalBillAccumulator < 250000
    ) {
      corporateDiscountValue = 35
    } else if (
      totalBillAccumulator >= 250000 &&
      totalBillAccumulator < 500000
    ) {
      corporateDiscountValue = 40
    } else if (
      totalBillAccumulator >= 500000 &&
      totalBillAccumulator < 1000000
    ) {
      corporateDiscountValue = 45
    } else if (totalBillAccumulator >= 2000000) {
      corporateDiscountValue = 50
    }
    // конец
    corporateDiscount.innerHTML = `${corporateDiscountValue.toLocaleString(
      'ru-RU'
    )} %`
    let totalSumWithDiscountValue =
      totalBillAccumulator -
      (corporateDiscountValue / 100) * totalBillAccumulator
    totalSumWithDiscount.innerHTML = `${totalSumWithDiscountValue.toLocaleString(
      'ru-RU'
    )} ₽`
    let periodValue = period.value
    console.log(periodValue)
    monthlySum.innerHTML = `${(
      totalSumWithDiscountValue / periodValue
    ).toLocaleString('ru-RU')} ₽`
  }

  observer.observe(resultContainer, {
    childList: true,
    subtree: true,
    characterDataOldValue: true,
  })

  function checkTotalEmployees() {
    const segmentProportionValue = parseFloat(segmentProportion.value) || 0
    const segmentCountValue = parseFloat(segmentCount.value) || 0
    const result = (segmentProportionValue * segmentCountValue) / 100
    segmentAmount.value = Math.round(result)
  }
  segmentProportion.addEventListener('input', checkTotalEmployees)
  segmentCount.addEventListener('input', checkTotalEmployees)

  calculatorAddButton.addEventListener('click', function () {
    console.log('add btn')
    calculatorProductInputs.forEach((input) => {
      input.value = ''
    })
  })
  downloadBtn.addEventListener('click', downloadKP)
  function downloadKP() {
    const { jsPDF } = window.jspdf
    const resultContent = document.querySelector('.calculator__result')
    const positions = document.querySelectorAll('.result-item-wrap')
    let positionsContainer = []
    positionsContainer.push(`<div style="position: relative; font-family: Roboto, sans-serif; padding: 20px; background-color: #fff; color: black; height: 2150px; width: 1920px; margin-top: 200px;">
  <div>
    <img src="https://static.tildacdn.com/tild3639-6237-4461-b162-393735376264/photo.png" width="1920" height="1080"
      style="position: absolute; top: 0px;">
  </div>
  <div style="width: 1920px; height: 1080px; position: absolute; top: 1080px;">
    <div style="display: flex; width: fit-content;">
      <h1
        style="font-family: Roboto, sans-serif; font-size: 86px; line-height: 96px; margin-left: 53px; margin-top: 62px; width: 1222px; font-weight: 500; font-style: normal; z-index: 9;">
        Коммерческое предложение</h1>
    </div>
    <div
      style="width: 1728px; height: 810px; background-color: #F6F6F6; position: absolute; z-index: 9; top: 202px; border-radius: 27px; margin-left: 53px;">
    </div>
    
    <div style="width: 1603px; position: absolute; top: 222px; left: 93px; z-index: 9;">
      <div
        style="width: 100px; height: 26px; font-size: 24px; line-height: 25px; padding-top: 22px; padding-left: 20px; font-weight: 700;">
        Продукт</div>
      <div
        style="width: 106px; height: 52px; font-size: 24px; line-height: 25px; font-weight: 700; position: absolute; top: 20px; left: 296px;">
        Название сегмента</div>
      <div
        style="width: 166px; height: 52px; font-size: 24px; line-height: 25px; font-weight: 700; position: absolute; top: 20px; left: 588px;">
        Сотрудники для обучения</div>
      <p
        style="width: 206px; height: 52px; font-size: 24px; line-height: 25px; font-weight: 700; position: absolute; top: -4px; left: 838px;">
        Средний чек<br>на специалиста</p>
      <div
        style="width: 270px; height: 78px; font-size: 24px; line-height: 25px; font-weight: 700; position: absolute; top: 20px; left: 1127px;">
        Сумма из среднего чека, компенсируемая компанией</div>
      <div
        style="width: 100px; height: 52px; font-size: 24px; line-height: 25px; font-weight: 700; position: absolute; top: 20px; left: 1486px;">
        Итоговая сумма</div>

      <div>
        <div
          style="width: 1603px; height: 2px; background-color: #FFF; top: 115px; left: 20px; position: absolute; z-index: 9;">
        </div>
      </div>
    </div>
`)
    positions.forEach((position, index) => {
      const title = position.querySelector('.result-header__product').innerHTML
      const segment = position.querySelector(
        '.result-header__segment'
      ).innerHTML
      const amountEmployees = position.querySelector(
        '.result-header__amount'
      ).innerHTML
      const avgBill = position.querySelector(
        '.result-header__average-bill'
      ).innerHTML
      const avgCompensationBill = position.querySelector(
        '.result-header__compensation-bill'
      ).innerHTML
      const totalBill = position.querySelector('.result-header__bill').innerHTML
      let topPosition = 346 + 83 * index
      positionsContainer.push(`
    <div style="position: absolute; top: ${topPosition}px; left: 93px; z-index: 9;">
      <div
        style="width: 198px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 20px; top:28px; font-weight: 700;">
        ${title}</div>
      <div
        style="width: 200px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 296px; top:28px; font-weight: 700;">
        ${segment}</div>
      <div
        style="width: 198px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 588px; top:28px; font-weight: 700;">
        ${amountEmployees}</div>
      <div
        style="width: 198px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 838px; top:28px; font-weight: 700;">
        ${avgBill}</div>
      <div
        style="width: 198px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 1127px; top:28px; font-weight: 700;">
        ${avgCompensationBill}</div>
      <div
        style="width: 198px; height: 26px; font-size: 24px; line-height: 25px; position: absolute; left: 1486px; top:28px; font-weight: 700;">
        ${totalBill}</div>

      <div>
        <div style="width: 1603px; height: 2px; background-color: #FFF; position: absolute; top: 82px; left: 20px;">
        </div>
      </div>
    </div>`)
    })
    const contractSum = document.querySelector('.total__sum-num').innerHTML
    const corpDiscount = document.querySelector(
      '.total__corp-discount-num'
    ).innerHTML
    const contractSumWithDiscount = document.querySelector(
      '.total__sum-with-discount-num'
    ).innerHTML
    const monthlyContractSum = document.querySelector(
      '.total__mounthly-sum-num'
    ).innerHTML
    positionsContainer.push(` <div style="position: absolute; top: 767px; left: 1218px; z-index: 9;">
      <div style="font-size: 24px; line-height: 25px; opacity: 0.64; position: absolute; top: 40px; width: 200px;">Сумма
        контракта</div>
      <div
        style="font-size: 24px; text-align: end; line-height: 27px; opacity: 0.64; position: absolute; top: 40px; width: 142px; left: 350px; font-weight: 700;">
        ${contractSum}</div>
    </div>

    <div style="position: absolute; top: 767px; left: 1218px; z-index: 9;">
      <div style="font-size: 24px; line-height: 25px; position: absolute; top: 80px; width: 300px; color: #00AEFA;">
        Корпоративная скидка</div>
      <div
        style="position: absolute; top: 75px; width: 80px; height: 37px; left: 417px; background-color: #00AEFA; border-radius: 40px;">
      </div>
      <div
        style="font-size: 24px;  line-height: 27px;text-align: end; position: absolute; top: 80px; width: 42px; left: 436px; font-weight: 700; color: #fff">
        ${corpDiscount}</div>
    </div>

    <div style="position: absolute; top: 767px; left: 1218px; z-index: 9;">
      <div
        style="font-size: 24px; line-height: 25px; opacity: 0.64; position: absolute; top: 120px; width: 300px; opacity: 0.64;">
        Сумма контракта с корпоративной скидкой</div>
      <div
        style="font-size: 24px; line-height: 27px; text-align: end; position: absolute; top: 146px; width: 142px; left: 350px; font-weight: 700; color: #00AEFA;">
        ${contractSumWithDiscount}</div>
    </div>

    <div style="position: absolute; top: 767px; left: 1218px; z-index: 9;">
      <div
        style="font-size: 24px; line-height: 25px; opacity: 0.64; position: absolute; top: 187px; width: 300px; opacity: 0.64;">
        Сумма конракта в месяц</div>
      <div
        style="font-size: 24px; line-height: 27px; text-align: end; position: absolute; top: 187px; width: 142px; left: 350px; font-weight: 700; color: #000; opacity: 0.64;">
        ${monthlyContractSum}</div>
    </div>

    <div style="display: flex; height: 31px; width: 1920px; position: absolute; left: 60px; top: 1045px; z-index: 9;">
      <div
        style="width: 1200px; height: 28px; font-size: 24px; line-height: 28px; letter-spacing: -0.08px; opacity: 0.48;">
        Акты и счета выставляются ежемесячно по факту прохождения уроков. Отсрочка платежа — 30 дней</div>
      <img src="https://static.tildacdn.com/tild3761-6630-4138-a334-366366313935/Group_1077239972.png" width="159"
        height="31" style="position: absolute; z-index: 9; left: 1638px;">
    </div>
    <div>
      <img src="https://static.tildacdn.com/tild3739-6630-4662-b430-373237316239/__.png" width="1920" height="1080"
        style="position: absolute; top: 0px;">
    </div>
  </div>
</div>
`)

    const tempElement = document.createElement('div')
    tempElement.innerHTML = positionsContainer.join('')
    document.querySelector('.save-container').appendChild(tempElement)

    html2canvas(tempElement, {
      scale: 1,
      useCORS: true,
      width: 1920,
      height: 2160,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('landscape', 'px', [1920, 1080]) // Ландшафтная ориентация
        const imgWidth = 1920
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        let heightLeft = imgHeight
        let position = 0

        // Добавляем первое изображение
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdf.internal.pageSize.height

        // Добавляем новые страницы, если нужно
        while (heightLeft > 0) {
          position = imgHeight - heightLeft // Подгонка позиции для нового изображения
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight)
          heightLeft -= pdf.internal.pageSize.height
        }

        // Сохраняем PDF
        pdf.save('document.pdf')
        document.querySelector('.save-container').removeChild(tempElement)
      })
      .catch((error) => {
        console.error('Ошибка при рендеринге с помощью html2canvas:', error)
      })
  }
})
